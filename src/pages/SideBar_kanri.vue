<template>
  <aside class="w-full pr-2">
    <!-- 日付選択セクション -->
    <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-4">
      <h3 class="text-sm font-medium text-gray-700 mb-3">日付選択</h3>
      <div class="grid grid-cols-2 gap-3">
        <div class="space-y-1">
          <label class="text-xs text-gray-600">年:</label>
          <date-picker_side_year />
        </div>
        <div class="space-y-1">
          <label class="text-xs text-gray-600">月:</label>
          <date-picker_side_month />
        </div>
      </div>
    </div>

    <!-- すべて選択オプション -->
    <transition name="sparkle-slide" mode="out-in">
      <div v-if="false" 
           class="flex items-center mb-3 bg-blue-50 p-2 rounded-md">
        <input 
          type="checkbox"
          v-model="ShareStore.All_Click"
          class="mr-2 ml-1 h-4 w-4 accent-blue-500 cursor-pointer"
          @click="toggleAllClick"
        />
        <span class="text-sm text-gray-700">すべて選択</span>
      </div>
    </transition>

    <!-- リストの表示範囲を制限してスクロール可能にする -->
    <ul class="max-h-[calc(100dvh_-_300px)] overflow-y-auto bg-white shadow-md rounded-md custom-scrollbar">
      <li
        v-for="record in filteredRecords"
        :key="`${record.day_key}-${record.user_id}`"
        class="border-b border-gray-200 last:border-b-0 flex items-center cursor-pointer"
        :class="{
          'bg-blue-100': selectItemStore.nowSelectedItem_Kanri && 
                        selectItemStore.nowSelectedItem_Kanri.day_key === record.day_key && 
                        selectItemStore.nowSelectedItem_Kanri.user_id === record.user_id,
          'hover:bg-gray-100': hoveredItem !== record,
          'hover:bg-blue-200': hoveredItem == record && selectItemStore.nowSelectedItem_Kanri == record
        }"
        @click="handleClick(record)"
        @mouseover="hoveredItem = record"
        @mouseleave="hoveredItem = null"
      >

          <div v-if="false">
            <transition name="sparkle-slide" mode="out-in">
            <input 
              v-show="ShareStore.print_flg"
              type="checkbox"
              v-model="record.check_val"
              class="mr-2 ml-4 cursor-pointer"
            />
            </transition>
          </div>

        <button class="block p-4 flex-1 text-left">
          {{ record.day_txt }}
        </button>
      </li>
    </ul>
  </aside>
</template>

<script>
import { ref, reactive, computed, watch, onMounted, toRefs, getCurrentInstance } from 'vue';
import { useRouter } from 'vue-router';
import { useSelectedRecordStore } from '../stores/selectedRecord';
import { useShareStore } from "../stores/useShareData.js";
import DatePicker_side_year from '../DatePicker/DatePicker_kanri_year.vue';
import DatePicker_side_month from '../DatePicker/DatePicker_kanri_month.vue';

export default {
  name: "SideBar",

  components: {
    DatePicker_side_year,
    DatePicker_side_month,
  },

  setup(props, { emit }) {
    const Search_txt = ref('');
    const selectItemStore = useSelectedRecordStore();
    const hoveredItem = ref(null);
    const filteredRecords = ref([]);
    const ShareStore = useShareStore();
    const router = useRouter();

    if (!selectItemStore) {
      console.error('ストアの初期化に失敗:', {
        store: selectItemStore,
        timestamp: new Date().toISOString()
      });
    }

    onMounted(async () => {
      await fetchData();
      await updateFilteredRecords();
    });

    // データ取得関数
    const fetchData = async () => {
      try {
        const today = new Date();
        const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;
        
        console.log('初期データ取得開始:', formattedDate);
        
        const response = await selectItemStore.getMonth_Kanri(formattedDate);
        // 保存された選択状態を復元
        if (selectItemStore.nowSelectedItem_Kanri && selectItemStore.nowSelectedItem_Kanri.day_key) {
          console.log('🔴保存された選択状態を復元します');
          await selectItemStore.ReLode_Kanri_Nissi();
        }
        // データの処理...
      } catch (error) {
        console.error('月間データの取得に失敗しました。APIのレスポンス形式を確認してください。', error);
      }
    };

    // フィルタリングロジック: Search_txt と Search_id に基づいてフィルタリング
    const updateFilteredRecords = async () => {
      if (!selectItemStore.MonthList_Kanri || !Array.isArray(selectItemStore.MonthList_Kanri) || selectItemStore.MonthList_Kanri.length === 0) {
        filteredRecords.value = [];
        console.log('表示するデータがありません');
        return;
      }


      const searchTxtStr = Search_txt.value.trim().toLowerCase();
      const searchIdStr = String(ShareStore.Search_id || '').trim();

      // MonthList_Kanri を使ってフィルタリング
      filteredRecords.value = selectItemStore.MonthList_Kanri.filter(record => {
        const matchUserName = searchTxtStr
          ? (record.user_name && record.user_name.toLowerCase().includes(searchTxtStr)) || 
            (record.day_txt && record.day_txt.toLowerCase().includes(searchTxtStr))
          : true;

        const matchUserId = searchIdStr
          ? record.user_id && String(record.user_id) === searchIdStr
          : true;

        return ShareStore.print_flg ? matchUserId : matchUserName;
      });

      console.log('フィルタリング後のレコード数:', filteredRecords.value.length);
    };

    // Watcher の設定
    watch(
      () => selectItemStore.MonthList_Kanri,
      (newVal, oldVal) => {
        if (newVal && Array.isArray(newVal)) {
          updateFilteredRecords();
          console.log('MonthList_Kanri が更新されました。レコード数:', newVal.length);
        }
      },
      { immediate: true }
    );

    watch(
      () => Search_txt.value,
      (newVal) => {
        updateFilteredRecords();
      }
    );



    async function Search_id_Reset(){
      ShareStore.setSearch_id('');
    }

    const Search_idChange = (Search_id) => {
      // 実装は省略されています
    };

    //--------------------[レコードのクリック]--------------------------//
    const handleClick = async (record) => {
        try {
          ShareStore.$patch({ isLoading: true }); // ストアの状態を直接更新
          console.log("個人記録1件のrecord",record);
          await selectItemStore.setNowSelectedItem_Kanri(record);


        } catch (error) {
          console.error("handleClick中にエラーが発生しました:", error);
        } finally {
          ShareStore.$patch({ isLoading: false }); // ストアの状態を直接更新
        }
      };
       
    //--------------------[編集の判定処理]--------------------------//
    const Edit_Cancel = async () => {
      if(printDataStore){
        const Edit_change = JSON.stringify(printDataStore.InputData) === JSON.stringify(printDataStore.EditBefore_Data);
        if(!Edit_change){
          const result = window.confirm('編集中のデータが消えてしまいます。\nよろしいですか？');
          return result;
        }
        return true;
      }
      return true;
    };

    const { proxy } = getCurrentInstance();
    const showSuccessToast = () => {
      if (!proxy || !proxy.$toast) {
        console.error("Toast instance is undefined. Ensure VueToast is properly registered.");
        return;
      }
      proxy.$toast.open({
        message: "操作が成功しました！",
        type: "success",
        duration: 5000,
      });
    };

    return {
      Search_txt,
      filteredRecords,
      userList: ShareStore.userList,
      staffList: ShareStore.staffList,
      ShareStore,
      nowSelectedItem_Kanri: selectItemStore.nowSelectedItem_Kanri,
      selectItemStore,
      hoveredItem,
      handleClick,
      Search_idChange,
      Search_id_Reset,
      Edit_Cancel,
      showSuccessToast,
    };
  },
};
</script>

<style scoped>
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 20px;
}
</style>