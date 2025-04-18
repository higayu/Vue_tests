<template>
  <section class="bg-white p-4 mb-4 border border-gray-300 rounded">
    <h2 class="text-base font-bold mb-3 border-b border-gray-300 pb-1">職員・日勤者 / 夜勤者</h2>
    
    <!-- 日勤職員 -->
    <div class="mb-4">
      <div class="text-sm text-gray-600 mb-2">日勤職員：</div>
      <div class="space-y-2">
        <div class="flex flex-wrap gap-2">
          <div 
            v-for="(staff, index) in dayStaff" 
            :key="index" 
            class="flex items-center bg-gray-50 px-3 py-1.5 rounded text-sm"
          >
            <span class="text-gray-800">{{ staff.staff_name }}</span>
            <button 
              v-if="staff.delete_btn && service_status !== 'kiroku'" 
              @click="openDeleteConfirmModal('day', index)" 
              class="text-red-600 hover:text-red-800 font-bold ml-2"
            >
              ×
            </button>
          </div>
        </div>
        <div class="flex items-center space-x-2 mt-2">
          <button 
            v-if="service_status !== 'kiroku'"
            @click="openStaffModal('day')" 
            :class="[
              isStaffAddEnabled 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-gray-400 hover:bg-gray-500 text-gray-200 cursor-not-allowed',
              'px-3 py-1.5 rounded text-sm flex items-center'
            ]"
            :disabled="!isStaffAddEnabled"
          >
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            スタッフを追加
          </button>
        </div>
      </div>
    </div>

    <!-- 夜勤職員 -->
    <div>
      <div class="text-sm text-gray-600 mb-2">夜勤職員：</div>
      <div class="space-y-2">
        <div class="flex flex-wrap gap-2">
          <div 
            v-for="(staff, index) in nightStaff" 
            :key="index" 
            class="flex items-center bg-gray-50 px-3 py-1.5 rounded text-sm"
          >
            <span class="text-gray-800">{{ staff.staff_name }}</span>
            <button 
              v-if="staff.delete_btn && service_status !== 'kiroku'" 
              @click="openDeleteConfirmModal('night', index)" 
              class="text-red-600 hover:text-red-800 font-bold ml-2"
            >
              ×
            </button>
          </div>
        </div>
        <div class="flex items-center space-x-2 mt-2">
          <button 
            v-if="service_status !== 'kiroku'"
            @click="openStaffModal('night')"
            :class="[
              isStaffAddEnabled 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-gray-400 hover:bg-gray-500 text-gray-200 cursor-not-allowed',
              'px-3 py-1.5 rounded text-sm flex items-center'
            ]"
            :disabled="!isStaffAddEnabled"
          >
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            スタッフを追加
          </button>
        </div>
      </div>
    </div>

    <!-- スタッフ選択モーダル -->
    <StaffModal
      v-if="showStaffModal"
      :title="modalTitle"
      :shiftType="currentShiftType"
      :targetDate="targetDate"
      :selected_staff="selectedStaff"
      @close="hideStaffModal"
      @confirm="handleStaffConfirm"
    />

    <!-- スタッフ削除確認モーダル -->
    <DeleteStaffModal
      v-if="showDeleteConfirmModal"
      :staffName="selectedStaffForDelete?.staff_name"
      :shiftType="selectedStaffForDelete?.shiftType"
      :serviceRecordId="selectedStaffForDelete?.id"
      @close="hideDeleteConfirmModal"
      @confirm="handleDeleteConfirm"
    />
  </section>
</template>

<script>
import { ref, computed } from 'vue';
import StaffModal from '@/Modals/StaffModal.vue';
import DeleteStaffModal from '@/Modals/DeleteStaffModal.vue';

export default {
  components: {
    StaffModal,
    DeleteStaffModal
  },

  props: {
    dayStaff: {
      type: Array,
      required: true
    },
    nightStaff: {
      type: Array,
      required: true
    },
    targetDate: {
      type: String,
      required: true
    },
    selectedStaff: {
      type: Object,
      required: true,
      default: () => ({
        nikkin: [],
        yakin: []
      })
    },
    isStaffAddEnabled: {
      type: Boolean,
      default: false
    },
    service_status: {
      type: String,
      default: ''
    }
  },

  emits: ['close', 'confirm'],

  setup(props, { emit }) {
    const showStaffModal = ref(false);
    const showDeleteConfirmModal = ref(false);
    const currentShiftType = ref('');
    const selectedStaffForDelete = ref(null);

    const modalTitle = computed(() => {
      return currentShiftType.value === 'day' ? '日勤職員の選択' : '夜勤職員の選択';
    });

    const openStaffModal = (shiftType) => {
      currentShiftType.value = shiftType;
      showStaffModal.value = true;
    };

    const hideStaffModal = () => {
      showStaffModal.value = false;
    };

    const openDeleteConfirmModal = (shiftType, index) => {
      const staff = shiftType === 'day' ? props.selectedStaff.nikkin[index] : props.selectedStaff.yakin[index];
      
      // デバッグ用のログを追加
      console.log('削除対象のスタッフデータ:', staff);
      console.log('スタッフデータのキー:', Object.keys(staff));
      
      selectedStaffForDelete.value = {
        ...staff,
        shiftType,
        index,
        id: staff.id // 複数の可能性のあるプロパティ名をチェック
      };
      
      // 選択されたスタッフデータのデバッグログ
      console.log('選択されたスタッフデータ:', selectedStaffForDelete.value);
      
      showDeleteConfirmModal.value = true;
    };

    const hideDeleteConfirmModal = () => {
      showDeleteConfirmModal.value = false;
      selectedStaffForDelete.value = null;
    };

    const handleStaffConfirm = (selectedStaff) => {
      emit('confirm');
      hideStaffModal();
    };

    const handleDeleteConfirm = () => {
      if (selectedStaffForDelete.value) {
        emit('confirm');
      }
      hideDeleteConfirmModal();
    };

    return {
      showStaffModal,
      showDeleteConfirmModal,
      currentShiftType,
      selectedStaffForDelete,
      modalTitle,
      openStaffModal,
      hideStaffModal,
      openDeleteConfirmModal,
      hideDeleteConfirmModal,
      handleStaffConfirm,
      handleDeleteConfirm
    };
  }
};
</script> 