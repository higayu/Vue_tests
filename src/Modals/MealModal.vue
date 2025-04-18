<template>
  <div class="modal-overlay">
    <!-- 外枠：90vh、flexレイアウトでヘッダー・コンテンツ・フッターを配置 -->
    <div class="relative bg-white w-full max-w-3xl md:mx-4 md:rounded-lg shadow-xl md:h-[90vh] h-dvh flex flex-col">
      
      <!-- ヘッダー（固定） -->
      <div class="fixed-header">
        <span class="text-lg font-medium">食事記録</span>
        <span class="text-base text-gray-600">{{ userName || '●●●●' }} 様</span>
      </div>
      
      <!-- メインコンテンツ（スクロール可能） -->
      <div class="flex-1 overflow-y-auto p-5 pb-24 md:pb-5">
        <form @submit.prevent="saveMeal">
          <!-- 食事時間択一 -->
          <div class="flex gap-2 mb-4 meal-toggle">
            <input type="radio" id="meal_morning" v-model="activeMealTime" value="朝">
            <label id="meal_morning-label" for="meal_morning" class="flex-1 text-center py-2 border border-gray-300 rounded cursor-pointer">朝</label>
            <input type="radio" id="meal_noon" v-model="activeMealTime" value="昼">
            <label id="meal_noon-label" for="meal_noon" class="flex-1 text-center py-2 border border-gray-300 rounded cursor-pointer">昼</label>
            <input type="radio" id="meal_evening" v-model="activeMealTime" value="夕">
            <label id="meal_evening-label" for="meal_evening" class="flex-1 text-center py-2 border border-gray-300 rounded cursor-pointer">夕</label>
          </div>
          
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
          
          <!-- エラーメッセージ表示 -->
          <div v-if="mealError" class="text-red-500 mb-4">
            {{ mealError }}
          </div>
          
          <!-- 主食・副食入力行 -->
          <div id="meal-input" class="md:flex md:items-stretch md:gap-8 mb-6 bg-white border border-gray-400 rounded p-4 md:p-6">
            <div class="meal-counter mb-4 md:mb-0 md:flex-1">
              <div class="font-bold mb-2">主食摂取量</div>
              <button type="button" @click="openKeypad('mainFood')" class="bg-green-600 text-white border-none rounded py-2 px-4 text-center text-base cursor-pointer w-full md:w-20">
                {{ currentMainFood }}
              </button>
            </div>
            <div class="meal-counter md:flex-1">
              <div class="font-bold mb-2">副食摂取量</div>
              <button type="button" @click="openKeypad('sideFood')" class="bg-green-600 text-white border-none rounded py-2 px-4 text-center text-base cursor-pointer w-full md:w-20">
                {{ currentSideFood }}
              </button>
            </div>
          </div>
          
          <textarea v-model="currentNote" placeholder="記録内容" class="w-full p-2 mb-4 border border-gray-300 rounded min-h-[100px]"></textarea>
          
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
              :class="{ 'active': selectedOptions.ActiveOption.includes('マイペースにて完食') }"
              @click="toggleOption('マイペースにて完食')"
            >
              マイペースにて完食
            </button>
            <button 
              type="button" 
              class="toggle-btn" 
              :class="{ 'active': selectedOptions.ActiveOption.includes('ゆっくりと完食') }"
              @click="toggleOption('ゆっくりと完食')"
            >
              ゆっくりと完食
            </button>
            <button 
              type="button" 
              class="toggle-btn" 
              :class="{ 'active': selectedOptions.ActiveOption.includes('むせあり') }"
              @click="toggleOption('むせあり')"
            >
              むせあり
            </button>
            <button 
              type="button" 
              class="toggle-btn" 
              :class="{ 'active': selectedOptions.ActiveOption.includes('むせなし') }"
              @click="toggleOption('むせなし')"
            >
              むせなし
            </button>
            <button 
              type="button" 
              class="toggle-btn" 
              :class="{ 'active': selectedOptions.ActiveOption.includes('口腔ケア') }"
              @click="toggleOption('口腔ケア')"
            >
              口腔ケア
            </button>
            <button 
              type="button" 
              class="toggle-btn" 
              :class="{ 'active': selectedOptions.ActiveOption.includes('服薬') }"
              @click="toggleOption('服薬')"
            >
              服薬
            </button>
            <button 
              type="button" 
              class="toggle-btn" 
              :class="{ 'active': selectedOptions.ActiveOption.includes('食前薬') }"
              @click="toggleOption('食前薬')"
            >
              食前薬
            </button>
            <button 
              type="button" 
              class="toggle-btn" 
              :class="{ 'active': selectedOptions.ActiveOption.includes('全量摂取') }"
              @click="toggleOption('全量摂取')"
            >
              全量摂取
            </button>
          </div>
        </form>
      </div>
      
      <!-- フッター（固定） -->
      <div class="fixed-footer">
        <button type="button" class="w-[50%] bg-gray-500 text-white py-3 font-semibold" @click="$emit('close')">閉じる</button>
        <button type="submit" class="w-[50%] bg-blue-700 text-white py-3 font-semibold" @click="saveMeal">登録</button>
      </div>
      
      <!-- テンキーモーダル -->
      <div v-if="showKeypad" class="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
        <div class="bg-white rounded-lg p-5 mx-5 w-full md:w-1/2">
          <div class="mb-4 text-center">
            <div class="text-lg font-bold">{{ keypadTitle }}</div>
            <div class="text-2xl mt-2">{{ keypadValue }}</div>
          </div>
          <div class="grid grid-cols-3 gap-2">
            <button v-for="num in [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]" :key="num" 
                    @click="handleKeypadInput(num)"
                    class="text-2xl bg-green-600 text-white p-4 rounded cursor-pointer">
              {{ num }}
            </button>
            <button @click="handleKeypadInput('clear')" 
                    class="text-2xl bg-red-500 text-white p-4 rounded cursor-pointer">
              クリア
            </button>
            <button @click="confirmKeypadValue" 
                    class="text-2xl bg-blue-700 text-white p-4 rounded cursor-pointer">
              確定
            </button>
          </div>
          <div class="mt-4 flex justify-end">
            <button @click="closeKeypad" class="bg-gray-500 text-white py-2 px-4 rounded">
              キャンセル
            </button>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed, getCurrentInstance, watch } from "vue";
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
    userId: {
      type: Number,
      required: true
    },
    targetDate: {
      type: String,
      required: true
    },
    userName:{
      type: String,
      required: true
    }
  },
  setup(props, { emit }) {
    const ShareStore = useShareStore();
    const ModaldataStore = useModaldataStore();
    
    // 現在の日時を取得
    const now = new Date();
    const nowDate = props.targetDate || getTodayYYYYMMDD();
    const nowTime = getCurrentTimeJP();
    
    // 食事時間の初期値（現在時刻に基づく）
    const hour = now.getHours();
    let defaultMealTime = "朝";
    if (hour >= 11 && hour < 15) {
      defaultMealTime = "昼";
    } else if (hour >= 15) {
      defaultMealTime = "夕";
    }
    
    // 各食事時間ごとのデータを保持するオブジェクト
    const mealItems = ref({
      朝: {
        date: nowDate, // targetDateから取得した日付を設定
        time: null, // 時刻はnull
        meal_category_id: 0,
        mainFood: "0",
        sideFood: "0",
        note: "",
        service_record_id: null
      },
      昼: {
        date: nowDate, // targetDateから取得した日付を設定
        time: null, // 時刻はnull
        meal_category_id: 1,
        mainFood: "0",
        sideFood: "0",
        note: "",
        service_record_id: null
      },
      夕: {
        date: nowDate, // targetDateから取得した日付を設定
        time: null, // 時刻はnull
        meal_category_id: 2,
        mainFood: "0",
        sideFood: "0",
        note: "",
        service_record_id: null
      }
    });
    
    // 現在選択中の食事時間
    const activeMealTime = ref(defaultMealTime);
    
    // 選択されたオプションをオブジェクトで管理（朝・昼・夕ごとに配列を持つ）
    const selectedOptions = ref({
      ActiveOption: [],
      朝: [],
      昼: [],
      夕: []
    });

    // 現在の日付をcomputed propertyとして定義
    const currentDate = computed({
      get: () => {
        return mealItems.value[activeMealTime.value].date;
      },
      set: (newValue) => {
        mealItems.value[activeMealTime.value].date = newValue;
      }
    });

    // 現在の時間をcomputed propertyとして定義
    const currentTime = computed({
      get: () => {
        return mealItems.value[activeMealTime.value].time;
      },
      set: (newValue) => {
        mealItems.value[activeMealTime.value].time = newValue;
      }
    });

    const currentMainFood = computed({
      get: () => {
        return mealItems.value[activeMealTime.value].mainFood;
      },
      set: (newValue) => {
        mealItems.value[activeMealTime.value].mainFood = newValue;
      }
    });

    const currentSideFood = computed({
      get: () => {
        return mealItems.value[activeMealTime.value].sideFood;
      },
      set: (newValue) => {
        mealItems.value[activeMealTime.value].sideFood = newValue;
      }
    });

    const currentNote = computed({
      get: () => {
        return mealItems.value[activeMealTime.value].note;
      },
      set: (value) => {
        mealItems.value[activeMealTime.value].note = value;
      }
    });
    
    // モーダルが開いたときに食事データの値を取得
    onMounted(async () => {
      try {
        ShareStore.$patch({ isLoading: true });
        console.log("食事データ取得開始 - ユーザーID:", props.userId, "日付:", props.targetDate);
        
        const mealHistoryData = await ModaldataStore.getMeal(props.userId, props.targetDate);
        
        // 取得したデータを処理する（もし存在すれば）
        if (mealHistoryData && Array.isArray(mealHistoryData)) {
          console.log("取得した食事データ:", mealHistoryData);
          
          // 各食事時間のデータを設定
          mealHistoryData.forEach(meal => {
            // meal_category_idからmeal_timeを決定
            let mealTime;
            if (meal.meal_category_id === 0) mealTime = "朝";
            else if (meal.meal_category_id === 1) mealTime = "昼";
            else if (meal.meal_category_id === 2) mealTime = "夕";
            else return; // それ以外の場合は処理しない
            
            // 各食事時間のデータをセット
            mealItems.value[mealTime] = {
              date: meal.date || "",
              time: meal.time || "",
              meal_category_id: meal.meal_category_id,
              mainFood: String(meal.main_dish_id || "0"),
              sideFood: String(meal.side_dish_id || "0"),
              note: meal.note || "",
              service_record_id: meal.service_record_id || null
            };
            
            // ノートからオプションを復元
            if (meal.note) {
              const options = meal.note.split('、');
              selectedOptions.value[mealTime] = options;
              if (mealTime === activeMealTime.value) {
                selectedOptions.value.ActiveOption = [...options];
              }
            }
          });
          console.log("設定された食事データ:", mealItems.value);
          console.log("設定されたオプション:", selectedOptions.value);
        }
      } catch (error) {
        console.error('食事データの取得中にエラーが発生しました:', error);
        showErrorToast('食事データの取得に失敗しました');
      } finally {
        ShareStore.$patch({ isLoading: false });
      }
    });
    
    // 食事時間の切り替え
    const switchMealTime = (mealTime) => {
      activeMealTime.value = mealTime;
      updateActiveOptions();
    };
    
    // オプションの選択/解除
    const toggleOption = (option) => {
      // 現在の食事時間のオプション配列を取得（なければ空配列を作成）
      const currentOptions = selectedOptions.value[activeMealTime.value] || [];
      const index = currentOptions.indexOf(option);
      
      if (index === -1) {
        // オプションを追加
        currentOptions.push(option);
        selectedOptions.value.ActiveOption.push(option);
      } else {
        // オプションを削除
        currentOptions.splice(index, 1);
        const activeIndex = selectedOptions.value.ActiveOption.indexOf(option);
        if (activeIndex !== -1) {
          selectedOptions.value.ActiveOption.splice(activeIndex, 1);
        }
      }
      
      // 選択されたオプションを更新
      selectedOptions.value[activeMealTime.value] = currentOptions;
      updateNotes(); // ノートを更新
    };
    
    // 食事時間が変更されたときにActiveOptionを更新
    const updateActiveOptions = () => {
      // 現在の食事時間に対応するオプション配列をActiveOptionにコピー
      selectedOptions.value.ActiveOption = [...(selectedOptions.value[activeMealTime.value] || [])];
    };
    
    // activeMealTimeの監視
    watch(activeMealTime, () => {
      updateActiveOptions();
    });
    
    // 選択されたオプションをテキストエリアに反映する
    const updateNotes = () => {
      const currentOptions = selectedOptions.value[activeMealTime.value] || [];
      if (currentOptions.length > 0) {
        mealItems.value[activeMealTime.value].note = currentOptions.join('、');
      } else {
        mealItems.value[activeMealTime.value].note = "";
      }
    };

    // テンキーモーダル関連
    const showKeypad = ref(false);
    const keypadValue = ref("");
    const keypadTitle = ref("");
    const currentField = ref(null);

    const openKeypad = (field) => {
      currentField.value = field;
      keypadValue.value = field === 'mainFood' 
        ? mealItems.value[activeMealTime.value].mainFood 
        : mealItems.value[activeMealTime.value].sideFood;
      keypadTitle.value = field === 'mainFood' ? '主食摂取量' : '副食摂取量';
      showKeypad.value = true;
    };

    const closeKeypad = () => {
      showKeypad.value = false;
      keypadValue.value = "";
      currentField.value = null;
    };

    const handleKeypadInput = (value) => {
      if (value === 'clear') {
        keypadValue.value = "0";
      } else {
        if (keypadValue.value === "0") {
          keypadValue.value = value.toString();
        } else if (parseInt(keypadValue.value + value) <= 10) {
          keypadValue.value += value.toString();
        }
      }
    };

    const confirmKeypadValue = () => {
      if (currentField.value === 'mainFood') {
        mealItems.value[activeMealTime.value].mainFood = keypadValue.value;
      } else if (currentField.value === 'sideFood') {
        mealItems.value[activeMealTime.value].sideFood = keypadValue.value;
      }
      closeKeypad();
    };

    const setDefaultNote = () => {
      mealItems.value[activeMealTime.value].note = "特変なし";
      // 現在の食事時間のオプション配列を初期化
      selectedOptions.value[activeMealTime.value] = ["特変なし"];
      selectedOptions.value.ActiveOption = ["特変なし"];
    };

    const validateMealData = () => {
      const mealTimes = ['朝', '昼', '夕'];
      let hasAnyData = false;
      
      for (const mealTime of mealTimes) {
        const mealItem = mealItems.value[mealTime];
        
        // 主食、副食、ノートのいずれかが入力されているかチェック
        const hasInputData = 
          mealItem.mainFood !== "0" || 
          mealItem.sideFood !== "0" || 
          (mealItem.note && mealItem.note.trim() !== "");
        
        if (hasInputData) {
          hasAnyData = true;
          // 時間が未入力で他の項目が入力されている場合
          if (!mealItem.time) {
            mealError.value = `${mealTime}の時間を入力してください`;
            return false;
          }
        }
      }
      
      if (!hasAnyData) {
        mealError.value = '保存するデータがありません';
        return false;
      }
      
      mealError.value = '';
      return true;
    };

    // 食事記録を保存
    const saveMeal = async () => {
      try {
        // バリデーションチェック
        if (!validateMealData()) {
          return;
        }

        ShareStore.$patch({ isLoading: true });
        
        // 朝・昼・夕の全データを準備
        const mealTimesToSave = ['朝', '昼', '夕'];
        const mealDataArray = [];
        
        for (const mealTime of mealTimesToSave) {
          // 各食事時間のデータを準備
          const mealItem = mealItems.value[mealTime];
          
          // 時刻がnullの場合はスキップ
          if (!mealItem.time) {
            continue;
          }
          
          // 日付のバリデーションチェック
          if (!mealItem.date) {
            showErrorToast(`${mealTime}の日付が入力されていません`);
            return;
          }
          
          // 主食または副食が0以上の場合のみデータを送信
          if (parseInt(mealItem.mainFood) >= 0 || parseInt(mealItem.sideFood) >= 0) {
            mealDataArray.push({
              service_record_id: mealItem.service_record_id,
              served_time: `${mealItem.date} ${mealItem.time}`,
              meal_time: mealTime,
              main_dish_id: parseInt(mealItem.mainFood),
              side_dish_id: parseInt(mealItem.sideFood),
              meal_category_id: getMealCategoryId(mealTime),
              schedule_id: null,
              note: mealItem.note,
              recorded_staff_id: 1
            });
          }
        }

        console.log("mealDataArray食事の配列送信データ", mealDataArray);
        if (mealDataArray.length > 0) {
          // 食事データを保存
          await ModaldataStore.saveMeal(mealDataArray, props.userId);
          showSuccessToast('食事記録が完了しました');
          emit('confirm');
        }
      } catch (error) {
        console.error('記録エラー:', error);
        showErrorToast('食事記録に失敗しました');
      } finally {
        ShareStore.$patch({ isLoading: false });
      }
    };

    // 食事時間に基づいてカテゴリIDを取得する関数
    const getMealCategoryId = (mealTime) => {
      switch(mealTime) {
        case '朝': return 0;
        case '昼': return 1;
        case '夕': return 2;
        default: return 0;
      }
    };

    const { proxy } = getCurrentInstance();

    // トースト通知を表示する関数
    const showToast = (message, type_num = 0) => {
      if (!proxy || !proxy.$toast) {
        console.error("Toast instance is undefined. Ensure VueToast is properly registered.");
        return;
      }
      
      // type_numに基づいてトーストタイプを選択
      let toastType;
      switch (type_num) {
        case 0:
          toastType = "success";  // 成功メッセージ（緑色）
          break;
        case 1:
          toastType = "error";    // エラーメッセージ（赤色）
          break;
        case 2:
          toastType = "warning";  // 警告メッセージ（黄色）
          break;
        case 3:
          toastType = "info";     // 情報メッセージ（青色）
          break;
        default:
          toastType = "success";
      }
      
      proxy.$toast.open({
        message: message,
        type: toastType,
        duration: 1000,
        position: "top",
      });
    };

    // 既存のshowSuccessToast関数はshowToastを使用するよう修正
    const showSuccessToast = (message) => {
      showToast(message, 0); // type_num=0で成功メッセージを表示
    };

    // エラーメッセージを表示する便利関数
    const showErrorToast = (message) => {
      showToast(message, 1); // type_num=1でエラーメッセージを表示
    };

    // 警告メッセージを表示する便利関数
    const showWarningToast = (message) => {
      showToast(message, 2); // type_num=2で警告メッセージを表示
    };
    
    return {
      activeMealTime,
      switchMealTime,
      mealItems,
      selectedOptions,
      toggleOption,
      updateNotes,
      setDefaultNote,
      saveMeal,
      ShareStore,
      ModaldataStore,
      // Computed
      currentDate,
      currentTime,
      currentMainFood,
      currentSideFood,
      currentNote,
      // テンキー関連
      showKeypad,
      keypadValue,
      keypadTitle,
      openKeypad,
      closeKeypad,
      handleKeypadInput,
      confirmKeypadValue,
      getMealCategoryId,
      // トースト関連
      showToast,
      showSuccessToast,
      showErrorToast,
      showWarningToast,
      // props
      userName: computed(() => props.userName)
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

/* 食事時間選択のスタイル */
.meal-toggle input[type="radio"] {
  display: none;
}

.meal-toggle input[type="radio"]:checked + label#meal_morning-label {
  background-color: #50afe9;
  color: #fff;
}

.meal-toggle input[type="radio"]:checked + label#meal_noon-label {
  background-color: #18b42d;
  color: #fff;
}

.meal-toggle input[type="radio"]:checked + label#meal_evening-label {
  background-color: #FF8C00;
  color: #fff;
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
