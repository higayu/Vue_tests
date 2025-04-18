<template>
  <div class="modal-overlay">
    <!-- 外枠：90vh固定、flexレイアウトでヘッダー・コンテンツ・フッターを配置 -->
    <div class="relative bg-white w-full max-w-3xl md:mx-4 md:rounded-lg shadow-xl md:h-[90vh] h-dvh flex flex-col">
      
      <!-- ヘッダー（固定） -->
      <div class="fixed-header">
        <span class="text-lg font-medium">夜間巡視記録</span>
        <span class="text-base text-gray-600">{{ ShareStore.selected_user.name || '●●●●' }} 様</span>
      </div>
      
      <!-- メインコンテンツ（スクロール可能） -->
      <div class="flex-1 overflow-y-auto p-5 pb-24 md:pb-5">
        <form @submit.prevent="savePatrol">
          <!-- 共通日付・時刻 -->
          <div class="flex gap-4 mb-4">
            <div class="w-1/2">
              <DatePicker_modal v-model="patrolData.date" :useStoreDate="false" />
            </div>
            <div class="w-1/2">
              <input type="time" v-model="patrolData.time" class="w-full p-2 border border-gray-300 rounded" />
            </div>
          </div>
          
          <textarea
            v-model="patrolData.note"
            placeholder="記録内容"
            class="w-full p-2 mb-4 border border-gray-300 rounded min-h-[150px]"
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
              :class="{ 'active': selectedOptions.includes('良眠') }"
              @click="toggleOption('良眠')"
            >
              良眠
            </button>
            <button
              type="button"
              class="toggle-btn"
              :class="{ 'active': selectedOptions.includes('覚醒') }"
              @click="toggleOption('覚醒')"
            >
              覚醒
            </button>
            <button
              type="button"
              class="toggle-btn"
              :class="{ 'active': selectedOptions.includes('浅眠') }"
              @click="toggleOption('浅眠')"
            >
              浅眠
            </button>
            <button
              type="button"
              class="toggle-btn"
              :class="{ 'active': selectedOptions.includes('眠前薬') }"
              @click="toggleOption('眠前薬')"
            >
              眠前薬
            </button>
            <button
              type="button"
              class="toggle-btn"
              :class="{ 'active': selectedOptions.includes('独り言あり') }"
              @click="toggleOption('独り言あり')"
            >
              独り言あり
            </button>
          </div>
        </form>
      </div>
      
      <!-- フッター（固定） -->
      <div class="fixed-footer">
        <button type="button" class="w-[50%] bg-gray-500 text-white py-3 font-semibold" @click="$emit('close')">閉じる</button>
        <button type="submit" class="w-[50%] bg-blue-700 text-white py-3 font-semibold" @click="savePatrol">登録</button>
      </div>
      
    </div>
  </div>
</template>

<script>
import { ref, getCurrentInstance } from "vue";
import { useShareStore } from "../stores/useShareData.js";
import { useModaldataStore } from "../stores/Modaldata.js";
import { getTodayYYYYMMDD, getCurrentTimeJP } from "../utils/timeUtils.js";
import DatePicker_modal from '../DatePicker/DatePicker_modal.vue';

export default {
  components: {
    DatePicker_modal
  },
  emits: ["close", "confirm"],
  setup(_, { emit }) {
    const ShareStore = useShareStore();
    const ModaldataStore = useModaldataStore();

    // 現在の日時を取得
    const currentDate = getTodayYYYYMMDD(); // YYYY-MM-DD
    const currentTime = getCurrentTimeJP(); // HH:MM

    const patrolData = ref({
      date: currentDate,
      time: currentTime,
      note: ""
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
        patrolData.value.note = selectedOptions.value.join("、");
      } else {
        patrolData.value.note = "";
      }
    };

    const setDefaultNote = () => {
      patrolData.value.note = "特変なし";
      selectedOptions.value = ["特変なし"];
      updateNotes();
    };

    const savePatrol = async () => {
      const formattedTime = `${patrolData.value.date} ${patrolData.value.time}`;
      try {
        ShareStore.$patch({ isLoading: true }); // ストアの状態を直接更新
        // Insert_Serviceメソッドで夜間巡視記録を登録
        const result = await ModaldataStore.Insert_Service({
          user_id: Number(ShareStore.selected_user.user_id),
          item_id: 6, // 夜間巡視のID
          served_time: formattedTime,
          note: patrolData.value.note,
          schedule_id: null,
          recorded_staff_id: 1
        });

        console.log("サービス追加結果:", result);
        // （必要に応じて、別途saveNightPatrolなどのAPI呼び出しを実施）
        showSuccessToast('夜間巡視記録が完了しました');
        emit("close");
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
      patrolData,
      selectedOptions,
      toggleOption,
      updateNotes,
      setDefaultNote,
      savePatrol,
      ShareStore,
      ModaldataStore
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
  /* padding: 1rem; */
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
