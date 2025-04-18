<template>
  <div class="modal-overlay">
    <div class="relative bg-white w-full max-w-3xl md:mx-4 md:rounded-lg shadow-xl md:h-[90vh] h-dvh flex flex-col">
      <div class="modal-header">
        <h2 class="text-xl font-bold">備考</h2>
        <button @click="$emit('close')" class="close-btn">&times;</button>
      </div>
      <div class="modal-body">
        <form @submit.prevent="saveNote">
          <div class="mb-4">
            <label class="block text-lg mb-2">記録日時</label>
            <div class="flex gap-2">
              <DatePicker_modal v-model="note.date" :useStoreDate="false" class="w-1/2" />
              <input type="time" v-model="note.time" class="p-2 border rounded w-1/2">
            </div>
          </div>
          
          
          <div class="mb-4">
            <label for="content" class="block text-lg mb-2">記録内容</label>
            <textarea 
              id="content" 
              v-model="note.content" 
              placeholder="記録内容を入力してください" 
              class="w-full p-2 border rounded h-40"
            ></textarea>
          </div>
          

      <div class="fixed-footer">
        <button type="button"
         class="w-[50%] bg-gray-500 text-white py-3 font-semibold"
         @click="$emit('close')">閉じる
        </button>

       <button 
          type="button" 
          class="w-[50%] bg-blue-700 text-white py-3 font-semibold"
          @click="saveNote"
        >
             記録する
        </button>
      </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed ,onMounted,getCurrentInstance } from 'vue';
import { useToast } from '@/composables/useToast';
import { useHoumonStore } from '../stores/Houmon.js';
import { useShareStore } from "../stores/useShareData.js";
import { getTodayYYYYMMDD, getCurrentTimeJP } from "../utils/timeUtils.js"; // timeUtilsから関数をインポート
import DatePicker_modal from '../DatePicker/DatePicker_modal.vue';

export default {
  components: {
    DatePicker_modal
  },
  props: {
    modalId: String,
    user_id: Number,
    userName: String,
    editData: Object
  },
  
  setup(props, { emit }) {
    const { showToast } = useToast();
    const HoumonStore = useHoumonStore();
    const ShareStore = useShareStore();
    
    const note = ref({
      date: getTodayYYYYMMDD(),
      time: getCurrentTimeJP(),
      category: 'general',
      content: ''
    });

    onMounted(() => {
      try {
        ShareStore.$patch({ isLoading: true });
        
        // HoumonStoreから備考データを取得
        const storedData = HoumonStore.Note_Data;
        
        if (storedData) {
          console.log("保存された備考データを取得:", storedData);
          
          // 日付と時刻を設定
          note.value.date = storedData.served_time.split(' ')[0] || getTodayYYYYMMDD();
          note.value.time = storedData.served_time.split(' ')[1] || getCurrentTimeJP();
          
          // 内容を設定
          if (storedData.note) {
            note.value.content = storedData.note;
          }
        }
        

      } catch (error) {
        console.error('データ取得エラー:', error);
      } finally {
        ShareStore.$patch({ isLoading: false });
      }
    });
    
    const saveNote = async () => {
      try {
        ShareStore.$patch({ isLoading: true }); // ストアの状態を直接更新
        const postData = {
          user_id: props.user_id,
          served_time: note.value.date + ' ' + note.value.time,
          note: note.value.content,
        };  

        await HoumonStore.setNote(postData);
        
        showToast('備考の記録が完了しました');
        console.log("備考の記録が完了しました",HoumonStore.Note_Data);
        emit('confirm');
      } catch (error) {
        console.error('記録エラー:', error);
        showToast('記録に失敗しました', 'error');
      } finally {
        ShareStore.$patch({ isLoading: false }); // ストアの状態を直接更新
      }
    };
    
    const { proxy } = getCurrentInstance();

    const showSuccessToast = (moji) => {
      if (!proxy || !proxy.$toast) {
        console.error("Toast instance is undefined. Ensure VueToast is properly registered.");
        return;
      }
      proxy.$toast.open({
        message: moji,
        type: "success", // カスタムスタイルを指定
        duration: 1000,
        position: "top", // トーストを画面左下に表示
      });
    };
    
    return {
      showSuccessToast,
      //-------------------//
      note,
      saveNote,
      ShareStore
    };
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.modal-container {
  background-color: white;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
}

.modal-body {
  padding: 1rem;
}

.close-btn {
  font-size: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
}

/* フッター固定用のスタイル */
.fixed-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  /* padding: 1rem; */
  border-top: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  z-index: 10;
}
</style>
