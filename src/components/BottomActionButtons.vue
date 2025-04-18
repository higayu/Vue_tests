<template>
  <div class="fixed bottom-0 left-0 w-full md:w-[calc(100%-280px)] md:left-[280px] flex bg-white border-t border-gray-300">
    <button 
      @click="printPage" 
      class="flex-1 py-4 text-base font-medium bg-green-600 text-white border-none cursor-pointer active:opacity-80 flex items-center justify-center gap-2"
    >
      <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z" />
      </svg>
      印刷
    </button>
    <button 
      @click="downloadData" 
      class="flex-1 py-4 text-base font-medium bg-blue-600 text-white border-none cursor-pointer active:opacity-80 flex items-center justify-center gap-2"
    >
      <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
      </svg>
      ダウンロード
    </button>
  </div>
</template>

<script>
export default {
  name: 'BottomActionButtons',
  methods: {
    printPage() {
      // 印刷機能
      window.print();
    },
    downloadData() {
      // ダウンロード機能
      // 実際のアプリケーションではAPIからデータを取得してダウンロードする
      this.$emit('download-data');
      
      // 開発用のアラート
      alert('ダウンロード処理実行');
    }
  }
}
</script>

<style scoped>
/* 印刷時にボタンを非表示にする */
@media print {
  div {
    display: none;
  }
}
</style> 