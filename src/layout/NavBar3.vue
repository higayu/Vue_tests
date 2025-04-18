<template>
  <nav class="flex justify-around bg-sky-800">
    <router-link
      v-for="item in navItems"
      :key="item.path"
      :to="item.path"
      class="flex items-center justify-center gap-1 sm:gap-2 text-white text-center py-1 sm:py-2 w-full hover:bg-sky-500"
      :class="{ 'bg-green-600': isActive(item.path) }"
    >
      <svg class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" :d="item.icon" />
      </svg>
      <span class="text-xs sm:text-sm md:text-base lg:text-xl xl:text-2xl">{{ item.label }}</span>
    </router-link>
  </nav>
</template>

<script>
import { ref, onMounted, watch, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useShareStore } from "../stores/useShareData.js";

export default {
  name: "NavBar3",
  setup() {
    const route = useRoute();
    const ShareStore = useShareStore();

    // アイコンデータを先に定義
    const icon_data = {
      nitijyo: "M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3",
      riyousya: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
    };

    // その後で動的なナビゲーション項目を定義
    const dynamicNavItem = ref({
      label: '利用予定スケジュール',
      path: '/touroku',
      icon: icon_data.riyousya
    });


    // computed propertyを使用してnavItemsを生成
    const navItems = computed(() => [
      dynamicNavItem.value,
      {
        label: "個人記録",
        path: "/kiroku",
        icon: "M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z"
      },
      {
        label: "管理日誌",
        path: "/nissi",
        icon: "M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25"
      }
    ]);

    // ShareStoreの状態変更を監視
    watch(
      () => ShareStore.selected_user,
      async (newUser) => {
        console.log('ShareStore selected_user changed:', newUser);

        if (newUser) {
          dynamicNavItem.value = {
            label: '日常記録',
            path: '/nitijo/' + newUser.user_id,
            icon: icon_data.nitijyo
          };
        } else {
          dynamicNavItem.value = {
            label: '利用予定',
            path: '/touroku',
            icon: icon_data.riyousya
          };
        }
      },
      { immediate: false } // コンポーネントのマウント時に即時実行しない
    );

    // 初期状態を設定
    onMounted(() => {
      if (ShareStore.selected_user) {
        dynamicNavItem.value = {
          label: '日常記録',
          path: '/nitijo/' + ShareStore.selected_user.user_id,
          icon: icon_data.nitijyo
        };
      } else {
        dynamicNavItem.value = {
          label: '利用予定',
          path: '/touroku',
          icon: icon_data.riyousya
        };
      }
    });

    const isActive = (path) => route.path === path;

    return { 
      navItems,
      isActive,
      ShareStore
    };
  }
};
</script>

<style scoped>
/* 現在のページに適用するスタイル */
.router-link-active {
  background-color: #16a34a;
}
</style>
