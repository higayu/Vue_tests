// stores/useShareData.js
import { defineStore } from 'pinia';
import apiService from '@/services/api.js';
import ExcelJS from 'exceljs'; // これをファイルの先頭で必ずインポート
import { useSelectedRecordStore } from '../stores/selectedRecord.js';
import { usePrintDataStore } from './printData.js';


export const useShareStore = defineStore('useShareData', {
  state: () => ({
    LoginData:null,
    userList: [],
    userSchedule: [],

    staffList: [],
//-------------------------------------------------//
    read_Only_flg: false,
    update_flg:false,
    print_flg:false,
    // selectedItem: { date: '', user_name: '' },
    All_Click:false,
    Search_id:'',
    isLoading: false,
    IS_Already_Exists:false,
    IS_Safari:false,
    Now_Form_day_key:'',
    isModalOpen:false,
    is_select_fac_or_vis:"",
    
    // オプションに対応するスケジュールID
    optionScheduleIds: {
      "A": 1,
      "B": 2,
      "泊": 3,
      "帰": 4,
      "訪": 5
    },
    header_title:'利用者選択',
    selected_user:null,
    selected_Service_Status:null,
  }),

  actions: {

    async Chose_Service(serviceData) {
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
    },

    async setHeaderTitle(title) {
      this.header_title = title;
    },

   async setSelectedUser(user) {
      this.isLoading = true;
      this.selected_user = user;
      await this._getSelectedServiceStatus();
      this.isLoading = false;
    },

    async setSelectedUser_Clear() {
      this.selected_user = null;
      this.selected_Service_Status = null;
      this.is_select_fac_or_vis = "";
    },  

     async select_InputService(serviceData) {
      const respons =  await this.Chose_Service(serviceData);
      console.log("レスポンス",respons);
        if(respons){
          await this._getSelectedServiceStatus();
          console.log("🟢 サービスステータス:", this.selected_Service_Status);
        }
     },

     async getServiceStatusList() {
       try {
         const response = await apiService.getServiceStatus();
         console.log("サービスステータス取得結果:", response);
         // 全てのステータスデータを返す
         this.selected_Service_Status = response;
       } catch (error) {
         console.error("サービスステータス取得エラー:", error);
         throw error;
       }
    },  

    async _getSelectedServiceStatus() {
      this.isLoading = true;
        if (!this.selected_user) {
          console.log("selected_userがnullです");
          alert("selected_userがnullです");
          this.selected_Service_Status = null;
          this.is_select_fac_or_vis = "";
          return;
        }
        //自動で遷移するのをやめて、ボタンをグレーアウトに変更
        console.log("🟢 選択中のユーザー:", this.selected_user);

          if(this.selected_user.schedules && this.selected_user.schedules.some(schedule => schedule.schedule_name !== '訪')){//訪問以外の場合は送迎が確定
            
            if(this.selected_user.schedules.some(schedule => schedule.schedule_name === '訪')){//送迎も訪問もあるの場合は選択が必要
              console.log("🟢 送迎も訪問もあるので選択が必要です");
              this.is_select_fac_or_vis = "";
              
            }else{//送迎しかない
              this.is_select_fac_or_vis = 'fac';
            }

          }else if(this.selected_user.schedules.some(schedule => schedule.schedule_name === '訪')){//訪問しかない
            console.log("🟢 訪問しかないので訪問が確定しました");
            this.is_select_fac_or_vis = 'visit';
          }
        

        this.isLoading = false;
    },



    async getUserList(target_day) {
      try {
        const response = await apiService.getUserList(target_day); // 修正済み
        this.userList = response.data;
        console.log("🟢 [現在生き残りの利用者] Response:", this.userList);
        return true; // Return true on success
      } catch (error) {
        console.error('Error fetching user data:', error);
        return false; // Return false on error
      }
    },

    async getUserSchedule(target_day) {
      try {
        this.isLoading = true;
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
        this.userSchedule = Object.values(groupedUsers);
        
        console.log("🟢 [今日の利用者の予定(グループ化後)] Response:", this.userSchedule);

        return true; // Return true on success
      } catch (error) {
        console.error('Error fetching user data:', error);
        return false; // Return false on error
      }
      finally {
        this.isLoading = false;
      }
    },

    async saveUserSchedule(target_day) {
      try {
        console.log("🟢 保存処理開始 - 日付:", target_day);
        console.log("📌 保存するデータ:", JSON.stringify(this.userSchedule, null, 2));

        // 🔹 削除対象のIDを収集
        let deleteIds = [];

        for (const userSchedule of this.userSchedule) {
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
        for (const userSchedule of this.userSchedule) {
          console.log("🟢 要素", userSchedule);
          
          // 削除フラグがfalseのスケジュールを抽出
          const schedulesToProcess = userSchedule.schedules.filter(schedule => !schedule.delete_flg);
          
          // 新規保存要素（idが空のもの）のみを処理
          // 既存のスケジュール（idが存在する）で削除フラグがfalseのものは変更がないため処理しない
          const newSchedules = schedulesToProcess
            .filter(schedule => !schedule.id || schedule.id === "")
            .map(schedule => ({
              user_id: userSchedule.user_id,
              schedule_id: schedule.schedule_id || this.optionScheduleIds[schedule.schedule_name] || 0, // schedule_idがあればそれを使用、なければオプション名からIDを取得
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
    },
    //----------------------------------------------------------------//
    
    async getStaff(target_day) {
      try {
        const response = await apiService.getStaffs(target_day); // 修正済み
        this.staffList = response.data;
        return true; // Return true on success
      } catch (error) {
        console.error('Error fetching staff data:', error);
        return false; // Return false on error
      }
    },

    async setLoginData(value){
      this.LoginData = value;
    },

    //----------------------------------------------------------------//
    async sendLoginData(email, password) {
      try {

          console.log("🟢 [ログインデータ送信] Sending data:", { email, password });
  
          const response = await apiService.login(email, password);
  
          console.log("✅ [Login Success] Response:", response);
  
          if (response) {
              //alert("✅ ログイン成功！");
              this.setLoginData(response); // ✅ ユーザーデータをセット
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
  },
//-----------------------------------------//
    async  Clear_LoginData(){
            try {
              this.isLoading = true;
              console.log('ログアウト処理');
              const response = await apiService.logout();
              console.log('ログアウト完了',response);
          } catch (error) {
              console.error("❌ [Login Failed] Error:", error.response?.data || error);
              //alert("❌ ログアウト失敗");
          }finally{

            await this.setSelectedUser_Clear();
            await useSelectedRecordStore().Clear_NowSelectedItem_ALL();
            this.LoginData = null;
          }
      },

    //---------------------------------//
    async sendNFCLoginData(nfchasu) {
      try {
        const response = await apiService.nfcLogin(nfchasu);
        console.log('NFCログイン成功:', response);
        if (response.success) {
           this.setLoginData(response); // ✅ ユーザーデータをセット
        } else {
          this.LoginData = null;
        }
        return response.data;
      } catch (e) {
        console.error("NFCログインAPI失敗:", e);
        throw e;
      }
    },


   //----------------------------------------------------------------//
    setNow_Form_day_key(value) {
      this.Now_Form_day_key= value;
    },

    setIS_Safari(value) {
      this.IS_Safari = value;
    },

    setSearch_id(value) {
      this.Search_id = value;
    },

    setAll_Click(value) {
      this.All_Click = value;
    },
    setReadOnlyFlg(value) {
      this.read_Only_flg = value;
    },
    
    setUpDateFlg(value) {
      this.update_flg = value;  // 小文字に統一

      if(!this.update_flg){
        this.Now_Form_day_key = '';
      }
    },
    setPrintFlg(value) {
      this.print_flg = value;
    },

    setIS_Already_Exists(value) {
      this.IS_Already_Exists = value;
    },


//-----------------------------------------------------------------------//


  },

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
  },
});
