<template>
    <div>

      <!-- ボタンコンテナ -->
      <div class="flex flex-col items-center gap-6 mt-12">
        <div
          v-if="showSougeiButton"
          class="bg-[#28a745] text-white text-8xl text-center py-16 px-32 rounded-lg cursor-pointer flex flex-col items-center justify-center mx-8 my-8"
          :class="{ 'grayscale': ShareStore.is_select_fac_or_vis === 'visit' }"
          @click="openModal('送迎')"
        >
          <img src="/icon/sougei.png" alt="送迎" class="w-64 h-64 mb-12" />
          送迎
        </div>

        <div
          v-if="showHoumonButton"
          class="bg-[rgb(221,98,23)] text-white text-8xl text-center py-16 px-32 rounded-lg cursor-pointer flex flex-col items-center justify-center mx-8 my-8"
          :class="{ 'grayscale': ShareStore.is_select_fac_or_vis === 'fac' }"
          @click="openModal('訪問')"
        >
          <img src="/icon/houmon.png" alt="訪問" class="w-64 h-64 mb-12" />
          訪問
        </div>
      </div>
  
      <!-- 確認モーダル -->
      <Modal v-if="showModal" @close="closeModal">
        <template #header>
          <h2>確認</h2>
        </template>
        <template #body>
          <p>{{ modalMessage }}</p>
        </template>
        <template #footer>
          <button class="modal-btn yes-btn" @click="confirmAction">はい</button>
          <button class="modal-btn no-btn" @click="closeModal">いいえ</button>
        </template>
      </Modal>
  
      <!-- トーストメッセージ -->
      <ToastMessage v-if="showToast" :message="toastMessage" />
    </div>
</template>
  
<script>
import { ref, computed, onMounted, watch,getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
import { useModaldataStore } from "../stores/Modaldata.js";
import { useShareStore } from "../stores/useShareData.js"; // ShareStoreをインポート
import ToastMessage from "@/Modals/ToastMessage.vue"; // トーストメッセージ
import Sougei from '@/components/Sougei.vue';
import Houmon from '@/components/Houmon.vue';
import { getTodayYYYYMMDD, getCurrentTimeJP, combineDateTime } from "../utils/timeUtils.js"; // timeUtilsから関数をインポート

export default {

  components: { 
    ToastMessage,
    Sougei,
    Houmon
  },
  props: {
    btn_type: {
      type: String,
      required: true
    },
    id: {
      type: [String, Number],
      required: true
    }
  },
  setup(props) {
    console.log("ボタンタイプ:", props.btn_type); // 受け取ったボタンタイプをログ出力
    const router = useRouter();
    const ShareStore = useShareStore(); // ShareStoreを初期化
    const showModal = ref(false);
    const modalMessage = ref("");
    const selectedType = ref("");
    const showToast = ref(false);
    const toastMessage = ref("");
    const ModaldataStore = useModaldataStore();

    const today_moji = getTodayYYYYMMDD();

    // 表示するボタンを計算
    const showSougeiButton = computed(() => props.btn_type === 'sougei');
    const showHoumonButton = computed(() => props.btn_type === 'houmon');

    // ShareStoreの状態変更を監視
    watch(
      [() => ShareStore.selected_user, () => ShareStore.selected_Service_Status],
      async ([newUser, newStatus]) => {
        console.log('ShareStore state changed:', { 
          selected_user: newUser, 
          service_status: newStatus 
        });

        if (newUser && newStatus) {
          if (newStatus === 'fac') {
            console.log("🟢 送迎で利用を開始します🔥");
            router.push('/sougei');
          } else if (newStatus === 'vis') {
            console.log("🟢 訪問で利用を開始します🔥");
            router.push('/houmon');
          }
        } else if (!newUser) {
          router.push('/');
        }
      },
      { immediate: true }
    );

    const openModal = (type) => {
      selectedType.value = type;
      modalMessage.value = type === "送迎" ? "送迎で利用を開始しますか？" : "訪問で利用を開始しますか？";
      showModal.value = true;
    };

    const closeModal = () => {
      showModal.value = false;
    };

    const confirmAction = async () => {
      showModal.value = false;
      showToast.value = true;
      toastMessage.value = "本日の利用を開始しました";
      
      // 整数型として明示的に設定
      const item_id = selectedType.value === "送迎" ? 1 : 3;
      
      // 現在の日付と時刻を取得
      const today = getTodayYYYYMMDD();
      const currentTime = getCurrentTimeJP();
      
      // 日付と時刻を結合してDATETIME形式に
      const formattedTime = combineDateTime(today, currentTime);
      console.log("フォーマットされた時刻:", formattedTime);
      console.log("送信するitem_id:", item_id, "型:", typeof item_id);
      // ローディング画面を表示
      ShareStore.$patch({ isLoading: true }); // ストアの状態を直接更新
      try {
        // ShareStoreのInsert_Serviceメソッドを呼び出し
        const result = await ShareStore.select_InputService({
          user_id: Number(props.id), // 確実に数値型に変換
          item_id: Number(item_id), // 確実に数値型に変換
          served_time: formattedTime,
          note: "テスト", // メモ
          schedule_id: null, // スケジュールID
          recorded_staff_id: 1 // 記録者ID
        });
        
        
        setTimeout(() => {
          showToast.value = false;
          router.push(selectedType.value === "訪問" ? "/houmon" : "/sougei");
        }, 2000);
      } catch (error) {
        console.error("サービス追加エラー:", error);
        showToast.value = true;
        toastMessage.value = "エラーが発生しました: " + (error.message || "不明なエラー");
        
        setTimeout(() => {
          showToast.value = false;
        }, 3000);
      } finally {
        ShareStore.$patch({ isLoading: false }); // ストアの状態を直接更新
      }
    };


    return {
      ShareStore,
      showModal,
      modalMessage,
      showToast,
      toastMessage,
      openModal,
      closeModal,
      confirmAction,
      ModaldataStore,
      showSougeiButton,
      showHoumonButton,
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
  
  /* モーダルボタンのスタイル */
  .modal-btn {
    padding: 8px 16px;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    font-weight: bold;
    margin: 0 5px;
  }
  
  .yes-btn {
    background-color: #28a745;
    color: white;
  }
  
  .no-btn {
    background-color: #dc3545;
    color: white;
  }
  
  /* ホバー効果 */
  .yes-btn:hover {
    background-color: #218838;
  }
  
  .no-btn:hover {
    background-color: #c82333;
  }
  </style>
  