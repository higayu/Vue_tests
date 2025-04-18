<template>
  <div id="modal-weight" class="modal fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center" v-if="props.isOpen">
    <div class="relative bg-white p-6 md:rounded-lg md:max-w-md w-full md:h-[90vh] h-dvh">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold">体重測定</h2>
        <div class="text-sm text-gray-600">{{ props.userName }} 様</div>
      </div>
      
      <div class="mb-6 space-y-4">
        <!-- 日付入力 -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">測定日</label>
          <DatePicker_modal v-model="measureDate" :useStoreDate="false" />
        </div>

        <!-- 時刻入力 -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">測定時刻</label>
          <input 
            type="time" 
            v-model="measureTime"
            class="w-full p-2 border border-gray-300 rounded"
          >
        </div>

        <!-- 体重入力 -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">体重</label>
          <div class="flex items-center gap-2">
            <input 
              type="number" 
              v-model="weight"
              ref="weightInput"
              class="w-32 p-3 text-xl border border-gray-300 rounded text-right" 
              placeholder="0.0"
              step="0.1"
            >
            <span class="text-lg font-medium">kg</span>
          </div>
        </div>
      </div>
      
      <div class="fixed-footer">
        <button
          @click="closeModal" 
          class="w-[50%] py-3 bg-gray-500 text-white font-semibold"
        >
          閉じる
        </button>
        <button
          @click="handleSubmit" 
          class="w-[50%] py-3 font-semibold disabled:opacity-50 disabled:cursor-not-allowed text-white"
          :class="[
            isEditMode 
              ? 'bg-red-600 hover:bg-red-700' 
              : 'bg-green-600 hover:bg-green-700'
          ]"
          :disabled="!isValidForm"
        >
          {{ isEditMode ? '更新' : '登録' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, getCurrentInstance, nextTick } from 'vue';
import { useShareStore } from '../stores/useShareData';
import { useModaldataStore } from '../stores/Modaldata';
import { usePrintDataStore } from '../stores/printData';
import { getTodayYYYYMMDD, getCurrentTimeJP } from "../utils/timeUtils.js"; // timeUtilsから関数をインポート
import DatePicker_modal from '../DatePicker/DatePicker_modal.vue';

// プロパティの定義
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  userId: {
    type: Number,
    required: true
  },
  userName: {
    type: String,
    default: ''
  },
  targetDate: {
    type: String,
    required: true
  },
  initialWeight: {
    type: [String, Number, null],
    default: null
  }
});

// emitの定義
const emit = defineEmits(['close', 'confirm']);

// getCurrentInstanceの設定
const { proxy } = getCurrentInstance();

// リアクティブな状態の定義
const weight = ref(null);

const measureDate = ref(props.targetDate.split(' ')[0] || getTodayYYYYMMDD()); // 日付部分のみを抽出
const measureTime = ref(props.targetDate.split(' ')[1] || getCurrentTimeJP()); // 時間部分のみを抽出
const weightInput = ref(null);

// トースト通知用の関数
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

// 計算プロパティ
const isValidForm = computed(() => {
  return weight.value !== null && 
         weight.value > 0 && 
         measureDate.value && 
         measureTime.value;
});

// 編集モードかどうかを判定する計算プロパティ
const isEditMode = computed(() => {
  const printDataStore = usePrintDataStore();
  return !!printDataStore.InputData?.DailyActivitiesSection?.Weight?.id;
});

// メソッド
const initializeData = () => {
  // Weight.noteの安全な参照
  const printDataStore = usePrintDataStore();
  const weightData = printDataStore.InputData?.DailyActivitiesSection?.Weight;
  
  // 体重データの初期化
  weight.value = weightData?.note || null;
  
  // 既存のデータがある場合は、その日時を使用
  if (weightData?.date && weightData?.time) {
    measureDate.value = weightData.date;
    measureTime.value = weightData.time;
  } else {
    // 新規の場合は現在時刻を使用
    measureDate.value = measureDate.value;
    measureTime.value = measureTime.value;
  }
};

const closeModal = () => {
  emit('close');
};

// 新規登録処理
const handleCreate = async () => {
  const formattedTime = `${measureDate.value} ${measureTime.value}`;
  const shareStore = useShareStore();
  const modalDataStore = useModaldataStore();
  const printDataStore = usePrintDataStore();

  // 新規追加処理
  const result = await modalDataStore.Insert_Service({
    user_id: Number(props.userId),
    item_id: 11,
    served_time: formattedTime,
    note: weight.value.toString(),
    schedule_id: null,
    recorded_staff_id: 1
  });

  showSuccessToast('体重を登録しました');
};

// 更新処理
const handleUpdate = async () => {
  const formattedTime = `${measureDate.value} ${measureTime.value}`;
  const modalDataStore = useModaldataStore();
  const printDataStore = usePrintDataStore();
  const weightData = printDataStore.InputData.DailyActivitiesSection.Weight;

  // 更新処理
  await modalDataStore.Update_Service({
    service_record_id: printDataStore.InputData.DailyActivitiesSection.Weight.id,
    user_id: Number(props.userId),
    item_id: 11,
    served_time: formattedTime,
    note: weight.value.toString(),
    schedule_id: weightData.schedule_id || null,
    recorded_staff_id: weightData.recorded_staff_id || 1
  });


  showSuccessToast('体重を更新しました');
};

// 送信処理のハンドラー
const handleSubmit = async () => {
  if (!isValidForm.value) {
    alert('すべての項目を入力してください');
    return;
  }

  try {
    if (isEditMode.value) {
      await handleUpdate();
    } else {
      await handleCreate();
    }
   // emit("update:modelValue", { ...local_val }); // 親に変更を通知
    emit('confirm');
  } catch (error) {
    console.error('体重データの保存に失敗しました:', error);
    alert('体重データの保存に失敗しました');
  }
};

// ウォッチャー
watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    initializeData();
    // モーダルが開かれた後にフォーカスを設定
    nextTick(() => {
      weightInput.value?.focus();
    });
  }
});

watch(() => props.initialWeight, (newVal) => {
  if (newVal !== null) {
    weight.value = typeof newVal === 'string' ? parseFloat(newVal) : newVal;
  }
});

// ライフサイクルフック
onMounted(() => {
  initializeData();
});
</script>

<style scoped>
.modal {
  overflow-y: auto;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  opacity: 1;
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