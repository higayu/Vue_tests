<template>
  <div class="modal-overlay">
    <!-- モーダル全体：高さ90vh、flexレイアウトでヘッダー・コンテンツ・フッターを配置 -->
    <div class="relative bg-white w-full max-w-3xl md:mx-4 md:rounded-lg shadow-xl md:h-[90vh] h-dvh flex flex-col">
      
      <!-- ヘッダー（固定） -->
      <div class="fixed-header">
        <span class="text-lg">バイタル</span>
        <span class="text-base text-gray-600">{{ userName || '●●●●' }} 様</span>
      </div>
      
      <!-- メインコンテンツ（スクロール可能） -->
      <div class="flex-1 overflow-y-auto p-5 pb-24 md:pb-5">
        <div class="flex mb-4">
          <button 
            class="w-full py-5 rounded text-xl mr-2"
            :class="activeTab === 'first-measurement' ? 'bg-green-600 text-white' : 'bg-white text-green-600 border border-green-600'"
            @click="switchTab('first-measurement')"
          >
            1回目
          </button>
          <button 
            class="w-full py-5 rounded text-xl"
            :class="activeTab === 'remeasure' ? 'bg-green-600 text-white' : 'bg-white text-green-600 border border-green-600'"
            @click="switchTab('remeasure')"
          >
            再測
          </button>
        </div>
        <form @submit.prevent="submitVital">
          <!-- 共通日付・時刻 -->
          <div class="flex gap-4 mb-4">
            <div class="w-1/2">
              <DatePicker_modal v-model="currentDate" :useStoreDate="false" />
            </div>
            <div class="w-1/2">
              <input 
                type="time" 
                v-model="currentTime"
                class="w-full p-2 border border-gray-300 rounded"
              >
            </div>
          </div>
          
          <!-- 1回目測定 -->
          <div v-if="activeTab === 'first-measurement'">
            <div class="my-4 mx-1 text-xl font-bold">1回目</div>
            <!-- 血圧入力行 -->
            <div class="flex gap-2 mb-4">
              <div 
                class="flex-1 p-2 border border-gray-300 rounded bg-white cursor-pointer"
                @click="openKeypad('bpMax1', '血圧 MAX', 'bloodPressureMax')"
              >
                {{ firstMeasurement.max_bp || '血圧 MAX' }}
              </div>
              <span class="self-center">/</span>
              <div 
                class="flex-1 p-2 border border-gray-300 rounded bg-white cursor-pointer"
                @click="openKeypad('bpMin1', '血圧 MIN', 'bloodPressureMin')"
              >
                {{ firstMeasurement.min_bp || '血圧 MIN' }}
              </div>
            </div>
            <!-- 他のバイタル入力行 -->
            <div class="md:grid md:grid-cols-2 md:gap-4">
              <div 
                class="w-full p-2 mb-4 md:mb-0 border border-gray-300 rounded bg-white cursor-pointer"
                @click="openKeypad('pulse1', '脈拍 / P', 'pulse')"
              >
                {{ firstMeasurement.pulse || '脈拍 / P' }}
              </div>
              <div 
                class="w-full p-2 mb-4 md:mb-0 border border-gray-300 rounded bg-white cursor-pointer"
                @click="openKeypad('temp1', '体温 / KT', 'temperature')"
              >
                {{ firstMeasurement.kt || '体温 / KT' }}
              </div>
              <div 
                class="w-full p-2 mb-4 border border-gray-300 rounded bg-white cursor-pointer"
                @click="openKeypad('spo21', '酸素飽和度 / SPO2', 'spo2')"
              >
                {{ firstMeasurement.spo2 || '酸素飽和度 / SPO2' }}
              </div>
            </div>
          </div>
          
          <!-- 再測 -->
          <div v-if="activeTab === 'remeasure'">
            <div class="my-4 mx-1 text-xl font-bold">再測</div>
            <!-- エラーメッセージ表示 -->
            <div v-if="reMeasurementError" class="text-red-500 mb-4">
              {{ reMeasurementError }}
            </div>
            <!-- 血圧入力行 -->
            <div class="flex gap-2 mb-4">
              <div 
                class="flex-1 p-2 border border-gray-300 rounded bg-white cursor-pointer"
                @click="openKeypad('bpMax2', '血圧 MAX', 'bloodPressureMax')"
              >
                {{ reMeasurement.max_bp || '血圧 MAX' }}
              </div>
              <span class="self-center">/</span>
              <div 
                class="flex-1 p-2 border border-gray-300 rounded bg-white cursor-pointer"
                @click="openKeypad('bpMin2', '血圧 MIN', 'bloodPressureMin')"
              >
                {{ reMeasurement.min_bp || '血圧 MIN' }}
              </div>
            </div>
            <!-- 他のバイタル入力行 -->
            <div class="md:grid md:grid-cols-2 md:gap-4">
              <div 
                class="w-full p-2 mb-4 md:mb-0 border border-gray-300 rounded bg-white cursor-pointer"
                @click="openKeypad('pulse2', '脈拍 / P', 'pulse')"
              >
                {{ reMeasurement.pulse || '脈拍 / P' }}
              </div>
              <div 
                class="w-full p-2 mb-4 md:mb-0 border border-gray-300 rounded bg-white cursor-pointer"
                @click="openKeypad('temp2', '体温 / KT', 'temperature')"
              >
                {{ reMeasurement.kt || '体温 / KT' }}
              </div>
              <div 
                class="w-full p-2 mb-4 md:mb-0 border border-gray-300 rounded bg-white cursor-pointer"
                @click="openKeypad('spo22', '酸素飽和度 / SPO2', 'spo2')"
              >
                {{ reMeasurement.spo2 || '酸素飽和度 / SPO2' }}
              </div>
            </div>
          </div>
        
          <div v-if="service_status == 'fac'">
          <!-- 記録内容 -->
          <textarea 
            v-model="currentNotes" 
            placeholder="記録内容" 
            class="w-full p-2 mb-4 border border-gray-300 rounded min-h-[100px]"
          ></textarea>
          
          <!-- 記録テンプレボタン -->
          <div class="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
            <button 
              type="button" 
              class="toggle-btn" 
              :class="{ 'active': selectedOptions.ActiveOption.includes('特変なし') }"
              @click="toggleOption('特変なし')"
            >
              特変なし
            </button>
            <button 
              type="button" 
              class="toggle-btn" 
              :class="{ 'active': selectedOptions.ActiveOption.includes('痛みあり') }"
              @click="toggleOption('痛みあり')"
            >
              痛みあり
            </button>
            <button 
              type="button" 
              class="toggle-btn" 
              :class="{ 'active': selectedOptions.ActiveOption.includes('体調良好') }"
              @click="toggleOption('体調良好')"
            >
              体調良好
            </button>
            <button 
              type="button" 
              class="toggle-btn" 
              :class="{ 'active': selectedOptions.ActiveOption.includes('体調不良') }"
              @click="toggleOption('体調不良')"
            >
              体調不良
            </button>
            <button 
              type="button" 
              class="toggle-btn" 
              :class="{ 'active': selectedOptions.ActiveOption.includes('血圧（高値）') }"
              @click="toggleOption('血圧（高値）')"
            >
              血圧（高値）
            </button>
            <button 
              type="button" 
              class="toggle-btn" 
              :class="{ 'active': selectedOptions.ActiveOption.includes('血圧（低値）') }"
              @click="toggleOption('血圧（低値）')"
            >
              血圧（低値）
            </button>
            <button 
              type="button" 
              class="toggle-btn" 
              :class="{ 'active': selectedOptions.ActiveOption.includes('バイタル測定再検') }"
              @click="toggleOption('バイタル測定再検')"
            >
              バイタル測定再検
            </button>
          </div>
          </div>

        </form>
      </div>
      
      <!-- フッター（固定） -->
      <div class="fixed-footer">
        <button 
          type="button" 
          class="w-[50%] bg-gray-500 text-white py-3 font-semibold" 
          @click="$emit('close')"
        >
          閉じる
        </button>
        <button type="button" class="w-[50%] bg-blue-700 text-white py-3 font-semibold" @click="submitVital">登録</button>
      </div>
    </div>
    
    <!-- テンキーモーダル -->
    <KeypadModal
      v-if="showKeypad"
      :userName="userName"
      :inputLabel="keypadLabel"
      :initialValue="keypadInitialValue"
      :fieldType="keypadFieldType"
      @close="closeKeypad"
      @update:value="updateFieldValue"
    />
  </div>
</template>

<script>
import { ref, computed, getCurrentInstance, onMounted } from 'vue';
import KeypadModal from './KeypadModal.vue';
import DatePicker_modal from '../DatePicker/DatePicker_modal.vue';
import { useShareStore } from "../stores/useShareData.js"; // Piniaストアをインポート
import { useModaldataStore } from "../stores/Modaldata.js";
import { useHoumonStore } from "../stores/Houmon.js";
import { getTodayYYYYMMDD, getCurrentTimeJP } from "../utils/timeUtils.js"; // timeUtilsから関数をインポート

export default {
  components: {
    KeypadModal,
    DatePicker_modal
  },
  
  props: {
    userId: {
      type: Number,
      required: true,
      default: 0,
      validator: (value) => {
        if (value <= 0) {
          console.warn('VitalModal: Invalid userId provided:', value);
          return false;
        }
        return true;
      }
    },
    targetDate: {
      type: String,
      required: true,
      default: '',
      validator: (value) => {
        if (!value) {
          console.warn('VitalModal: Empty targetDate provided');
          return false;
        }
        return true;
      }
    },
    userName: {
      type: String,
      required: true,
      default: '',
      validator: (value) => {
        if (!value) {
          console.warn('VitalModal: Empty userName provided');
          return false;
        }
        return true;
      }
    },
    service_status: {
      type: String,
      required: true,
      default: 'vis',
      validator: (value) => {
        const validStatuses = ['fac', 'vis', 'kiroku'];
        if (!validStatuses.includes(value)) {
          console.warn('VitalModal: Invalid service_status provided:', value);
          return false;
        }
        return true;
      }
    }
  },
  
  setup(props, { emit }) {
    // デバッグログを追加
    console.log('VitalModal props:', {
      userId: props.userId,
      targetDateTime: props.targetDate,
      userName: props.userName,
      service_status: props.service_status
    });

    const ShareStore = useShareStore();
    const ModaldataStore = useModaldataStore();
    const HoumonStore = useHoumonStore();       
    
    const activeTab = ref("first-measurement");

    // 日付と時刻の初期値を設定
    console.log("props.targetDateの値", props.targetDate);
    const initialDate = props.targetDate ? props.targetDate.split(' ')[0] : getTodayYYYYMMDD();
    const initialTime = getCurrentTimeJP();
    
    console.log("initialDateの値", initialDate);
    console.log("initialTimeの値", initialTime);

    const firstMeasurement = ref({
      date: initialDate,
      time: getCurrentTimeJP(),
      max_bp: "",
      min_bp: "",
      pulse: "",
      kt: "",
      spo2: "",
      note: "",
      service_record_id: null
    });

    const reMeasurement = ref({
      date: initialDate,
      time: null,
      max_bp: "",
      min_bp: "",
      pulse: "",
      kt: "",
      spo2: "",
      note: "",
      service_record_id: null
    });
    
    const notes = ref("");

    // 選択されたオプションをオブジェクトで管理
    const selectedOptions = ref({
      ActiveOption: [],
      firstMeasurement: [],
      reMeasurement: []
    });
    
    // Computed properties for date and time based on active tab
    const currentDate = computed({
      get: () => {
        return activeTab.value === 'first-measurement' 
          ? firstMeasurement.value.date 
          : reMeasurement.value.date;
      },
      set: (newValue) => {
        if (activeTab.value === 'first-measurement') {
          firstMeasurement.value.date = newValue;
        } else {
          reMeasurement.value.date = newValue;
        }
      }
    });

    const currentTime = computed({
      get: () => {
        return activeTab.value === 'first-measurement'
          ? firstMeasurement.value.time
          : reMeasurement.value.time;
      },
      set: (newValue) => {
        if (activeTab.value === 'first-measurement') {
          firstMeasurement.value.time = newValue;
        } else {
          reMeasurement.value.time = newValue;
        }
      }
    });

    // Computed property for notes based on active tab
    const currentNotes = computed(() => {
      return activeTab.value === 'first-measurement' ? firstMeasurement.value.note : reMeasurement.value.note;
    });
    
    // モーダルが開いたときにバイタルの値を取得
    onMounted(async () => {
      try {
        ShareStore.$patch({ isLoading: true });
        if(props.service_status == 'fac' || props.service_status == 'kiroku'){
          const vitalData = await ModaldataStore.getVital(props.userId, props.targetDate); // modalIdを使ってデータを取得
          await  getVitalData(vitalData);
        }else if(props.service_status == 'vis'){
        
          const vitalData = HoumonStore.VitalData; // modalIdを使ってデータを取得
           console.log("訪問サービス用の処理", vitalData);
          if(vitalData){
           await  getVitalData(vitalData);
          }
        }
      } catch (error) {
        console.error('バイタルデータの取得中にエラーが発生しました:', error);
      } finally {
        ShareStore.$patch({ isLoading: false });
      }
    });

    // バイタルデータを取得
    const getVitalData = async (vitalData) => {
        console.log("受け取ったバイタルデータ:", vitalData);
        
        if (!vitalData || !Array.isArray(vitalData)) {
          console.log("バイタルデータが存在しないか、配列ではありません");
          setDefaultValues();
          return;
        }

        // 配列の要素がnullでないかチェック
        const validData = vitalData.filter(data => data !== null);
        console.log("有効なバイタルデータ:", validData);

        if (validData.length === 0) {
          console.log("有効なバイタルデータがありません。デフォルト値を設定します。");
          setDefaultValues();
          return;
        }

        if (validData.length === 1) {
          console.log("1件のバイタルデータを設定します。");
          firstMeasurement.value = createMeasurementData(validData[0]);
          reMeasurement.value = createDefaultMeasurementData(false); // 再測は時刻なし
        } else if (validData.length === 2) {
          console.log("2件のバイタルデータを設定します。");
          firstMeasurement.value = createMeasurementData(validData[0]);
          reMeasurement.value = createMeasurementData(validData[1]);
        }
    };

    // デフォルト値を設定する関数
    const setDefaultValues = () => {
      firstMeasurement.value = createDefaultMeasurementData(true); // 1回目は現在時刻
      reMeasurement.value = createDefaultMeasurementData(false); // 再測は時刻なし
    };

    // 測定データオブジェクトを作成する関数
    const createMeasurementData = (data) => {
      return {
        date: data?.date || initialDate,
        time: data?.time || getCurrentTimeJP(), // 現在時刻をデフォルト値として設定
        max_bp: data?.max_bp || "",
        min_bp: data?.min_bp || "",
        pulse: data?.pulse || "",
        kt: data?.kt || "",
        spo2: data?.spo2 || "",
        note: data?.note || "",
        service_record_id: data?.service_record_id || null
      };
    };

    // デフォルトの測定データオブジェクトを作成する関数
    const createDefaultMeasurementData = (isFirstMeasurement = true) => {
      return {
        date: initialDate,
        time: isFirstMeasurement ? getCurrentTimeJP() : null, // 1回目のみ現在時刻を設定
        max_bp: "",
        min_bp: "",
        pulse: "",
        kt: "",
        spo2: "",
        note: "",
        service_record_id: null
      };
    };

    // タブの切り替え
    const switchTab = (tab) => {
      activeTab.value = tab;
      // ActiveOptionを現在のタブに基づいて更新
      if (selectedOptions.value[tab]) {
        selectedOptions.value.ActiveOption = selectedOptions.value[tab].slice(); // 現在のタブのオプションをActiveOptionに設定
      } else {
        selectedOptions.value.ActiveOption = []; // タブが存在しない場合は空の配列を設定
      }
    };

    // オプションの選択/解除
    const toggleOption = (option) => {
      console.log("Before toggle:", selectedOptions.value); // Debugging: log before toggle

      // Ensure the selectedOptions for the active tab is defined
      const currentOptions = selectedOptions.value[activeTab.value] || [];
      const index = currentOptions.indexOf(option);
      
      if (index === -1) {
        currentOptions.push(option);
        selectedOptions.value.ActiveOption.push(option);
        console.log(`Added option: ${option}`); // Debugging: log added option
        console.log("Active buttons:", selectedOptions.value.ActiveOption); // Debugging: log active buttons
      } else {
        currentOptions.splice(index, 1);
        selectedOptions.value.ActiveOption.splice(selectedOptions.value.ActiveOption.indexOf(option), 1);
        console.log(`Removed option: ${option}`); // Debugging: log removed option
      }

      // Update the selectedOptions object
      selectedOptions.value[activeTab.value] = currentOptions;

      console.log("After toggle:", selectedOptions.value); // Debugging: log after toggle
      updateNotes(); // Update notes after toggling
    };
    
    // 選択されたオプションをテキストエリアに反映する
    const updateNotes = () => {
      if (selectedOptions.value[activeTab.value].length > 0) {
        notes.value = selectedOptions.value[activeTab.value].join('、'); // Update notes directly
      } else {
        notes.value = ""; // Clear notes if no options are selected
      }
      
      // Update the note in the current measurement based on the active tab
      if (activeTab.value === 'first-measurement') {
        firstMeasurement.value.note = notes.value; // Update first measurement note
      } else {
        reMeasurement.value.note = notes.value; // Update re-measurement note
      }
    };
    
    // テンキーモーダル関連の状態
    const showKeypad = ref(false);
    const currentField = ref(null);
    const keypadLabel = ref('');
    const keypadInitialValue = ref('');
    const keypadFieldType = ref('default');
    
    // テンキーモーダルを開く
    const openKeypad = (field, label, fieldType) => {
      currentField.value = field;
      keypadLabel.value = label;
      keypadFieldType.value = fieldType;
      
      // 現在の値を文字列型に変換して設定
      switch(field) {
        case 'bpMax1': keypadInitialValue.value = String(firstMeasurement.value.max_bp || ''); break;
        case 'bpMin1': keypadInitialValue.value = String(firstMeasurement.value.min_bp || ''); break;
        case 'pulse1': keypadInitialValue.value = String(firstMeasurement.value.pulse || ''); break;
        case 'temp1': keypadInitialValue.value = String(firstMeasurement.value.kt || ''); break;
        case 'spo21': keypadInitialValue.value = String(firstMeasurement.value.spo2 || ''); break;
        case 'bpMax2': keypadInitialValue.value = String(reMeasurement.value.max_bp || ''); break;
        case 'bpMin2': keypadInitialValue.value = String(reMeasurement.value.min_bp || ''); break;
        case 'pulse2': keypadInitialValue.value = String(reMeasurement.value.pulse || ''); break;
        case 'temp2': keypadInitialValue.value = String(reMeasurement.value.kt || ''); break;
        case 'spo22': keypadInitialValue.value = String(reMeasurement.value.spo2 || ''); break;
      }
      
      showKeypad.value = true;
    };
    
    // テンキーモーダルを閉じる
    const closeKeypad = () => {
      showKeypad.value = false;
      currentField.value = null;
    };
    
    // テンキーモーダルからの値を更新
    const updateFieldValue = (value) => {
      switch(currentField.value) {
        case 'bpMax1': firstMeasurement.value.max_bp = value; break;
        case 'bpMin1': firstMeasurement.value.min_bp = value; break;
        case 'pulse1': firstMeasurement.value.pulse = value; break;
        case 'temp1': firstMeasurement.value.kt = value; break;
        case 'spo21': firstMeasurement.value.spo2 = value; break;
        case 'bpMax2': reMeasurement.value.max_bp = value; break;
        case 'bpMin2': reMeasurement.value.min_bp = value; break;
        case 'pulse2': reMeasurement.value.pulse = value; break;
        case 'temp2': reMeasurement.value.kt = value; break;
        case 'spo22': reMeasurement.value.spo2 = value; break;
      }
    };
    
    const setDefaultNote = () => {
      notes.value = "特変なし";
      selectedOptions.value.firstMeasurement = ["特変なし"];
      selectedOptions.value.reMeasurement = ["特変なし"];
    };
    
    const reMeasurementError = ref(''); // 再測のエラーメッセージ用のrefを追加

    const validateReMeasurement = () => {
      // 再測のいずれかの項目が入力されているかチェック
      const hasReMeasurementData = 
        reMeasurement.value.max_bp || 
        reMeasurement.value.min_bp || 
        reMeasurement.value.pulse || 
        reMeasurement.value.kt || 
        reMeasurement.value.spo2 || 
        reMeasurement.value.note;

      // 時間が未入力で他の項目が入力されている場合
      if (hasReMeasurementData && !reMeasurement.value.time) {
        reMeasurementError.value = '再測の時間を入力してください';
        return false;
      }

      reMeasurementError.value = '';
      return true;
    };

    const submitVital = async () => {
      try {
        // バリデーションチェック
        if (!validateReMeasurement()) {
          return;
        }

        ShareStore.$patch({isLoading:true});
        
        // 1回目の測定データを準備
        const firstMeasurementData = firstMeasurement.value.date && firstMeasurement.value.time ? {
          service_record_id: firstMeasurement.value.service_record_id,
          time: firstMeasurement.value.time,
          date: firstMeasurement.value.date,
          max_bp: firstMeasurement.value.max_bp,
          min_bp: firstMeasurement.value.min_bp,
          pulse: firstMeasurement.value.pulse,
          kt: firstMeasurement.value.kt,
          spo2: firstMeasurement.value.spo2,
          note: firstMeasurement.value.note
        } : null;

        // 再測データを準備（時刻がnullの場合は送信しない）
        const reMeasurementData = reMeasurement.value.date && reMeasurement.value.time ? {
          service_record_id: reMeasurement.value.service_record_id,
          time: reMeasurement.value.time,
          date: reMeasurement.value.date,
          max_bp: reMeasurement.value.max_bp,
          min_bp: reMeasurement.value.min_bp,
          pulse: reMeasurement.value.pulse,
          kt: reMeasurement.value.kt,
          spo2: reMeasurement.value.spo2,
          note: reMeasurement.value.note
        } : null;

        if (props.service_status == 'fac') {
          // 1回目の測定を保存
          if (firstMeasurementData) {
            await ModaldataStore.saveVital([firstMeasurementData, reMeasurementData], props.userId);
          } else {
            console.log("1回目の測定データが存在しません");
            return;
          }
        } else if (props.service_status == 'vis') {
          // 訪問サービス用の処理
          await HoumonStore.setVital([firstMeasurementData, reMeasurementData]);
        } else if(props.service_status == 'kiroku') {
          await ModaldataStore.saveVital([firstMeasurementData, reMeasurementData], props.userId);
        }

        ShareStore.$patch({ isLoading: false });
        showSuccessToast('バイタル記録が完了しました');
        emit('confirm');
      } catch (error) {
        console.error('記録エラー:', error);
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
      //-------------------//
      ShareStore,
      ModaldataStore,
      activeTab,
      firstMeasurement,
      reMeasurement,
      notes,
      selectedOptions,
      toggleOption,
      updateNotes,
      setDefaultNote,
      submitVital,
      // Computed properties
      currentDate,
      currentTime,
      currentNotes,
      // テンキーモーダル関連
      showKeypad,
      keypadLabel,
      keypadInitialValue,
      keypadFieldType,
      openKeypad,
      closeKeypad,
      updateFieldValue,
      switchTab,
      // エラーメッセージ
      reMeasurementError,
      // props
      userName: computed(() => props.userName),
      service_status: computed(() => props.service_status)
    };
  }
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
  background-color: #28a745; /* 緑色の背景 */
  color: white;
  border-color: #218838;
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
