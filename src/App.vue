<template>
  <div id="app">
    <div class="bg-gray-100 min-h-screen">
      <!-- ローディングオーバーレイを追加 -->
      <div v-if="ShareStore.isLoading" class="loading-overlay">
        <div class="spinner"></div>
      </div>

      <div v-if="ShareStore.LoginData">
        <router-view name="header"></router-view>
        <router-view name="navbar"></router-view>

        <!-- コンテンツ部分：サイドバーとメインを横並びに配置 -->
        <div class="content flex p-2">
          <template v-if="hasSidebar">
            <!-- ハンバーガーメニューボタン -->
            <button
              @click="toggleSidebar"
              class="fixed top-20 left-4 z-50 p-2 bg-white rounded-lg shadow-md hover:bg-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            <!-- サイドバー -->
            <aside
              :class="[
                'fixed top-20 left-0 h-[calc(100vh-5rem)] transition-all duration-300 ease-in-out',
                isSidebarOpen ? 'w-1/5 max-w-[200px] translate-x-0' : '-translate-x-full'
              ]"
            >
              <router-view name="sidebar"></router-view>
            </aside>
            <!-- メインコンテンツ -->
            <main
              :class="[
                'transition-all duration-300 ease-in-out',
                isSidebarOpen ? 'w-3/4 ml-[200px]' : 'w-full'
              ]"
            >
              <router-view name="main"></router-view>
            </main>
          </template>
          <template v-else>
            <!-- サイドバーがない場合は main を全幅 -->
            <main class="w-full">
              <router-view name="main"></router-view>
            </main>
          </template>
        </div>
      </div>
      <div v-else>
        <Login />
      </div>
    </div>
  </div>
</template>

<script>
import Login from "./views/LoginView.vue";
import { useRoute } from "vue-router";
import { ref, reactive, onMounted, watch, onBeforeUnmount, toRefs, computed, getCurrentInstance } from "vue";
import { useShareStore } from "./stores/useShareData.js";

export default {
  name: "App",
  components: {
    Login,
  },
  setup() {
    const route = useRoute();
    const ShareStore = useShareStore();
    const { isLoading, userList, staffList } = toRefs(ShareStore);
    const isSidebarOpen = ref(true);

    // getCurrentInstanceの設定
    const { proxy } = getCurrentInstance();

    // サイドバーの表示/非表示を切り替える関数
    const toggleSidebar = () => {
      isSidebarOpen.value = !isSidebarOpen.value;
    };

    // トースト通知用の関数
    const showSuccessToast = (moji) => {
      if (!proxy || !proxy.$toast) {
        console.error("Toast instance is undefined. Ensure VueToast is properly registered.");
        return;
      }
      proxy.$toast.open({
        message: moji,
        type: "success",
        duration: 1000,
        position: "top",
      });
    };

    const isIOS = computed(() => {
      return /iPhone|iPad|iPod/.test(navigator.userAgent);
    });

    // Androidデバイスかどうかを判定
    const isAndroid = computed(() => {
      return /Android/i.test(navigator.userAgent);
    });

    const loginWithNFC = async (nfchasu) => {
      ShareStore.$patch({ isLoading: true });

      try {
        if (ShareStore.LoginData) {
          showSuccessToast('NFCログインに成功しました。');
        } else {
          showSuccessToast('NFCログインに失敗しました。');
        }
      } catch (error) {
        console.error('NFCログインエラー:', error);
      } finally {
        ShareStore.$patch({ isLoading: false });
        window.location.replace(import.meta.env.VITE_API_HOME);
      }
    };

    // URLからパラメータを取得してNFCログインを実行
    const checkNfcLogin = async () => {
      if(isAndroid.value || isIOS.value) {
        const urlParams = new URLSearchParams(window.location.search);
        const nfchasu = urlParams.get('nfchasu');
        
        if (nfchasu) {
          showSuccessToast('NFCログインを実行します: ' + nfchasu);
          await loginWithNFC(nfchasu);
        }
      }
    };

    // 現在のルートが sidebar コンポーネントを持っているか判定する computed プロパティ
    const hasSidebar = computed(() => {
      return route.matched.some(
        (record) => record.components && record.components.sidebar
      );
    });

    onMounted(async () => {
      await checkNfcLogin();
    });

    return {
      isLoading,
      userList,
      staffList,
      ShareStore,
      hasSidebar,
      isSidebarOpen,
      toggleSidebar
    };
  },
};
</script>

<style>
/* 印刷時のスタイルなどはそのまま */
@media print {
  .screen-only {
    display: none !important;
  }
  router-view {
    padding-top: 5mm;
    width: 210mm;
    height: 297mm;
  }
  .px-4 {
    padding: 0px !important;
  }
  .p-3 {
    padding: 0px !important;
  }
}

/* ローディングオーバーレイのスタイル */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.spinner {
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #4CAF50;
  width: 80px;
  height: 80px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
