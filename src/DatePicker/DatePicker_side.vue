<template>
  <div class="flex items-center justify-between">
    <button 
      class="bg-gray-600 text-white px-2 h-[40px] rounded-l flex-none hover:bg-gray-700 flex items-center justify-center"
      @click="moveToPreviousDay"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-5 w-5">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
      </svg>
    </button>
    <VueDatePicker
      v-model="selectItemStore.Selected_Date"
      format="yyyy年MM月dd日"
      locale="ja"
      model-type="yyyy-MM-dd"
      week-start="0"
      update-on-input="true"
      :enable-time-picker="false"
      :clearable="false"
      :month-picker="false"
      no-today
      auto-apply
      @internal-model-change="handleInternalChange"
      :hide-input-icon="true"
      input-class="w-40 p-2 text-center border border-gray-300 rounded-none"
    />
    <button 
      class="bg-gray-600 text-white px-2 h-[40px] rounded-r flex-none hover:bg-gray-700 flex items-center justify-center"
      @click="moveToNextDay"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-5 w-5">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
      </svg>
    </button>
  </div>
</template>

<script>
import { defineComponent, ref, watch, onMounted } from 'vue';
import { useShareStore } from "../stores/useShareData.js"; // Piniaストアをインポート
import { useSelectedRecordStore } from '../stores/selectedRecord';
import { usePrintDataStore } from '../stores/printData';
// 内部モデルの変更時に処理
import { format, isValid, addDays, subDays } from 'date-fns'; // isValidを追加
import { ArrowDownTrayIcon } from '@heroicons/vue/24/outline'; // アウトラインスタイル
// import { ArrowDownTrayIcon } from '@heroicons/vue/24/solid'; // ソリッドスタイル

export default defineComponent({

  components:{
    ArrowDownTrayIcon,
  },

  setup() {
    // 初期値として現在の日付を文字列形式でセット
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedToday = `${year}-${month}-${day}`;

    const ShareStore = useShareStore();
    const selectItemStore = useSelectedRecordStore();
    const printDataStore = usePrintDataStore();
    selectItemStore.Selected_Date = formattedToday;

    // コンポーネントマウント時に初期データを読み込む
    onMounted(async () => {
      selectItemStore.Selected_Date = formattedToday;
      try {
        ShareStore.isLoading = true;
        await selectItemStore.getDate_Kojin(formattedToday);
      } catch (error) {
        console.error("初期データ読み込み中にエラーが発生しました:", error);
      } finally {
        ShareStore.isLoading = false;
      }
    });

    const handleInternalChange = async (currentDate) => {
      if (!currentDate || !isValid(new Date(currentDate))) {
        return;
      }

      if (currentDate instanceof Date) {
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // 月は0始まりなので+1し、ゼロ埋め
        const day = String(currentDate.getDate()).padStart(2, '0'); // 日をゼロ埋め
        const formattedDate = `${year}-${month}-${day}`;
        selectItemStore.Selected_Date = formattedDate;


        try {
          // データ取得中は isLoading を true にする
          ShareStore.isLoading = true;
          // 非同期処理が完了するまで待機
          const response = await selectItemStore.getDate_Kojin(selectItemStore.Selected_Date);
  
          if (response && response.data) {
            // データがある場合の処理
          } else {
            // データがない場合の処理
          }
        } catch (error) {
          console.error("日付のデータ取得中にエラーが発生しました:", error);
        } finally {
          // データ取得が完了したら isLoading を false に戻す
          ShareStore.isLoading = false;

          ShareStore.setReadOnlyFlg(false);
          ShareStore.update_flg = false;
          ShareStore.Search_id = '';
          ShareStore.All_Click = false;
        }
      }
    };

    // 前日に移動する関数
    const moveToPreviousDay = () => {
      const currentDate = new Date(selectItemStore.Selected_Date);
      const previousDay = subDays(currentDate, 1);
      selectItemStore.Selected_Date = format(previousDay, 'yyyy-MM-dd');
      handleInternalChange(previousDay);
    };

    // 翌日に移動する関数
    const moveToNextDay = () => {
      const currentDate = new Date(selectItemStore.Selected_Date);
      const nextDay = addDays(currentDate, 1);
      selectItemStore.Selected_Date = format(nextDay, 'yyyy-MM-dd');
      handleInternalChange(nextDay);
    };

    return {
      ShareStore,
      selectItemStore,
      handleInternalChange,
      moveToPreviousDay,
      moveToNextDay,
      printDataStore,
    };
  },
});
</script>