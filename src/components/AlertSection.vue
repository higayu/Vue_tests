<template>
  <div v-if="showAlert" id="alertSection" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded relative">
    <div class="flex items-center">
      <svg class="w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
      <h3 class="font-bold">未入力項目があります</h3>
    </div>
    <div v-if="isExample" class="text-sm mt-1 mb-3 text-gray-700 bg-white px-3 py-1 rounded border border-gray-300">
      <span class="font-semibold">※システム実装用表示例</span> - このアラートは実際のシステムでバリデーション時に表示されます
    </div>
    <ul class="ml-8 list-disc">
      <li v-for="(message, index) in alertMessages" :key="index">{{ message }}</li>
    </ul>
    
    <!-- 閉じるボタン -->
    <button 
      class="absolute top-2 right-2 text-red-700 hover:text-red-900"
      @click="closeAlert"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  name: 'AlertSection',
  props: {
    isExample: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      showAlert: true,
      alertMessages: [
        '佐藤 太郎様の利用者情報が未入力です',
        'バイタル測定が未入力です'
      ]
    }
  },
  methods: {
    closeAlert() {
      this.showAlert = false;
    },
    addAlertMessage(message) {
      if (!this.alertMessages.includes(message)) {
        this.alertMessages.push(message);
        this.showAlert = true;
      }
    },
    removeAlertMessage(message) {
      const index = this.alertMessages.indexOf(message);
      if (index !== -1) {
        this.alertMessages.splice(index, 1);
        if (this.alertMessages.length === 0) {
          this.showAlert = false;
        }
      }
    },
    clearAlertMessages() {
      this.alertMessages = [];
      this.showAlert = false;
    }
  }
}
</script>

<style scoped>
/* スタイルが必要な場合はここに追加 */
</style>
  