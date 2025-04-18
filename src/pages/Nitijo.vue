<template>
  <div>
    <!-- ボタンコンテナ -->
    <div class="flex flex-col gap-4">
      <div v-if="ShareStore.is_select_fac_or_vis !== 'visit'">
        <Sougei />
      </div>
      <div v-if="ShareStore.is_select_fac_or_vis !== 'fac'">
        <Houmon />
      </div>
    </div>

    <!-- トーストメッセージ -->
    <ToastMessage v-if="showToast" :message="toastMessage" />
  </div>
</template>

<script>
import { ref, computed, onMounted, watch, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
import { useModaldataStore } from "../stores/Modaldata.js";
import { useShareStore } from "../stores/useShareData.js";
import ToastMessage from "@/Modals/ToastMessage.vue";
import Sougei from '@/components/Sougei.vue';
import Houmon from '@/components/Houmon.vue';
import SelectScreen from '@/components/SelectScreen.vue';
import { getTodayYYYYMMDD, getCurrentTimeJP, combineDateTime } from "../utils/timeUtils.js";

export default {
  components: { 
    ToastMessage,
    Sougei,
    Houmon,
    SelectScreen
  },
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  setup(props) {
    console.log("🟢 Nitijoコンポーネントマウント開始");
    console.log("ユーザーID:", props.id);
    const router = useRouter();
    const ShareStore = useShareStore();
    const showToast = ref(false);
    const toastMessage = ref("");
    const ModaldataStore = useModaldataStore();

    const today_moji = getTodayYYYYMMDD();

    // サービスステータスを安全に取得するcomputedプロパティ
    const serviceStatus = computed(() => {
      console.log("🟢 serviceStatus", ShareStore.selected_Service_Status);
      if (!ShareStore.selected_Service_Status || !ShareStore.selected_Service_Status[props.id]) {
        return {
          fac: { status: 'not_start' },
          vis: { status: 'not_start' }
        };
      }
      return ShareStore.selected_Service_Status[props.id];
    });

    // コンポーネントマウント時の処理
    onMounted(() => {
      console.log("🟢 Nitijoコンポーネントマウント完了");
      console.log("現在のユーザー:", ShareStore.selected_user);
    });

    // ユーザー情報の変更を監視
    watch(() => ShareStore.selected_user, (newUser, oldUser) => {
      console.log("🟡 ユーザー情報が変更されました:", {
        newUser,
        oldUser,
        currentPath: router.currentRoute.value.path
      });
    });

    const confirmAction = async () => {
      showToast.value = true;
      toastMessage.value = "本日の利用を開始しました";
      
      // 整数型として明示的に設定
      const item_id = 3; // 訪問サービスをデフォルトに設定
      
      // 現在の日付と時刻を取得
      const today = getTodayYYYYMMDD();
      const currentTime = getCurrentTimeJP();
      
      // 日付と時刻を結合してDATETIME形式に
      const formattedTime = combineDateTime(today, currentTime);
      console.log("フォーマットされた時刻:", formattedTime);
      console.log("送信するitem_id:", item_id, "型:", typeof item_id);
      
      ShareStore.$patch({ isLoading: true });
      try {
        const result = await ShareStore.select_InputService({
          user_id: Number(props.id),
          item_id: Number(item_id),
          served_time: formattedTime,
          note: "テスト",
          schedule_id: null,
          recorded_staff_id: 1
        });
        
        setTimeout(() => {
          showToast.value = false;
          router.push("/houmon");
        }, 2000);
      } catch (error) {
        console.error("サービス追加エラー:", error);
        showToast.value = true;
        toastMessage.value = "エラーが発生しました: " + (error.message || "不明なエラー");
        
        setTimeout(() => {
          showToast.value = false;
        }, 3000);
      } finally {
        ShareStore.$patch({ isLoading: false });
      }
    };

    return {
      ShareStore,
      showToast,
      toastMessage,
      confirmAction,
      ModaldataStore,
      props,
      serviceStatus
    };
  },
};
</script>

<style scoped>
/* 基本スタイル */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
  color: #333;
  line-height: 1.5;
}
.header {
  background-color: #004080;
  color: #fff;
  text-align: center;
  padding: 15px 0;
  width: 100%;
}
.header-links {
  position: absolute;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 15px 15px;
}
.header-links .btn {
  color: #fff;
  text-decoration: none;
  background-color: #28a745;
  padding: 5px 10px;
  border-radius: 4px;
}
.header-links .btn-danger {
  background-color: #dc3545;
}
.nav {
  display: flex;
  justify-content: space-around;
  background-color: #0066cc;
}
.nav-item {
  color: #fff;
  text-decoration: none;
  font-size: 14px;
  text-align: center;
  padding: 10px 0;
  width: 100%;
}
.button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
}
.select-btn {
  background-color: #28a745;
  color: #fff;
  font-size: 50px;
  padding: 15vw 25vw;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
  transition: background-color 0.3s;
}
.select-btn:hover {
  background-color: #218838;
}
.btn-secondary {
  background-color: #da8c17;
}
.btn-secondary:hover {
  background-color: #a3660a;
}
</style>
