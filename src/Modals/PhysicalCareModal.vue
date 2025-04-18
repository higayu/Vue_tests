<template>
  <div class="modal-overlay">
    <!-- 外枠：高さ90vh、flexレイアウトでヘッダー・スクロール領域・フッターを配置 -->
    <div class="relative bg-white w-full max-w-3xl md:mx-4 md:rounded-lg shadow-xl md:h-[90vh] h-dvh flex flex-col">
      
      <!-- ヘッダー（固定） -->
      <div class="fixed-header">
        <span class="text-lg font-medium">身体介護</span>
        <span class="text-base text-gray-600">{{ userName }} 様</span>
      </div>
      
      <!-- メインコンテンツ（スクロール可能） -->
      <div class="flex-1 overflow-y-auto p-5 pb-24 md:pb-5">
        <form @submit.prevent="savePhysicalCare">
          <!-- 共通日付・時刻 -->
          <div class="flex gap-4 mb-4">
            <div class="w-1/2">
              <DatePicker_modal v-model="physicalCare.date" :useStoreDate="false" />
            </div>
            <div class="w-1/2">
              <input
                type="time"
                v-model="physicalCare.time"
                class="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- 排泄セクション -->
            <div class="border rounded-lg p-4">
              <div class="font-bold mb-2">排泄</div>
              <div class="space-y-2">
                <label class="toggle-button">
                  <input type="checkbox" v-model="physicalCare.toilet">
                  <span class="icon">✓</span>
                  トイレ
                </label>
                <label class="toggle-button">
                  <input type="checkbox" v-model="physicalCare.diaperChange">
                  <span class="icon">✓</span>
                  オムツ類交換
                </label>
                <label class="toggle-button">
                  <input type="checkbox" v-model="physicalCare.urineStain">
                  <span class="icon">✓</span>
                  尿汚染
                </label>
                <label class="toggle-button">
                  <input type="checkbox" v-model="physicalCare.fecalStain">
                  <span class="icon">✓</span>
                  便汚染
                </label>
              </div>
            </div>

            <!-- 食事セクション -->
            <div class="border rounded-lg p-4">
              <div class="font-bold mb-2">食事</div>
              <div class="space-y-2">
                <label class="toggle-button">
                  <input type="checkbox" v-model="physicalCare.fullMealAssist">
                  <span class="icon">✓</span>
                  全介助
                </label>
                <label class="toggle-button">
                  <input type="checkbox" v-model="physicalCare.partialMealAssist">
                  <span class="icon">✓</span>
                  一部介助
                </label>
                <label class="toggle-button">
                  <input type="checkbox" v-model="physicalCare.mealWatch">
                  <span class="icon">✓</span>
                  見守り
                </label>
              </div>
            </div>

            <!-- 身体セクション -->
            <div class="border rounded-lg p-4">
              <div class="font-bold mb-2">身体</div>
              <div class="space-y-2">
                <label class="toggle-button">
                  <input type="checkbox" v-model="physicalCare.wiping">
                  <span class="icon">✓</span>
                  清拭
                </label>
                <label class="toggle-button">
                  <input type="checkbox" v-model="physicalCare.fullBath">
                  <span class="icon">✓</span>
                  全身浴
                </label>
                <label class="toggle-button">
                  <input type="checkbox" v-model="physicalCare.partialBath">
                  <span class="icon">✓</span>
                  部分浴
                </label>
                <label class="toggle-button">
                  <input type="checkbox" v-model="physicalCare.otherBody">
                  <span class="icon">✓</span>
                  その他
                </label>
              </div>
            </div>

            <!-- 移動セクション -->
            <div class="border rounded-lg p-4">
              <div class="font-bold mb-2">移動</div>
              <div class="space-y-2">
                <label class="toggle-button">
                  <input type="checkbox" v-model="physicalCare.transfer">
                  <span class="icon">✓</span>
                  移乗
                </label>
                <label class="toggle-button">
                  <input type="checkbox" v-model="physicalCare.goingOut">
                  <span class="icon">✓</span>
                  外出
                </label>
                <label class="toggle-button">
                  <input type="checkbox" v-model="physicalCare.hospital">
                  <span class="icon">✓</span>
                  通院
                </label>
              </div>
            </div>

            <!-- 薬・医薬セクション -->
            <div class="border rounded-lg p-4">
              <div class="font-bold mb-2">薬・医薬</div>
              <div class="space-y-2">
                <label class="toggle-button">
                  <input type="checkbox" v-model="physicalCare.medication">
                  <span class="icon">✓</span>
                  服薬
                </label>
                <label class="toggle-button">
                  <input type="checkbox" v-model="physicalCare.externalMedicine">
                  <span class="icon">✓</span>
                  外用薬
                </label>
              </div>
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
        <button 
        type="submit" class="w-[50%] bg-blue-700 text-white py-3 font-semibold" 
        @click="savePhysicalCare"
        >
          登録
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, getCurrentInstance, onMounted } from 'vue';
import { useShareStore } from "../stores/useShareData.js";
import { useHoumonStore } from "../stores/Houmon.js";
import { getTodayYYYYMMDD, getCurrentTimeJP } from "../utils/timeUtils.js";
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
    service_status: {
      type: String,
      required: true
    }
  },

  setup(props, { emit }) {
    const ShareStore = useShareStore();
    const HoumonStore = useHoumonStore();
    
    // 現在の日時を取得
    const currentDate = ref(props.targetDate.split(' ')[0] || getTodayYYYYMMDD());
    const currentTime = ref(props.targetDate.split(' ')[1] || getCurrentTimeJP());
    
    const physicalCare = ref({
      date: currentDate,
      time: currentTime,
      // 排泄
      toilet: false,
      diaperChange: false,
      urineStain: false,
      fecalStain: false,
      // 食事
      fullMealAssist: false,
      partialMealAssist: false,
      mealWatch: false,
      // 身体
      wiping: false,
      fullBath: false,
      partialBath: false,
      otherBody: false,
      // 移動
      transfer: false,
      goingOut: false,
      hospital: false,
      // 薬・医薬
      medication: false,
      externalMedicine: false,
      // 備考
      notes: ''
    });

    // モーダルが開いたときにデータを取得
    onMounted(async () => {
      try {
        ShareStore.$patch({ isLoading: true });
        
        // HoumonStoreから身体介護データを取得
        const storedData = HoumonStore.PhysicalCare_Data;
        
        if (storedData) {
          console.log("保存された身体介護データを取得:", storedData);
          
          // 日付と時刻を設定
          physicalCare.value.date = storedData.served_time.split(' ')[0] || currentDate.value;
          physicalCare.value.time = storedData.served_time.split(' ')[1] || currentTime.value;
          
          // チェックボックスの状態を設定
          if (storedData.care_items) {
            // 排泄
            if (storedData.care_items.排泄) {
              physicalCare.value.toilet = storedData.care_items.排泄.includes('トイレ');
              physicalCare.value.diaperChange = storedData.care_items.排泄.includes('オムツ類交換');
              physicalCare.value.urineStain = storedData.care_items.排泄.includes('尿汚染');
              physicalCare.value.fecalStain = storedData.care_items.排泄.includes('便汚染');
            }
            
            // 食事
            if (storedData.care_items.食事) {
              physicalCare.value.fullMealAssist = storedData.care_items.食事.includes('全介助');
              physicalCare.value.partialMealAssist = storedData.care_items.食事.includes('一部介助');
              physicalCare.value.mealWatch = storedData.care_items.食事.includes('見守り');
            }
            
            // 身体
            if (storedData.care_items.身体) {
              physicalCare.value.wiping = storedData.care_items.身体.includes('清拭');
              physicalCare.value.fullBath = storedData.care_items.身体.includes('全身浴');
              physicalCare.value.partialBath = storedData.care_items.身体.includes('部分浴');
              physicalCare.value.otherBody = storedData.care_items.身体.includes('その他');
            }
            
            // 移動
            if (storedData.care_items.移動) {
              physicalCare.value.transfer = storedData.care_items.移動.includes('移乗');
              physicalCare.value.goingOut = storedData.care_items.移動.includes('外出');
              physicalCare.value.hospital = storedData.care_items.移動.includes('通院');
            }
            
            // 薬・医薬
            if (storedData.care_items.薬医薬) {
              physicalCare.value.medication = storedData.care_items.薬医薬.includes('服薬');
              physicalCare.value.externalMedicine = storedData.care_items.薬医薬.includes('外用薬');
            }
          }
          
          // 備考を設定
          if (storedData.notes) {
            physicalCare.value.notes = storedData.notes;
          }
        }
      } catch (error) {
        console.error('データ取得エラー:', error);
      } finally {
        ShareStore.$patch({ isLoading: false });
      }
    });
    
    const savePhysicalCare = async () => {
      try {
        ShareStore.$patch({ isLoading: true });
        const formattedTime = `${physicalCare.value.date} ${physicalCare.value.time}`;
        
        // チェックした項目をカテゴリーごとにまとめる
        const checkedItems = {
          排泄: {
            トイレ: physicalCare.value.toilet,
            オムツ類交換: physicalCare.value.diaperChange,
            尿汚染: physicalCare.value.urineStain,
            便汚染: physicalCare.value.fecalStain
          },
          食事: {
            全介助: physicalCare.value.fullMealAssist,
            一部介助: physicalCare.value.partialMealAssist,
            見守り: physicalCare.value.mealWatch
          },
          身体: {
            清拭: physicalCare.value.wiping,
            全身浴: physicalCare.value.fullBath,
            部分浴: physicalCare.value.partialBath,
            その他: physicalCare.value.otherBody
          },
          移動: {
            移乗: physicalCare.value.transfer,
            外出: physicalCare.value.goingOut,
            通院: physicalCare.value.hospital
          },
          薬医薬: {
            服薬: physicalCare.value.medication,
            外用薬: physicalCare.value.externalMedicine
          }
        };

        // trueの項目のみを抽出
        const selectedItems = {};
        for (const [category, items] of Object.entries(checkedItems)) {
          const selectedInCategory = Object.entries(items)
            .filter(([_, value]) => value)
            .map(([key]) => key);
          
          if (selectedInCategory.length > 0) {
            selectedItems[category] = selectedInCategory;
          }
        }

        const postData = {
          user_id: props.userId,
          served_time: formattedTime,
          schedule_id: null,
          recorded_staff_id: 1,
          care_items: selectedItems,
          notes: physicalCare.value.notes
        };

        HoumonStore.setPhysicalCare(postData);
        showSuccessToast('身体介護記録が完了しました');
        emit('confirm');
      } catch (error) {
        console.error('記録エラー:', error);
        emit('close');
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
        type: "success",
        duration: 1000,
        position: "top",
      });
    };
    
    return {
      showSuccessToast,
      physicalCare,
      savePhysicalCare,
      ShareStore,
      userName: props.userName
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

.toggle-button {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  cursor: pointer;
  user-select: none;
}

.toggle-button input {
  display: none;
}

.toggle-button .icon {
  width: 1.5rem;
  height: 1.5rem;
  border: 2px solid #ccc;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.5rem;
  color: transparent;
  transition: all 0.2s;
}

.toggle-button input:checked + .icon {
  background-color: #28a745;
  border-color: #28a745;
  color: white;
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
