<template>
  <div>
    <VueDatePicker
      v-model="inputDate"
      format="yyyy年"
      locale="ja"
      model-type="yyyy"
      :enable-time-picker="false"
      :clearable="false"
      :month-picker="false"
      :year-picker="true"
      :day-picker="false"
      no-today
      auto-apply
      @update:model-value="handleYearChange"
      :hide-input-icon="true"
      input-class="w-full p-2 border border-gray-300 rounded-md text-center"
    />
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import { useSelectedRecordStore } from '../stores/selectedRecord';
import { useShareStore } from "../stores/useShareData";

export default defineComponent({
  setup() {
    const selectedRecordStore = useSelectedRecordStore();
    const ShareStore = useShareStore();
    const inputDate = ref(new Date().getFullYear().toString());

    onMounted(() => {
      // 初期値を設定
      selectedRecordStore.setSelected_Year(inputDate.value);
    });

    const handleYearChange = async (newYear) => {
      try {
        if (!newYear) return;

        // 年を文字列として保存
        const yearStr = String(newYear);
        selectedRecordStore.setSelected_Year(yearStr);

        // 現在の月と組み合わせて API を呼び出す
        const month = selectedRecordStore.Selected_Month || '01';
        const formattedDate = `${yearStr}-${month}`;

        console.log('年の変更:', {
          newYear: yearStr,
          currentMonth: month,
          formattedDate: formattedDate
        });

        await selectedRecordStore.getMonth_Kanri(formattedDate);
      } catch (error) {
        console.error('年の更新中にエラーが発生しました:', error);
      }
    };

    return {
      inputDate,
      handleYearChange
    };
  }
});
</script>