<template>
  <section class="bg-white p-4 mb-4 border border-gray-300 rounded">
    <div class="flex items-center mb-3 border-b border-gray-300 pb-1">
      <h2 class="text-base font-bold">特記事項</h2>
      <button 
        type="button" 
        class="text-gray-600 hover:text-gray-800 ml-3 mb-2" 
        v-if="selectedRecordStore.nowSelectedItem.user_name"
        :disabled="!selectedRecordStore.nowSelectedItem.user_name"
        @click="toggleEditMode"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
        </svg>
      </button>
    </div>
    
    <!-- 表示モード -->
    <div v-if="!isEditing" id="special-note-display" class="grid grid-cols-1 gap-4">
      <div v-if="specialNoteText" class="font-medium whitespace-pre-wrap">
        {{ specialNoteText }}
      </div>
      <div v-else class="font-medium">特記事項はありません</div>
    </div>
    
    <!-- 編集モード -->
    <div v-else>
      <textarea 
        v-model="editingNote" 
        class="w-full p-2 text-sm border border-gray-300 rounded resize-vertical mb-3" 
        rows="5"
        placeholder="特記事項を入力してください"
      ></textarea>
      <div class="flex justify-end gap-2">
        <button 
          type="button" 
          class="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          @click="cancelEdit"
        >
          キャンセル
        </button>
        <button 
          type="button" 
          class="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
          @click="saveNote"
        >
          保存
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, computed, getCurrentInstance } from 'vue';
import { useShareStore } from "../stores/useShareData.js";
import { useSelectedRecordStore } from "../stores/selectedRecord.js"; // Piniaストアをインポート
import { useModaldataStore } from "../stores/Modaldata.js";
import { getTodayYYYYMMDD, getCurrentTimeJP } from "../utils/timeUtils.js"; // timeUtilsから関数をインポート


export default {
  name: 'SpecialNotesSection',
  props: {
    modelValue: {
      type: Array,
      default: () => [],
      required: true
    },
    targetDate: {
      type: String,
      required: true
    },
    userId: {
      type: Number,
      required: true
    }
  },
  emits: ['update:modelValue', 'open-note-modal', 'confirm'],
  
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    const isEditing = ref(false);
    const editingNote = ref('');
    const selectedRecordStore = useSelectedRecordStore();
    const ShareStore = useShareStore();
    const ModaldataStore = useModaldataStore();

    // 特記事項のテキストを取得
    const specialNoteText = computed(() => {
      if (!props.modelValue || props.modelValue.length === 0) return '';
      
      // フィルタリングして最新の特記事項のみを取得
      const validNotes = props.modelValue.filter(note => note && !note.is_deleted);
      if (validNotes.length === 0) return '';

      // 最新の特記事項を返す（配列の最初の要素）
      return validNotes[0].note || '';
    });
    
    // 編集モードの切り替え
    const toggleEditMode = () => {
      isEditing.value = !isEditing.value;
      if (isEditing.value) {
        // 既存の特記事項があれば編集用にセット
        editingNote.value = specialNoteText.value;
      }
    };
    
    // 編集キャンセル
    const cancelEdit = () => {
      isEditing.value = false;
      editingNote.value = specialNoteText.value;
    };
    
    // 特記事項の保存
    const saveNote = async () => {
      try {
        ShareStore.$patch({ isLoading: true });
        
        // 空の特記事項は保存しない
        if (!editingNote.value.trim()) {
          showSuccessToast('特記事項が入力されていません');
          return;
        }

        const formattedTime = `${props.targetDate} ${getCurrentTimeJP()}`;

        // 既存の特記事項があるかチェック
        const existingNote = props.modelValue.find(note => !note.is_deleted);
        const serviceRecordId = existingNote?.id || null;

        // APIを呼び出して保存
        const result = await ModaldataStore.Insert_to_Update_Service({
          service_record_id: serviceRecordId, // 既存の特記事項があれば更新
          user_id: Number(props.userId),
          item_id: 0, // 特記のID
          served_time: formattedTime,
          note: editingNote.value.trim(),
          schedule_id: null,
          recorded_staff_id: 1
        });

        console.log("特記事項の保存結果:", result);
        showSuccessToast('特記事項が保存されました');
        
        // 編集モードを終了
        isEditing.value = false;
        
        // 親コンポーネントに更新を通知
        emit('confirm');
      } catch (error) {
        console.error("特記事項の保存に失敗しました:", error);
        showSuccessToast('特記事項の保存に失敗しました');
      } finally {
        ShareStore.$patch({ isLoading: false });
      }
    };

    // トースト通知用の関数
    const showSuccessToast = (message) => {
      if (proxy?.$toast) {
        proxy.$toast.open({
          message: message,
          type: "success",
          duration: 1000,
          position: "top",
        });
      } else {
        console.log(message);
      }
    };
    
    return {
      selectedRecordStore,
      isEditing,
      editingNote,
      specialNoteText,
      toggleEditMode,
      cancelEdit,
      saveNote,
      showSuccessToast
    };
  }
}
</script>

<style scoped>
/* スタイルが必要な場合はここに追加 */
</style> 