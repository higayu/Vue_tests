<template>
  <div class="date-range-picker">
    <div class="flex flex-col sm:flex-row gap-2">
      <div class="w-full sm:w-1/2">
        <label class="block text-sm font-medium text-gray-700 mb-1">{{ startLabel }}</label>
        <div class="relative">
          <input 
            type="text" 
            :value="formattedStartDate" 
            readonly
            @click="toggleStartCalendar"
            class="date-input w-full p-2 border border-gray-300 rounded cursor-pointer"
            :placeholder="startPlaceholder"
          />
          <button 
            type="button" 
            @click="toggleStartCalendar" 
            class="calendar-toggle absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
            </svg>
          </button>
        </div>
        
        <div v-if="showStartCalendar" class="calendar-dropdown">
          <div class="calendar-header">
            <button @click="prevMonth('start')" class="month-nav">&lt;</button>
            <div class="current-month">{{ startMonthName }} {{ startYear }}</div>
            <button @click="nextMonth('start')" class="month-nav">&gt;</button>
          </div>
          
          <div class="weekdays">
            <div v-for="day in weekdays" :key="day" class="weekday">{{ day }}</div>
          </div>
          
          <div class="days">
            <div 
              v-for="day in startCalendarDays" 
              :key="day.date" 
              class="day"
              :class="{
                'other-month': !day.currentMonth,
                'selected': isStartSelected(day.date),
                'in-range': isInRange(day.date),
                'today': isToday(day.date),
                'disabled': isDisabled(day.date, 'start')
              }"
              @click="!isDisabled(day.date, 'start') && selectStartDate(day.date)"
            >
              {{ day.day }}
            </div>
          </div>
          
          <div class="calendar-footer">
            <button @click="selectToday('start')" class="today-btn">今日</button>
            <button @click="closeCalendar('start')" class="close-btn">閉じる</button>
          </div>
        </div>
      </div>
      
      <div class="w-full sm:w-1/2">
        <label class="block text-sm font-medium text-gray-700 mb-1">{{ endLabel }}</label>
        <div class="relative">
          <input 
            type="text" 
            :value="formattedEndDate" 
            readonly
            @click="toggleEndCalendar"
            class="date-input w-full p-2 border border-gray-300 rounded cursor-pointer"
            :placeholder="endPlaceholder"
          />
          <button 
            type="button" 
            @click="toggleEndCalendar" 
            class="calendar-toggle absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
            </svg>
          </button>
        </div>
        
        <div v-if="showEndCalendar" class="calendar-dropdown">
          <div class="calendar-header">
            <button @click="prevMonth('end')" class="month-nav">&lt;</button>
            <div class="current-month">{{ endMonthName }} {{ endYear }}</div>
            <button @click="nextMonth('end')" class="month-nav">&gt;</button>
          </div>
          
          <div class="weekdays">
            <div v-for="day in weekdays" :key="day" class="weekday">{{ day }}</div>
          </div>
          
          <div class="days">
            <div 
              v-for="day in endCalendarDays" 
              :key="day.date" 
              class="day"
              :class="{
                'other-month': !day.currentMonth,
                'selected': isEndSelected(day.date),
                'in-range': isInRange(day.date),
                'today': isToday(day.date),
                'disabled': isDisabled(day.date, 'end')
              }"
              @click="!isDisabled(day.date, 'end') && selectEndDate(day.date)"
            >
              {{ day.day }}
            </div>
          </div>
          
          <div class="calendar-footer">
            <button @click="selectToday('end')" class="today-btn">今日</button>
            <button @click="closeCalendar('end')" class="close-btn">閉じる</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DateRangePicker',
  props: {
    startDate: {
      type: String,
      default: ''
    },
    endDate: {
      type: String,
      default: ''
    },
    startLabel: {
      type: String,
      default: '開始日'
    },
    endLabel: {
      type: String,
      default: '終了日'
    },
    startPlaceholder: {
      type: String,
      default: '開始日を選択'
    },
    endPlaceholder: {
      type: String,
      default: '終了日を選択'
    },
    format: {
      type: String,
      default: 'YYYY-MM-DD'
    },
    minDate: {
      type: String,
      default: null
    },
    maxDate: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      showStartCalendar: false,
      showEndCalendar: false,
      startCurrentDate: new Date(),
      endCurrentDate: new Date(),
      selectedStartDate: this.startDate ? new Date(this.startDate) : null,
      selectedEndDate: this.endDate ? new Date(this.endDate) : null,
      weekdays: ['日', '月', '火', '水', '木', '金', '土']
    }
  },
  computed: {
    startYear() {
      return this.startCurrentDate.getFullYear();
    },
    startMonth() {
      return this.startCurrentDate.getMonth();
    },
    startMonthName() {
      return new Date(this.startYear, this.startMonth, 1).toLocaleString('ja-JP', { month: 'long' });
    },
    endYear() {
      return this.endCurrentDate.getFullYear();
    },
    endMonth() {
      return this.endCurrentDate.getMonth();
    },
    endMonthName() {
      return new Date(this.endYear, this.endMonth, 1).toLocaleString('ja-JP', { month: 'long' });
    },
    formattedStartDate() {
      if (!this.selectedStartDate) return '';
      return this.formatDate(this.selectedStartDate);
    },
    formattedEndDate() {
      if (!this.selectedEndDate) return '';
      return this.formatDate(this.selectedEndDate);
    },
    startCalendarDays() {
      return this.getCalendarDays(this.startYear, this.startMonth);
    },
    endCalendarDays() {
      return this.getCalendarDays(this.endYear, this.endMonth);
    }
  },
  watch: {
    startDate(newVal) {
      this.selectedStartDate = newVal ? new Date(newVal) : null;
    },
    endDate(newVal) {
      this.selectedEndDate = newVal ? new Date(newVal) : null;
    }
  },
  methods: {
    formatDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      
      if (this.format === 'YYYY-MM-DD') {
        return `${year}-${month}-${day}`;
      } else if (this.format === 'YYYY/MM/DD') {
        return `${year}/${month}/${day}`;
      } else if (this.format === 'YYYY年MM月DD日') {
        return `${year}年${month}月${day}日`;
      }
      
      return `${year}-${month}-${day}`;
    },
    getCalendarDays(year, month) {
      const days = [];
      
      // 月の最初の日の曜日を取得（0: 日曜日, 1: 月曜日, ...）
      const firstDay = new Date(year, month, 1).getDay();
      
      // 前月の日数を取得
      const prevMonthDays = new Date(year, month, 0).getDate();
      
      // 現在の月の日数を取得
      const currentMonthDays = new Date(year, month + 1, 0).getDate();
      
      // 前月の日付を追加
      for (let i = firstDay - 1; i >= 0; i--) {
        const day = prevMonthDays - i;
        const date = new Date(year, month - 1, day);
        days.push({
          day,
          date,
          currentMonth: false
        });
      }
      
      // 現在の月の日付を追加
      for (let i = 1; i <= currentMonthDays; i++) {
        const date = new Date(year, month, i);
        days.push({
          day: i,
          date,
          currentMonth: true
        });
      }
      
      // 次月の日付を追加（6週間分になるように）
      const remainingDays = 42 - days.length;
      for (let i = 1; i <= remainingDays; i++) {
        const date = new Date(year, month + 1, i);
        days.push({
          day: i,
          date,
          currentMonth: false
        });
      }
      
      return days;
    },
    toggleStartCalendar() {
      this.showStartCalendar = !this.showStartCalendar;
      if (this.showStartCalendar) {
        this.showEndCalendar = false;
      }
    },
    toggleEndCalendar() {
      this.showEndCalendar = !this.showEndCalendar;
      if (this.showEndCalendar) {
        this.showStartCalendar = false;
      }
    },
    closeCalendar(type) {
      if (type === 'start') {
        this.showStartCalendar = false;
      } else {
        this.showEndCalendar = false;
      }
    },
    prevMonth(type) {
      if (type === 'start') {
        this.startCurrentDate = new Date(this.startYear, this.startMonth - 1, 1);
      } else {
        this.endCurrentDate = new Date(this.endYear, this.endMonth - 1, 1);
      }
    },
    nextMonth(type) {
      if (type === 'start') {
        this.startCurrentDate = new Date(this.startYear, this.startMonth + 1, 1);
      } else {
        this.endCurrentDate = new Date(this.endYear, this.endMonth + 1, 1);
      }
    },
    selectStartDate(date) {
      this.selectedStartDate = new Date(date);
      
      // 開始日が終了日より後の場合、終了日を開始日に設定
      if (this.selectedEndDate && this.selectedStartDate > this.selectedEndDate) {
        this.selectedEndDate = new Date(this.selectedStartDate);
      }
      
      this.$emit('update:startDate', this.formatDate(this.selectedStartDate));
      this.$emit('change', {
        startDate: this.formatDate(this.selectedStartDate),
        endDate: this.selectedEndDate ? this.formatDate(this.selectedEndDate) : ''
      });
      
      this.closeCalendar('start');
    },
    selectEndDate(date) {
      this.selectedEndDate = new Date(date);
      
      // 終了日が開始日より前の場合、開始日を終了日に設定
      if (this.selectedStartDate && this.selectedEndDate < this.selectedStartDate) {
        this.selectedStartDate = new Date(this.selectedEndDate);
      }
      
      this.$emit('update:endDate', this.formatDate(this.selectedEndDate));
      this.$emit('change', {
        startDate: this.selectedStartDate ? this.formatDate(this.selectedStartDate) : '',
        endDate: this.formatDate(this.selectedEndDate)
      });
      
      this.closeCalendar('end');
    },
    selectToday(type) {
      const today = new Date();
      
      if (type === 'start') {
        if (!this.isDisabled(today, 'start')) {
          this.startCurrentDate = new Date(today.getFullYear(), today.getMonth(), 1);
          this.selectStartDate(today);
        }
      } else {
        if (!this.isDisabled(today, 'end')) {
          this.endCurrentDate = new Date(today.getFullYear(), today.getMonth(), 1);
          this.selectEndDate(today);
        }
      }
    },
    isStartSelected(date) {
      if (!this.selectedStartDate) return false;
      return date.toDateString() === this.selectedStartDate.toDateString();
    },
    isEndSelected(date) {
      if (!this.selectedEndDate) return false;
      return date.toDateString() === this.selectedEndDate.toDateString();
    },
    isInRange(date) {
      if (!this.selectedStartDate || !this.selectedEndDate) return false;
      return date > this.selectedStartDate && date < this.selectedEndDate;
    },
    isToday(date) {
      const today = new Date();
      return date.toDateString() === today.toDateString();
    },
    isDisabled(date, type) {
      if (this.minDate && date < new Date(this.minDate)) {
        return true;
      }
      if (this.maxDate && date > new Date(this.maxDate)) {
        return true;
      }
      
      // 開始日選択時は終了日より後の日付を選択できないようにする
      if (type === 'start' && this.selectedEndDate && date > this.selectedEndDate) {
        return true;
      }
      
      // 終了日選択時は開始日より前の日付を選択できないようにする
      if (type === 'end' && this.selectedStartDate && date < this.selectedStartDate) {
        return true;
      }
      
      return false;
    }
  }
}
</script>

<style scoped>
.date-range-picker {
  width: 100%;
}

.calendar-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  width: 300px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 10;
  margin-top: 0.5rem;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  border-bottom: 1px solid #e2e8f0;
}

.month-nav {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.25rem;
  color: #4a5568;
}

.current-month {
  font-weight: 600;
  color: #2d3748;
}

.weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #e2e8f0;
}

.weekday {
  font-weight: 600;
  color: #4a5568;
  font-size: 0.875rem;
}

.days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(6, 1fr);
  text-align: center;
}

.day {
  padding: 0.5rem;
  cursor: pointer;
  border-radius: 0.25rem;
  margin: 0.125rem;
  font-size: 0.875rem;
}

.day:hover:not(.disabled) {
  background-color: #edf2f7;
}

.other-month {
  color: #a0aec0;
}

.selected {
  background-color: #4299e1;
  color: white;
}

.in-range {
  background-color: #ebf8ff;
}

.today {
  border: 1px solid #4299e1;
}

.disabled {
  color: #cbd5e0;
  cursor: not-allowed;
}

.calendar-footer {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem;
  border-top: 1px solid #e2e8f0;
}

.today-btn, .close-btn {
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  cursor: pointer;
}

.today-btn {
  background-color: #4299e1;
  color: white;
  border: none;
}

.close-btn {
  background-color: #e2e8f0;
  color: #4a5568;
  border: none;
}
</style> 