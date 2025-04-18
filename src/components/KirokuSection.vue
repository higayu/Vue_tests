<template>
  <section class="bg-white p-4 mb-4 border border-gray-300 rounded">
    <table class="w-full border-collapse mb-3">
      <thead>
        <tr>
          <th class="border border-gray-300 p-2 bg-gray-100 text-sm text-left">日付</th>
          <th class="border border-gray-300 p-2 bg-gray-100 text-sm text-left">利用者名</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="border border-gray-300 p-2 relative">
            <span class="date-display">{{ selectedRecordStore.nowSelectedItem.day_txt }}</span>
          </td>
          <td class="border border-gray-300 p-2">
            <p>{{ selectedRecordStore.nowSelectedItem.user_name }}</p>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import { computed } from 'vue';
import { useShareStore } from "../stores/useShareData.js"; // Piniaストアをインポート
import { useSelectedRecordStore } from "../stores/selectedRecord.js"; // Piniaストアをインポート

export default {
  name: 'KirokuSection',

  setup() { 

    const selectedRecordStore = useSelectedRecordStore();
    const shareStore = useShareStore();
    return {
      selectedRecordStore,
      shareStore
    }
  }
}
</script>

<style scoped>
.date-display {
  position: absolute;
  left: 2rem;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  z-index: 2;
}

input[type="date"] {
  color: transparent;
}

input[type="date"]:focus {
  color: #000;
}
</style>
