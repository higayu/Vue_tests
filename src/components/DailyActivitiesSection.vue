<template>
  <section class="bg-white p-4 mb-4 border border-gray-300 rounded">
    <h2 class="text-base font-bold mb-3 border-b border-gray-300 pb-1">入浴 / 排便 / レクリエーション / 体重</h2>
    <div class="grid grid-cols-1 gap-4">
      <!-- 記録一覧 -->
      <div class="flex flex-wrap gap-4">
        <!-- 入浴 -->
        <div class="flex-1 min-w-[200px] bg-gray-100 p-4 rounded-lg">
          <div class="flex justify-between items-center mb-2">
            <h3 class="font-medium">入浴</h3>
            <button 
              type="button" 
              :class="[
                selectedRecordStore.nowSelectedItem.user_name 
                  ? 'bg-green-600 hover:bg-green-700 text-white' 
                  : 'bg-gray-400 hover:bg-gray-500 text-gray-200 cursor-not-allowed',
                'px-3 py-1 text-sm rounded'
              ]"
              @click="openModal('modal-bathing')"
              :disabled="!selectedRecordStore.nowSelectedItem.user_name"
            >
              修正
            </button>
          </div>
          <div class="text-2xl font-semibold text-center py-2 border-t border-gray-300">
            {{ bathingStatus }}
          </div>
        </div>

        <!-- 排便 -->
        <div class="flex-1 min-w-[200px] bg-gray-100 p-4 rounded-lg">
          <div class="flex justify-between items-center mb-2">
            <h3 class="font-medium">排便</h3>
            <!-- <button 
              type="button" 
              class="bg-green-600 text-white px-3 py-1 text-sm rounded hover:bg-green-700"
              @click="openModal('modal-excretion')"
            >
              修正
            </button> -->
          </div>
          <div class="text-2xl font-semibold text-center py-2 border-t border-gray-300">
            {{ excretionStatus }}
          </div>
        </div>

        <!-- レクリエーション -->
        <div class="flex-1 min-w-[200px] bg-gray-100 p-4 rounded-lg">
          <div class="flex justify-between items-center mb-2">
            <h3 class="font-medium">レクリエーション</h3>
            <button
              type="button" 
              :class="[
                selectedRecordStore.nowSelectedItem.user_name 
                  ? 'bg-green-600 hover:bg-green-700 text-white' 
                  : 'bg-gray-400 hover:bg-gray-500 text-gray-200 cursor-not-allowed',
                'px-3 py-1 text-sm rounded'
              ]"
              @click="openModal('modal-recreation')"
              :disabled="!selectedRecordStore.nowSelectedItem.user_name"
            >
              修正
            </button>
          </div>
          <div class="text-2xl font-semibold text-center py-2 border-t border-gray-300">
            {{ recreationStatus }}
          </div>
        </div>

        <!-- 体重 -->
        <div class="flex-1 min-w-[200px] bg-gray-100 p-4 rounded-lg">
          <div class="flex justify-between items-center mb-2">
            <h3 class="font-medium">体重</h3>
            <button
              type="button" 
              :class="[
                selectedRecordStore.nowSelectedItem.user_name 
                  ? 'bg-green-600 hover:bg-green-700 text-white' 
                  : 'bg-gray-400 hover:bg-gray-500 text-gray-200 cursor-not-allowed',
                'px-3 py-1 text-sm rounded'
              ]"
              @click="openModal('modal-weight')"
              :disabled="!selectedRecordStore.nowSelectedItem.user_name"
            >
              修正
            </button>
            <span class="text-sm text-gray-500">月1回測定</span>
          </div>
          <div class="flex items-center justify-center pt-3 border-t border-gray-300">
            <div class="text-2xl font-semibold text-center py-2 border-t border-gray-300">
              {{ weightValue }}{{ weightValue ? 'kg' : '' }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- モーダルコンポーネント -->
    <component 
      v-if="activeModal"
      :is="modalComponent" 
      :isOpen="true"
      :initialWeight="modelValue.Weight?.val"
      :userId="selectedRecordStore.nowSelectedItem.user_id"
      :targetDate="selectedRecordStore.nowSelectedItem.day_key"
      :userName="selectedRecordStore.nowSelectedItem.user_name"
      :service_status="kiroku"
      @close="closeModal" 
      @confirm="handleConfirm"
    />
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useSelectedRecordStore } from '../stores/selectedRecord';
import BathingModal from "@/Modals/BathingModal.vue"; 
import ExcretionModal from "@/Modals/ExcretionModal.vue"; 
import RecreationModal from "@/Modals/RecreationModal.vue"; 
import WeightModal from "@/Modals/WeightModal.vue"; 

// ストアのインスタンスを作成
const selectedRecordStore = useSelectedRecordStore();
const kiroku = ref('kiroku');

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({
      Bath: {
        bath: { val: 0, row_id: 0 },
        bathContent: { val: "", row_id: 0 }
      },
      Haisetu: {
        haisetuList: []
      },
      Recreation: {
        id: null,
        note: null,
      },
      Weight: {
        val: null,
        row_id: 0
      }
    }),
    required: true
  }
});

const emit = defineEmits(['update:modelValue', 'confirm']);

const activeModal = ref(null);

// 計算プロパティ
const bathingStatus = computed(() => {
  return props.modelValue.Bath?.id? '◯' : ' ';
});

const excretionStatus = computed(() => {
  return props.modelValue.Haisetu?.haisetuList?.length > 0 ? '◯' : ' ';
});

const recreationStatus = computed(() => {
  return props.modelValue.Recreation?.note ? '◯' : ' ';
});

const weightValue = computed(() => {
  console.log('🚓体重',props.modelValue.Weight.note);
  const weightVal = props.modelValue.Weight.note;
  if (!weightVal) return null;
  
  // 文字列の場合は数値に変換
  const numericWeight = typeof weightVal === 'string' ? parseFloat(weightVal) : weightVal;
  
  // 有効な数値でない場合は0を返す
  return isNaN(numericWeight) ? null : numericWeight;
});

// モーダルコンポーネントの動的選択
const modalComponent = computed(() => {
  switch (activeModal.value) {
    case 'modal-bathing':
      return BathingModal;
    case 'modal-excretion':
      return ExcretionModal;
    case 'modal-recreation':
      return RecreationModal;
    case 'modal-weight':
      return WeightModal;
    default:
      return null;
  }
});

// モーダル関連の処理
const openModal = (modalId) => {
  activeModal.value = modalId;
};

const closeModal = () => {
  activeModal.value = null;
};

const handleConfirm = () => {
  emit('confirm');
  console.log('🚓処理終了通知');
  closeModal();
};
</script>

<style scoped>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  opacity: 1;
}
</style> 