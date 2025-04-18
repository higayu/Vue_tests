<template>
  <div class="modal-overlay" v-if="isOpen">
    <!-- 外枠：高さ90vh固定、flexレイアウトでヘッダー・スクロール領域・フッターを配置 -->
    <div class="relative bg-white w-full max-w-3xl mx-4 rounded-lg shadow-xl h-[90vh] flex flex-col">
      
      <!-- ヘッダー（固定） -->
      <div class="fixed-header">
        <span class="text-lg font-medium">特記</span>
        <span class="text-base text-gray-600">
          {{ userName }} 様
        </span>
      </div>
      
      <!-- メインコンテンツ（スクロール可能） -->
      <div class="flex-1 overflow-y-auto p-5 pb-24 md:pb-5">
        <form @submit.prevent="saveNote">
          <!-- 共通日付・時刻 -->
          <div class="flex gap-4 mb-4">
            <div class="w-1/2">
              <input
                type="date"
                v-model="noteData.date"
                class="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div class="w-1/2">
              <input
                type="time"
                v-model="noteData.time"
                class="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
          
          <textarea
            v-model="noteData.content"
            placeholder="記録内容"
            class="w-full p-2 mb-4 border border-gray-300 rounded min-h-[200px]"
          ></textarea>
          
          <!-- 記録テンプレボタン -->
          <div class="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
            <button
              type="button"
              class="toggle-btn"
              :class="{ 'active': selectedOptions.includes('特変なし') }"
              @click="toggleOption('特変なし')"
            >
              特変なし
            </button>
            <button
              type="button"
              class="toggle-btn"
              :class="{ 'active': selectedOptions.includes('往診') }"
              @click="toggleOption('往診')"
            >
              往診
            </button>
            <button
              type="button"
              class="toggle-btn"
              :class="{ 'active': selectedOptions.includes('受診') }"
              @click="toggleOption('受診')"
            >
              受診
            </button>
            <button
              type="button"
              class="toggle-btn"
              :class="{ 'active': selectedOptions.includes('次回受診日') }"
              @click="toggleOption('次回受診日')"
            >
              次回受診日
            </button>
            <button
              type="button"
              class="toggle-btn"
              :class="{ 'active': selectedOptions.includes('薬処方') }"
              @click="toggleOption('薬処方')"
            >
              薬処方
            </button>
            <button
              type="button"
              class="toggle-btn"
              :class="{ 'active': selectedOptions.includes('追加処方') }"
              @click="toggleOption('追加処方')"
            >
              追加処方
            </button>
            <button
              type="button"
              class="toggle-btn"
              :class="{ 'active': selectedOptions.includes('訪問美容') }"
              @click="toggleOption('訪問美容')"
            >
              訪問美容
            </button>
            <button
              type="button"
              class="toggle-btn"
              :class="{ 'active': selectedOptions.includes('ケアマネ訪問') }"
              @click="toggleOption('ケアマネ訪問')"
            >
              ケアマネ訪問
            </button>
            <button
              type="button"
              class="toggle-btn"
              :class="{ 'active': selectedOptions.includes('連携') }"
              @click="toggleOption('連携')"
            >
              連携
            </button>
            <button
              type="button"
              class="toggle-btn"
              :class="{ 'active': selectedOptions.includes('歯科往診') }"
              @click="toggleOption('歯科往診')"
            >
              歯科往診
            </button>
            <button
              type="button"
              class="toggle-btn"
              :class="{ 'active': selectedOptions.includes('昼食算定') }"
              @click="toggleOption('昼食算定')"
            >
              昼食算定
            </button>
            <button
              type="button"
              class="toggle-btn"
              :class="{ 'active': selectedOptions.includes('洗濯算定') }"
              @click="toggleOption('洗濯算定')"
            >
              洗濯算定
            </button>
          </div>
        </form>
      </div>
      
      <!-- フッター（固定） -->
      <div class="fixed-footer">
        <button type="button" class="w-[48%] bg-gray-500 text-white py-3 rounded font-semibold" @click="$emit('close')">閉じる</button>
        <button type="submit" class="w-[48%] bg-blue-700 text-white py-3 rounded font-semibold" @click="saveNote">登録</button>
      </div>
      
    </div>
  </div>
</template>

<script>
import { ref ,getCurrentInstance } from "vue";
import { useShareStore } from "../stores/useShareData.js";
import { useModaldataStore } from "../stores/Modaldata.js";
import { getTodayYYYYMMDD, getCurrentTimeJP } from "../utils/timeUtils.js"; // timeUtilsから関数をインポート


export default {
  name: 'SpecialNoteModal',
  props: {
    modalId: {
      type: String,
      required: true
    },
    userName: {
      type: String,
      required: true
    },
    isOpen: {
      type: Boolean,
      default: false
    },
    userId: {
      type: Number,
      required: true
    },
    targetDate: {
      type: String,
      required: true
    }
  },

  emits: ["close", "confirm"],
  setup(props, { emit }) {
    const ShareStore = useShareStore();
    const ModaldataStore = useModaldataStore();

    const date = new Date(props.targetDate)
    const currentDate = getTodayYYYYMMDD();
    const currentTime = getCurrentTimeJP();
    
    const noteData = ref({
      date: currentDate,
      time: currentTime,
      content: ""
    });
    
    // 選択されたオプション
    const selectedOptions = ref([]);
    
    // オプションの選択/解除
    const toggleOption = (option) => {
      const index = selectedOptions.value.indexOf(option);
      if (index === -1) {
        selectedOptions.value.push(option);
      } else {
        selectedOptions.value.splice(index, 1);
      }
      updateNotes();
    };
    
    // 選択されたオプションをテキストエリアに反映する
    const updateNotes = () => {
      if (selectedOptions.value.length > 0) {
        noteData.value.content = selectedOptions.value.join("、");
      } else {
        noteData.value.content = "";
      }
    };

    const setDefaultNote = () => {
      noteData.value.content = "特変なし";
      selectedOptions.value = ["特変なし"];
      updateNotes();
    };

    const saveNote = async () => {
      try {
        ShareStore.$patch({ isLoading: true }); // ストアの状態を直接更新
        // 送信データの準備
        const formattedTime = props.targetDate;

        // APIを呼び出して保存
        const result = await ModaldataStore.Insert_Service({
          user_id: Number(props.userId),
          item_id: 0, // 特記のID
          served_time: formattedTime,
          note: noteData.value.content,
          schedule_id: null,
          recorded_staff_id: 1
        });

        showSuccessToast('特記記録が完了しました');
        emit("confirm");
      } catch (error) {
        console.error("記録エラー:", error);
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
      noteData,
      selectedOptions,
      toggleOption,
      updateNotes,
      setDefaultNote,
      saveNote,
      ShareStore,
      ModaldataStore,
      userName: props.userName,
      modalId: props.modalId,
      isOpen: props.isOpen
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

/* トグルボタンのスタイル */
.toggle-btn {
  display: block;
  text-align: center;
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  cursor: pointer;
  background-color: white;
  color: #333;
  transition: all 0.2s;
}

.toggle-btn.active {
  background-color: #28a745;
  color: white;
  border-color: #218838;
}

/* フッター固定用のスタイル */
.fixed-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  padding: 1rem;
  border-top: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  z-index: 10;
}

/* ヘッダー固定用のスタイル */
.fixed-header {
  top: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  padding: 1.25rem;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
}
</style>
