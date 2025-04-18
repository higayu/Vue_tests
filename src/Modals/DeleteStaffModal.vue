<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-bold text-gray-800">スタッフ削除の確認</h3>
        <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      
      <div class="mb-4">
        <p class="text-gray-700">
          {{ staffName }} (ID: {{ serviceRecordId }}) を{{ shiftType === 'day' ? '日勤' : '夜勤' }}から削除してもよろしいですか？
        </p>
      </div>

      <div class="flex justify-end space-x-3">
        <button 
          @click="closeModal" 
          class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          キャンセル
        </button>
        <button 
          @click="confirmDelete" 
          class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          削除
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useSelectedRecordStore } from '@/stores/selectedRecord';
import { ref, computed, reactive, watch, onUnmounted, getCurrentInstance } from 'vue';
import { useRouter } from 'vue-router';
import { getTodayYYYYMMDD, getCurrentTimeJP } from "../utils/timeUtils.js"; // timeUtilsから関数をインポート

export default {
  props: {
    staffName: {
      type: String,
      required: true
    },
    shiftType: {
      type: String,
      required: true
    },
    serviceRecordId: {
      type: [Number, String],
      required: true
    }
  },
  emits: ['close', 'confirm'],
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    const selectedRecordStore = useSelectedRecordStore();
    const router = useRouter();

    // デバッグ用のログを追加
    console.log('DeleteStaffModal props:', {
      staffName: props.staffName,
      shiftType: props.shiftType,
      serviceRecordId: props.serviceRecordId
    });

    const showSuccessToast = (message) => {
      if (!proxy || !proxy.$toast) {
        console.error("Toast instance is undefined. Ensure VueToast is properly registered.");
        return;
      }
      proxy.$toast.open({
        message: message,
        type: "success",
        duration: 1000,
        position: "top"
      });
    };

    const closeModal = () => {
      emit('close');
    };

    const confirmDelete = async () => {
      console.log('スタッフ削除確認モーダーの削除ボタンがクリックされました');
      console.log('削除対象のサービスレコードID:', props.serviceRecordId);
      try {
        await selectedRecordStore.delete_Service(props.serviceRecordId);
        showSuccessToast('スタッフを削除しました');
        emit('confirm');
      } catch (error) {
        console.error('スタッフの削除に失敗しました:', error);
        showSuccessToast('スタッフの削除に失敗しました');
      }
    };

    return {
      closeModal,
      confirmDelete
    };
  }
}
</script>

<style scoped>
/* 必要に応じてスタイルを追加 */
</style> 