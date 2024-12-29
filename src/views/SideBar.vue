<template>
    <aside class="w-1/4 pr-8">

      <!-- リストの表示範囲を制限してスクロール可能にする -->
      <ul class="space-y-2 bg-white shadow-md rounded-md overflow-hidden custom-scrollbar" style="max-height: 65vh; overflow-y: auto;">
        <li class="border-b border-gray-200 last:border-b-0 flex items-center">
          リスト
        </li>
      </ul>
  

    </aside>
  </template>
  
  <script>
  import { ref, reactive, computed, watch, onMounted, toRefs } from 'vue';
  import { useRouter } from 'vue-router'; // useRouterをインポート
  
  export default {
    name: "SideBar",
  
    components: {

        },
  
    setup(props, { emit }) {
      const envmoji = import.meta.env.VITE_API_URL;
  
      return {
        envmoji,
      };
    },
  };
  </script>
  <style>
  /* カスタムスクロールバー */

  </style>