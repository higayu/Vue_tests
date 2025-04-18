<template>
  <div class="flex-1 p-4">

    <!-- アラート表示例 -->
    <div v-if="false">
    <!-- アラートセクション -->
    <div class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded">
      <div class="flex items-center">
        <svg class="w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"></path>
        </svg>
        <h3 class="font-bold">未入力項目があります</h3>
      </div>
      <ul class="ml-8 mt-2 list-disc">
        <li v-for="(alert, index) in alerts" :key="index">{{ alert }}</li>
      </ul>
    </div>
    </div>

    <!-- 管理日誌 -->
    <section class="bg-white p-4 mb-4 border border-gray-300 rounded">
      <span class="text-lg font-bold ml-2 mr-2">管理日誌：</span>
      <span class="text-lg font-bold ml-2">{{ selectedRecordStore.nowSelectedItem_Kanri.day_txt }}</span>
      <div class="text-sm text-gray-600 mb-2">（通い・泊まり）</div>

      <table v-if="processedUserList.length > 0" class="w-full border-collapse mb-3">
        <tbody>
          <tr v-for="user in selectedRecordStore.nowSelectedItem_Kanri.userList" 
              :key="user.user_id"
              v-show="user.schedules && user.schedules.some(schedule => schedule.schedule_name !== '訪')">
            <td class="border border-gray-300 p-2 text-sm">
              <span class="text-base">{{ user.name }}</span>
            </td>
            <td class="border border-gray-300 p-2 text-sm">
              <div class="flex space-x-2">
                <button
                  v-for="option in options"
                  :key="option.value"
                  :class="[
                    'px-3 py-1.5 border rounded text-sm min-w-[40px] cursor-pointer',
                    user.selectedOptions.includes(option.value) ? 'bg-green-600 text-white' : 'border-green-600 text-green-600 bg-white hover:bg-green-600 hover:text-white',
                    !user.selectedOptions.includes(option.value) ? 'opacity-50 cursor-not-allowed' : ''
                  ]"
                  @click="selectOption(user, option.value)"
                  :disabled="!user.selectedOptions.includes(option.value)"
                >
                  {{ option.label }}
                </button>
              </div>
            </td>
            <td class="border border-gray-300 p-2 text-sm">
              <div class="flex items-center space-x-2">
                <input type="time" 
                  class="w-[45%] border border-gray-300 rounded p-2 text-base bg-gray-50" 
                  :value="getTimeFromDateTime(user.startTime)"
                  readonly
                  disabled
                >
                <span class="text-base">～</span>
                <input type="time"
                  class="w-[45%] border border-gray-300 rounded p-2 text-base bg-gray-50"
                  :value="getTimeFromDateTime(user.endTime)"
                  readonly
                  disabled
                >
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else class="text-center py-4 text-gray-500">
        表示するデータがありません。日付を選択してください。
      </div>

      <div class="text-sm font-bold">
        泊り / <span class="px-2 py-1 bg-gray-100 rounded">{{ stayCount }}</span> 名　
        通い / <span class="px-2 py-1 bg-gray-100 rounded">{{ dayVisitCount }}</span> 名　
        合計 / <span class="px-2 py-1 bg-gray-100 rounded">{{ totalCount }}</span> 名
      </div>
    </section>

    <!-- 備考 -->
    <div class="text-xs text-gray-600 mt-2 mb-5">
      ※ A：夕食後帰宅、B：おやつ後帰宅、泊：宿泊、帰：泊利用終了、休：サービス利用休み
    </div>

    <!-- 訪問 -->
    <section class="bg-white p-4 mb-4 border border-gray-300 rounded">
      <h2 class="text-base font-bold mb-3 border-b border-gray-300 pb-1">訪問</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div 
          v-for="user in filteredVisitUsers" 
          :key="user.user_id" 
          class="border border-gray-300 rounded p-3"
        >
          <div class="font-medium mb-2">{{ user.name }} 様</div>
          <div class="space-y-2">
            <div class="flex items-center space-x-2">
              <input 
                type="time" 
                class="w-[45%] border border-gray-300 rounded p-1 text-sm" 
                :value="getTimeFromDateTime(user.services?.visiting_services_start?.[0]?.served_time)"
                readonly
              >
              <span class="text-sm">～</span>
              <input 
                type="time" 
                class="w-[45%] border border-gray-300 rounded p-1 text-sm" 
                :value="getTimeFromDateTime(user.services?.visiting_services_end?.[0]?.served_time)"
                readonly
              >
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 職員・日勤者 / 夜勤者 -->
    <StaffSection
      :dayStaff="selectedRecordStore.nowSelectedItem_Kanri?.staff?.nikkin || []"
      :nightStaff="selectedRecordStore.nowSelectedItem_Kanri?.staff?.yakin || []"
      :targetDate="selectedRecordStore.nowSelectedItem_Kanri.day_key"
      :selectedStaff="selectedRecordStore.nowSelectedItem_Kanri?.staff || { nikkin: [], yakin: [] }"
      :isStaffAddEnabled="!!selectedRecordStore.nowSelectedItem_Kanri?.userList"
      @confirm="handleModalSave"
      @delete="handleModalSave"
    />



    <!-- 入浴者 -->
    <section class="bg-white p-4 mb-4 border border-gray-300 rounded">
      <h2 class="text-base font-bold mb-3 border-b border-gray-300 pb-1">入浴者</h2>
      <div class="flex flex-wrap gap-2">
        <div v-for="(user, index) in selectedRecordStore.nowSelectedItem_Kanri.Bath_use" :key="index" class="bg-gray-50 px-3 py-1.5 rounded text-sm text-gray-800">
          {{ user.name }} 様
        </div>
      </div>
    </section>

    <!-- 食事 -->
    <FreeInput
      v-model="sections.meals.items"
      title="食事"
      type="meals"
      :empty-message="sections.meals.emptyMessage"
      :placeholder="sections.meals.placeholder"
      @update:modelValue="updateMeals"
      @confirm="handleModalSave"
    />

    <!-- レクリエーション -->
    <FreeInput
      v-model="sections.recreation.items"
      title="レクリエーション"
      :empty-message="sections.recreation.emptyMessage"
      :placeholder="sections.recreation.placeholder"
      @update:modelValue="updateRecreation"
      @confirm="handleModalSave"
    />

    <!-- 面会者 -->
    <FreeInput
      v-model="sections.visitors.items"
      title="面会者"
      :empty-message="sections.visitors.emptyMessage"
      :placeholder="sections.visitors.placeholder"
      @update:modelValue="updateVisitors"
      @confirm="handleModalSave"
    />

    <!-- 地域交流・ボランティア -->
    <FreeInput
      v-model="sections.community.items"
      title="地域交流・ボランティア"
      :empty-message="sections.community.emptyMessage"
      :placeholder="sections.community.placeholder"
      @update:modelValue="updateCommunity"
      @confirm="handleModalSave"
    />
  </div>
</template>

<script>
import { useSelectedRecordStore } from '@/stores/selectedRecord';
import { ref, computed, reactive, watch, onUnmounted,getCurrentInstance } from 'vue';
import FreeInput from '@/components/FreeInput.vue';
import StaffModal from '../Modals/StaffModal.vue';
import StaffSection from '@/components/StaffSection.vue';
import { useShareStore } from '../stores/useShareData';

export default {
  components: {
    FreeInput,
    StaffModal,
    StaffSection
  },
  setup() {
    const selectedRecordStore = useSelectedRecordStore();
    const ShareStore = useShareStore();
    
    // アラート
    const alerts = ref([
        "〇〇 様の利用タイプが選択されていません",
        "△△ 様の利用・帰宅時間が記録されていません",
        "朝食の内容が未入力です",
        "昼食の内容が未入力です",
        "レクリエーション内容が未入力です",
    ]);

    // 選択肢オプション
    const options = ref([
        { label: "A", value: "A" },
        { label: "B", value: "B" },
        { label: "泊", value: "泊" },
        { label: "帰", value: "帰" },
        { label: "休", value: "休" },
    ]);

    // スケジュールタイプからオプション値へのマッピング
    const scheduleToOption = {
      "A": "A",
      "B": "B",
      "泊": "泊",
      "帰": "帰",
      "訪": "訪",
      "休": "休"
    };

    // 前処理済みのユーザーリスト
    const processedUserList = computed(() => {
      if (!selectedRecordStore.nowSelectedItem_Kanri || 
          !selectedRecordStore.nowSelectedItem_Kanri.userList ||
          !Array.isArray(selectedRecordStore.nowSelectedItem_Kanri.userList)) {
        return [];
      }

      // ユーザーリストを直接使用
      return selectedRecordStore.nowSelectedItem_Kanri.userList;
    });

    
    // コンピューテッドプロパティ
    const stayCount = computed(() => {
      return processedUserList.value.filter(user => 
        user.selectedOptions.includes("泊")
      ).length;
    });
    
    const dayVisitCount = computed(() => {
      return processedUserList.value.filter(user => 
        user.selectedOptions.includes("A") || user.selectedOptions.includes("B")
      ).length;
    });
    
    const totalCount = computed(() => {
      return stayCount.value + dayVisitCount.value;
    });
    
    // ユーザーのオプション選択
    function selectOption(user, value) {
      // selectedOptionsに既に含まれている場合は何もしない
      if (user.selectedOptions.includes(value)) {
        // すでに選択されているオプションは選択状態を解除せず、
        // 単に選択されていることを視覚的に表示するだけ
        // user.selectedOptions配列は変更しない
      }
    }

    // データが変更されたときにストアに保存する処理
    watch(processedUserList, (newList) => {
      if (newList.length > 0 && selectedRecordStore.nowSelectedItem_Kanri) {
        // ストアの状態を更新（変更が加えられたリストで上書き）
        selectedRecordStore.updateUserList(newList);
      }
    }, { deep: true });

    // 以下の内容は変更なし
    const meals = reactive({
        breakfast: "",
        lunch: "",
        dinner: "",
        snack: "",
    });

    const recreation = ref("");
    
    // 訪問ユーザーをフィルタリングするcomputed
    const filteredVisitUsers = computed(() => {
      if (!selectedRecordStore.nowSelectedItem_Kanri?.userList) {
        return [];
      }

      return selectedRecordStore.nowSelectedItem_Kanri.userList.filter(user => {
        return  user.schedules && user.schedules.some(schedule => schedule.schedule_name === '訪')
              // user.services &&       
              //  user.services.visiting_services_start && 
              //  user.services.visiting_services_start.length > 0;
      });
    });
    
    // 職員
    const dayStaff = computed(() => {
      return selectedRecordStore.nowSelectedItem_Kanri?.staff?.nikkin || [];
    });

    const nightStaff = computed(() => {
      return selectedRecordStore.nowSelectedItem_Kanri?.staff?.yakin || [];
    });
      
      // スタッフモーダル
    const showStaffModal = ref(false);
    const currentShiftType = ref('');
    const modalTitle = ref('スタッフを選択');
    const availableStaff = ref([
        { id: 5, name: "伊藤 三郎" },
        { id: 6, name: "高橋 四郎" },
        { id: 7, name: "渡辺 五郎" },
        { id: 8, name: "吉田 六郎" },
        { id: 9, name: "山本 七郎" },
        { id: 10, name: "中村 八郎" }
    ]);
      
      
      // 面会者
    const visitor = ref("");
      
      // 地域交流・ボランティア
    const community = ref("");
    
    // モーダル関連のメソッド
    const openStaffModal = (shiftType) => {
      currentShiftType.value = shiftType;
      modalTitle.value = shiftType === 'day' ? '日勤スタッフ追加' : '夜勤スタッフ追加';
      showStaffModal.value = true;
    };
    
    const hideStaffModal = async () => {
      showStaffModal.value = false;
      await  selectedRecordStore.ReLode_Kanri_Nissi();
    };
    
    const confirmStaff = async () => {

      await hideStaffModal();
      showStaffModal.value = false;
      await selectedRecordStore.ReLode_Kanri_Nissi();
    };
    
    function removeStaff(shiftType, index) {
      if (shiftType === 'day') {
        dayStaff.value.splice(index, 1);
      } else {
        nightStaff.value.splice(index, 1);
      }
    }

    // セクションの状態管理を更新
    const sections = reactive({
      meals: {
        title: '食事',
        isEditing: false,
        editingContent: '',
        editingMeals: {
          breakfast: '',
          lunch: '',
          dinner: '',
          snack: ''
        },
        items: [],
        emptyMessage: '食事の記録はありません',
        placeholder: '食事の内容を入力してください'
      },
      recreation: {
        title: 'レクリエーション',
        isEditing: false,
        editingContent: '',
        items: [],
        emptyMessage: 'レクリエーションの記録はありません',
        placeholder: 'レクリエーションの内容を入力してください'
      },
      visitors: {
        title: '面会者',
        isEditing: false,
        editingContent: '',
        items: [],
        emptyMessage: '面会者の記録はありません',
        placeholder: '面会者の情報を入力してください'
      },
      community: {
        title: '地域交流・ボランティア',
        isEditing: false,
        editingContent: '',
        items: [],
        emptyMessage: '地域交流・ボランティアの記録はありません',
        placeholder: '地域交流・ボランティアの内容を入力してください'
      }
    });

    // 管理日誌データの監視とセクションの更新
    watch(() => selectedRecordStore.nowSelectedItem_Kanri?.kanri_nissi, (newKanriNissi) => {
      // kanri_nissiが存在しない、または空の配列の場合、セクションを初期化
      if (!newKanriNissi || newKanriNissi.length === 0) {
        // 各セクションの初期化
        sections.meals.items = [];
        sections.recreation.items = [];
        sections.visitors.items = [];
        sections.community.items = [];
        return;
      }

      // 既存の処理
      const nissiData = newKanriNissi;

      // 食事セクションの更新
      const mealItems = [];
      if (nissiData.breakfast) mealItems.push(`朝食：${nissiData.breakfast}`);
      if (nissiData.lunch) mealItems.push(`昼食：${nissiData.lunch}`);
      if (nissiData.dinner) mealItems.push(`夕食：${nissiData.dinner}`);
      if (nissiData.snack) mealItems.push(`おやつ：${nissiData.snack}`);
      sections.meals.items = mealItems;

      // レクリエーションセクションの更新
      if (nissiData.recreation) {
        sections.recreation.items = nissiData.recreation.split('、').filter(item => item.trim());
      } else {
        sections.recreation.items = [];
      }

      // 面会者セクションの更新
      if (nissiData.visitors) {
        sections.visitors.items = nissiData.visitors.split('、').filter(item => item.trim());
      } else {
        sections.visitors.items = [];
      }

      // 地域交流・ボランティアセクションの更新
      if (nissiData.community_interaction) {
        sections.community.items = nissiData.community_interaction.split('、').filter(item => item.trim());
      } else {
        sections.community.items = [];
      }
    }, { immediate: true, deep: true });



    // 更新メソッドを修正
    const updateMeals = async (newItems) => {
      try {
        if (!selectedRecordStore.nowSelectedItem_Kanri?.kanri_nissi) {
          console.warn('管理日誌データが存在しません');
          return;
        }

        const updatedNissi = {
          ...selectedRecordStore.nowSelectedItem_Kanri.kanri_nissi,
          updated_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
          breakfast: '',
          lunch: '',
          dinner: '',
          snack: ''
        };

        newItems.forEach(item => {
          if (item.startsWith('朝食：')) updatedNissi.breakfast = item.replace('朝食：', '');
          if (item.startsWith('昼食：')) updatedNissi.lunch = item.replace('昼食：', '');
          if (item.startsWith('夕食：')) updatedNissi.dinner = item.replace('夕食：', '');
          if (item.startsWith('おやつ：')) updatedNissi.snack = item.replace('おやつ：', '');
        });

        // 更新処理を即時実行
        sections.meals.items = newItems;
        
        // ストアの更新を非同期で実行
        await selectedRecordStore.updateKanriNissi_Free('meals',updatedNissi);
      } catch (error) {
        console.error('食事データの更新に失敗しました:', error);
      }
    };

    const updateRecreation = async (newItems) => {
      try {

        console.log('レクリェーションの更新処理',newItems);
          if (!selectedRecordStore.nowSelectedItem_Kanri) {
              console.warn('管理日誌データが存在しません');
              return;
          }
        
        const updatedNissi = {
          ...selectedRecordStore.nowSelectedItem_Kanri.kanri_nissi,
          updated_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
          recreation: newItems.join('、')
        };

        // 更新処理を即時実行
        sections.recreation.items = newItems;
        // ストアの更新を非同期で実行
        await selectedRecordStore.updateKanriNissi_Free('recreation',updatedNissi);

      } catch (error) {
        console.error('レクリエーションデータの更新に失敗しました:', error);
      }
    };

    const updateVisitors = async (newItems) => {
      try {
        if (!selectedRecordStore.nowSelectedItem_Kanri?.kanri_nissi) {
          console.warn('管理日誌データが存在しません');
          return;
        }

        const updatedNissi = {
          ...selectedRecordStore.nowSelectedItem_Kanri.kanri_nissi,
          updated_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
          visitors: newItems.join('、')
        };

        // ストアの更新を非同期で実行
        await selectedRecordStore.updateKanriNissi_Free('menkai',updatedNissi);//面会者
      } catch (error) {
        console.error('面会者データの更新に失敗しました:', error);
      }
    };

    const updateCommunity = async (newItems) => {
      try {
        if (!selectedRecordStore.nowSelectedItem_Kanri?.kanri_nissi) {
          console.warn('管理日誌データが存在しません');
          return;
        }

        const updatedNissi = {
          ...selectedRecordStore.nowSelectedItem_Kanri.kanri_nissi,
          updated_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
          community_interaction: newItems.join('、')
        };

        // ストアの更新を非同期で実行
        await selectedRecordStore.updateKanriNissi_Free('community',updatedNissi);

      } catch (error) {
        console.error('地域交流データの更新に失敗しました:', error);
      }
    };

    // 日時文字列から時刻部分を取得するメソッド
    const getTimeFromDateTime = (dateTimeStr) => {
      if (!dateTimeStr) return '';
      // "2025-03-25 15:26:34" から "15:26" を抽出
      const match = dateTimeStr.match(/\d{2}:\d{2}/);
      return match ? match[0] : '';
    };

    // 開始時間を更新するメソッド
    const updateStartTime = (user, newTime) => {
      if (!user.startTime) {
        // 日付が未設定の場合、現在の日付を使用
        const today = new Date().toISOString().split('T')[0];
        user.startTime = `${today} ${newTime}:00`;
      } else {
        // 既存の日付部分を保持
        const datePart = user.startTime.split(' ')[0];
        user.startTime = `${datePart} ${newTime}:00`;
      }
      console.log('Updated startTime:', user.startTime);
    };

    // 終了時間を更新するメソッド
    const updateEndTime = (user, newTime) => {
      if (!user.endTime) {
        // 日付が未設定の場合、現在の日付を使用
        const today = new Date().toISOString().split('T')[0];
        user.endTime = `${today} ${newTime}:00`;
      } else {
        // 既存の日付部分を保持
        const datePart = user.endTime.split(' ')[0];
        user.endTime = `${datePart} ${newTime}:00`;
      }
      console.log('Updated endTime:', user.endTime);
    };

    // スタッフ削除確認モーダル関連
    const showDeleteConfirmModal = ref(false);
    const selectedStaffForDelete = ref(null);

    const openDeleteConfirmModal = (shiftType, index) => {
      const staffList = shiftType === 'day' ? dayStaff.value : nightStaff.value;
      selectedStaffForDelete.value = {
        ...staffList[index],
        shiftType,
        index
      };
      showDeleteConfirmModal.value = true;
    };

    const closeModal = () => {

    };

      // モーダルのデータ保存処理を修正
      const handleModalSave = async (data) => {
        console.log(`${modalTitle.value}データ保存:`, data);
        
        // モーダルを閉じる
        closeModal();

        try{
          console.log("✅データ保存後のデータを再読み込みします");
          ShareStore.$patch({isLoading:true});
          await selectedRecordStore.ReLode_Kanri_Nissi();
        }catch(error){
          console.error('データ保存エラー:', error);
        }finally{
          ShareStore.$patch({isLoading:false});
        }
      };

    const handleStaffUpdate = ({ shiftType, staff }) => {
      // スタッフ更新の処理
      if (shiftType === 'day') {
        // 日勤スタッフの更新処理
      } else {
        // 夜勤スタッフの更新処理
      }
    };

    const handleStaffDelete = ({ shiftType, index }) => {
      // スタッフ削除の処理
      if (shiftType === 'day') {
        // 日勤スタッフの削除処理
      } else {
        // 夜勤スタッフの削除処理
      }
    };

    // コンポーネントのアンマウント時のクリーンアップ処理を追加
    onUnmounted(() => {
      // 必要に応じて、未完了の非同期処理をキャンセルするなどのクリーンアップを行う
    });

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
      selectedRecordStore,
      alerts,
      processedUserList,
      options,
      meals,
      recreation,
      filteredVisitUsers,
      dayStaff,
      nightStaff,
      showStaffModal,
      currentShiftType,
      modalTitle,
      availableStaff,
      visitor,
      community,
      stayCount,
      dayVisitCount,
      totalCount,
      selectOption,
      openStaffModal,
      hideStaffModal,
      confirmStaff,
      removeStaff,
      sections,
      getTimeFromDateTime,
      updateStartTime,
      updateEndTime,
      updateMeals,
      updateRecreation,
      updateVisitors,
      updateCommunity,
      showDeleteConfirmModal,
      selectedStaffForDelete,
      openDeleteConfirmModal,
      closeModal,
      handleModalSave,
      handleStaffUpdate,
      handleStaffDelete
    };
  }
};
</script>

<style scoped>
.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.edit-button {
  margin-left: 0.5rem;
}

textarea {
  min-height: 100px;
}
</style>
