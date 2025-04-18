<template>
  <div class="modal-overlay">
    <!-- 外枠：高さ90vh、flexレイアウトでヘッダー・スクロール領域・フッターを配置 -->
    <div class="relative bg-white w-full max-w-3xl md:mx-4 md:rounded-lg shadow-xl md:h-[90vh] h-dvh flex flex-col">
      
      <!-- ヘッダー（固定） -->
      <div class="fixed-header">
        <span class="text-lg font-medium">レクリエーション記録</span>
        <span class="text-base text-gray-600">
          {{ userName || '●●●●' }} 様
        </span>
      </div>
      
      <!-- メインコンテンツ（スクロール可能） -->
      <div class="flex-1 overflow-y-auto p-5 pb-24 md:pb-5">
        <form @submit.prevent="saveRecreation">
          <!-- 共通日付・時刻 -->
          <div class="flex gap-4 mb-4">
            <div class="w-1/2">
              <DatePicker_modal v-model="recreationData.date" :useStoreDate="false" />
            </div>
            <div class="w-1/2">
              <input
                type="time"
                v-model="recreationData.time"
                class="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
          
          <textarea
            v-model="recreationData.note"
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
              :class="{ 'active': selectedOptions.includes('行事レク') }"
              @click="toggleOption('行事レク')"
            >
              行事レク
            </button>
            <button
              type="button"
              class="toggle-btn"
              :class="{ 'active': selectedOptions.includes('お誕生日会') }"
              @click="toggleOption('お誕生日会')"
            >
              お誕生日会
            </button>
            <button
              type="button"
              class="toggle-btn"
              :class="{ 'active': selectedOptions.includes('トランプ') }"
              @click="toggleOption('トランプ')"
            >
              トランプ
            </button>
            <button
              type="button"
              class="toggle-btn"
              :class="{ 'active': selectedOptions.includes('かるた') }"
              @click="toggleOption('かるた')"
            >
              かるた
            </button>
            <button
              type="button"
              class="toggle-btn"
              :class="{ 'active': selectedOptions.includes('DVD体操') }"
              @click="toggleOption('DVD体操')"
            >
              DVD体操
            </button>
            <button
              type="button"
              class="toggle-btn"
              :class="{ 'active': selectedOptions.includes('口腔体操') }"
              @click="toggleOption('口腔体操')"
            >
              口腔体操
            </button>
            <button
              type="button"
              class="toggle-btn"
              :class="{ 'active': selectedOptions.includes('個別レク') }"
              @click="toggleOption('個別レク')"
            >
              個別レク
            </button>
            <button
              type="button"
              class="toggle-btn"
              :class="{ 'active': selectedOptions.includes('個別リハ') }"
              @click="toggleOption('個別リハ')"
            >
              個別リハ
            </button>
            <button
              type="button"
              class="toggle-btn"
              :class="{ 'active': selectedOptions.includes('数字合わせ') }"
              @click="toggleOption('数字合わせ')"
            >
              数字合わせ
            </button>
            <button
              type="button"
              class="toggle-btn"
              :class="{ 'active': selectedOptions.includes('塗り絵') }"
              @click="toggleOption('塗り絵')"
            >
              塗り絵
            </button>
            <button
              type="button"
              class="toggle-btn"
              :class="{ 'active': selectedOptions.includes('クイズ') }"
              @click="toggleOption('クイズ')"
            >
              クイズ
            </button>
            <button
              type="button"
              class="toggle-btn"
              :class="{ 'active': selectedOptions.includes('談笑') }"
              @click="toggleOption('談笑')"
            >
              談笑
            </button>
            <button
              type="button"
              class="toggle-btn"
              :class="{ 'active': selectedOptions.includes('新聞を読む') }"
              @click="toggleOption('新聞を読む')"
            >
              新聞を読む
            </button>
            <button
              type="button"
              class="toggle-btn"
              :class="{ 'active': selectedOptions.includes('今日は何の日') }"
              @click="toggleOption('今日は何の日')"
            >
              今日は何の日
            </button>
            <button
              type="button"
              class="toggle-btn"
              :class="{ 'active': selectedOptions.includes('洗濯物をたたむ') }"
              @click="toggleOption('洗濯物をたたむ')"
            >
              洗濯物をたたむ
            </button>
            <button
              type="button"
              class="toggle-btn"
              :class="{ 'active': selectedOptions.includes('お手伝い活動') }"
              @click="toggleOption('お手伝い活動')"
            >
              お手伝い活動
            </button>
          </div>
        </form>
      </div>
      
      <!-- フッター（固定） -->
      <div class="fixed-footer">
        <button type="button" class="w-[50%] bg-gray-500 text-white py-3 font-semibold" @click="$emit('close')">閉じる</button>
        <button 
          type="submit" 
          class="w-[50%] text-white py-3 font-semibold"
          :class="recreationData.service_record_id ? 'bg-red-700' : 'bg-blue-700'"
          @click="saveRecreation"
        >
          {{ recreationData.service_record_id ? '更新' : '登録' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, getCurrentInstance, onMounted } from "vue";
import { useShareStore } from "../stores/useShareData.js";
import { useModaldataStore } from "../stores/Modaldata.js";
import { getTodayYYYYMMDD, getCurrentTimeJP } from "../utils/timeUtils.js"; // timeUtilsから関数をインポート
import DatePicker_modal from '../DatePicker/DatePicker_modal.vue';

export default {
  components: {
    DatePicker_modal
  },
  emits: ["close", "confirm"],

  props: {
    userId: {
      type: Number,
      required: true
    },
    targetDate: {
      type: String,
      required: true
    },
    userName: {
      type: String,
      required: true
    },
  },
  setup(props, { emit }) {
    const ShareStore = useShareStore();
    const ModaldataStore = useModaldataStore();

    // 現在の日時を取得
    const currentDate = ref(props.targetDate.split(' ')[0] || getTodayYYYYMMDD()); // 日付部分のみを抽出
    const currentTime = ref(props.targetDate.split(' ')[1] || getCurrentTimeJP()); // 時間部分のみを抽出


    const recreationData = ref({
      date: currentDate,
      time: currentTime,
      note: "",
      service_record_id: null
    });

    // 選択されたオプション
    const selectedOptions = ref([]);

    // モーダルが開いたときにレクリエーションデータの値を取得
    onMounted(async () => {
      try {
        ShareStore.$patch({ isLoading: true });
        console.log("ユーザ",props.userId);
        const recreationHistoryData = await ModaldataStore.getService(props.userId, 5, props.targetDate);
        console.log("レクリエーションデータ", recreationHistoryData.data);
        
        // 取得したデータを処理する（もし存在すれば）
        if (recreationHistoryData && recreationHistoryData.data && recreationHistoryData.data.length > 0) {
          const recreation = recreationHistoryData.data[0]; // 最新のレクリエーションデータを使用
          
          // 日付と時刻を設定
          recreationData.value.date = props.targetDate;
          recreationData.value.time = recreation.time || currentTime;
          recreationData.value.note = recreation.note || "";
          recreationData.value.service_record_id = recreation.id || null;
          
          // ノートからオプションを復元
          if (recreation.note) {
            const options = recreation.note.split('、');
            selectedOptions.value = options;
          }
        }
      } catch (error) {
        console.error('レクリエーションデータの取得中にエラーが発生しました:', error);
      } finally {
        ShareStore.$patch({ isLoading: false });
      }
    });

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
        recreationData.value.note = selectedOptions.value.join("、");
      } else {
        recreationData.value.note = "";
      }
    };

    const setDefaultNote = () => {
      recreationData.value.note = "特変なし";
      selectedOptions.value = ["特変なし"];
    };

    const saveRecreation = async () => {
      try {
        ShareStore.$patch({ isLoading: true });
        // 送信データの準備
        const formattedTime = `${props.targetDate} ${recreationData.value.time}`;

        // APIを呼び出して保存
        const result = await ModaldataStore.Insert_to_Update_Service({
          service_record_id: recreationData.value.service_record_id,
          user_id: Number(props.userId),
          item_id: 5, // レクリエーションのID
          served_time: formattedTime,
          note: recreationData.value.note,
          schedule_id: null,
          recorded_staff_id: 1
        });

        console.log("サービス追加結果:", result);
        showSuccessToast('レクリエーション記録が完了しました');
        emit("confirm");
      } catch (error) {
        console.error("記録エラー:", error);
        showErrorToast('レクリエーション記録に失敗しました');
      } finally {
        ShareStore.$patch({ isLoading: false });
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
        type: "success",
        duration: 1000,
        position: "top",
      });
    };

    const showErrorToast = (moji) => {
      if (!proxy || !proxy.$toast) {
        console.error("Toast instance is undefined. Ensure VueToast is properly registered.");
        return;
      }
      proxy.$toast.open({
        message: moji,
        type: "error",
        duration: 2000,
        position: "top",
      });
    };
    
    return {
      showSuccessToast,
      showErrorToast,
      recreationData,
      selectedOptions,
      toggleOption,
      updateNotes,
      setDefaultNote,
      saveRecreation,
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
