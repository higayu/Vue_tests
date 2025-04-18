<template>
  <div class="w-full bg-gray-100 text-gray-800 pb-20">
    <!-- トースト通知用の要素 -->
    <div id="toast" class="toast"></div>
    
    <!-- メインコンテンツ -->
    <div class="w-full flex-1">
      <!-- メインコンテンツ -->
      <div class="p-4">
        <!-- アラート表示例 -->
         <div v-if="false">
            <AlertSection />
         </div>

         <div v-if="!selectedRecordStore.nowSelectedItem.user_name">
            <label>
              利用者を選択してください
            </label>
         </div>

        
        <!-- 日付・利用者名 -->
        <KirokuSection />

        <!-- 入浴 / 排便 / レクリエーション / 体重 -->
        <DailyActivitiesSection 
          v-model="printDataStore.InputData.DailyActivitiesSection"
          @confirm="handleModalSave"
        />
        
        <!-- ケアプラン内容 -->
        <CarePlanSection 
          v-model="printDataStore.InputData.care_plan"
          @confirm="handleModalSave"
        />
        
        <!-- バイタル測定 -->
        <VitalSignsSection 
          v-model="printDataStore.InputData.Vitals"
          @open-vital-modal="openModal('modal-vital')"
          @edit-vital-record="handleEditVitalRecord"
          @confirm="handleModalSave"
          :service_status="kiroku"
        />
        

        
        <!-- 食事摂取量 -->
        <MealIntakeSection 
          v-model="printDataStore.InputData.Meals"
          @open-meal-modal="handleOpenMealModal"
          @confirm="handleModalSave"
          :service_status="kiroku"
        />
        
      <!-- 職員・日勤者 / 夜勤者 -->
      <StaffSection
        :targetDate="selectedRecordStore.nowSelectedItem_Kanri.day_key"
        :selectedStaff="selectedRecordStore.nowSelectedItem_Kanri.staff"
        :isStaffAddEnabled="!!selectedRecordStore.nowSelectedItem_Kanri?.userList"
        :dayStaff="selectedRecordStore.staffList_Kojin.nikkin"
        :nightStaff="selectedRecordStore.staffList_Kojin.yakin"
        @staff-update="handleModalSave"
        @staff-delete="handleModalSave"
        :service_status="kiroku"
      />

        <!-- 特記事項 -->
        <SpecialNotesSection 
          v-model="printDataStore.InputData.tokkiList"
          @confirm="handleModalSave"
          :userId="selectedRecordStore.nowSelectedItem.user_id || null"
          :service_status="kiroku"
          :targetDate="selectedRecordStore.nowSelectedItem.day_key"
        />
        
        <!-- 記録欄 -->
        <RecordSection 
          v-model="printDataStore.InputData.kirokuList"
          @confirm="handleModalSave"
          :service_status="kiroku"
        />
        
        <!-- 排泄状況 -->
        <ExcretionStatusSection 
          v-model="printDataStore.InputData.DailyActivitiesSection.Haisetu.haisetuList"
          @open-excretion-status-modal="openModal('modal-excretionStatus')"
          @edit-excretion-record="handleEditExcretionRecord"
          @confirm="handleModalSave"
          :service_status="kiroku"
        />
      </div>
      
      <!-- 下部ボタン群 -->
      <!-- <BottomActionButtons /> -->
    </div>
    
    <!-- モーダルコンポーネント -->
    <div v-if="activeModal" class="modal-content fixed inset-0 z-50">
      <div class="min-h-screen flex items-center justify-center">
        <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>
        <div class="flex-1 overflow-y-auto p-5">
          <component 
            :is="modalComponent" 
            :modalId="activeModal" 
            :userId="selectedRecordStore.nowSelectedItem.user_id"
            :targetDate="selectedRecordStore.nowSelectedItem.day_key"
            :userName="selectedRecordStore.nowSelectedItem.user_name"
            :service_status="kiroku"
            :isOpen="true"
            @close="closeModal" 
            @confirm="handleModalSave"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { ref, computed, watch, onMounted } from "vue";
  import AlertSection from '@/components/AlertSection.vue';
  import KirokuSection from '@/components/KirokuSection.vue';
  import CarePlanSection from '@/components/CarePlanSection.vue';
  import VitalSignsSection from '@/components/VitalSignsSection.vue';
  import DailyActivitiesSection from '@/components/DailyActivitiesSection.vue';
  import MealIntakeSection from '@/components/MealIntakeSection.vue';
  import SpecialNotesSection from '@/components/SpecialNotesSection.vue';
  import RecordSection from '@/components/RecordSection.vue';
  import ExcretionStatusSection from '@/components/ExcretionStatusSection.vue';
  import BottomActionButtons from '@/components/BottomActionButtons.vue';
  
  // モーダルコンポーネント
  import VitalModal from '../Modals/VitalModal.vue';
  import BathingModal from '../Modals/BathingModal.vue';
  import ExcretionModal from '../Modals/ExcretionModal.vue';
  import RecreationModal from '../Modals/RecreationModal.vue';
  import WeightModal from '../Modals/WeightModal.vue';
  import SpecialNoteModal from '../Modals/SpecialNoteModal.vue';
  import MealModal from '../Modals/MealModal.vue';
  import ExcretionStatusModal from '../Modals/ExcretionModal.vue';

  import DeleteStaffModal from '../Modals/DeleteStaffModal.vue';
  import StaffSection from '@/components/StaffSection.vue';
  
  import { usePrintDataStore } from '../stores/printData';
  import { useSelectedRecordStore } from '../stores/selectedRecord';
  import { useShareStore } from '../stores/useShareData';
  import { getTodayYYYYMMDD } from "../utils/timeUtils.js"; // timeUtilsから関数をインポート

  export default {
    name: 'KirokuPage',
    components: {
      AlertSection,
      KirokuSection,
      CarePlanSection,
      VitalSignsSection,
      DailyActivitiesSection,
      MealIntakeSection,
      SpecialNotesSection,
      RecordSection,
      ExcretionStatusSection,
      BottomActionButtons,
      VitalModal,
      BathingModal,
      ExcretionModal,
      RecreationModal,
      WeightModal,
      MealModal,
      SpecialNoteModal,
      ExcretionStatusModal,
      StaffSection,
      DeleteStaffModal
    },

    setup() {
      const printDataStore = usePrintDataStore();
      const selectedRecordStore = useSelectedRecordStore();
      const ShareStore = useShareStore();

      const selectedUserId = ref(null);
      const selectedUserName = ref('');
      const selectedDate = ref(getTodayYYYYMMDD());
      
      // アクティブなモーダルを管理（デフォルトはnull=非表示）
      const activeModal = ref(null);
      
      // 現在編集中のレコードを保存
      const currentEditRecord = ref(null);

      const kiroku = ref('kiroku');


      // データが変更されたときにストアに保存する処理
      watch(printDataStore.InputData, (newList) => {
        console.log('printDataStore.InputData',printDataStore.InputData);
      }, { deep: true });

      // モーダルコンポーネントの計算プロパティを修正
      const modalComponent = computed(() => {
        switch (activeModal.value) {
          case "modal-vital":
            return VitalModal;
          case "modal-bathing":
            return BathingModal;
          case "modal-excretion":
            return ExcretionModal;
          case "modal-recreation":
            return RecreationModal;
          case "modal-weight":
            return WeightModal;
          case "modal-meal":
            return MealModal;
          case "modal-specialNote":
            return SpecialNoteModal;
          case "modal-excretionStatus":
            return ExcretionStatusModal;
          default:
            return null;
        }
      });
      
      // モーダルタイトルの計算プロパティ
      const modalTitle = computed(() => {
        switch (activeModal.value) {
          case 'modal-vital':
            return 'バイタル記録';
          case 'modal-bathing':
            return '入浴記録';
          case 'modal-excretion':
            return '排便記録';
          case 'modal-recreation':
            return 'レクリエーション記録';
          case 'modal-weight':
            return '体重記録';
          case 'modal-meal':
            return '食事記録';
          case 'modal-specialNote':
            return '特記事項';
          case 'modal-excretionStatus':
            return '排泄状況';
          default:
            return '';
        }
      });
      
      // モーダルを開く処理を修正
      const openModal = (modalId) => {
        activeModal.value = modalId;
      };
      
      // モーダルを閉じる処理を修正
      const closeModal = () => {
        activeModal.value = null;
        currentEditRecord.value = null; // 編集データもクリア
      };
      
      // トースト通知
      const showToast = (message) => {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.classList.add('show');
        
        // 3秒後にトーストを非表示
        setTimeout(() => {
          toast.classList.remove('show');
        }, 3000);
      };
      
      // モーダルのデータ保存処理後にリロード
      const handleModalSave = async () => {
        try {
          console.log("✅データ保存後のデータを再読み込みします");
          ShareStore.$patch({isLoading:true});
          await selectedRecordStore.ReLode_Kojinkiroku();
          
        } catch(error) {
          console.error('データ保存エラー:', error);
        } finally {
          ShareStore.$patch({isLoading:false});
        }
      };
      
      // 利用者選択時の処理
      const handleUserSelect = (userId, userName) => {
        selectedUserId.value = userId;
        selectedUserName.value = userName;
        // ここで利用者データの取得処理を行う
      };
      
      // 日付変更時の処理
      const handleDateChange = (date) => {
        selectedDate.value = date;
        // ここで日付に対応するデータの取得処理を行う
      };
      
      // バイタル記録編集処理
      const handleEditVitalRecord = (record) => {
        // 編集するバイタル記録を保存
        console.log('編集するバイタル記録:', record);
        // 編集対象のレコードを渡してバイタルモーダルを開く
        // ここで必要に応じてモーダルに編集データを渡す
        openModal('modal-vital');
      };
      
      // 食事モーダルを開く
      const handleOpenMealModal = (data) => {
        console.log('食事データ編集:', data);
        // 食事カテゴリに応じてモーダルを開く
        const modalMap = {
          0: 'modal-meal', // 食事
        };
        
        // 編集する食事レコードを保存
        currentEditRecord.value = data.record;
        
        // モーダルを開く
        openModal(modalMap[data.mealCategoryId]);
      };
      
      // 排泄状況編集処理
      const handleEditExcretionRecord = (record) => {
        // 編集する排泄状況レコードを保存
        console.log('編集する排泄状況レコード:', record);
        // 編集対象のレコードを渡して排泄状況モーダルを開く
        // ここで必要に応じてモーダルに編集データを渡す
        openModal('modal-excretionStatus');
      };


      
      return {
        kiroku,
        printDataStore,
        selectedRecordStore,
        selectedUserId,
        selectedUserName,
        selectedDate,
        activeModal,
        currentEditRecord,
        modalComponent,
        modalTitle,
        openModal,
        closeModal,
        showToast,
        handleModalSave,
        handleUserSelect,
        handleDateChange,
        handleEditVitalRecord,
        handleOpenMealModal,
        handleEditExcretionRecord,
      };
    }
  }
</script>

<style scoped>
  .toast {
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 10px 20px;
    border-radius: 4px;
    z-index: 1000;
    display: none;
  }
  
  .toast.show {
    display: block;
    animation: fadeInOut 3s;
  }
  
  @keyframes fadeInOut {
    0% { opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { opacity: 0; }
  }
</style>