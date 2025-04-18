<template>
  <div>
    <section class="bg-white p-4 mb-4 border border-gray-300 rounded">
   <div class="flex justify-between items-center mb-3 border-b border-gray-300 pb-1">
      <h2 class="text-base font-bold">バイタル測定</h2>
      <button 
        type="button" 
        :class="[
                selectedRecordStore.nowSelectedItem.user_name 
                  ? 'bg-green-600 hover:bg-green-600 text-white' 
                  : 'bg-gray-400 hover:bg-gray-500 text-gray-200 cursor-not-allowed',
                'px-3 py-1 text-sm rounded'
              ]"
        :disabled="!selectedRecordStore.nowSelectedItem.user_name"
        @click="openVitalModal"
      >
        修正
      </button>
   </div>

      <div class="overflow-x-auto">
        <table class="w-full border-collapse mb-3">
          <thead>
            <tr>
              <th class="border border-gray-300 p-2 bg-gray-100 text-sm text-left whitespace-nowrap">回数</th>
              <th class="border border-gray-300 p-2 bg-gray-100 text-sm text-left whitespace-nowrap">時間</th>
              <th class="border border-gray-300 p-2 bg-gray-100 text-sm text-left">血圧</th>
              <th class="border border-gray-300 p-2 bg-gray-100 text-sm text-left">脈拍</th>
              <th class="border border-gray-300 p-2 bg-gray-100 text-sm text-left">体温</th>
              <th class="border border-gray-300 p-2 bg-gray-100 text-sm text-left">酸素飽和度</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="!hasValidVitals">
              <td colspan="6" class="border border-gray-300 p-2 text-center text-gray-500">
                バイタル記録がありません
              </td>
            </tr>
            <tr v-for="(record, index) in formattedVitals" :key="index" @click="editVitalRecord(record)" class="cursor-pointer hover:bg-blue-50">
              <td class="border border-gray-300 p-2 text-sm">{{ index + 1 }}</td>
              <td class="border border-gray-300 p-2">
                <span class="p-1.5 text-sm">{{ record.time }}</span>
              </td>
              <td class="border border-gray-300 p-2">
                <div class="flex items-center gap-2">
                  <span class="p-1.5 text-sm text-right">{{ record.max_bp }}</span>
                  <span class="text-sm">/</span>
                  <span class="p-1.5 text-sm text-right">{{ record.min_bp }}</span>
                  <span class="text-sm">mmHg</span>
                </div>
              </td>
              <td class="border border-gray-300 p-2">
                <div class="flex items-center gap-2">
                  <span class="p-1.5 text-sm">{{ record.pulse }}</span>
                  <span class="text-sm">/ 分</span>
                </div>
              </td>
              <td class="border border-gray-300 p-2">
                <div class="flex items-center gap-2">
                  <span class="p-1.5 text-sm text-right">{{ record.kt }}</span>
                  <span class="text-sm">℃</span>
                </div>
              </td>
              <td class="border border-gray-300 p-2">
                <div class="flex items-center gap-2">
                  <span class="p-1.5 text-sm text-right">{{ record.spo2 }}</span>
                  <span class="text-sm">%</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- バイタルモーダル -->
    <VitalModal
      v-if="showVitalModal"
      :userId="selectedRecordStore.nowSelectedItem.user_id"
      :targetDate="selectedRecordStore.nowSelectedItem.day_key"
      :userName="selectedRecordStore.nowSelectedItem.user_name"
      :service_status="service_status"
      @close="closeVitalModal"
      @confirm="handleModalSave"
    />
  </div>
</template>

<script>
import { ref, computed, defineEmits } from 'vue';
import VitalModal from "../Modals/VitalModal.vue";
import { useSelectedRecordStore } from '../stores/selectedRecord';

export default {
  name: 'VitalSignsSection',
  components: {
    VitalModal
  },
  props: {
    modelValue: {
      type: Array,
      default: () => [],
      required: true,
    },
  },

  emits: ['open-vital-modal', 'edit-vital-record'],

  setup(props, { emit }) {
    const showVitalModal = ref(false);
    const selectedRecordStore = useSelectedRecordStore();
    const service_status = ref('kiroku');

    // 有効なバイタルデータがあるかどうかを確認
    const hasValidVitals = computed(() => {
      return props.modelValue && 
             props.modelValue.some(vital => 
               vital && 
               vital.id !== null && 
               vital.time !== null
             );
    });

    // バイタルデータを整形して表示用に変換
    const formattedVitals = computed(() => {
      if (!props.modelValue) return [];
      
      return props.modelValue
        .filter(vital => vital && vital.id !== null && vital.time !== null)
        .sort((a, b) => {
          // 時間でソート
          if (!a.time || !b.time) return 0;
          const timeA = a.time.split(':').map(Number);
          const timeB = b.time.split(':').map(Number);
          return (timeA[0] * 60 + timeA[1]) - (timeB[0] * 60 + timeB[1]);
        });
    });

    // バイタル入力モーダルを開く処理
    const openVitalModal = () => {
      showVitalModal.value = true;
    };

    // バイタルモーダルを閉じる処理
    const closeVitalModal = () => {
      showVitalModal.value = false;
    };

    const handleModalSave = () => {
      emit('confirm');
    };

    // バイタル記録編集処理
    const editVitalRecord = (record) => {
      emit('edit-vital-record', record);
    };

    return {
      hasValidVitals,
      formattedVitals,
      openVitalModal,
      editVitalRecord,
      selectedRecordStore,
      showVitalModal,
      closeVitalModal,
      handleModalSave,
      selectedRecordStore,
      service_status
    };
  }
};
</script>

<style scoped>
/* スタイルが必要な場合はここに追加 */
</style> 