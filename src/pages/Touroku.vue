<template>
  <div class="max-w-3xl mx-auto my-5 bg-white p-5 rounded-lg shadow-md">
    <!-- 日付入力ボックス -->
    <div class="mb-5 text-center">
      <input 
        type="date" 
        v-model="selectedDate" 
        class="text-xl text-center border p-2 rounded-md"
      >
      <p class="mt-2 text-sm text-gray-600">利用する日付を選択してください</p>
    </div>

    <!-- ユーザーリスト -->
    <div v-for="user in users" :key="user.user_id" class="flex justify-between items-center py-2.5 border-b border-gray-300">
      <div class="text-[1.5rem] w-2/5">{{ user.name }}</div>
      <div class="flex gap-1 w-3/5 justify-end">
        <button
          v-for="option in options"
          :key="option"
          class="px-6 py-4 border border-green-600 rounded cursor-pointer text-[2.0rem] min-w-[85px] transition"
          :class="{
            'bg-green-600 text-white': user.selectedOptions.includes(option),
            'text-green-600 bg-white hover:bg-green-600 hover:text-white': !user.selectedOptions.includes(option),
            'opacity-50 cursor-not-allowed': isButtonDisabled(user, option)
          }"
          @click="!isButtonDisabled(user, option) && selectOption(user, option)"
        >
          {{ option }}
        </button>
      </div>
    </div>

    <!-- 保存ボタン -->
    <button 
      class="block mx-auto mt-5 px-5 py-2.5 bg-green-600 text-white border-none rounded cursor-pointer text-base shadow-md hover:bg-green-700 transition"
      @click="isConfirmModalOpen = true"
    >
      保存
    </button>
    
    <!-- 確認モーダル -->
    <div v-if="isConfirmModalOpen" class="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
      <div class="bg-white p-5 rounded-lg min-w-[300px] max-w-[90%] text-center shadow-lg">
        <p v-html="selectedUsers.join('<br>')" class="mb-2.5"></p>
        <p class="text-lg font-bold">{{ confirmMessage }}</p>
        <div class="mt-5 flex justify-center gap-5">
          <button class="bg-green-600 text-white px-5 py-2.5 rounded cursor-pointer text-base hover:bg-green-700"
           @click="saveData">
            はい
          </button>
          <button class="bg-red-600 text-white px-5 py-2.5 rounded cursor-pointer text-base hover:bg-red-700"
           @click="isConfirmModalOpen = false">
            いいえ
          </button>
        </div>
      </div>
    </div>

    <!-- 登録完了トースト -->
    <div v-if="isToastVisible" class="fixed top-10 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-5 py-2.5 rounded shadow-md z-50 opacity-100 transition-opacity duration-500">
      ☑ 登録しました
    </div>
  </div>
</template>


<script>
import { ref, reactive, computed, onMounted, watch } from "vue";
import { useRouter } from 'vue-router';
import { useShareStore } from "../stores/useShareData.js"; // Piniaストアをインポート
import { getTodayYYYYMMDD,getDateFromToday } from "../utils/timeUtils.js"; // timeUtilsから関数をインポート

export default {
  setup() {
    const router = useRouter();
    const ShareStore = useShareStore();

    // 日付入力（デフォルトで今日の日付）
    const selectedDate = ref("");
    
    // 日付が変更されたときにデータを再取得
    watch(selectedDate, async (newDate) => {
      if (newDate) {
        console.log("日付が変更されました:", newDate);
        await fetchData();
      }
    });
    
    onMounted(async () => {
      // timeUtilsから現在の日付を取得
      selectedDate.value = getDateFromToday(1);
      await fetchData();
    });

    // ユーザーデータ（利用者ごとの選択情報）
    const users = ref([]);

    // ボタンのオプション
    const options = ["A", "B", "泊", "帰", "訪"];
    
    // オプションに対応するスケジュールID
    const optionScheduleIds = {
      "A": 1,
      "B": 2,
      "泊": 3,
      "帰": 4,
      "訪": 5
    };

    // 選択を切り替える
    const selectOption = (user, option) => {
      // selectedOptions配列が存在しない場合は初期化
      if (!user.selectedOptions) {
        user.selectedOptions = [];
      }
      
      // オプションが既に選択されているか確認
      const index = user.selectedOptions.indexOf(option);
      
      // 現在の選択状態を確認
      const hasA = user.selectedOptions.includes("A");
      const hasB = user.selectedOptions.includes("B");
      const hasStay = user.selectedOptions.includes("泊");
      const hasReturn = user.selectedOptions.includes("帰");
      const hasVisit = user.selectedOptions.includes("訪");
      
      // 選択ロジックの実装
      if (index === -1) {
        // 選択されていない場合は追加（条件に基づく）
        switch (option) {
          case "A":
            // Aが押された場合、Bが選択されていれば解除
            if (hasB) {
              const bIndex = user.selectedOptions.indexOf("B");
              user.selectedOptions.splice(bIndex, 1);
            }
            // 泊が選択されていれば解除
            if (hasStay) {
              const stayIndex = user.selectedOptions.indexOf("泊");
              user.selectedOptions.splice(stayIndex, 1);
            }
            user.selectedOptions.push(option);
            break;
            
          case "B":
            // Bが押された場合、Aが選択されていれば解除
            if (hasA) {
              const aIndex = user.selectedOptions.indexOf("A");
              user.selectedOptions.splice(aIndex, 1);
            }
            // 泊が選択されていれば解除
            if (hasStay) {
              const stayIndex = user.selectedOptions.indexOf("泊");
              user.selectedOptions.splice(stayIndex, 1);
            }
            user.selectedOptions.push(option);
            break;
            
          case "泊":
            // 泊が押された場合、A、B、帰を解除
            user.selectedOptions = user.selectedOptions.filter(opt => opt !== "A" && opt !== "B" && opt !== "帰");
            user.selectedOptions.push(option);
            break;
            
          case "帰":
            // 帰が押された場合、泊を解除
            if (hasStay) {
              const stayIndex = user.selectedOptions.indexOf("泊");
              user.selectedOptions.splice(stayIndex, 1);
            }
            user.selectedOptions.push(option);
            break;
            
          case "訪":
            // 訪は独立しているので、そのまま追加
            user.selectedOptions.push(option);
            break;
        }
      } else {
        // 選択されている場合は削除
        user.selectedOptions.splice(index, 1);
      }
      
      // 互換性のために単一選択も更新
      user.selected = user.selectedOptions.length > 0 ? user.selectedOptions[0] : "";
      
      console.log(`${user.name}の選択状態:`, user.selectedOptions);
    };

    // 確認モーダルの表示状態
    const isConfirmModalOpen = ref(false);

    // 確認用のメッセージ
    const confirmMessage = computed(() => {
      const formattedDate = selectedDate.value.replace(/-/g, "/");
      return `この内容で ${formattedDate} の利用予定者を登録しますか？`;
    });

    // 選択されたユーザー一覧を取得
    const selectedUsers = computed(() =>
      users.value
        .filter((user) => user.selectedOptions && user.selectedOptions.length > 0)
        .map((user) => `${user.name}: ${user.selectedOptions.join(', ')}`)
    );

    // 保存処理
    const saveData = async () => {
      try {
        // ローディング開始
        ShareStore.$patch({ isLoading: true });
        
        // 更新されたuserScheduleデータを準備
        const updatedUserSchedule = [];
        
        users.value.forEach(user => {
          // ユーザーのスケジュールデータを準備
          const userSchedules = [];
          
          // 既存のスケジュールデータを取得
          const existingUserSchedule = ShareStore.userSchedule.find(
            schedule => String(schedule.user_id) === String(user.user_id)
          );
          
          // 現在選択されているオプション
          const currentSelectedOptions = user.selectedOptions || [];
          
          // 既存のスケジュールがある場合
          if (existingUserSchedule && existingUserSchedule.schedules) {
            // 既存のスケジュールをループ
            existingUserSchedule.schedules.forEach(schedule => {
              // 現在選択されていないが、前回保存されていてIDが空でない場合
              if (!currentSelectedOptions.includes(schedule.schedule_name) && schedule.id !== "") {
                // delete_flgをtrueにして追加
                userSchedules.push({
                  ...schedule,
                  delete_flg: true
                });
                console.log(`${user.name}の${schedule.schedule_name}に削除フラグを設定しました`);
              }
            });
          }
          
          // 現在選択されているオプションを処理
          if (currentSelectedOptions.length > 0) {
            // 各選択オプションごとにデータを作成
            currentSelectedOptions.forEach(option => {
              // 既存のスケジュールから一致するものを探す
              let scheduleId = "";
              let existingScheduleItem = null;
              
              if (existingUserSchedule && existingUserSchedule.schedules) {
                existingScheduleItem = existingUserSchedule.schedules.find(
                  schedule => schedule.schedule_name === option
                );
                
                if (existingScheduleItem) {
                  scheduleId = existingScheduleItem.schedule_id || "";
                }
              }
              
              // オプションに対応するスケジュールIDを取得
              // 既存のschedule_idがない場合は、optionScheduleIdsから取得
              if (!scheduleId) {
                scheduleId = optionScheduleIds[option];
              }
              
              // スケジュールデータを作成
              const scheduleItem = {
                id: existingScheduleItem ? existingScheduleItem.id || "" : "",
                schedule_id: scheduleId,
                schedule_name: option,
                scheduled_time: selectedDate.value,
                delete_flg: false // 現在選択されているものはfalse
              };
              
              // ユーザースケジュールに追加
              userSchedules.push(scheduleItem);
            });
          }
          
          // ユーザーのスケジュールデータを更新
          updatedUserSchedule.push({
            user_id: user.user_id,
            schedules: userSchedules
          });
        });
        
        // ShareStoreのuserScheduleを更新
        ShareStore.$patch({ userSchedule: updatedUserSchedule });
        
        console.log("更新されたuserSchedule:", ShareStore.userSchedule);
        
        // ここでAPIを呼び出して保存処理を実行
        // 日付のみを渡し、userScheduleはすでにStoreに保存されている
        await ShareStore.saveUserSchedule(selectedDate.value);
        
        // モーダルを閉じる
        isConfirmModalOpen.value = false;
        
        // トースト表示
        showToast();
        router.push('/');
      } catch (error) {
        console.error("保存中にエラーが発生しました:", error);
        alert("保存に失敗しました。もう一度お試しください。");
      } finally {
        // ローディング終了
        ShareStore.$patch({ isLoading: false });
      }
    };

    // トーストの表示管理
    const isToastVisible = ref(false);
    const showToast = () => {
      isToastVisible.value = true;
      setTimeout(() => {
        isToastVisible.value = false;
      }, 2000);
    };

    // ボタンが無効かどうかを判定する関数
    const isButtonDisabled = (user, option) => {
      if (!user.selectedOptions) {
        user.selectedOptions = [];
      }
      
      const hasA = user.selectedOptions.includes("A");
      const hasB = user.selectedOptions.includes("B");
      const hasStay = user.selectedOptions.includes("泊");
      const hasReturn = user.selectedOptions.includes("帰");
      
      // 各ボタンの無効条件
      switch (option) {
        case "A":
          // Aは泊が選択されている場合は無効
          return hasStay;
        case "B":
          // Bは泊が選択されている場合は無効
          return hasStay;
        case "泊":
          // 泊は常に選択可能
          return false;
        case "帰":
          // 帰は泊が選択されている場合は無効
          return hasStay;
        case "訪":
          // 訪は常に選択可能
          return false;
        default:
          return false;
      }
    };

    // データを取得する関数
    const fetchData = async () => {
      try {
        // ローディング開始
        ShareStore.$patch({ isLoading: true });
        
        // 選択した日付を使用
        const targetDate = selectedDate.value;
        console.log("選択した日付:", targetDate);

        // 日付を引数としてデータ取得
        await ShareStore.getUserList(targetDate);
        await ShareStore.getUserSchedule(targetDate); // アクションを呼び出してデータ取得
        ShareStore.setHeaderTitle('利用予定者登録');
        // デバッグ情報
        console.log("ユーザーリスト:", ShareStore.userList);
        console.log("スケジュールリスト:", ShareStore.userSchedule);
        
        // 取得したデータを `users` に反映
        users.value = ShareStore.userList.map((user) => {
          // ユーザーIDに対応するスケジュールデータを検索
          // userList の id と userSchedule の user_id を比較
          const userSchedule = ShareStore.userSchedule.find(
            (schedule) => Number(schedule.user_id) === Number(user.id)
          );
          
          // デバッグ情報
          console.log(`ユーザー ${user.name} (ID: ${user.id})のスケジュール:`, userSchedule);
          
          // スケジュールデータがある場合、schedule_nameを取得
          // 複数のスケジュールに対応するため、配列として保持
          const selectedOptions = [];
          if (userSchedule && userSchedule.schedules && userSchedule.schedules.length > 0) {
            userSchedule.schedules.forEach(schedule => {
              selectedOptions.push(schedule.schedule_name);
            });
            console.log(`${user.name}の選択オプション:`, selectedOptions);
          }
          
          return {
            user_id: user.id, // userList の id を user_id として使用
            name: user.name,
            // 複数選択に対応するため、selectedOptionsを配列として保持
            selectedOptions: selectedOptions,
            // 互換性のために単一選択も維持
            selected: selectedOptions.length > 0 ? selectedOptions[0] : ""
          };
        });

        console.log("最終的なユーザーリスト:", users.value);

        // Safari の判定
        if (navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("Chrome")) {
          ShareStore.setIS_Safari(true);
        } else {
          ShareStore.setIS_Safari(false);
        }
      } catch (error) {
        console.error("データ取得エラー:", error);
      } finally {
        // ローディング終了
        ShareStore.$patch({ isLoading: false });
      }
    };

    return {
      selectedDate,
      users,
      options,
      selectOption,
      isConfirmModalOpen,
      confirmMessage,
      selectedUsers,
      saveData,
      isToastVisible,
      showToast,
      isButtonDisabled,
    };
  },
};
</script>
