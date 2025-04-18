// stores/useShareData.js
import { defineStore } from 'pinia';
import apiService from '@/services/api.js';
import ExcelJS from 'exceljs'; // これをファイルの先頭で必ずインポート
import { useSelectedRecordStore } from '../stores/selectedRecord.js';
import { usePrintDataStore } from './printData.js';
import { ref, computed, onMounted } from 'vue';
import { auth } from '../firebase_settings/index.js';
import { onAuthStateChanged } from 'firebase/auth';

export const useShareStore = defineStore('useShareData', () => {
  // 状態
  const LoginData = ref(null);
  const userList = ref([]);
  const userSchedule = ref([]);
  const staffList = ref([]);
  const read_Only_flg = ref(false);
  const update_flg = ref(false);
  const print_flg = ref(false);
  const All_Click = ref(false);
  const Search_id = ref('');
  const isLoading = ref(false);
  const IS_Already_Exists = ref(false);
  const IS_Safari = ref(false);
  const Now_Form_day_key = ref('');
  const isModalOpen = ref(false);
  const is_select_fac_or_vis = ref("");
  const header_title = ref('利用者選択');
  const selected_user = ref(null);
  const selected_Service_Status = ref(null);
  const currentUser = ref(null);

  // オプションに対応するスケジュールID
  const optionScheduleIds = {
    "A": 1,
    "B": 2,
    "泊": 3,
    "帰": 4,
    "訪": 5
  };

  // 認証状態の監視
  onMounted(() => {
    onAuthStateChanged(auth, (user) => {
      currentUser.value = user;
    });
  });

  // アクション
  const setUserSchedule = (schedule) => {
    userSchedule.value = schedule;
  };

  const setSelectedUser = async (user) => {
    isLoading.value = true;
    selected_user.value = user;
    await _getSelectedServiceStatus();
    isLoading.value = false;
  };

  const setSelectedUser_Clear = () => {
    selected_user.value = null;
    selected_Service_Status.value = null;
    is_select_fac_or_vis.value = "";
  };

  const setHeaderTitle = (title) => {
    header_title.value = title;
  };

  const setIS_Safari = (value) => {
    IS_Safari.value = value;
  };

  const setLoginData = (value) => {
    LoginData.value = value;
  };

  const _getSelectedServiceStatus = async () => {
    isLoading.value = true;
    if (!selected_user.value) {
      console.log("selected_userがnullです");
      alert("selected_userがnullです");
      selected_Service_Status.value = null;
      is_select_fac_or_vis.value = "";
      return;
    }

    if(selected_user.value.schedules && selected_user.value.schedules.some(schedule => schedule.schedule_name !== '訪')){
      if(selected_user.value.schedules.some(schedule => schedule.schedule_name === '訪')){
        console.log("🟢 送迎も訪問もあるので選択が必要です");
        is_select_fac_or_vis.value = "";
      } else {
        is_select_fac_or_vis.value = 'fac';
      }
    } else if(selected_user.value.schedules.some(schedule => schedule.schedule_name === '訪')){
      console.log("🟢 訪問しかないので訪問が確定しました");
      is_select_fac_or_vis.value = 'visit';
    }

    isLoading.value = false;
  };

  const Chose_Service = async (serviceData) => {
    try {
      console.log("🟢 サービス追加開始:", serviceData);
      
      // データの型を確認して変換
      const postData = {
        item_id: Number(serviceData.item_id), // 確実に数値型に変換
        user_id: Number(serviceData.user_id), // 確実に数値型に変換
        served_time: serviceData.served_time,
        note: serviceData.note || "",
        schedule_id: serviceData.schedule_id || null,
        recorded_staff_id: Number(serviceData.recorded_staff_id) || 1 // 確実に数値型に変換
      };
      
      console.log("🟢 送信データ:", postData);
      
      const response = await apiService.InsertService(postData);

      return response;
    } catch (error) {
      console.error("❌ サービス追加エラー:", error.response?.data || error);
      throw error;
    }
  };

  const select_InputService = async (serviceData) => {
    const respons =  await Chose_Service(serviceData);
    console.log("レスポンス",respons);
      if(respons){
        await _getSelectedServiceStatus();
        console.log("🟢 サービスステータス:", selected_Service_Status.value);
      }
   };

   const getServiceStatusList = async () => {
     try {
       const response = await apiService.getServiceStatus();
       console.log("サービスステータス取得結果:", response);
       // 全てのステータスデータを返す
       selected_Service_Status.value = response;
     } catch (error) {
       console.error("サービスステータス取得エラー:", error);
       throw error;
     }
  };

  const getUserList = async (target_day) => {
    try {
      const response = await apiService.getUserList(target_day); // 修正済み
      userList.value = response.data;
      console.log("🟢 [現在生き残りの利用者] Response:", userList.value);
      return true; // Return true on success
    } catch (error) {
      console.error('Error fetching user data:', error);
      return false; // Return false on error
    }
  };

  const getUserSchedule = async (target_day) => {
    try {
      isLoading.value = true;
      const response = await apiService.getUser_Schedules(target_day); // 修正済み
      
      // ユーザーIDごとにグループ化
      const groupedUsers = {};
      
      // 各ユーザーをユーザーIDでグループ化
      response.data.forEach(user => {
        const userId = user.user_id;
        
        if (!groupedUsers[userId]) {
          // 初めて見つかったユーザーIDの場合、新しいグループを作成
          groupedUsers[userId] = {
            user_id: userId,
            name: user.name,
            service_time: target_day,
            schedules: [{ 
              id: user.id,
              schedule_id: user.schedule_id,
              schedule_name: user.schedule_name,
              scheduled_time: user.scheduled_time,
              delete_flg: false,
            }]
          };
        } else {
          // 既存のユーザーIDの場合、スケジュール情報を追加
          groupedUsers[userId].schedules.push({
            id: user.id,
            schedule_id: user.schedule_id,
            schedule_name: user.schedule_name,
            scheduled_time: user.scheduled_time,
            delete_flg: false,
          });
        }
      });
      
      // オブジェクトから配列に変換
      userSchedule.value = Object.values(groupedUsers);
      
      console.log("🟢 [今日の利用者の予定(グループ化後)] Response:", userSchedule.value);

      return true; // Return true on success
    } catch (error) {
      console.error('Error fetching user data:', error);
      return false; // Return false on error
    }
    finally {
      isLoading.value = false;
    }
  };

  const saveUserSchedule = async (target_day) => {
    try {
      console.log("🟢 保存処理開始 - 日付:", target_day);
      console.log("📌 保存するデータ:", JSON.stringify(userSchedule.value, null, 2));

      // 🔹 削除対象のIDを収集
      let deleteIds = [];

      for (const userSchedule of userSchedule.value) {
          const userId = userSchedule.user_id;
          console.log(`🟠 ユーザーID: ${userId} のスケジュール処理中...`);

          if (userSchedule.schedules) {
              for (const schedule of userSchedule.schedules) {
                  console.log(`📋 処理中のスケジュール: ${JSON.stringify(schedule, null, 2)}`);

                  if (schedule.delete_flg === true && schedule.id) {
                      // 数値に変換してから追加（文字列の場合は数値に変換）
                      const scheduleId = parseInt(schedule.id, 10);
                      if (!isNaN(scheduleId)) {
                          deleteIds.push(scheduleId);
                          console.log(`🛑 削除対象に追加: スケジュールID ${scheduleId} (元の値: ${schedule.id})`);
                      } else {
                          console.warn(`⚠️ 無効なスケジュールID: ${schedule.id} - 数値に変換できません`);
                      }
                  }
              }
          }
      }

      // 🔹 削除処理の実行
      if (deleteIds.length > 0) {
          console.log(`⚠️ 削除対象のID一覧: ${JSON.stringify(deleteIds, null, 2)}`);

          try {
              // バックエンドは配列を期待しているので、オブジェクトではなく直接配列を送信
              const deleteResponse = await apiService.deleteSchedule(deleteIds);
              console.log("✅ 削除完了:", deleteResponse);
              
              // 削除が成功したか確認
              if (!deleteResponse.success) {
                  console.error("❌ スケジュールの削除に失敗しました:", deleteResponse.message);
                  alert(`スケジュールの削除に失敗しました: ${deleteResponse.message}`);
              }
          } catch (deleteError) {
              console.error("❌ スケジュールの削除に失敗しました:", deleteError.response?.data || deleteError.message);
              alert("スケジュールの削除に失敗しました。もう一度お試しください。");
          }
      } else {
          console.log("ℹ️ 削除対象のスケジュールはありません。");
      }
  
      // 🔹 削除フラグが false のスケジュールのみを抽出して保存
      for (const userSchedule of userSchedule.value) {
        console.log("🟢 要素", userSchedule);
        
        // 削除フラグがfalseのスケジュールを抽出
        const schedulesToProcess = userSchedule.schedules.filter(schedule => !schedule.delete_flg);
        
        // 新規保存要素（idが空のもの）のみを処理
        // 既存のスケジュール（idが存在する）で削除フラグがfalseのものは変更がないため処理しない
        const newSchedules = schedulesToProcess
          .filter(schedule => !schedule.id || schedule.id === "")
          .map(schedule => ({
            user_id: userSchedule.user_id,
            schedule_id: schedule.schedule_id || optionScheduleIds[schedule.schedule_name] || 0, // schedule_idがあればそれを使用、なければオプション名からIDを取得
            scheduled_time: target_day,
            recorded_staff_id: 1 // 固定値として1を設定
          }));
        
        // 既存の要素は処理しない（変更がないため）
        const validSchedules = newSchedules;
        
        console.log("🟢 保存するデータ:", JSON.stringify(validSchedules, null, 2));

        // 各スケジュールを個別に保存
        for (const schedule of validSchedules) {
          try {
            const response = await apiService.saveUserSchedule(target_day, schedule);
            console.log(`✅ スケジュール保存成功 - ユーザーID: ${schedule.user_id}`, response);
          } catch (error) {
            console.error(`❌ スケジュール保存失敗 - ユーザーID: ${schedule.user_id}`, error);
            
            // スケジュール競合エラーの特別処理
            if (error.response && error.response.status === 409) {
              console.warn(`⚠️ スケジュール競合: ${error.response.data.message}`);
              
              // エラーメッセージから競合するスケジュールIDを抽出
              const errorMsg = error.response.data.error || '';
              const conflictMatch = errorMsg.match(/schedule_id (\d+) and (\d+) are mutually exclusive/);
              
              if (conflictMatch) {
                const [_, id1, id2] = conflictMatch;
                console.warn(`⚠️ 相互排他的なスケジュール: ID ${id1} と ID ${id2} は同時に設定できません`);
                
                // アラートでユーザーに通知（オプション）
                // alert(`スケジュールの競合が発生しました: スケジュールタイプ ${id1} と ${id2} は同時に設定できません`);
              }
              
              // 処理は続行
              continue;
            }
            
            throw error;
          }
        }
      }
  
      return true;
  
    } catch (error) {
      console.error("Error saving user schedule:", error);
      throw error;
    }
  };

  const getStaff = async (target_day) => {
    try {
      const response = await apiService.getStaffs(target_day); // 修正済み
      staffList.value = response.data;
      return true; // Return true on success
    } catch (error) {
      console.error('Error fetching staff data:', error);
      return false; // Return false on error
    }
  };

  const sendLoginData = async (email, password) => {
    try {
      console.log("🟢 [ログインデータ送信] Sending data:", { email, password });

      const response = await apiService.login(email, password);

      console.log("✅ [Login Success] Response:", response);

      if (response) {
          //alert("✅ ログイン成功！");
          setLoginData(response); // ✅ ユーザーデータをセット
      } else {
          alert("❌ ログイン失敗");
          console.warn("⚠️ [Login Warning] No response received.");
      }
    } catch (error) {
        console.error("❌ [Login Failed] Error:", error.response?.data || error);

        // ✅ API エラーの詳細を出力
        if (error.response) {
            console.error("🔴 [API Error Response] Status:", error.response.status);
            console.error("🔴 [API Error Response] Data:", error.response.data);
        } else {
            console.error("🔴 [Unknown Error]", error);
        }

        alert("❌ ログインに失敗しました。メールアドレスまたはパスワードを確認してください。");
    }
  };

  const Clear_LoginData = async () => {
    try {
      console.log('ログアウト処理');
      const response = await apiService.logout();
      console.log('ログアウト完了',response);
    } catch (error) {
        console.error("❌ [Login Failed] Error:", error.response?.data || error);
        //alert("❌ ログアウト失敗");
    }finally{
      setSelectedUser_Clear();
      await useSelectedRecordStore().Clear_NowSelectedItem_ALL();
      LoginData.value = null;
    }
  };

  const sendNFCLoginData = async (nfchasu) => {
    try {
      const response = await apiService.nfcLogin(nfchasu);
      console.log('NFCログイン成功:', response);
      if (response.success) {
         setLoginData(response); // ✅ ユーザーデータをセット
      } else {
        LoginData.value = null;
      }
      return response.data;
    } catch (e) {
      console.error("NFCログインAPI失敗:", e);
      throw e;
    }
  };

  const setNow_Form_day_key = (value) => {
    Now_Form_day_key.value = value;
  };

  const setUpDateFlg = (value) => {
    update_flg.value = value;  // 小文字に統一

    if(!update_flg.value){
      Now_Form_day_key.value = '';
    }
  };

  const setPrintFlg = (value) => {
    print_flg.value = value;
  };

  const setIS_Already_Exists = (value) => {
    IS_Already_Exists.value = value;
  };

  return {
    // 状態
    LoginData,
    userList,
    userSchedule,
    staffList,
    read_Only_flg,
    update_flg,
    print_flg,
    All_Click,
    Search_id,
    isLoading,
    IS_Already_Exists,
    IS_Safari,
    Now_Form_day_key,
    isModalOpen,
    is_select_fac_or_vis,
    header_title,
    selected_user,
    selected_Service_Status,
    currentUser,
    optionScheduleIds,

    // アクション
    setUserSchedule,
    setSelectedUser,
    setSelectedUser_Clear,
    setHeaderTitle,
    setIS_Safari,
    setLoginData,
    _getSelectedServiceStatus,
    Chose_Service,
    select_InputService,
    getServiceStatusList,
    getUserList,
    getUserSchedule,
    saveUserSchedule,
    getStaff,
    sendLoginData,
    Clear_LoginData,
    sendNFCLoginData,
    setNow_Form_day_key,
    setUpDateFlg,
    setPrintFlg,
    setIS_Already_Exists,
  };
}, {
  persist: {
    enabled: true,
    strategies: [
      { key: 'shareData-LoginData', storage: localStorage, paths: ['LoginData'] },
      { key: 'shareData-userList', storage: localStorage, paths: ['userList'] },
      { key: 'shareData-userSchedule', storage: localStorage, paths: ['userSchedule'] },
      { key: 'shareData-staffList', storage: localStorage, paths: ['staffList'] },
      { key: 'shareData-selected_user', storage: localStorage, paths: ['selected_user'] },
      { key: 'shareData-selected_Service_Status', storage: localStorage, paths: ['selected_Service_Status'] }
    ]
  }
});
