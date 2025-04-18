<template>
  <div class="p-4">
    <div class="grid grid-cols-2 gap-4">

      <div
        class="bg-[#28a745] text-white text-4xl text-center py-3 rounded-lg cursor-pointer flex flex-col items-center justify-center"
        @click="openModal('modal-sougei')"
      >
        <img src="/icon/sougei.png" alt="送迎" class="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 mb-2 sm:mb-3 md:mb-4" />
        送迎開始
      </div>

      <div
        class="bg-[#28a745] text-white text-4xl text-center py-3 rounded-lg cursor-pointer flex flex-col items-center justify-center"
        @click="openModal('modal-vital')"
      >
        <img src="/icon/vital.png" alt="バイタル" class="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 mb-2 sm:mb-3 md:mb-4" />
        バイタル
      </div>


      <div
        class="bg-[#28a745] text-white text-4xl text-center py-3 rounded-lg cursor-pointer flex flex-col items-center justify-center"
        @click="openModal('modal-excretion')"
      >
        <img src="/icon/haisetsu.png" alt="排泄" class="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 mb-2 sm:mb-3 md:mb-4" />
        排泄
      </div>
      <div
        class="bg-[#28a745] text-white text-4xl text-center py-3 rounded-lg cursor-pointer flex flex-col items-center justify-center"
        @click="openModal('modal-meal')"
      >
        <img src="/icon/shokuji.png" alt="食事" class="w-32 h-32 mb-4" />
        食事
      </div>
      <div
        class="bg-[#28a745] text-white text-4xl text-center py-3 rounded-lg cursor-pointer flex flex-col items-center justify-center"
        @click="openModal('modal-bathing')"
      >
        <img src="/icon/nyuyoku.png" alt="入浴" class="w-32 h-32 mb-4" />
        入浴
      </div>
      <div
        class="bg-[#28a745] text-white text-4xl text-center py-3 rounded-lg cursor-pointer flex flex-col items-center justify-center"
        @click="openModal('modal-recreation')"
      >
        <img src="/icon/recreation.png" alt="レクリエーション" class="w-32 h-32 mb-4" />
        レク
      </div>
      <div
        class="bg-[#28a745] text-white text-4xl text-center py-3 rounded-lg cursor-pointer flex flex-col items-center justify-center"
        @click="openModal('modal-nightPatrol')"
      >
        <img src="/icon/yakanjyunshi.png" alt="夜間巡視" class="w-32 h-32 mb-4" />
        夜間巡視
      </div>

      <!-- <div
        class="bg-[#28a745] text-white text-4xl text-center py-3 rounded-lg cursor-pointer flex flex-col items-center justify-center"
        @click="openModal('modal-specialNote')"
      >
        <img src="/icon/tokki.png" alt="特記" class="w-32 h-32 mb-4" />
        特記
      </div> -->

      <div
        class="bg-gray-800 text-white text-4xl text-center py-3 rounded-lg cursor-pointer flex flex-col items-center justify-center"
        @click="openModal('modal-complete')"
      >
        <img src="/icon/kanryou.png" alt="送迎完了" class="w-32 h-32 mb-4" />
        送迎完了
      </div>

      
    </div>

    <!-- モーダルコンポーネント -->
    <div v-if="activeModal" class="modal-content fixed inset-0 z-50">
      <div class="min-h-screen flex items-center justify-center">
        <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>
        <div class="flex-1 overflow-y-auto p-5">
            <component 
              :is="modalComponent" 
              :modalId="activeModal" 
              :userName="ShareStore.selected_user.name"
              :isOpen="true"
              :userId="ShareStore.selected_user.user_id"
              :targetDate="ShareStore.selected_user.service_time"
              :serviceType="getServiceType(activeModal)"
              :service_status="'fac'"
              @close="closeModal" 
              @confirm="confirm"
              @end="endMethod"
            />
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch,getCurrentInstance } from "vue";
import { useRouter } from 'vue-router';
import VitalModal from "@/Modals/VitalModal.vue"; // バイタル
import ExcretionModal from "@/Modals/ExcretionModal.vue"; // 排泄記録
import MealModal from "@/Modals/MealModal.vue"; // 食事記録
import BathingModal from "@/Modals/BathingModal.vue"; // 入浴
import RecreationModal from "@/Modals/RecreationModal.vue"; // レクリエーション
import NightPatrolModal from "@/Modals/NightPatrolModal.vue"; // 夜間巡視
import SpecialNoteModal from "@/Modals/SpecialNoteModal.vue"; // 特記
import CompleteModal from "@/Modals/CompleteModal.vue"; // 送迎完了
import KeypadModal from "@/Modals/KeypadModal.vue"; // テンキー入力
import { useShareStore } from "../stores/useShareData.js"; 
import { useModaldataStore } from "../stores/Modaldata.js";

export default {
  props: {
    userName: {
      type: String,
      default: ""
    }
  },
  setup(props) {
    const activeModal = ref(null);
    const ShareStore = useShareStore();
    const ModaldataStore = useModaldataStore();
    const router = useRouter();

    const openModal = (modalId) => {
      console.log("送迎");
      activeModal.value = modalId;
    };

    const closeModal = () => {
      activeModal.value = null;
    };

    const confirm = () => {
      activeModal.value = null;
    };

    const endMethod = async () => {
      activeModal.value = null;
      // console.log('送迎完了');
      // await ShareStore.setSelectedUser_Clear();
      // await router.push('/');
    };

    // modalId に応じて表示するコンポーネントを動的に選択
    const modalComponent = computed(() => {
      switch (activeModal.value) {
        case "modal-vital":
          return VitalModal;
        case "modal-excretion":
          return ExcretionModal;
        case "modal-meal":
          console.log("食事モーダル起動 - ユーザーID:", ShareStore.selected_user.user_id, "日付:", ShareStore.selected_user.service_time);
          return MealModal;
        case "modal-bathing":
          return BathingModal;
        case "modal-recreation":
          return RecreationModal;
        case "modal-nightPatrol":
          return NightPatrolModal;
        case "modal-specialNote":
          return SpecialNoteModal;
        case "modal-keypad":
          return KeypadModal;
        case "modal-complete":
        case "modal-sougei":
          return CompleteModal;
        default:
          return null;
      }
    });

    // modalTitleを追加
    const modalTitle = computed(() => {
      switch (activeModal.value) {
        case "modal-vital": return "バイタル";
        case "modal-excretion": return "排泄記録";
        case "modal-meal": return "食事記録";
        case "modal-bathing": return "入浴記録";
        case "modal-recreation": return "レクリエーション";
        case "modal-nightPatrol": return "夜間巡視";
        case "modal-specialNote": return "特記";
        case "modal-complete": return "送迎完了";
        default: return "";
      }
    });

    const { proxy } = getCurrentInstance();

    const showSuccessToast = (moji) => {
      if (!proxy || !proxy.$toast) {
        console.error("Toast instance is undefined. Ensure VueToast is properly registered.");
        return;
      }
      proxy.$toast.open({
        message: moji,
        type: "success", // カスタムスタイルを指定
        duration: 1000,
        position: "top", // トーストを画面左下に表示
      });
    };

    // サービスタイプを取得する関数を追加
    const getServiceType = (modalId) => {
      switch (modalId) {
        case 'modal-sougei': return 'sougei_start';
        case 'modal-complete': return 'sougei_end';
        default: return '';
      }
    };

    return {
      showSuccessToast,
      //-------------------//
      activeModal,
      modalComponent,
      openModal,
      closeModal,
      confirm,
      endMethod,
      ShareStore,
      ModaldataStore,
      modalTitle,
      getServiceType,
    };
  },
};
</script>
