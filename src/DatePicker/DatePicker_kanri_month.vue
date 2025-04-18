<template>
  <div>
    <VueDatePicker
      v-model="inputDate"
      format="MM月"
      locale="ja"
      model-type="MM"
      :enable-time-picker="false"
      :clearable="false"
      :month-picker="true"
      :year-picker="false"
      :day-picker="false"
      no-today
      auto-apply
      @update:model-value="handleMonthChange"
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
    const currentMonth = String(new Date().getMonth() + 1).padStart(2, '0');
    const inputDate = ref(currentMonth);

    onMounted(() => {
      // 初期値を設定
      selectedRecordStore.setSelected_Month(currentMonth);
    });

    const handleMonthChange = async (newMonth) => {
      try {
        if (!newMonth) return;

        // 月を2桁の文字列として保存
        const monthStr = String(newMonth).padStart(2, '0');
        selectedRecordStore.setSelected_Month(monthStr);

        // 現在の年と組み合わせて API を呼び出す
        const year = selectedRecordStore.Selected_Year || new Date().getFullYear().toString();
        const formattedDate = `${year}-${monthStr}`;

        console.log('月の変更:', {
          currentYear: year,
          newMonth: monthStr,
          formattedDate: formattedDate
        });

        await selectedRecordStore.getMonth_Kanri(formattedDate);
      } catch (error) {
        console.error('月の更新中にエラーが発生しました:', error);
      }
    };

    return {
      inputDate,
      handleMonthChange
    };
  }
});
</script>