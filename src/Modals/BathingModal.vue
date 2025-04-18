<template>
  <div class="modal-overlay">
    <!-- 外枠：高さ90vh、flexレイアウトでヘッダー・コンテンツ・フッターを配置 -->
    <div class="relative bg-white w-full max-w-3xl md:mx-4 md:rounded-lg shadow-xl md:h-[90vh] h-dvh flex flex-col">
      
      <!-- ヘッダー（固定） -->
      <div class="fixed-header">
        <span class="text-lg font-medium">入浴記録</span>
        <span class="text-base text-gray-600">{{ userName }} 様</span>
      </div>
      
      <!-- メインコンテンツ（スクロール可能） -->
      <div class="flex-1 overflow-y-auto p-5 pb-24 md:pb-5">
        <form @submit.prevent="saveBathing">
          <!-- 共通日付・時刻 -->
          <div class="flex gap-4 mb-4">
            <div class="w-1/2">
              <DatePicker_modal v-model="bathingData.date" :useStoreDate="false" />
            </div>
            <div class="w-1/2">
              <input 
                type="time" 
                v-model="bathingData.time"
                class="w-full p-2 border border-gray-300 rounded"
              >
            </div>
          </div>

          <textarea v-model="bathingData.note" placeholder="記録内容" class="w-full p-2 mb-4 border border-gray-300 rounded min-h-[100px]"></textarea>
          
          <!-- 入浴形態（複数選択可） -->
          <div class="mb-4">
            <!-- 入浴形態トグルボタン -->
            <button 
              type="button" 
              class="toggle-btn w-full mb-2" 
              :class="{ 'active': showBathTypes }"
              @click="toggleBathTypesVisibility"
            >
              入浴形態（複数選択可）
            </button>
            
            <!-- 入浴形態オプション -->
            <div v-if="showBathTypes" class="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
              <button 
                v-for="option in bathOptions" 
                :key="option"
                type="button" 
                class="toggle-btn" 
                :class="{ 'active': selectedBathTypes.includes(option) }"
                @click="toggleBathType(option)"
              >
                {{ option }}
              </button>
            </div>
            
            <!-- 軟膏塗布ボタン -->
            <button 
              type="button" 
              class="toggle-btn w-full mt-4" 
              :class="{ 'active': showOintmentAreas }"
              @click="toggleOintmentVisibility"
            >
              軟膏塗布
            </button>
            
            <!-- 軟膏塗布の詳細 -->
            <div v-if="showOintmentAreas" class="mt-2 grid grid-cols-3 gap-2">
              <button 
                v-for="area in ointmentAreas" 
                :key="area"
                type="button" 
                class="toggle-btn" 
                :class="{ 'active': selectedOintmentAreas.includes(area) }"
                @click="toggleOintmentArea(area)"
              >
                {{ area }}
              </button>
            </div>
          </div>
          
          <!-- 記録テンプレボタン -->
          <button 
            type="button" 
            class="toggle-btn mb-2" 
            :class="{ 'active': noChange }"
            @click="toggleNoChange"
          >
            特変なし
          </button>
        </form>
      </div>
      
      <!-- フッター（固定） -->
      <div class="fixed-footer">
        <button type="button" class="w-[50%] bg-gray-500 text-white py-3 font-semibold" @click="$emit('close')">閉じる</button>
        <button 
          type="submit" 
          class="w-[50%] text-white py-3 font-semibold" 
          :class="bathingData.service_record_id ? 'bg-red-700' : 'bg-blue-700'"
          @click="saveBathing"
        >
          {{ bathingData.service_record_id ? '更新' : '登録' }}
        </button>
      </div>
      
    </div>
  </div>
</template>

<script>
import { ref, watch,getCurrentInstance, onMounted } from "vue";
import { useRouter } from 'vue-router';
import { useShareStore } from "../stores/useShareData.js";
import { useModaldataStore } from "../stores/Modaldata.js";
import { usePrintDataStore } from "../stores/printData.js";
import { getTodayYYYYMMDD, getCurrentTimeJP } from "../utils/timeUtils.js"; // timeUtilsから関数をインポート
import DatePicker_modal from '../DatePicker/DatePicker_modal.vue';


export default {
  components: {
    DatePicker_modal
  },
  emits: ["close", "confirm"],


  props: {
    userId: {
      type: Number,
      required: true
    },
    targetDate: {
      type: String,
      required: true
    },
    userName: {
      type: String,
      required: true
    },
  },


  setup(props, { emit }) {
    const ShareStore = useShareStore();
    const ModaldataStore = useModaldataStore();
    const printDataStore = usePrintDataStore();
    const router = useRouter();

    const currentDate = ref(props.targetDate.split(' ')[0] || getTodayYYYYMMDD()); // 日付部分のみを抽出
    const currentTime = ref(props.targetDate.split(' ')[1] || getCurrentTimeJP()); // 時間部分のみを抽出

    // 入浴データ
    const bathingData = ref({
      date: currentDate,
      time: currentTime,
      note: ""
    });

    // 入浴形態オプション
    const bathOptions = [
      "シャワー浴", "足浴", "洗身", "洗髪", "一部介助", "全介助",
      "湿布貼布", "水分補給", "着脱", "全身ボディチェック", 
      "皮膚状態", "かき傷あり", "あざあり", "浴槽に浸かり温もる"
    ];
    
    // 入浴形態の表示/非表示
    const showBathTypes = ref(true);
    
    // 入浴形態の表示/非表示を切り替える
    const toggleBathTypesVisibility = () => {
      showBathTypes.value = !showBathTypes.value;
    };
    
    // 選択された入浴形態
    const selectedBathTypes = ref([]);

       // モーダルが開いたときに食事データの値を取得
   onMounted(async () => {
     try {
       ShareStore.$patch({ isLoading: true });
    
       const bathingHistoryData = await ModaldataStore.getService(props.userId, 7, props.targetDate);
       console.log("入浴データ", bathingHistoryData.data);
      console.log("現在時刻", currentDate, currentTime);
       // 取得したデータを処理する（もし存在すれば）
       if (bathingHistoryData && bathingHistoryData.data && bathingHistoryData.data.length > 0) {
         const bathing = bathingHistoryData.data[0]; // 最新の入浴データを使用
         
         // 日付と時刻を設定
         bathingData.value.date = bathing.date || currentDate;
         bathingData.value.time = bathing.time || currentTime;
         console.log("入浴データ", bathingData.value);
         bathingData.value.note = bathing.note || "";
         bathingData.value.service_record_id = bathing.id || null;
         
         // ノートからオプションを復元
         if (bathing.note) {
           const options = bathing.note.split('、');
           
           // 入浴形態のオプションを処理
           options.forEach(option => {
             if (bathOptions.includes(option)) {
               selectedBathTypes.value.push(option);
             }
           });
           
           // 軟膏塗布の処理
           const ointmentMatch = bathing.note.match(/軟膏塗布（(.+)）/);
           if (ointmentMatch) {
             const areas = ointmentMatch[1].split('、');
             selectedOintmentAreas.value = areas;
             ointment.value = true;
             showOintmentAreas.value = true;
           } else if (bathing.note.includes('軟膏塗布')) {
             ointment.value = true;
             showOintmentAreas.value = true;
           }
           
           // 特変なしの処理
           if (bathing.note.includes('特変なし')) {
             noChange.value = true;
           }
         }
         
         console.log("入浴データ設定完了", {
           bathingData: bathingData.value,
           selectedBathTypes: selectedBathTypes.value,
           selectedOintmentAreas: selectedOintmentAreas.value,
           ointment: ointment.value,
           noChange: noChange.value
         });
       }
     } catch (error) {
       console.error('入浴データの取得中にエラーが発生しました:', error);
     } finally {
       ShareStore.$patch({ isLoading: false });
     }
   });
    
    // 入浴形態の選択/解除
    const toggleBathType = (type) => {
      const index = selectedBathTypes.value.indexOf(type);
      if (index === -1) {
        selectedBathTypes.value.push(type);
      } else {
        selectedBathTypes.value.splice(index, 1);
      }
      updateNoteWithSelectedOptions();
    };
    
    // 軟膏塗布の選択状態
    const ointment = ref(false);
    
    // 軟膏塗布の表示/非表示
    const showOintmentAreas = ref(false);
    
    // 軟膏塗布の表示/非表示を切り替える
    const toggleOintmentVisibility = () => {
      showOintmentAreas.value = !showOintmentAreas.value;
      
      // 初めて表示する場合、軟膏塗布を選択状態にする
      if (showOintmentAreas.value && !ointment.value && selectedOintmentAreas.value.length === 0) {
        ointment.value = true;
        updateNoteWithSelectedOptions();
      }
    };
    
    // 軟膏塗布の部位オプション
    const ointmentAreas = ["背中", "足", "腕", "首", "手", "全身"];
    
    // 選択された軟膏塗布部位
    const selectedOintmentAreas = ref([]);
    
    // 軟膏塗布部位の選択/解除
    const toggleOintmentArea = (area) => {
      const index = selectedOintmentAreas.value.indexOf(area);
      if (index === -1) {
        selectedOintmentAreas.value.push(area);
      } else {
        selectedOintmentAreas.value.splice(index, 1);
      }
      
      // 部位が選択されている場合、軟膏塗布を選択状態にする
      if (selectedOintmentAreas.value.length > 0 && !ointment.value) {
        ointment.value = true;
      }
      // 部位が選択されていない場合、軟膏塗布を解除する
      else if (selectedOintmentAreas.value.length === 0) {
        ointment.value = false;
      }
      
      updateNoteWithSelectedOptions();
    };
    
    // 特変なしの状態
    const noChange = ref(false);
    
    // 特変なしの選択/解除
    const toggleNoChange = () => {
      noChange.value = !noChange.value;
      updateNoteWithSelectedOptions();
    };

    // 選択されたオプションをテキストエリアに反映する
    const updateNoteWithSelectedOptions = () => {
      let selectedOptions = [...selectedBathTypes.value];
      
      if (ointment.value) {
        if (selectedOintmentAreas.value.length > 0) {
          selectedOptions.push(`軟膏塗布（${selectedOintmentAreas.value.join('、')}）`);
        } else {
          selectedOptions.push('軟膏塗布');
        }
      }
      
      if (noChange.value) {
        selectedOptions.push('特変なし');
      }
      
      bathingData.value.note = selectedOptions.join('、');
    };

    const saveBathing = async () => {
      try {
        const formattedTime = `${bathingData.value.date} ${bathingData.value.time}`;
        const shareStore = useShareStore();
        const modalDataStore = useModaldataStore();

        // 新規追加処理
        const result = await modalDataStore.Insert_to_Update_Service({
          user_id: Number(props.userId),
          item_id: 7,
          service_record_id: bathingData.value.service_record_id,
          served_time: formattedTime,
          note: bathingData.value.note,
          schedule_id: null,
          recorded_staff_id: 1
        });

        showSuccessToast('入浴記録を登録しました');
        emit('confirm');
      } catch (error) {
        console.error('記録エラー:', error);
        alert('入浴記録の保存に失敗しました');
      }
    };

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

    return {
      showSuccessToast,
      //-------------------//
      bathingData,
      bathOptions,
      showBathTypes,
      toggleBathTypesVisibility,
      selectedBathTypes,
      toggleBathType,
      ointment,
      showOintmentAreas,
      toggleOintmentVisibility,
      ointmentAreas,
      selectedOintmentAreas,
      toggleOintmentArea,
      noChange,
      toggleNoChange,
      updateNoteWithSelectedOptions,
      saveBathing,
      ShareStore,
      ModaldataStore,
      userName: props.userName
    };
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

/* トグルボタンのスタイル */
.toggle-btn {
  display: block;
  text-align: center;
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  cursor: pointer;
  background-color: white;
  color: #333;
  transition: all 0.2s;
}

.toggle-btn.active {
  background-color: #28a745;
  color: white;
  border-color: #218838;
}



/* フッター固定用のスタイル */
.fixed-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  /* padding: 1rem; */
  border-top: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  z-index: 10;
}
/* ヘッダー固定用のスタイル */
.fixed-header {
  top: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  padding: 1.25rem;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
}
</style>
