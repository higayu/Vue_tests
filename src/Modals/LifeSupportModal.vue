<template>
  <div class="modal-overlay">
    <div class="relative bg-white w-full max-w-3xl md:mx-4 md:rounded-lg shadow-xl md:h-[90vh] h-dvh flex flex-col">
      <!-- ヘッダー（固定） -->
      <div class="fixed-header">
        <span class="text-lg font-medium">生活援助</span>
        <span class="text-base text-gray-600">
          {{ ShareStore.selected_user.name || '●●●●' }} 様
        </span>
      </div>

      <!-- メインコンテンツ（スクロール可能） -->
      <div class="flex-1 overflow-y-auto p-5 pb-24 md:pb-5">
        <form @submit.prevent="saveLifeSupport">
          <!-- 共通日付・時刻 -->
          <div class="flex gap-4 mb-4">
            <div class="w-1/2">
              <DatePicker_modal v-model="lifeSupport.date" :useStoreDate="false" />
            </div>
            <div class="w-1/2">
              <input
                type="time"
                v-model="lifeSupport.time"
                class="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <!-- 掃除セクション -->
            <div class="border rounded-lg p-4">
              <div class="font-bold mb-2">掃除</div>
              <div class="space-y-2">
                <label class="toggle-button">
                  <input type="checkbox" v-model="lifeSupport.toiletCleaning">
                  <span class="icon">✓</span>
                  トイレ
                </label>
                <label class="toggle-button">
                  <input type="checkbox" v-model="lifeSupport.kitchenCleaning">
                  <span class="icon">✓</span>
                  台所
                </label>
                <label class="toggle-button">
                  <input type="checkbox" v-model="lifeSupport.bathCleaning">
                  <span class="icon">✓</span>
                  浴室
                </label>
                <label class="toggle-button">
                  <input type="checkbox" v-model="lifeSupport.roomCleaning">
                  <span class="icon">✓</span>
                  居室
                </label>
                <label class="toggle-button">
                  <input type="checkbox" v-model="lifeSupport.garbage">
                  <span class="icon">✓</span>
                  ゴミ出し
                </label>
              </div>
            </div>

            <!-- 洗濯セクション -->
            <div class="border rounded-lg p-4">
              <div class="font-bold mb-2">洗濯</div>
              <div class="space-y-2">
                <label class="toggle-button">
                  <input type="checkbox" v-model="lifeSupport.laundrySort">
                  <span class="icon">✓</span>
                  分類
                </label>
                <label class="toggle-button">
                  <input type="checkbox" v-model="lifeSupport.laundryWash">
                  <span class="icon">✓</span>
                  洗濯
                </label>
                <label class="toggle-button">
                  <input type="checkbox" v-model="lifeSupport.laundryDry">
                  <span class="icon">✓</span>
                  乾燥(物干し)
                </label>
                <label class="toggle-button">
                  <input type="checkbox" v-model="lifeSupport.laundryStore">
                  <span class="icon">✓</span>
                  取り込み・収納
                </label>
              </div>
            </div>

            <!-- 寝具セクション -->
            <div class="border rounded-lg p-4">
              <div class="font-bold mb-2">寝具</div>
              <div class="space-y-2">
                <label class="toggle-button">
                  <input type="checkbox" v-model="lifeSupport.sheetChange">
                  <span class="icon">✓</span>
                  シーツ交換
                </label>
                <label class="toggle-button">
                  <input type="checkbox" v-model="lifeSupport.bedMaking">
                  <span class="icon">✓</span>
                  ベッドメーク
                </label>
                <label class="toggle-button">
                  <input type="checkbox" v-model="lifeSupport.futonAiring">
                  <span class="icon">✓</span>
                  布団干し
                </label>
              </div>
            </div>

            <!-- 衣類セクション -->
            <div class="border rounded-lg p-4">
              <div class="font-bold mb-2">衣類</div>
              <div class="space-y-2">
                <label class="toggle-button">
                  <input type="checkbox" v-model="lifeSupport.clothesOrganize">
                  <span class="icon">✓</span>
                  整理
                </label>
                <label class="toggle-button">
                  <input type="checkbox" v-model="lifeSupport.clothesRepair">
                  <span class="icon">✓</span>
                  補修
                </label>
                <label class="toggle-button">
                  <input type="checkbox" v-model="lifeSupport.seasonalChange">
                  <span class="icon">✓</span>
                  衣替え
                </label>
              </div>
            </div>

            <!-- 調理セクション -->
            <div class="border rounded-lg p-4">
              <div class="font-bold mb-2">調理</div>
              <div class="space-y-2">
                <label class="toggle-button">
                  <input type="checkbox" v-model="lifeSupport.mealPrep">
                  <span class="icon">✓</span>
                  下ごしらえ
                </label>
                <label class="toggle-button">
                  <input type="checkbox" v-model="lifeSupport.cooking">
                  <span class="icon">✓</span>
                  調理
                </label>
                <label class="toggle-button">
                  <input type="checkbox" v-model="lifeSupport.servingCleanup">
                  <span class="icon">✓</span>
                  配膳・後片付け
                </label>
              </div>
            </div>

            <!-- 買物セクション -->
            <div class="border rounded-lg p-4">
              <div class="font-bold mb-2">買物</div>
              <div class="space-y-2">
                <label class="toggle-button">
                  <input type="checkbox" v-model="lifeSupport.dailyShopping">
                  <span class="icon">✓</span>
                  日常品買物
                </label>
                <label class="toggle-button">
                  <input type="checkbox" v-model="lifeSupport.medicinePickup">
                  <span class="icon">✓</span>
                  薬受取り
                </label>
              </div>
            </div>
          </div>


        </form>
      </div>

      <!-- フッター（固定） -->
      <div class="fixed-footer">
        <button type="button" class="w-[50%] bg-gray-500 text-white py-3 font-semibold" @click="$emit('close')">閉じる</button>
        <button type="submit" class="w-[50%] bg-blue-700 text-white py-3 font-semibold" @click="saveLifeSupport">登録</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, getCurrentInstance, onMounted } from 'vue';
import { useShareStore } from "../stores/useShareData.js";
import { useHoumonStore } from "../stores/Houmon.js";
import { getTodayYYYYMMDD, getCurrentTimeJP } from "../utils/timeUtils.js"; // timeUtilsから関数をインポート
import DatePicker_modal from '../DatePicker/DatePicker_modal.vue';

export default {
  components: {
    DatePicker_modal
  },
  emits: ["close", "confirm"],
  
  setup(_, { emit }) {
    const ShareStore = useShareStore();
    const HoumonStore = useHoumonStore();
    
    const lifeSupport = ref({
      date: getTodayYYYYMMDD(),
      time: getCurrentTimeJP(),
      // 掃除
      toiletCleaning: false,
      kitchenCleaning: false,
      bathCleaning: false,
      roomCleaning: false,
      garbage: false,
      // 洗濯
      laundrySort: false,
      laundryWash: false,
      laundryDry: false,
      laundryStore: false,
      // 寝具
      sheetChange: false,
      bedMaking: false,
      futonAiring: false,
      // 衣類
      clothesOrganize: false,
      clothesRepair: false,
      seasonalChange: false,
      // 調理
      mealPrep: false,
      cooking: false,
      servingCleanup: false,
      // 買物
      dailyShopping: false,
      medicinePickup: false,
      // 備考
      notes: ''
    });

    // モーダルが開いたときにデータを取得
    onMounted(async () => {
      try {
        ShareStore.$patch({ isLoading: true });
        
        // HoumonStoreから生活援助データを取得
        const storedData = HoumonStore.LifeSupport_Data;
        
        if (storedData) {
          console.log("保存された生活援助データを取得:", storedData);
          
          // 日付と時刻を設定
          lifeSupport.value.date = storedData.served_time.split(' ')[0] || getTodayYYYYMMDD();
          lifeSupport.value.time = storedData.served_time.split(' ')[1] || getCurrentTimeJP();
          
          // チェックボックスの状態を設定
          if (storedData.care_items) {
            // 掃除
            if (storedData.care_items.掃除) {
              lifeSupport.value.toiletCleaning = storedData.care_items.掃除.includes('トイレ');
              lifeSupport.value.kitchenCleaning = storedData.care_items.掃除.includes('台所');
              lifeSupport.value.bathCleaning = storedData.care_items.掃除.includes('浴室');
              lifeSupport.value.roomCleaning = storedData.care_items.掃除.includes('居室');
              lifeSupport.value.garbage = storedData.care_items.掃除.includes('ゴミ出し');
            }
            
            // 洗濯
            if (storedData.care_items.洗濯) {
              lifeSupport.value.laundrySort = storedData.care_items.洗濯.includes('分類');
              lifeSupport.value.laundryWash = storedData.care_items.洗濯.includes('洗濯');
              lifeSupport.value.laundryDry = storedData.care_items.洗濯.includes('乾燥');
              lifeSupport.value.laundryStore = storedData.care_items.洗濯.includes('取り込み収納');
            }
            
            // 寝具
            if (storedData.care_items.寝具) {
              lifeSupport.value.sheetChange = storedData.care_items.寝具.includes('シーツ交換');
              lifeSupport.value.bedMaking = storedData.care_items.寝具.includes('ベッドメーク');
              lifeSupport.value.futonAiring = storedData.care_items.寝具.includes('布団干し');
            }
            
            // 衣類
            if (storedData.care_items.衣類) {
              lifeSupport.value.clothesOrganize = storedData.care_items.衣類.includes('整理');
              lifeSupport.value.clothesRepair = storedData.care_items.衣類.includes('補修');
              lifeSupport.value.seasonalChange = storedData.care_items.衣類.includes('衣替え');
            }
            
            // 調理
            if (storedData.care_items.調理) {
              lifeSupport.value.mealPrep = storedData.care_items.調理.includes('下ごしらえ');
              lifeSupport.value.cooking = storedData.care_items.調理.includes('調理');
              lifeSupport.value.servingCleanup = storedData.care_items.調理.includes('配膳後片付け');
            }
            
            // 買物
            if (storedData.care_items.買物) {
              lifeSupport.value.dailyShopping = storedData.care_items.買物.includes('日常品買物');
              lifeSupport.value.medicinePickup = storedData.care_items.買物.includes('薬受取り');
            }
          }
          
          // 備考を設定
          if (storedData.notes) {
            lifeSupport.value.notes = storedData.notes;
          }
        }
      } catch (error) {
        console.error('データ取得エラー:', error);
      } finally {
        ShareStore.$patch({ isLoading: false });
      }
    });
    
    const saveLifeSupport = async () => {
      try {
        ShareStore.$patch({ isLoading: true }); // ストアの状態を直接更新
        const formattedTime = `${lifeSupport.value.date} ${lifeSupport.value.time}`;
        
        // チェックした項目をカテゴリーごとにまとめる
        const checkedItems = {
          掃除: {
            トイレ: lifeSupport.value.toiletCleaning,
            台所: lifeSupport.value.kitchenCleaning,
            浴室: lifeSupport.value.bathCleaning,
            居室: lifeSupport.value.roomCleaning,
            ゴミ出し: lifeSupport.value.garbage
          },
          洗濯: {
            分類: lifeSupport.value.laundrySort,
            洗濯: lifeSupport.value.laundryWash,
            乾燥: lifeSupport.value.laundryDry,
            取り込み収納: lifeSupport.value.laundryStore
          },
          寝具: {
            シーツ交換: lifeSupport.value.sheetChange,
            ベッドメーク: lifeSupport.value.bedMaking,
            布団干し: lifeSupport.value.futonAiring
          },
          衣類: {
            整理: lifeSupport.value.clothesOrganize,
            補修: lifeSupport.value.clothesRepair,
            衣替え: lifeSupport.value.seasonalChange
          },
          調理: {
            下ごしらえ: lifeSupport.value.mealPrep,
            調理: lifeSupport.value.cooking,
            配膳後片付け: lifeSupport.value.servingCleanup
          },
          買物: {
            日常品買物: lifeSupport.value.dailyShopping,
            薬受取り: lifeSupport.value.medicinePickup
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
          user_id: ShareStore.selected_user.user_id,
          served_time: formattedTime,
          schedule_id: null,
          recorded_staff_id: 1,
          care_items: selectedItems,
          notes: lifeSupport.value.notes
        };

        HoumonStore.setLifeSupport(postData);
        showSuccessToast('生活援助記録が完了しました');
        emit('close');
      } catch (error) {
        console.error('記録エラー:', error);
      } finally {
        ShareStore.$patch({ isLoading: false }); // ストアの状態を直接更新
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
      lifeSupport,
      saveLifeSupport,
      ShareStore
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
