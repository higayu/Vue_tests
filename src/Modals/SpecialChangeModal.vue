<template>
  <div class="modal-overlay">
    <!-- 外枠：高さ90vh、flexレイアウトでヘッダー・スクロール領域・フッターを配置 -->
    <div class="relative bg-white w-full max-w-3xl md:mx-4 md:rounded-lg shadow-xl md:h-[90vh] h-dvh flex flex-col">
      
      <!-- ヘッダー（固定） -->
      <div class="fixed-header">
        <span class="text-lg font-medium">特変記録</span>
        <span class="text-base text-gray-600">
          {{ ShareStore.selected_user.name || '●●●●' }} 様
        </span>
      </div>
      
      <!-- メインコンテンツ（スクロール可能） -->
      <div class="flex-1 overflow-y-auto p-5 pb-24 md:pb-5">
        <form @submit.prevent="saveSpecialChange">
          <!-- 共通日付・時刻 -->
          <div class="flex gap-4 mb-4">
            <div class="w-1/2">
              <DatePicker_modal v-model="specialChange.date" :useStoreDate="false" />
            </div>
            <div class="w-1/2">
              <input
                type="time"
                v-model="specialChange.time"
                class="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>

          <!-- 状況説明 -->
          <textarea
            v-model="specialChange.description"
            placeholder="特変内容を記録"
            class="w-full p-2 mb-4 border border-gray-300 rounded min-h-[150px]"
          ></textarea>
          
          <!-- 記録テンプレボタン -->
          <div class="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
            <!-- 状態に関するボタン -->
            <button
              type="button"
              class="toggle-btn"
              :class="{ 'active': selectedOptions.includes('体調不良なし') }"
              @click="toggleOption('体調不良なし')"
            >
              体調不良なし
            </button>
            <button
              type="button"
              class="toggle-btn"
              :class="{ 'active': selectedOptions.includes('風邪気味') }"
              @click="toggleOption('風邪気味')"
            >
              風邪気味
            </button>
            <button
              type="button"
              class="toggle-btn"
              :class="{ 'active': selectedOptions.includes('困り事なし') }"
              @click="toggleOption('困り事なし')"
            >
              困り事なし
            </button>
            <button
              type="button"
              class="toggle-btn"
              :class="{ 'active': selectedOptions.includes('心配事なし') }"
              @click="toggleOption('心配事なし')"
            >
              心配事なし
            </button>

            <!-- 支援内容に関するボタン -->
            <button
              type="button"
              class="toggle-btn"
              :class="{ 'active': selectedOptions.includes('生活面の声かけ助言') }"
              @click="toggleOption('生活面の声かけ助言')"
            >
              生活面の声かけ助言
            </button>
            <button
              type="button"
              class="toggle-btn"
              :class="{ 'active': selectedOptions.includes('傾聴') }"
              @click="toggleOption('傾聴')"
            >
              傾聴
            </button>
            <button
              type="button"
              class="toggle-btn"
              :class="{ 'active': selectedOptions.includes('声かけ') }"
              @click="toggleOption('声かけ')"
            >
              声かけ
            </button>

            <!-- 訪問時の状況ボタン -->
            <button
              type="button"
              class="toggle-btn"
              :class="{ 'active': selectedOptions.includes('入室') }"
              @click="toggleOption('入室')"
            >
              入室
            </button>
            <button
              type="button"
              class="toggle-btn"
              :class="{ 'active': selectedOptions.includes('不在') }"
              @click="toggleOption('不在')"
            >
              不在
            </button>

            <!-- 生活支援に関するボタン -->
            <button
              type="button"
              class="toggle-btn"
              :class="{ 'active': selectedOptions.includes('ゴミをまとめる') }"
              @click="toggleOption('ゴミをまとめる')"
            >
              ゴミをまとめる
            </button>
            <button
              type="button"
              class="toggle-btn"
              :class="{ 'active': selectedOptions.includes('ゴミを出す') }"
              @click="toggleOption('ゴミを出す')"
            >
              ゴミを出す
            </button>
            <button
              type="button"
              class="toggle-btn"
              :class="{ 'active': selectedOptions.includes('点眼') }"
              @click="toggleOption('点眼')"
            >
              点眼
            </button>
            <button
              type="button"
              class="toggle-btn"
              :class="{ 'active': selectedOptions.includes('服薬') }"
              @click="toggleOption('服薬')"
            >
              服薬
            </button>
            <button
              type="button"
              class="toggle-btn"
              :class="{ 'active': selectedOptions.includes('掃除') }"
              @click="toggleOption('掃除')"
            >
              掃除
            </button>
            <button
              type="button"
              class="toggle-btn"
              :class="{ 'active': selectedOptions.includes('買い物') }"
              @click="toggleOption('買い物')"
            >
              買い物
            </button>
          </div>
        </form>
      </div>
      
      <!-- フッター（固定） -->
      <div class="fixed-footer">
        <button type="button" class="w-[50%] bg-gray-500 text-white py-3 font-semibold" @click="$emit('close')">閉じる</button>
        <button type="submit" class="w-[50%] bg-blue-700 text-white py-3 font-semibold" @click="saveSpecialChange">登録</button>
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
    
    // 現在の日時を取得
    const currentDate = getTodayYYYYMMDD();
    const currentTime = getCurrentTimeJP();
    
    const specialChange = ref({
      date: currentDate,
      time: currentTime,
      type: 'physical',
      description: ''
    });
    
    // 選択されたオプション
    const selectedOptions = ref([]);
    
    // オプションの選択/解除
    const toggleOption = (option) => {
      const index = selectedOptions.value.indexOf(option);
      if (index === -1) {
        selectedOptions.value.push(option);
      } else {
        selectedOptions.value.splice(index, 1);
      }
      updateDescription();
    };
    
    // 選択されたオプションを説明に反映
    const updateDescription = () => {
      if (selectedOptions.value.length > 0) {
        specialChange.value.description = selectedOptions.value.join('、');
      }
    };

    // モーダルが開いたときにデータを取得
    onMounted(async () => {
      try {
        ShareStore.$patch({ isLoading: true });
        
        // HoumonStoreから特変データを取得
        const storedData = HoumonStore.SpecialChange_Data;
        
        if (storedData) {
          console.log("保存された特変データを取得:", storedData);
          
          // 日付と時刻を設定
          specialChange.value.date = storedData.served_time.split(' ')[0] || currentDate;
          specialChange.value.time = storedData.served_time.split(' ')[1] || currentTime;
          
          // 説明を設定
          if (storedData.note) {
            specialChange.value.description = storedData.note;
            
            // 説明から選択されたオプションを復元
            const options = storedData.note.split('、');
            selectedOptions.value = options;
          }
        }
      } catch (error) {
        console.error('データ取得エラー:', error);
      } finally {
        ShareStore.$patch({ isLoading: false });
      }
    });
    
    const saveSpecialChange = async () => {
      try {
        ShareStore.$patch({ isLoading: true }); // ストアの状態を直接更新
        const formattedTime = `${specialChange.value.date} ${specialChange.value.time}`;
        
        const postData = {
          user_id: ShareStore.selected_user.user_id,
          served_time: formattedTime,
          note: specialChange.value.description,
          schedule_id: null,
          recorded_staff_id: ShareStore.selected_staff.staff_id || 1, // 選択されたスタッフIDを使用、なければ1をデフォルト値として使用
          item_id: 12 // 特変のitem_idを追加
        };

        HoumonStore.setSpecialChange(postData);
        showSuccessToast('特変記録が完了しました');
        emit('confirm'); // closeからconfirmに変更
      } catch (error) {
        console.error('記録エラー:', error);
        showErrorToast('記録に失敗しました');
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
    
    const showErrorToast = (moji) => {
      if (!proxy || !proxy.$toast) {
        console.error("Toast instance is undefined. Ensure VueToast is properly registered.");
        return;
      }
      proxy.$toast.open({
        message: moji,
        type: "error", // カスタムスタイルを指定
        duration: 1000,
        position: "top", // トーストを画面左下に表示
      });
    };
    
    return {
      showSuccessToast,
      showErrorToast,
      //-------------------//
      specialChange,
      selectedOptions,
      toggleOption,
      saveSpecialChange,
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
