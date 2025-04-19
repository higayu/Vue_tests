<template>
  <div class="min-h-screen bg-gray-100 text-gray-900">

    <!-- メインコンテンツ -->
    <div class="container mx-auto p-6">
      <h2 class="text-[1.9rem] font-semibold text-center my-6">メモ管理</h2>

      <!-- メモ管理エリア -->
      <div class="mt-8">
        <MemoManager />
      </div>
    </div>
  </div>
  </template>
  
<script>
import { ref, reactive, onMounted, watch, onBeforeUnmount, toRefs, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useShareStore } from "../stores/useShareData.js";
import { getTodayYYYYMMDD } from "../utils/timeUtils.js";
import { db } from '../firebase_settings/index.js';
import { collection, getDocs, query, where } from "firebase/firestore";
import MemoManager from '../pages/MemoManager.vue';
 
  export default {
    components: {
      MemoManager
    },
    setup() {
      const router = useRouter();
      const route = useRoute();
      const ShareStore = useShareStore();

      // データを取得する関数
      const fetchData = async () => {
        try {
          ShareStore.$patch({ isLoading: true });
          const today_moji = getTodayYYYYMMDD();
          console.log("今日の日付:", today_moji);
          ShareStore.setHeaderTitle('メモ管理');
          
          // 現在のユーザー情報を保存
          const currentUser = ShareStore.selected_user;
          
          // Firebaseからデータを取得
          const usersRef = collection(db, "users");
          const q = query(usersRef, where("schedule_date", "==", today_moji));
          const querySnapshot = await getDocs(q);
          
          const userSchedule = querySnapshot.docs.map(doc => ({
            user_id: doc.id,
            ...doc.data()
          }));
          
          // ストアにデータを保存
          ShareStore.$patch({ userSchedule });
          
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
          ShareStore.$patch({ isLoading: false });
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
  