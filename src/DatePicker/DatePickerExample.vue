<template>
  <div class="date-picker-example p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-xl font-bold mb-4">デートピッカーの使用例</h2>
    
    <div class="mb-6">
      <h3 class="text-lg font-semibold mb-2">シングルデートピッカー</h3>
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">日付選択</label>
        <DatePicker 
          v-model="selectedDate" 
          @change="handleDateChange"
          placeholder="日付を選択してください"
        />
      </div>
      <div v-if="selectedDate" class="text-sm text-gray-600">
        選択された日付: {{ selectedDate }}
      </div>
    </div>
    
    <div class="mb-6">
      <h3 class="text-lg font-semibold mb-2">日付フォーマット指定</h3>
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">日付選択 (YYYY/MM/DD)</label>
        <DatePicker 
          v-model="selectedDateFormatted" 
          format="YYYY/MM/DD"
          placeholder="日付を選択してください"
        />
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">日付選択 (YYYY年MM月DD日)</label>
        <DatePicker 
          v-model="selectedDateJapanese" 
          format="YYYY年MM月DD日"
          placeholder="日付を選択してください"
        />
      </div>
    </div>
    
    <div class="mb-6">
      <h3 class="text-lg font-semibold mb-2">日付範囲制限</h3>
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">日付選択 (過去30日から未来30日まで)</label>
        <DatePicker 
          v-model="selectedDateLimited" 
          :min-date="minDate"
          :max-date="maxDate"
          placeholder="日付を選択してください"
        />
      </div>
    </div>
    
    <div>
      <h3 class="text-lg font-semibold mb-2">日付範囲選択</h3>
      <DateRangePicker 
        v-model:startDate="startDate"
        v-model:endDate="endDate"
        @change="handleRangeChange"
        startLabel="開始日"
        endLabel="終了日"
        startPlaceholder="開始日を選択"
        endPlaceholder="終了日を選択"
      />
      <div v-if="startDate && endDate" class="mt-2 text-sm text-gray-600">
        選択された期間: {{ startDate }} 〜 {{ endDate }}
      </div>
    </div>
  </div>
</template>

<script>
import DatePicker from './DatePicker.vue';
import DateRangePicker from './DateRangePicker.vue';

export default {
  name: 'DatePickerExample',
  components: {
    DatePicker,
    DateRangePicker
  },
  data() {
    // 過去30日と未来30日の日付を計算
    const today = new Date();
    const past30Days = new Date(today);
    past30Days.setDate(today.getDate() - 30);
    const future30Days = new Date(today);
    future30Days.setDate(today.getDate() + 30);
    
    return {
      selectedDate: '',
      selectedDateFormatted: '',
      selectedDateJapanese: '',
      selectedDateLimited: '',
      minDate: this.formatDate(past30Days),
      maxDate: this.formatDate(future30Days),
      startDate: '',
      endDate: ''
    }
  },
  methods: {
    formatDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
    handleDateChange(date) {
      console.log('日付が変更されました:', date);
    },
    handleRangeChange(range) {
      console.log('日付範囲が変更されました:', range);
    }
  }
}
</script>

<style scoped>
.date-picker-example {
  max-width: 600px;
  margin: 0 auto;
}
</style> 