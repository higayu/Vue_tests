<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 relative">
      <!-- ヘッダー -->
      <div class="p-4 border-b">
        <h3 class="text-lg font-medium">{{ title }}</h3>
        <button @click="$emit('close')" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- メインコンテンツ -->
      <div class="p-4 max-h-[60vh] overflow-y-auto">
        <div class="grid grid-cols-2 gap-2">
          <button
            v-for="staff in filteredStaffList"
            :key="staff.staff_id"
            class="text-left px-4 py-2 rounded hover:bg-gray-100 transition-colors duration-200 w-full"
            :class="{ 'bg-blue-50': isSelected(staff.id) }"
            @click="toggleStaff(staff.id)"
          >
            {{ staff.name }}
          </button>
        </div>
      </div>

      <!-- フッター -->
      <div class="border-t flex justify-between">
        <button
          class="w-[50%] bg-gray-500 text-white py-2 font-semibold"
          @click="$emit('close')"
        >
          閉じる
        </button>
        <button
          class="w-[50%] bg-blue-700 text-white py-2 font-semibold"
          @click="saveStaff"
        >
          保存
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useShareStore } from '../stores/useShareData.js';
import { ref, computed, onMounted } from "vue";
import { useModaldataStore } from "../stores/Modaldata.js";

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  shiftType: {
    type: String,
    required: true
  },
  targetDate: {
    type: String,
    required: true
  },
  selected_staff: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['close', 'confirm']);
const ShareStore = useShareStore();
const ModaldataStore = useModaldataStore();
const staffList = ref([]);
const selectedStaff = ref([]);
const selectedStaffIds = ref(new Set()); // 選択状態を管理するSet
import { getTodayYYYYMMDD, getCurrentTimeJP } from "../utils/timeUtils.js"; // timeUtilsから関数をインポート

// モーダルが開いたときにスタッフデータを取得
onMounted(async () => {
  try {
    ShareStore.$patch({ isLoading: true });
    const staffData = await ModaldataStore.getStaffs(props.targetDate);
    staffList.value = staffData;
    
    // 初期選択状態を設定
    if (props.shiftType === 'day') {
      selectedStaff.value = props.selected_staff.nikkin || [];
      selectedStaffIds.value = new Set(selectedStaff.value.map(staff => staff.staff_id));
    } else {
      selectedStaff.value = props.selected_staff.yakin || [];
      selectedStaffIds.value = new Set(selectedStaff.value.map(staff => staff.staff_id));
    }

    console.log("スタッフデータ:", staffData);
    console.log("シフトタイプ:", props.shiftType);
    console.log("選択済みスタッフ:", selectedStaff.value);
  } catch (error) {
    console.error('スタッフデータの取得中にエラーが発生しました:', error);
  } finally {
    ShareStore.$patch({ isLoading: false });
  }
});

// フィルタリングされたスタッフリスト
const filteredStaffList = computed(() => {
  if (!staffList.value.length) return [];

  const currentShiftStaff = props.shiftType === 'day' 
    ? props.selected_staff.nikkin || []
    : props.selected_staff.yakin || [];

  return staffList.value.filter(staff => {
    const isNotSelected = !currentShiftStaff.some(selected => 
      selected.recorded_staff_id === staff.staff_id
    );
    return isNotSelected;
  });
});

// スタッフが選択されているかどうかをチェック
const isSelected = (staffId) => {
  return selectedStaffIds.value.has(staffId);
};

// スタッフの選択/解除
const toggleStaff = (staffId) => {
  if (selectedStaffIds.value.has(staffId)) {
    selectedStaffIds.value.delete(staffId);
  } else {
    selectedStaffIds.value.add(staffId);
  }
};

// 選択を保存
const saveStaff = async () => {
  ShareStore.$patch({ isLoading: true });
  try {
    const userId = -1; // 適切な管理日誌スタッフ追加用IDを設定
    const servedTime = props.shiftType === 'day' 
      ? `${props.targetDate} 07:00:00`
      : `${props.targetDate} 19:00:00`;

    // 選択されたスタッフの情報を取得
    const selectedStaffData = Array.from(selectedStaffIds.value).map(staffId => {
      const staff = staffList.value.find(s => s.staff_id === staffId);
      return {
        recorded_staff_id: staffId,
        staff_name: staff?.staff_name || ''
      };
    });

    // 保存前のデバッグ出力
    console.log("=== 保存するスタッフリスト ===");
    console.log("シフトタイプ:", props.shiftType);
    console.log("日付:", props.targetDate);
    console.log("時刻:", servedTime);
    console.log("選択されたスタッフ数:", selectedStaffData.length);
    console.log("選択されたスタッフ詳細:");
    selectedStaffData.forEach((staff, index) => {
      console.log(`${index + 1}. ID: ${staff.recorded_staff_id}, 名前: ${staff.staff_name}`);
    });
    console.log("===========================");

    // 各スタッフを個別に保存
    for (const staff of selectedStaffData) {
      const result = await ModaldataStore.Insert_Service({
        user_id: Number(userId),
        item_id: 14,
        served_time: servedTime,
        note: '',
        schedule_id: null,
        recorded_staff_id: staff.recorded_staff_id // スタッフIDを正しく設定
      });
      
      if (result.status === 'error') {
        throw new Error(result.message);
      }
    }
    
    emit('confirm');
  } catch (error) {
    console.error('記録エラー:', error);
  } finally {
    ShareStore.$patch({ isLoading: false });
  }
};
</script>