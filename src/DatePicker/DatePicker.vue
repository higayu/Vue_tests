<template>
  <div>
    <VueDatePicker
      v-model="inputDate"
      format="yyyy/MM/dd"
      locale="ja"
      model-type="yyyy-MM-dd"
      week-start="0"
      update-on-input="true"
      :day-class="getDayClass"
      :enable-time-picker="false"
      :clearable="false"
      :disabled-dates="disableFutureDates"
      no-today

      @internal-model-change="handleInternalChange"

      >
      <template #action-buttons>
        <button class="custom-select flex items-center justify-center gap-2 disabled:bg-gray-400"
          role="button" tabindex="0"
          @click="downloadExcel"
          :disabled="!this.Date_kanri_nisshi || this.Date_kanri_nisshi == ''"
          >
          <div v-show="this.Date_kanri_nisshi && this.Date_kanri_nisshi != ''">
            <ArrowDownTrayIcon class="h-6 w-6 text-white" />
          </div>{{ !this.Date_kanri_nisshi || this.Date_kanri_nisshi == '' ? '日付を選択してください' : 'ダウンロード'}}
        </button>
      </template>
    </VueDatePicker>
    
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useShareStore } from "../stores/useShareData.js"; // Piniaストアをインポート
    // 内部モデルの変更時に処理
import { format, isValid } from 'date-fns'; // isValidを追加
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { ArrowDownTrayIcon } from '@heroicons/vue/24/outline'; // アウトラインスタイル
// import { ArrowDownTrayIcon } from '@heroicons/vue/24/solid'; // ソリッドスタイル

export default defineComponent({

  components:{
    ArrowDownTrayIcon,
  },

  setup() {
    const inputDate = ref();
    const ShareStore = useShareStore();
    const Date_kanri_nisshi = ref("");



  const handleInternalChange = (currentDate) => {

      if (!currentDate || !isValid(new Date(currentDate))) {

        Date_kanri_nisshi.value =  '';

        return;
      }

      try {

        const formattedDate = format(new Date(currentDate), 'yyyy/MM/dd');
        Date_kanri_nisshi.value = formattedDate;

      } catch (error) {
        console.error("日付フォーマット中にエラーが発生しました:", error);
      }
  };

    // データをExcelにエクスポート
    async function downloadExcel(){
      try {

          if (!Date_kanri_nisshi.value || Date_kanri_nisshi.value == '') {
            alert("日付が選択されていません。");
            return;
          }

          const formatSelectDay = await ShareStore.getDate_Data(Date_kanri_nisshi.value);

            // Excelの編集を呼び出す
            const workbook = await ShareStore.editExcel(Date_kanri_nisshi);

            // Excelファイルをブラウザでダウンロード
            const buffer = await workbook.xlsx.writeBuffer();
            const blob = new Blob([buffer], {
              type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });

          const HidukeName = await ShareStore.getDate_Data(Date_kanri_nisshi.value);
          
          const fileName = `グループホーム管理日_${HidukeName.dateTimeAry.year}年${HidukeName.dateTimeAry.month}月${HidukeName.dateTimeAry.day}日.xlsx`;
          //saveAs(blob, "output.xlsx"); // FileSaver.jsで保存
           saveAs(blob, fileName); // FileSaver.jsで保存


        } catch (error) {
          console.error("Excelファイルのダウンロード中にエラーが発生しました:", error);
        }
    };


        // 未来の日付を無効化する関数
    function disableFutureDates(date) {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // 時間を切り捨てる
      return date > today; // 今日より未来の日付を無効化
    };

        // 条件分岐が必要なので、関数の戻り値を利用
      const getDayClass = (date) => {
        const weekDay = new Date(date).getDay();
        if (weekDay == 6) {
          // 土曜日の場合、classに"saturday"を追加
          return 'saturday';
        }
        if (weekDay == 0) {
          // 日曜日の場合、classに"sunday"を追加
          return 'sunday';
        }
        return '';
      };


    return {
      inputDate,
      getDayClass,
      //-------------------------------------------------------//
      //--------------------------------------------------------------//
      downloadExcel,
      Date_kanri_nisshi,
      // updateDate,
      // persistDate,
      // setInitialDate,
      handleInternalChange,
      disableFutureDates,
    };
  },
});
</script>

<style scoped>
.custom-download-btn {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 14px;
  border-radius: 4px;
}

.custom-download-btn:hover {
  background-color: #45a049;
}

button {
  transition: background-color 0.3s, color 0.3s;
}
.absolute {
  position: absolute;
  font-size: 20px;
  width: 143.99px;
  height: 101px;
  /* top: 100%;
  left: 0; */
  z-index: 50;
}
</style>
<style>
/* scopedの中には書かない */
.saturday {
  color: #0000ff;
}
.sunday {
  color: #ff0000;
}
.custom-select {
    cursor: pointer;
    color: #1976d2; /* ボタンに近い見た目 */
    font-weight: bold;
    padding: 10px 20px;
    border-radius: 4px;
    transition: background-color 0.3s, color 0.3s;
    border: black solid 2px;
}
/* .custom-select:hover {
  background-color: rgb(255, 180, 100); 白みを足したオレンジ
} */

.custom-select{
  background-color: rgb(255, 140, 0); /* 赤みを足したオレンジ */
    color:white;
  border: white;
}
.dp__selection_preview{
  color:white !important;
}


nav .dp__input,nav .dp__input_icon{
  border: none !important;
  color: rgba(0, 0, 0, 0)!important;
  /* background-color: orange !important; */
}

nav input:not([readonly]) {
  background-color: orange !important;
  height: 48px;
}

/* nav input:hover,
nav .relative :not([data-v-0957edea][data-v-0957edea]):hover 
{
  background-color: #f95c17 !important;
  color:#f95c17 !important;
} */
.dp__pointer{
  border-radius: 0.375rem !important;
}

</style>