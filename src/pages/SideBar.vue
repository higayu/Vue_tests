<template>
  <aside class="w-full">
    <div class="mb-4">
      <h4 class="text-lg font-semibold">日付で絞り込み</h4>
      <date-picker_side/>

      <!-- 氏名選択 -->
      <div class="mr-4 w-full">
         <h4 class="text-lg font-semibold">利用者で絞り込み</h4>  
        <div v-if="ShareStore" class="flex items-center mt-2">
            <div class="flex items-center space-x-4 mr-4 w-full">
              
              <select 
                  v-model="ShareStore.Search_id" 
                  @change="Search_idChange(ShareStore.Search_id)" 
                  class="w-full p-2 border border-gray-300 rounded-md bg-white">
                  <option value="" >全ての利用者</option>
                  <option 
                    v-for="user in ShareStore.userList"
                    :value="user.id" 
                    :key="user.id">
                    {{ user.name }}
                  </option>
                </select>

            </div>

          
        </div>
      </div>
    </div>


   

    <transition name="sparkle-slide" mode="out-in">
      <div v-if="ShareStore" class="flex items-center mt-2">
        <input 
          v-show="ShareStore.print_flg && ShareStore.Search_id !== '' && !isNaN(ShareStore.Search_id)"
          type="checkbox"
          v-model="ShareStore.All_Click"
          class="mr-2 ml-4"
          @click="toggleAllClick"
        />
        <div v-show="ShareStore.print_flg && ShareStore.Search_id !== '' && !isNaN(ShareStore.Search_id)">
          すべて選択
        </div>
 
      </div>
    </transition>

    <!-- リストの表示範囲を制限してスクロール可能にする -->
    <ul class="max-h-[calc(100dvh_-_300px)] overflow-y-auto bg-white shadow-md rounded-md custom-scrollbar">
      <li
        v-for="(record, index) in filteredRecords"
        :key="`${record.day_key}-${record.user_id}`"
        class="border-b border-gray-200 last:border-b-0 flex items-center cursor-pointer"
        :class="{
          'bg-blue-100': selectItemStore.nowSelectedItem && 
                        selectItemStore.nowSelectedItem.day_key === record.day_key && 
                        selectItemStore.nowSelectedItem.user_id === record.user_id,
          'hover:bg-gray-100': hoveredItem !== record,
          'hover:bg-blue-200': hoveredItem == record && selectItemStore.nowSelectedItem == record
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
          {{ record.user_name }} 様 （{{ record.day_txt }}）
        </button>
      </li>
    </ul>


  </aside>
</template>

<script>
import { ref, reactive, computed, watch, onMounted, toRefs,getCurrentInstance } from 'vue';
import { useRouter } from 'vue-router'; // useRouterをインポート
import { usePrintDataStore } from '../stores/printData';
import { useSelectedRecordStore } from '../stores/selectedRecord';
import { useShareStore } from "../stores/useShareData.js"; // Piniaストアをインポート
import DatePicker_side from '../DatePicker/DatePicker_side.vue'; // NavBar.vue内

export default {
  name: "SideBar",

  components: {
        DatePicker_side,
      },

  setup(props, { emit }) {
    const Search_txt = ref('');
    const selectItemStore = useSelectedRecordStore();
    const printDataStore = usePrintDataStore();
    // const currentMonth = ref('');
    const hoveredItem = ref(null);
    const filteredRecords = ref([]); // デフォルト値として空配列を設定
    const ShareStore = useShareStore();

    const router = useRouter(); // useRouterを使ってrouterオブジェクトを取得

    // データ取得関数
    const fetchData = async () => {
      ShareStore.isLoading = true;
      try {
        const date = new Date();
        const year = date.getFullYear();
        // 月と日を2桁のゼロ埋め形式に変換
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        // YYYY-MM-DD形式で日付を作成
        const selectDate = `${year}-${month}-${day}`;
        console.log('使用する日付:', selectDate); // デバッグ用
        
        selectItemStore.setSelected_Date(selectDate);
        const success = await selectItemStore.getDate_Kojin(selectItemStore.Selected_Date);
        
        // 保存された選択状態を復元
        if (selectItemStore.nowSelectedItem && selectItemStore.nowSelectedItem.day_key) {
          await selectItemStore.ReLode_Kojinkiroku();
        }
        
        if (!success) {
          console.error("データの取得に失敗しました。APIのレスポンス形式を確認してください。");
        } else {
          console.log("データの取得に成功しました。", selectItemStore.DateList_kojin.length, "件のレコードが読み込まれました。");
        }
      } catch (error) {
        console.error("エラーが発生しました:", error);
      } finally {
        ShareStore.isLoading = false;
      }
    };

    // フィルタリングロジック: Search_txt と Search_id に基づいてフィルタリング
    const updateFilteredRecords = () => {
      if (!selectItemStore.DateList_kojin || !Array.isArray(selectItemStore.DateList_kojin) || selectItemStore.DateList_kojin.length === 0) {
        filteredRecords.value = [];
        console.log('表示するデータがありません');
        return;
      }


      const searchTxtStr = Search_txt.value.trim().toLowerCase();
      const searchIdStr = String(ShareStore.Search_id || '').trim();

      filteredRecords.value = selectItemStore.DateList_kojin.filter(record => {
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
      () => selectItemStore.DateList_kojin,
      (newVal, oldVal) => {
        if (newVal && Array.isArray(newVal)) {
          updateFilteredRecords();
          console.log('DateList_kojin が更新されました。レコード数:', newVal.length);
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

      // ページ読み込み時にデータがリセットされないようにする
      onMounted(async () => {
            await fetchData();
            updateFilteredRecords();
        console.log('Kiroku.vue mounted, printDataStore.InputData:', printDataStore.InputData);
      });


   async function Search_id_Reset(){
      ShareStore.setSearch_id('');
    }

    const Search_idChange =(Search_id) =>{

    };

    //--------------------[レコードのクリック]--------------------------//
    const handleClick = async (record) => {
        try {
          ShareStore.$patch({ isLoading: true }); // ストアの状態を直接更新
          console.log("個人記録1件のrecord",record);
              await selectItemStore.setNowSelectedItem(record);

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
              if(result){
                return true;
              }else{
                return false;
              }
            }else{
              return true;
            }
          }else{
            return true;
          }

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
      nowSelectedItem:selectItemStore.nowSelectedItem, // これを返すことでテンプレートや他の処理で利用可能
      selectItemStore,
      // currentMonth,
      hoveredItem,
      // handleMonthChange,
      printDataStore,
      //------------------------------------------------//
      handleClick,
      Search_idChange,
      Search_id_Reset,
      //--------------------------------------------------------------//
      Edit_Cancel,
      //------------------------------------------------------//
      showSuccessToast,
    //-------------------------------------------------------//
    };
  },
};
</script>