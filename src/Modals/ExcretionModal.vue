<template>
  <div class="modal-overlay">
    <!-- 外枠：高さを90vhに固定し、flexレイアウトでヘッダー・コンテンツ・フッターを配置 -->
    <div class="relative bg-white w-full max-w-3xl md:mx-4 md:rounded-lg shadow-xl md:h-[90vh] h-dvh flex flex-col">
      
      <!-- ヘッダー（固定） -->
      <div class="fixed-header">
        <span class="text-lg font-medium">排泄記録</span>
        <span class="text-base text-gray-600">{{ userName }} 様</span>
      </div>
      
      <!-- メインコンテンツ（スクロール可能） -->
      <div class="flex-1 overflow-y-auto p-5 pb-24 md:pb-5">
        <form @submit.prevent="saveExcretion">
          <!-- 共通日付・時刻 -->
          <div class="flex gap-4 mb-4">
            <div class="w-1/2">
              <DatePicker_modal v-model="excretionData.date" :useStoreDate="false" />
            </div>
            <div class="w-1/2">
              <input 
                type="time" 
                v-model="excretionData.time"
                class="w-full p-2 border border-gray-300 rounded"
              >
            </div>
          </div>
          
          <!-- 排便：先に「あり」「なし」ボタン -->
          <div class="mb-4">
            <div class="font-bold mb-1">排便</div>
            <div class="flex gap-2 radio-group">
              <input type="radio" id="feces_yes" v-model="excretionData.feces" value="あり">
              <label for="feces_yes" class="flex-1 text-center py-2 border border-gray-300 rounded cursor-pointer">あり</label>
              <input type="radio" id="feces_no" v-model="excretionData.feces" value="なし">
              <label for="feces_no" class="flex-1 text-center py-2 border border-gray-300 rounded cursor-pointer">なし</label>
            </div>
          </div>
          
          <!-- 便詳細（表示条件：排便「あり」のときのみ） -->
          <div v-if="excretionData.feces === 'あり'" class="mb-4">
            <div class="mb-2">
              <div class="font-bold mb-1">便量</div>
              <div class="flex gap-2 radio-group">
                <input type="radio" id="stool_amount1" v-model="excretionData.stoolAmount" value="付">
                <label for="stool_amount1" class="flex-1 text-center py-2 border border-gray-300 rounded cursor-pointer">付</label>
                <input type="radio" id="stool_amount2" v-model="excretionData.stoolAmount" value="少">
                <label for="stool_amount2" class="flex-1 text-center py-2 border border-gray-300 rounded cursor-pointer">少</label>
                <input type="radio" id="stool_amount3" v-model="excretionData.stoolAmount" value="中">
                <label for="stool_amount3" class="flex-1 text-center py-2 border border-gray-300 rounded cursor-pointer">中</label>
                <input type="radio" id="stool_amount4" v-model="excretionData.stoolAmount" value="多">
                <label for="stool_amount4" class="flex-1 text-center py-2 border border-gray-300 rounded cursor-pointer">多</label>
              </div>
            </div>
            <div class="mb-2">
              <div class="font-bold mb-1">便形状</div>
              <div class="flex flex-wrap gap-2 radio-group">
                <input type="radio" id="stool_form1" v-model="excretionData.stoolForm" value="水">
                <label for="stool_form1" class="w-[calc(25%-0.375rem)] text-center py-2 border border-gray-300 rounded cursor-pointer">水</label>
                <input type="radio" id="stool_form2" v-model="excretionData.stoolForm" value="泥">
                <label for="stool_form2" class="w-[calc(25%-0.375rem)] text-center py-2 border border-gray-300 rounded cursor-pointer">泥</label>
                <input type="radio" id="stool_form3" v-model="excretionData.stoolForm" value="不">
                <label for="stool_form3" class="w-[calc(25%-0.375rem)] text-center py-2 border border-gray-300 rounded cursor-pointer">不</label>
                <input type="radio" id="stool_form4" v-model="excretionData.stoolForm" value="普">
                <label for="stool_form4" class="w-[calc(25%-0.375rem)] text-center py-2 border border-gray-300 rounded cursor-pointer">普</label>
                <input type="radio" id="stool_form5" v-model="excretionData.stoolForm" value="軟">
                <label for="stool_form5" class="w-[calc(25%-0.375rem)] text-center py-2 border border-gray-300 rounded cursor-pointer">軟</label>
                <input type="radio" id="stool_form6" v-model="excretionData.stoolForm" value="硬">
                <label for="stool_form6" class="w-[calc(25%-0.375rem)] text-center py-2 border border-gray-300 rounded cursor-pointer">硬</label>
                <input type="radio" id="stool_form7" v-model="excretionData.stoolForm" value="粘">
                <label for="stool_form7" class="w-[calc(25%-0.375rem)] text-center py-2 border border-gray-300 rounded cursor-pointer">粘</label>
              </div>
            </div>
          </div>
          
          <!-- 排尿：初期値「なし」 -->
          <div class="mb-4">
            <div class="font-bold mb-1">排尿</div>
            <div class="flex gap-2 radio-group">
              <input type="radio" id="urine_yes" v-model="excretionData.urine" value="あり">
              <label for="urine_yes" class="flex-1 text-center py-2 border border-gray-300 rounded cursor-pointer">あり</label>
              <input type="radio" id="urine_no" v-model="excretionData.urine" value="なし">
              <label for="urine_no" class="flex-1 text-center py-2 border border-gray-300 rounded cursor-pointer">なし</label>
            </div>
          </div>
          
          <!-- パット交換：初期値「なし」 -->
          <div class="mb-4">
            <div class="font-bold mb-1">パット交換</div>
            <div class="flex gap-2 radio-group">
              <input type="radio" id="pad_yes" v-model="excretionData.pad" value="あり">
              <label for="pad_yes" class="flex-1 text-center py-2 border border-gray-300 rounded cursor-pointer">あり</label>
              <input type="radio" id="pad_no" v-model="excretionData.pad" value="なし">
              <label for="pad_no" class="flex-1 text-center py-2 border border-gray-300 rounded cursor-pointer">なし</label>
            </div>
          </div>
          
          <textarea v-model="excretionData.note" placeholder="記録内容" class="w-full p-2 mb-4 border border-gray-300 rounded min-h-[100px]"></textarea>
          
          <!-- 記録テンプレボタン -->
          <div class="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
            <button 
              type="button" 
              class="toggle-btn" 
              :class="{ 'active': selectedOptions.includes('特変なし') }"
              @click="toggleOption('特変なし')"
            >
              特変なし
            </button>
            <button 
              type="button" 
              class="toggle-btn" 
              :class="{ 'active': selectedOptions.includes('リハパン交換') }"
              @click="toggleOption('リハパン交換')"
            >
              リハパン交換
            </button>
            <button 
              type="button" 
              class="toggle-btn" 
              :class="{ 'active': selectedOptions.includes('オムツ交換') }"
              @click="toggleOption('オムツ交換')"
            >
              オムツ交換
            </button>
            <button 
              type="button" 
              class="toggle-btn" 
              :class="{ 'active': selectedOptions.includes('陰部洗浄') }"
              @click="toggleOption('陰部洗浄')"
            >
              陰部洗浄
            </button>
            <button 
              type="button" 
              class="toggle-btn" 
              :class="{ 'active': selectedOptions.includes('清拭') }"
              @click="toggleOption('清拭')"
            >
              清拭
            </button>
            <button 
              type="button" 
              class="toggle-btn" 
              :class="{ 'active': selectedOptions.includes('テレミン挿肛') }"
              @click="toggleOption('テレミン挿肛')"
            >
              テレミン挿肛
            </button>
            <button 
              type="button" 
              class="toggle-btn" 
              :class="{ 'active': selectedOptions.includes('汚染あり') }"
              @click="toggleOption('汚染あり')"
            >
              汚染あり
            </button>
          </div>
        </form>
      </div>
      
      <!-- フッター（固定） -->
      <div class="fixed-footer">
        <button type="button" class="w-[50%] bg-gray-500 text-white py-3 font-semibold" @click="$emit('close')">閉じる</button>
        <button 
          type="submit" 
          class="w-[50%] text-white py-3 font-semibold" 
          :class="excretionData.service_record_id ? 'bg-red-700' : 'bg-blue-700'"
          @click="saveExcretion"
        >
          {{ excretionData.service_record_id ? '更新' : '登録' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted,getCurrentInstance } from "vue";
import { useShareStore } from "../stores/useShareData.js";
import { useModaldataStore } from "../stores/Modaldata.js";
import { getTodayYYYYMMDD, getCurrentTimeJP } from "../utils/timeUtils.js"; // timeUtilsから関数をインポート
import DatePicker_modal from '../DatePicker/DatePicker_modal.vue';

export default {
  components: {
    DatePicker_modal
  },
  emits: ["close", "confirm"],

  props: {
    initialData: {
      type: Object,
      default: () => ({})
    },
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
    service_status: {
      type: String,
      required: true
    }
  },

  setup(props, { emit }) {
    const ShareStore = useShareStore();
    const ModaldataStore = useModaldataStore();
    
    // APIデータを画面表示用に変換する関数
    const convertApiDataToFormData = (apiData) => {
      if (!apiData || Object.keys(apiData).length === 0) {
        // 新規作成時のデフォルト値
        return {
          date: props.targetDate,  // propsから日付を取得
          time: getCurrentTimeJP(),
          feces: 'なし',
          stoolAmount: '',
          stoolForm: '',
          urine: 'なし',
          pad: 'なし',
          note: '',
          service_record_id: null
        };
      }

      // APIデータがある場合の変換
      return {
        date: apiData.date || props.targetDate,
        time: apiData.time || getCurrentTimeJP(),
        feces: apiData.defecate_quantity ? 'あり' : 'なし',
        stoolAmount: apiData.defecate_quantity || '',
        stoolForm: apiData.defecate_condition || '',
        urine: apiData.urine_quantity ? 'あり' : 'なし',
        pad: apiData.exchange_name === '交換有' ? 'あり' : 'なし',
        note: apiData.note || '',
        service_record_id: apiData.service_record_id || null
      };
    };

    // 初期値の設定
    const excretionData = ref(convertApiDataToFormData(props.initialData));
    
    // オプションの初期設定
    const selectedOptions = ref(
      props.initialData?.note ? props.initialData.note.split('、') : []
    );
    
    // オプションの選択/解除
    const toggleOption = (option) => {
      const index = selectedOptions.value.indexOf(option);
      if (index === -1) {
        selectedOptions.value.push(option);
      } else {
        selectedOptions.value.splice(index, 1);
      }
      updateNotes();
    };
    
    // 選択されたオプションをテキストエリアに反映する
    const updateNotes = () => {
      if (selectedOptions.value.length > 0) {
        excretionData.value.note = selectedOptions.value.join('、');
      } else {
        excretionData.value.note = "";
      }
    };

    const setDefaultNote = () => {
      excretionData.value.note = "特変なし";
      selectedOptions.value = ["特変なし"];
    };

    const saveExcretion = async () => {
      try {
        ShareStore.$patch({ isLoading: true });
        
        // 排尿量IDの取得
        const getUrineQuantityId = (value) => {
          return value === 'あり' ? 1 : 0;  // 「なし」の場合は0を返す
        };

        // 排便量IDの取得
        const getDefecateQuantityId = (value) => {
          const amountMap = {
            '付': 1,
            '少': 2,
            '中': 3,
            '多': 4
          };
          return excretionData.value.feces === 'あり' ? (amountMap[value] || 0) : 0;
        };

        // 排便状態IDの取得
        const getDefecateConditionId = (value) => {
          const formMap = {
            '水': 1,
            '泥': 2,
            '不': 3,
            '普': 4,
            '軟': 5,
            '硬': 6,
            '粘': 7
          };
          // 排便がない場合はnullを返す
          if (excretionData.value.feces !== 'あり') {
            return null;
          }
          return formMap[value] || null;
        };

        // パット交換IDの取得
        const getExchangeId = (value) => {
          return value === 'あり' ? 1 : 0;  // 「なし」の場合は0を返す
        };

        // 各IDを取得
        const urineQuantityId = getUrineQuantityId(excretionData.value.urine);
        const defecateQuantityId = getDefecateQuantityId(excretionData.value.stoolAmount);
        const defecateConditionId = getDefecateConditionId(excretionData.value.stoolForm);
        const exchangeId = getExchangeId(excretionData.value.pad);

        // サービス記録用のデータを作成
        const postData = {
          service_record_id: excretionData.value.service_record_id,
          user_id: props.userId,
          served_time: `${excretionData.value.date} ${excretionData.value.time}`,
          urine_quantity_id: urineQuantityId,
          defecate_quantity_id: defecateQuantityId,
          defecate_condition_id: defecateConditionId, // nullを許可
          exchange_id: exchangeId,
          note: excretionData.value.note,
          schedule_id: null,
          recorded_staff_id: 1
        };

        console.log('送信データ:', postData); // デバッグ用
        console.log("✅利用者ID:",props.userId);

        // Insert_to_Update_Serviceを使用して保存
        await ModaldataStore.saveExcretion(postData, props.userId);

        showSuccessToast('排泄記録が完了しました');
        emit('confirm');
      } catch (error) {
        console.error('記録エラー:', error);
        // エラーメッセージをユーザーに表示
        if (proxy && proxy.$toast) {
          proxy.$toast.open({
            message: `エラーが発生しました: ${error.message}`,
            type: "error",
            duration: 3000,
            position: "top",
          });
        }
      } finally {
        ShareStore.$patch({ isLoading: false });
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
      excretionData,
      selectedOptions,
      toggleOption,
      updateNotes,
      setDefaultNote,
      saveExcretion,
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

/* ラジオボタンを非表示にする */
.radio-group input[type="radio"] {
  display: none;
}

/* 選択されたラジオボタンのラベルスタイル */
.radio-group input[type="radio"]:checked + label {
  background-color: #28a745;
  color: white;
  border-color: #218838;
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
