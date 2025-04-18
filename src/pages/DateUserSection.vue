<template>
    <section class="bg-white p-4 mb-4 border border-gray-300 rounded">
      <table class="w-full border-collapse mb-3">
        <tr>
          <th class="border border-gray-300 p-2 bg-gray-100 text-sm text-left">日付</th>
          <td class="border border-gray-300 p-2 relative">
            <DatePicker_kojin v-model="selectedDate" @update:model-value="onDateChange" />
            <span class="date-display absolute left-8 top-1/2 -translate-y-1/2 pointer-events-none z-2">{{ formattedDate }}</span>
          </td>
          <th class="border border-gray-300 p-2 bg-gray-100 text-sm text-left">利用者名</th>
          <td class="border border-gray-300 p-2">
            <select 
              id="user-name" 
              v-model="selectedUser" 
              class="w-[90%] p-1.5 text-sm border border-gray-300 rounded"
            >
              <option value="">選択してください</option>
              <option v-for="user in selectedRecordStore.DateList_kojin" :key="user.user_id" :value="user.user_name">{{ user.name }} 様</option>
            </select>
          </td>
        </tr>
      </table>
    </section>
  </template>
  
  <script>
  import { ref, computed } from 'vue';
  import DatePicker_kojin from '../DatePicker/DatePicker_kojin.vue';
  import { useSelectedRecordStore } from '../stores/selectedRecord';

  export default {
    name: 'DateUserSection',
    components: {
      DatePicker_kojin,
    },
    
    setup() {
      const selectedRecordStore = useSelectedRecordStore();
      const selectedDate = ref(new Date());
      const selectedUser = ref('');

      const formattedDate = computed(() => {
        if (!selectedDate.value) return '';
        const date = new Date(selectedDate.value);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${year}年${month}月${day}日`;
      });

      const onDateChange = (newDate) => {
        // 日付変更時の処理
        selectedDate.value = newDate;
      };

      return {
        selectedRecordStore,
        selectedDate,
        selectedUser,
        formattedDate,
        onDateChange
      };
    }
  }
  </script>
  
  <style scoped>
  .date-display {
    color: #333;
    font-size: 0.9rem;
  }
  </style>
  