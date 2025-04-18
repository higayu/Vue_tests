<template>
    <div class="min-h-screen bg-gray-100 text-gray-900">

      <!-- メインコンテンツ -->
      <div class="container mx-auto p-6">
        <h2 class="text-[1.9rem] font-semibold text-center my-6">本日の利用予定者</h2>
  
        <!-- 利用者ボタングリッド -->
        <div class="grid grid-cols-2 gap-4">
          <div
            v-for="user in ShareStore.userSchedule"
            :key="user.user_id"
            class="bg-white border-2 border-gray-300 rounded-lg p-8 text-center text-lg font-medium shadow hover:bg-gray-200 transition cursor-pointer"
            @click="handleClick(user)"
          >
            <div class="text-[2.5rem] text-left">{{ user.name }}</div>
            <!-- <div class="mt-4 text-[1.5rem] text-gray-600">
              <span v-for="(schedule, index) in user.schedules" :key="schedule.id" class="mr-2">
                {{ schedule.schedule_name }}{{ index < user.schedules.length - 1 ? ',' : '' }}
              </span>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </template>
  
<script>
  import { ref, reactive, onMounted, watch, onBeforeUnmount, toRefs, computed } from 'vue';
  import { useRoute, useRouter } from 'vue-router'; // useRoute と useRouter のインポート
  import { useShareStore } from "../stores/useShareData.js"; // Piniaストアをインポート
  import { getTodayYYYYMMDD } from "../utils/timeUtils.js"; // timeUtilsから関数をインポート
 
  export default {

    setup() {
      const router = useRouter();
      const route = useRoute();
      const ShareStore = useShareStore();
        // データを取得する関数
    const fetchData = async () => {
      try {
        ShareStore.$patch({ isLoading: true }); // ストアの状態を直接更新
        // timeUtilsから現在の日付を取得
        const today_moji = getTodayYYYYMMDD();
        console.log("今日の日付:", today_moji); // デバッグ用ログ
        ShareStore.setHeaderTitle('利用者選択');
        
        // 現在のユーザー情報を保存
        const currentUser = ShareStore.selected_user;
        
        // 日付を引数として渡す
        await ShareStore.getUserSchedule(today_moji); // アクションを呼び出してデータ取得
        //await ShareStore.getServiceStatusList();
        
        // ユーザー情報を復元
        if (currentUser) {
          await ShareStore.setSelectedUser(currentUser);
        }

        // Safariを検出してフラグを設定
        if (navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("Chrome")) {
          ShareStore.setIS_Safari(true);
        } else {
          ShareStore.setIS_Safari(false);
        }

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        ShareStore.$patch({ isLoading: false }); // ローディング状態の解除
      }
    };

    // mounted フックに代わる onMounted フック
    onMounted(async () => {
      await fetchData();
      //window.addEventListener('beforeunload', confirmReload);
    });

    const handleClick = async (user) => {
      try {
        console.log('🟢 handleClick開始:', user);
        ShareStore.$patch({ isLoading: true }); // ストアの状態を直接更新
        
        // 先にユーザー情報を更新
        console.log('🟢 ユーザー情報更新前:', ShareStore.selected_user);
        await ShareStore.setSelectedUser(user);
        console.log('🟢 ユーザー情報更新後:', ShareStore.selected_user);
        
        await ShareStore.setHeaderTitle(user.name + ' 様');
        console.log('🟢 ヘッダータイトル更新後:', user.name + ' 様');

        // ユーザー情報の更新が完了してからルーティング
        console.log('🟢 遷移開始:', '/nitijo/' + user.user_id);
        await router.push({
          name: 'Nitijo',
          params: { id: user.user_id }
        });
        console.log('🟢 遷移完了');
      } catch (error) {
        console.error('❌ エラー発生:', error);
      } finally {
        ShareStore.$patch({ isLoading: false }); // ストアの状態を直接更新
        console.log('🟢 handleClick終了');
      }
    };

    return {
      ShareStore, // ストア全体を返す
      handleClick,
    };
  },

  };
</script>
  
  <style scoped>
  /* スタイルは Tailwind CSS を使用するため、追加のスタイルは不要 */
  </style>
  