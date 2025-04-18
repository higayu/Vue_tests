<template>
  <div>
    <VueDatePicker
      v-model="localInputDate"
      :format="formatDate"
      locale="ja"
      model-type="yyyy-MM-dd"
      week-start="0"
      update-on-input="true"
      :day-class="getDayClass"
      :enable-time-picker="false"
      :clearable="false"
      :disabled-dates="disableFutureDates"
      no-today
      auto-apply
      :readonly="ShareStore.read_Only_flg == true"
      :class="{ 'readonlybg': ShareStore.read_Only_flg, 'editablebg': !ShareStore.read_Only_flg }"
      input-class="w-full p-2 border border-gray-300 rounded-md text-sm"
      :ui-options="uiOptions"
      @internal-model-change="handleInternalChange"
    />
  </div>
</template>

<script>
import { defineComponent, ref, watch, computed } from 'vue';
import { useShareStore } from "../stores/useShareData.js";
import { format, isValid } from 'date-fns';
import { ArrowDownTrayIcon } from '@heroicons/vue/24/outline';

export default defineComponent({
  name: 'DatePicker_modal',
  
  components: {
    ArrowDownTrayIcon,
  },
  
  props: {
    modelValue: {
      type: [Date, String],
      default: null
    },
    useStoreDate: {
      type: Boolean,
      default: false
    }
  },
  
  emits: ['update:modelValue'],
  
  setup(props, { emit }) {
    const ShareStore = useShareStore();
    
    // UI設定
    const uiOptions = {
      colors: {
        primary: '#3B82F6', // テーマカラー
        selectedDate: '#3B82F6', // 選択日付
        selectedText: '#ffffff', // 選択テキスト
      },
      icons: {
        calendar: ArrowDownTrayIcon
      }
    };
    
    // 和暦表示用のフォーマット関数
    const formatDate = (date) => {
      if (!date) return '';
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const reiwaYear = year - 2018;
      return `令和${reiwaYear}年${month}月${day}日`;
    };
    
    // v-modelとの双方向バインディング
    const localInputDate = computed({
      get: () => props.modelValue || (props.useStoreDate ? ShareStore.Now_Form_day_key : null),
      set: (value) => {
        emit('update:modelValue', value);
      }
    });

    // 内部モデルの変更時の処理
    const handleInternalChange = (currentDate) => {
      if (!currentDate || !isValid(new Date(currentDate))) {
        return;
      }

      try {
        // 内部データはyyyy-MM-dd形式で保持
        const formattedDate = format(new Date(currentDate), 'yyyy-MM-dd');
        if (props.useStoreDate) {
          ShareStore.setNow_Form_day_key(formattedDate);
        }
        emit('update:modelValue', formattedDate);
      } catch (error) {
        console.error("日付フォーマット中にエラーが発生しました:", error);
      }
    };

    // 未来の日付を無効化する関数
    const disableFutureDates = (date) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // 時間を切り捨てる
      return date > today; // 今日より未来の日付を無効化
    };

    // 曜日に応じたクラスを返す関数
    const getDayClass = (date) => {
      const weekDay = new Date(date).getDay();
      if (weekDay === 6) {
        return 'saturday';
      }
      if (weekDay === 0) {
        return 'sunday';
      }
      return '';
    };

    // ShareStoreの変更を監視（useStoreDateがtrueの場合のみ）
    watch(
      () => ShareStore.Now_Form_day_key,
      (newValue) => {
        if (newValue && props.useStoreDate) {
          emit('update:modelValue', newValue);
        }
      }
    );

    return {
      localInputDate,
      getDayClass,
      ShareStore,
      handleInternalChange,
      disableFutureDates,
      uiOptions,
      formatDate
    };
  },
});
</script>

<style scoped>
.saturday {
  color: #0000ff;
}
.sunday {
  color: #ff0000;
}
</style>

<style>
/* グローバルスタイル */
input[readonly] {
  background-color: rgb(229 231 235) !important;
  cursor: not-allowed;
}

input:not([readonly]) {
  background-color: #ffffff !important;
}

/* DatePickerのスタイル改善 */
.dp__main {
  border-radius: 0.375rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.dp__input {
  padding: 0.5rem;
  font-size: 0.875rem;
  border-radius: 0.375rem;
  border: 1px solid #d1d5db;
  transition: border-color 0.15s ease-in-out;
}

.dp__input:focus {
  outline: none;
  border-color: #3B82F6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.25);
}
</style>