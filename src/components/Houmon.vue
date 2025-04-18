<template>
  <div class="p-4">
    <div class="grid grid-cols-2 gap-4">

      <div
        class="bg-[rgb(221,98,23)] text-white text-4xl text-center py-3 rounded-lg cursor-pointer flex flex-col items-center justify-center"
        :class="{ 'grayscale': ShareStore.is_select_fac_or_vis === 'fac' }"
        @click="openModal('modal-houmon')"
      >
        <img src="/icon/houmon.png" alt="訪問" class="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 mb-2 sm:mb-3 md:mb-4" />
        訪問開始
      </div>
      <div
        class="bg-[rgb(221,98,23)] text-white text-4xl text-center py-3 rounded-lg cursor-pointer flex flex-col items-center justify-center"
        @click="openModal('modal-vital')"
      >
        <img src="/icon/vital.png" alt="バイタル" class="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 mb-2 sm:mb-3 md:mb-4" />
        バイタル
      </div>
      <div
        class="bg-[rgb(221,98,23)] text-white text-4xl text-center py-3 rounded-lg cursor-pointer flex flex-col items-center justify-center"
        @click="openModal('modal-physicalCare')"
      >
        <img src="/icon/shintaikaigo.png" alt="身体介護" class="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 mb-2 sm:mb-3 md:mb-4" />
        身体介護
      </div>
      <div
        class="bg-[rgb(221,98,23)] text-white text-4xl text-center py-3 rounded-lg cursor-pointer flex flex-col items-center justify-center"
        @click="openModal('modal-lifeSupport')"
      >
        <img src="/icon/seikatsuengo.png" alt="生活援助" class="w-32 h-32 mb-4" />
        生活援助
      </div>
      <div
        class="bg-[rgb(221,98,23)] text-white text-4xl text-center py-3 rounded-lg cursor-pointer flex flex-col items-center justify-center"
        @click="openModal('modal-note')"
      >
        <img src="/icon/bikou.png" alt="備考" class="w-32 h-32 mb-4" />
        備考
      </div>
      <div
        class="bg-[rgb(221,98,23)] text-white text-4xl text-center py-3 rounded-lg cursor-pointer flex flex-col items-center justify-center"
        @click="openModal('modal-specialChange')"
      >
        <img src="/icon/tokuhen.png" alt="特変記録" class="w-32 h-32 mb-4" />
        特変記録
      </div>
      <div
        class="bg-gray-700 text-white text-4xl text-center py-3 rounded-lg cursor-pointer flex flex-col items-center justify-center"
        @click="openModal('modal-visitComplete')"
      >
        <img src="/icon/kanryou.png" alt="訪問完了" class="w-32 h-32 mb-4" />
        訪問完了
      </div>
    </div>

    <!-- モーダルコンポーネントの部分を修正 -->
    <component 
      v-if="activeModal"
      :is="modalComponent"
      :modalId="activeModal"
      :serviceType="getServiceType(activeModal)"
      :userId="ShareStore.selected_user?.user_id"
      :targetDate="ShareStore.selected_user?.service_time"
      :userName="ShareStore.selected_user?.name"
      :editData="HoumonStore.Note_Data"
      @close="closeModal"
      @confirm="handleConfirm"
      @end="endMethod"
    />

    <!-- バイタルモーダル -->
    <VitalModal
      v-if="showVitalModal"
      :modalId="'modal-vital'"
      :userId="ShareStore.selected_user?.user_id"
      :targetDate="ShareStore.selected_user?.service_time"
      :userName="ShareStore.selected_user?.name"
      :service_status="'vis'"
      @close="closeModal"
      @confirm="handleConfirm"
      @end="endMethod"
    />
  </div>
</template>

<script>
import { ref, computed,getCurrentInstance, watch, onMounted } from "vue";
import { useRouter } from 'vue-router';
import VitalModal from "@/Modals/VitalModal.vue";
import PhysicalCareModal from "@/Modals/PhysicalCareModal.vue";
import LifeSupportModal from "@/Modals/LifeSupportModal.vue";
import NoteModal from "@/Modals/NoteModal.vue";
import SpecialChangeModal from "@/Modals/SpecialChangeModal.vue";
import CompleteModal from "@/Modals/CompleteModal.vue";
import { useHoumonStore } from "../stores/Houmon.js";
import { useShareStore } from "../stores/useShareData.js";

export default {
  components: {
    VitalModal,
    PhysicalCareModal,
    LifeSupportModal,
    NoteModal,
    SpecialChangeModal,
    CompleteModal
  },

  props: {
    userName: {
      type: String,
      default: ""
    }
  },

  setup(props) {
    const activeModal = ref(null);
    const showVitalModal = ref(false);
    const HoumonStore = useHoumonStore();
    const ShareStore = useShareStore();
    const router = useRouter();

    

    const openModal = (modalId) => {
      console.log("訪問");
      if (modalId === 'modal-vital') {
        // 値の検証
        const userData = {
          userId: ShareStore.selected_user?.user_id,
          targetDate: ShareStore.selected_user?.service_time,
          userName: ShareStore.selected_user?.name,
          serviceStatus: ShareStore.selected_Service_Status
        };

        console.log("バイタルモーダルに渡す値:", userData);

        // 必須値のチェック
        if (!userData.userId || !userData.targetDate || !userData.userName || !userData.serviceStatus) {
          console.error("必要な値が不足しています:", userData);
          showSuccessToast("ユーザー情報が不完全です");
          return;
        }

        // 値の型チェック
        if (typeof userData.userId !== 'number') {
          console.error("userIdが数値ではありません:", userData.userId);
          return;
        }

        if (userData.userId <= 0) {
          console.error("無効なuserIdです:", userData.userId);
          return;
        }

        showVitalModal.value = true;
      } else {
        activeModal.value = modalId;
      }
    };

    const closeModal = () => {
      showVitalModal.value = false;
      activeModal.value = null;
    };

    const handleConfirm = () => {
      showVitalModal.value = false;
      activeModal.value = null;
    };

    const endMethod = async () => {
      activeModal.value = null;
      // console.log('訪問完了');
      // await ShareStore.setSelectedUser_Clear();
    };

    const modalComponent = computed(() => {
      switch (activeModal.value) {
        case 'modal-vital':
          return 'VitalModal';
        case 'modal-physicalCare':
          return 'PhysicalCareModal';
        case 'modal-lifeSupport':
          return 'LifeSupportModal';
        case 'modal-note':
          return 'NoteModal';
        case 'modal-specialChange':
          return 'SpecialChangeModal';
        case 'modal-visitComplete':
        case 'modal-houmon':
          return 'CompleteModal';
        default:
          return null;
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

    const closeVitalModal = () => {
      activeModal.value = null;
    };

    // サービスタイプを取得する関数を追加
    const getServiceType = (modalId) => {
      switch (modalId) {
        case 'modal-houmon': return 'houmon_start';
        case 'modal-visitComplete': return 'houmon_end';
        default: return '';
      }
    };

    return {
      showSuccessToast,
      activeModal,
      modalComponent,
      openModal,
      closeModal,
      endMethod,
      ShareStore,
      HoumonStore,
      showVitalModal,
      closeVitalModal,
      handleConfirm,
      getServiceType
    };
  },
};
</script>
