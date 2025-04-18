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
            <!-- サイドバー -->
            <aside class="w-1/4 max-w-[280px]">
              <router-view name="sidebar"></router-view>
            </aside>
            <!-- メインコンテンツ -->
            <main class="w-3/4">
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

    // getCurrentInstanceの設定
    const { proxy } = getCurrentInstance();

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
