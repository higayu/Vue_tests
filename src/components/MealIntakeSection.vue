<template>
  <section class="bg-white p-4 mb-4 border border-gray-300 rounded">

    <div class="flex justify-between items-center mb-3 border-b border-gray-300 pb-1">
      <h2 class="text-base font-bold">食事摂取量</h2>
      <button 
        type="button" 
        :class="[
                selectedRecordStore.nowSelectedItem.user_name 
                  ? 'bg-green-600 hover:bg-green-600 text-white' 
                  : 'bg-gray-400 hover:bg-gray-500 text-gray-200 cursor-not-allowed',
                'px-3 py-1 text-sm rounded'
              ]"
        :disabled="!selectedRecordStore.nowSelectedItem.user_name"
        @click="openMealModal"
      >
        修正
      </button>
    </div>

    <div class="grid grid-cols-1 gap-4">
      <!-- 記録一覧 -->
      <div class="flex flex-wrap gap-4">
        <!-- 朝食 -->
        <div class="flex-1 min-w-[200px] bg-gray-100 p-4 rounded-lg">
          <div class="flex justify-between items-center mb-2">
            <h3 class="font-medium">朝食</h3>
          </div>
          <div class="text-2xl font-semibold text-center py-2 tracking-wide border-t border-gray-300">
            {{ breakfast.mainFood }}/{{ breakfast.sideFood }}
          </div>
          <div v-if="breakfast.note" class="text-xs text-gray-600 mt-2 border-t border-gray-300 pt-1">
            {{ breakfast.note }}
          </div>
        </div>

        <!-- 昼食 -->
        <div class="flex-1 min-w-[200px] bg-gray-100 p-4 rounded-lg">
          <div class="flex justify-between items-center mb-2">
            <h3 class="font-medium">昼食</h3>
          </div>
          <div class="text-2xl font-semibold text-center py-2 tracking-wide border-t border-gray-300">
            {{ lunch.mainFood }}/{{ lunch.sideFood }}
          </div>
          <div v-if="lunch.note" class="text-xs text-gray-600 mt-2 border-t border-gray-300 pt-1">
            {{ lunch.note }}
          </div>
        </div>

        <!-- 夕食 -->
        <div class="flex-1 min-w-[200px] bg-gray-100 p-4 rounded-lg">
          <div class="flex justify-between items-center mb-2 tracking-wide">
            <h3 class="font-medium">夕食</h3>
          </div>
          <div class="text-2xl font-semibold text-center py-2 tracking-wide border-t border-gray-300">
            {{ dinner.mainFood }}/{{ dinner.sideFood }}
          </div>
          <div v-if="dinner.note" class="text-xs text-gray-600 mt-2 border-t border-gray-300 pt-1">
            {{ dinner.note }}
          </div>
        </div>
      </div>
    </div>

    <!-- 食事モーダル -->
    <MealModal 
      v-if="showMealModal"
      :userId="selectedRecordStore.nowSelectedItem.user_id"
      :targetDate="selectedRecordStore.nowSelectedItem.day_key"
      :userName="selectedRecordStore.nowSelectedItem.user_name"
      :meal-data="modelValue"
      :initial-meal-time="activeMealTime"
      :initial-main-food="currentMealData.mainFood"
      :initial-side-food="currentMealData.sideFood"
      :initial-note="currentMealData.note"
      :service-record-id="currentMealData.service_record_id"
      @close="closeMealModal"
      @confirm="handleMealSave"
    />
  </section>
</template>

<script>
import { ref, computed } from 'vue';
import MealModal from '../Modals/MealModal.vue';
import { useSelectedRecordStore } from '../stores/selectedRecord';


export default {
  name: 'MealIntakeSection',
  components: {
    MealModal
  },
  props: {
    modelValue: {
      type: Array,
      default: () => [],
      required: true
    },
  },
  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const showMealModal = ref(false);
    const activeMealTime = ref('朝');
    const currentMealData = ref({
      mainFood: '0',
      sideFood: '0',
      note: '',
      service_record_id: null
    });
    const selectedRecordStore = useSelectedRecordStore();

    // 朝食データを取得
    const breakfast = computed(() => {
      const breakfastRecord = props.modelValue.find(meal => meal.meal_category_id === 0);
      return {
        mainFood: breakfastRecord?.main_dish_id == null ? '-' : breakfastRecord.main_dish_id,
        sideFood: breakfastRecord?.side_dish_id == null ? '-' : breakfastRecord.side_dish_id,
        note: breakfastRecord?.note || '',
        record: breakfastRecord
      };
    });

    // 昼食データを取得
    const lunch = computed(() => {
      const lunchRecord = props.modelValue.find(meal => meal.meal_category_id === 1);
      return {
        mainFood: lunchRecord?.main_dish_id == null ? '-' : lunchRecord.main_dish_id,
        sideFood: lunchRecord?.side_dish_id == null ? '-' : lunchRecord.side_dish_id,
        note: lunchRecord?.note || '',
        record: lunchRecord
      };
    });

    // 夕食データを取得
    const dinner = computed(() => {
      const dinnerRecord = props.modelValue.find(meal => meal.meal_category_id === 2);
      return {
        mainFood: dinnerRecord?.main_dish_id == null ? '-' : dinnerRecord.main_dish_id,
        sideFood: dinnerRecord?.side_dish_id == null ? '-' : dinnerRecord.side_dish_id,
        note: dinnerRecord?.note || '',
        record: dinnerRecord
      };
    });

    // モーダルを開く
    const openMealModal = () => {
      console.log("selectedRecordStore", selectedRecordStore.nowSelectedItem.day_key);
      console.log("食事モーダル起動 - ユーザーID:", selectedRecordStore.nowSelectedItem.user_id, 
                 "日付:", selectedRecordStore.nowSelectedItem.day_key,
                 "利用者名:", selectedRecordStore.nowSelectedItem.user_name);
      // 現在選択中の食事時間のデータを取得
      const mealTimeMap = {
        '朝': breakfast.value,
        '昼': lunch.value,
        '夕': dinner.value
      };

      // 現在のデータをセット
      currentMealData.value = {
        mainFood: mealTimeMap[activeMealTime.value].mainFood,
        sideFood: mealTimeMap[activeMealTime.value].sideFood,
        note: mealTimeMap[activeMealTime.value].note,
        service_record_id: mealTimeMap[activeMealTime.value].record?.service_record_id || null
      };

      showMealModal.value = true;
    };

    // モーダルを閉じる
    const closeMealModal = () => {
      showMealModal.value = false;
    };

    // 食事データの保存処理
    const handleMealSave = () => {
      emit('confirm');
      closeMealModal();
    };

    return {
      showMealModal,
      activeMealTime,
      currentMealData,
      breakfast,
      lunch,
      dinner,
      openMealModal,
      closeMealModal,
      handleMealSave,
      selectedRecordStore
    };
  }
};
</script>

<style scoped>
/* スタイルが必要な場合はここに追加 */
</style> 