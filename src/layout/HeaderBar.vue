<template>
  <header class="bg-sky-600 text-white text-center py-4">
    <div id="title-user-select-name" class="w-full grid grid-cols-3 gap-1 md:gap-2 px-2 md:px-4 py-2">
      <!-- 利用者選択ボタン -->
      <router-link to="/" 
        class="nomalsize bg-green-600 flex items-center justify-center gap-1 md:gap-2 text-white text-center rounded px-2 md:px-3 py-1 md:w-40 w-12"
        @click.prevent="navigateToUserSelection"
      >
        <svg class="size-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
        </svg>
        <span class="hidden md:inline font-bold">利用者選択</span>
      </router-link>

      <!-- ヘッダー中央テキスト -->
      <div class="text-center flex items-center justify-center px-1 whitespace-nowrap">
        {{ ShareStore.header_title }}
      </div>

      <!-- ログアウトボタン -->
      <div class="flex justify-end">
        <button 
          class="nomalsize bg-gray-400 flex items-center justify-center gap-1 md:gap-2 text-white text-center rounded px-2 md:px-3 py-1 md:w-40 w-12"
          @click="showLogoutConfirm = true"
        >
          <span class="hidden md:inline">ログアウト</span>
          <svg class="size-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
          </svg>
        </button>
      </div>
    </div>

    <!-- ログアウト確認モーダル -->
    <div v-if="showLogoutConfirm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-sm w-full">
        <h3 class="text-lg text-black font-semibold mb-4">ログアウトの確認</h3>
        <p class="mb-4 text-black">ログアウトしてもよろしいですか？</p>
        <div class="flex justify-center gap-4">
          <button 
            class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            @click="showLogoutConfirm = false"
          >
            キャンセル
          </button>
          <button 
            class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            @click="confirmLogout"
          >
            ログアウト
          </button>
        </div>
      </div>
    </div>
  </header>
</template>


<script>
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router'; // useRouterをインポート
import { useShareStore } from "../stores/useShareData.js"; // Piniaストアをインポート

export default {
  name: "NavBar1",


  setup(props, { emit }) {

    const router = useRouter(); // Initialize the router instance
    const ShareStore = useShareStore();
    const showLogoutConfirm = ref(false);

    // データ取得関数
    const fetchData = async () => {

    };

    //-------------------------------------------------------
    // マウント時にデータを取得
    onMounted(async () => {
      await fetchData();
    });
    //----------------------------------------

    // ログアウト確認後の処理
    async function confirmLogout() {
      await ShareStore.Clear_LoginData();
      localStorage.clear();
      showLogoutConfirm.value = false;
      //window.location.replace(import.meta.env.VITE_API_HOME);
    }

    // 利用者選択画面への遷移処理
    async function navigateToUserSelection() {
      // 編集中のデータがある場合の確認
      if (ShareStore.selected_user) {
        ShareStore.setSelectedUser_Clear();
      }
      router.push('/');
    }

    return {
      ShareStore,
      navigateToUserSelection,
      showLogoutConfirm,
      confirmLogout,
    };
  },


};
</script>
<style scoped>
/* 基本スタイル */
.nomalsize {
  font-size: 1.2rem;
}

/* 利用者選択の文字サイズ */
#title-user-select-name {
  font-size: 1.7rem !important;
}
</style>

