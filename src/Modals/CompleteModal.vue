<template>
  <div class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <div class="modal-header">
        <h2>{{ modalTitle }}</h2>
      </div>
      <div class="modal-body">
        <p>{{ modalMessage }}</p>
        
        <!-- 日付と時刻の入力フィールド -->
        <div class="flex gap-4 mb-4">
          <div class="w-1/2">
            <label class="block text-sm font-medium text-gray-700 mb-1">日付</label>
            <DatePicker_modal v-model="selectedDate" :useStoreDate="false" />
          </div>
          <div class="w-1/2">
            <label class="block text-sm font-medium text-gray-700 mb-1">時刻</label>
            <input 
              type="time" 
              v-model="selectedTime" 
              class="w-full p-2 border border-gray-300 rounded"
            >
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="modal-btn yes-btn" @click="confirm">はい</button>
        <button class="modal-btn no-btn" @click="closeModal">いいえ</button>
      </div>
    </div>
  </div>
</template>

<script>
import { useShareStore } from "../stores/useShareData.js"; // Piniaストアをインポート
import { useModaldataStore } from "../stores/Modaldata.js"; // ModaldataStoreをインポート
import { useHoumonStore } from "../stores/Houmon.js"; // HoumonStoreをインポート
import { useRouter } from 'vue-router'; // ルーター追加
import { getCurrentInstance, ref, computed } from 'vue';
import { getTodayYYYYMMDD, getCurrentTimeJP } from "../utils/timeUtils.js"; // timeUtilsから関数をインポート
import DatePicker_modal from '../DatePicker/DatePicker_modal.vue';

export default {
  components: {
    DatePicker_modal
  },
  props: {
    userId: {
      type: Number,
      required: true
    },
    userName: {
      type: String,
      required: true
    },
    serviceType: {
      type: String,
      required: true,
      validator: (value) => ['sougei_start', 'sougei_end', 'houmon_start', 'houmon_end'].includes(value)
    }
  },

  emits: ["close", "confirm", "end"],

  setup(props, { emit }) {
    const ShareStore = useShareStore();
    const HoumonStore = useHoumonStore();
    const ModaldataStore = useModaldataStore();
    const router = useRouter();

    // 日付と時刻の初期値を設定
    const selectedDate = ref(getTodayYYYYMMDD());
    const selectedTime = ref(getCurrentTimeJP());

    // 最大日付（今日）を設定
    const maxDate = computed(() => getTodayYYYYMMDD());

    // モーダルのタイトルとメッセージを計算
    const modalTitle = computed(() => {
      switch (props.serviceType) {
        case 'sougei_start': return '送迎開始';
        case 'sougei_end': return '送迎完了';
        case 'houmon_start': return '訪問開始';
        case 'houmon_end': return '訪問完了';
        default: return '';
      }
    });

    const modalMessage = computed(() => {
      switch (props.serviceType) {
        case 'sougei_start': return '送迎で本日の利用を開始しますか？';
        case 'sougei_end': return '送迎で本日の利用を終了しますか？';
        case 'houmon_start': return '訪問で本日の利用を開始しますか？';
        case 'houmon_end': return '訪問で本日の利用を終了しますか？';
        default: return '';
      }
    });

    const closeModal = () => {
      emit("close");
    }

    const confirm = async () => {
      // 日付と時刻のバリデーションチェック
      if (!selectedDate.value || !selectedTime.value) {
        showErrorToast('日付と時刻を入力してください');
        return;
      }

      const formattedTime = `${selectedDate.value} ${selectedTime.value}`;
      console.log('選択された時刻:', formattedTime);

      try {
        ShareStore.$patch({ isLoading: true });

        switch (props.serviceType) {
          case 'sougei_start':
            await ModaldataStore.Insert_Service({
              user_id: props.userId,
              item_id: 1, // 送迎開始
              served_time: formattedTime,
              note: '',
              schedule_id: null,
              recorded_staff_id: 1
            });
            break;

          case 'sougei_end':
            await ModaldataStore.Insert_Service({
              user_id: props.userId,
              item_id: 2, // 送迎完了
              served_time: formattedTime,
              note: '',
              schedule_id: null,
              recorded_staff_id: 1
            });
            break;

          case 'houmon_start':
          await ModaldataStore.Insert_Service({
              user_id: props.userId,
              item_id: 3, // 訪問開始
              served_time: formattedTime,
              note: '',
              schedule_id: null,
              recorded_staff_id: 1
            });
            break;

          case 'houmon_end':
          await ModaldataStore.Insert_Service({
              user_id: props.userId,
              item_id: 4, // 訪問完了
              served_time: formattedTime,
              note: '',
              schedule_id: null,
              recorded_staff_id: 1
            });
            break;
        }

        showSuccessToast(modalTitle.value + 'が完了しました');
        await ShareStore.getUserSchedule(formattedTime);
        emit("end");
      } catch (error) {
        console.error("処理でエラーが発生しました:", error);
        emit("close");
      } finally {
        ShareStore.$patch({ isLoading: false });
      }
    }

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
        duration: 1000,
        position: "top",
      });
    };

    return {
      modalTitle,
      modalMessage,
      ShareStore,
      HoumonStore,
      closeModal,
      confirm,
      selectedDate,
      selectedTime,
      maxDate,
      showErrorToast
    };
  },
};
</script>

<style scoped>
.modal-overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1000;
}
.modal-content {
  background-color: #fff;
  padding: 30px;
  border-radius: 12px;
  max-width: 600px;
  width: 90%;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.modal-header h2 {
  margin-bottom: 20px;
  font-size: 28px;
  font-weight: bold;
  color: #333;
}
.modal-body {
  margin-bottom: 30px;
}
.modal-body p {
  margin-bottom: 30px;
  font-size: 20px;
  color: #555;
}
.modal-footer {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}
.modal-btn {
  padding: 12px 30px;
  border: none;
  color: #fff;
  cursor: pointer;
  border-radius: 6px;
  font-size: 18px;
  font-weight: bold;
  transition: all 0.3s ease;
}
.modal-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
.yes-btn {
  background-color: #28a745;
}
.yes-btn:hover {
  background-color: #218838;
}
.no-btn {
  background-color: #dc3545;
}
.no-btn:hover {
  background-color: #c82333;
}

/* 日付と時刻の入力フィールドのスタイル */
.flex.gap-4 {
  margin: 20px 0;
}
.w-1\/2 {
  padding: 0 10px;
}
label {
  font-size: 18px;
  margin-bottom: 8px;
  display: block;
  color: #333;
}
input[type="date"],
input[type="time"] {
  width: 100%;
  padding: 12px;
  font-size: 18px;
  border: 2px solid #ddd;
  border-radius: 6px;
  transition: border-color 0.3s ease;
}
input[type="date"]:focus,
input[type="time"]:focus {
  border-color: #28a745;
  outline: none;
  box-shadow: 0 0 0 3px rgba(40, 167, 69, 0.25);
}
</style>
