<template>
  <section class="bg-white p-4 mb-4 border border-gray-300 rounded">
    <div class="flex items-center mb-3 border-b border-gray-300 pb-1">
      <h2 class="text-base font-bold">排泄状況</h2>
      <button 
        type="button" 
        class="text-gray-600 hover:text-gray-800 ml-3" 
        :disabled="!selectedRecordStore.nowSelectedItem.user_name"
        v-if="selectedRecordStore.nowSelectedItem.user_name"
        @click="openModal(null,selectedRecordStore.nowSelectedItem_Kanri.user_id,selectedRecordStore.nowSelectedItem_Kanri.day_key)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>
    
    <div class="overflow-x-auto">
      <!-- 排泄状況のテーブル -->
      <div class="mt-2">
        <table class="w-full border-collapse border border-gray-300 text-sm">
          <thead>
            <tr>
              <th class="border border-gray-300 p-2 bg-gray-100 w-20 text-center">時間</th>
              <th class="border border-gray-300 p-2 bg-gray-100 w-24 text-center">尿</th>
              <th class="border border-gray-300 p-2 bg-gray-100 w-24 text-center">便</th>
              <th class="border border-gray-300 p-2 bg-gray-100 w-24 text-center">状態</th>
              <th class="border border-gray-300 p-2 bg-gray-100 w-24 text-center">交換</th>
              <th class="border border-gray-300 p-2 bg-gray-100 flex-1 text-center">備考</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="!hasValidExcretions">
              <td colspan="6" class="border border-gray-300 p-2 text-center text-gray-500">
                排泄記録がありません
              </td>
            </tr>
            <tr 
              v-for="record in formattedExcretions" 
              :key="record.service_record_id || record.id" 
              class="excretion-row cursor-pointer"
              @click="openModal(record)"
            >
              <td class="border border-gray-300 p-2 text-center font-medium">{{ record.time }}</td>
              <td class="border border-gray-300 p-2 text-center">{{ record.urine_quantity || '-' }}</td>
              <td class="border border-gray-300 p-2 text-center">{{ record.defecate_quantity || '-' }}</td>
              <td class="border border-gray-300 p-2 text-center">{{ record.defecate_condition || '-' }}</td>
              <td class="border border-gray-300 p-2 text-center">{{ record.exchange_name || '-' }}</td>
              <td class="border border-gray-300 p-2 text-left">
                <div class="truncate max-w-xs">{{ record.note || '-' }}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 排泄モーダル -->
    <ExcretionModal
      v-if="showModal"
      :initialData="currentRecord"
      :userId="selectedRecordStore.nowSelectedItem.user_id"
      :targetDate="selectedRecordStore.nowSelectedItem.day_key"
      :userName="selectedRecordStore.nowSelectedItem.user_name"
      :service_status="serviceStatus"
      @close="closeModal"
      @confirm="handleSave"
    />
  </section>
</template>

<script>
import { ref, computed } from 'vue';
import ExcretionModal from "../Modals/ExcretionModal.vue"; 
import { useSelectedRecordStore } from '../stores/selectedRecord';
import { getTodayYYYYMMDD } from "../utils/timeUtils.js"; // timeUtilsから関数をインポート

export default {
  name: 'ExcretionStatusSection',
  components: {
    ExcretionModal
  },
  props: {
    modelValue: {
      type: Array,
      default: () => [],
      required: true
    },
    serviceStatus: {
      type: String,
      default: 'kiroku'
    },

  },
  emits: ['update:modelValue'],
  
  setup(props, { emit }) {
    const showModal = ref(false);
    const currentRecord = ref(null);
    const selectedRecordStore = useSelectedRecordStore();

    // モーダルを開く関数
    const openModal = async (record = null) => {
      const today_moji = getTodayYYYYMMDD();
      currentRecord.value = record || {
        user_id: 0,
        user_name: '',
        served_time: today_moji
      };
      showModal.value = true;
    };

    
    // モーダルを閉じる関数
    const closeModal = () => {
      showModal.value = false;
      currentRecord.value = null;
    };
    
    // 排泄データを確定する関数
    const handleSave = () => {

      emit('confirm');
      // モーダルを閉じる
      closeModal();
    };
    
    // 有効な排泄記録があるかどうかを確認
    const hasValidExcretions = computed(() => {
      return props.modelValue && 
             props.modelValue.length > 0 && 
             props.modelValue.some(item => item && !item.is_deleted);
    });
    
    // 排泄記録を整形して表示用に変換
    const formattedExcretions = computed(() => {
      if (!props.modelValue) return [];
      
      return props.modelValue
        .filter(item => item && !item.is_deleted)
        .sort((a, b) => {
          // 時間でソート
          if (!a.time || !b.time) return 0;
          const timeA = a.time.split(':').map(Number);
          const timeB = b.time.split(':').map(Number);
          return (timeA[0] * 60 + timeA[1]) - (timeB[0] * 60 + timeB[1]);
        });
    });
    
    return {
      selectedRecordStore,
      showModal,
      currentRecord,
      hasValidExcretions,
      formattedExcretions,
      openModal,
      closeModal,
      handleSave
    };
  }
}
</script>

<style scoped>
.excretion-row:hover td {
  background-color: #dbeafe !important; /* blue-100 の色 */
  transition: background-color 0.15s;
}
</style> 