import { defineStore } from 'pinia';
import apiService from '@/services/api.js';
import { usePrintDataStore } from './printData.js';

export const useSelectedRecordStore = defineStore('selectedRecord', {
  state: () => ({
    Selected_Month: '',
    Selected_Year: '',
    Selected_Date: '',
    nowSelectedItem: { check_val: false, day_txt: '', day_key: '', user_id: '', user_name: '' },
    nowSelectedItem_Kanri: { check_val: false, day_txt: '', day_key: '', Bath_use:[] },
    MonthList_Kanri: [],
    DateList_kojin: [],
    staffList_Kojin: [],
    records: []
  }),

  actions: {
    setSelected_Month(value) {
      this.Selected_Month = value;
    },

    setSelected_Year(value) {
      this.Selected_Year = value;
    },

   async setSelected_Date(value) {
      this.Selected_Date = value;
      console.log('個人記録が日付確定', this.Selected_Date);
      const res_staff = await apiService.getStaff_Kanri(this.Selected_Date);
      console.log('職員データ', res_staff);
      this.staffList_Kojin = res_staff.data.StaffList;
      console.log('個人記録のスタッフ', this.staffList_Kojin);
    },


    async getDate_Kojin(selectDate) {
      try {
        const response = await apiService.getSideByDate(selectDate);
        console.log('1日の利用者レスポンス:', response); // デバッグ用
    
        if (response && Array.isArray(response)) {
          // APIレスポンスの形式に合わせて処理を変更
          this.DateList_kojin = response.map(record => {
            // 日付部分を取得（served_timeから日付部分を抽出）
            const servedTime = record.served_time || '';
            const datePart = servedTime.split(' ')[0]; // 「2023-01-01 12:30:00」から「2023-01-01」を取得
            
            // 日付が有効な場合のみフォーマット
            let formattedDate = '日付不明';
            if (datePart) {
              const [year, month, day] = datePart.split('-');
              if (month && day) {
                formattedDate = `${parseInt(month)}月${parseInt(day)}日`;
              }
            }
            
            return {
              day_txt: formattedDate,
              user_name: record.user_name ? record.user_name.replace(/\s+/g, '') : '',
              user_id: record.user_id,
              day_key: datePart || selectDate, // 日付パートがない場合は選択日をそのまま使用
              isprint: false, // APIから取得できない場合はデフォルト値
              check_val: false,
              service_item: record.service_item_name || '' // サービス項目名も保存
            };
          });
          
          // 重複排除とソート
          this.DateList_kojin = this.getUniqueSortedRecords(this.DateList_kojin);
          
          // 処理が成功したことを示す
          return true;
        } else {
          console.error('無効なAPIレスポンス形式:', response);
          return false;
        }
      } catch (error) {
        console.error('日付データ取得中のエラー:', error);
        return false;
      }
    },
    

    async getMonth_Kanri(selectMonth) {
      try {
        const response = await apiService.getSideByMonth_Kanri(selectMonth);
        
        console.log('月間スケジュールのレスポンス:', response.data); // デバッグ用
        
        // レスポンスが有効かどうかをチェック
        if (response && response.success && Array.isArray(response.data)) {
          // 日付ごとにデータをグループ化
          const groupedByDate = {};
          
          // スケジュール名からオプション値へのマッピング定義
          const scheduleNameToOption = {
            'A': 'A',
            'B': 'B',
            '泊': '泊',
            '帰': '帰',
            '訪': '訪',
            '休': '休'
          };
          
          response.data.forEach(record => {
            const scheduledTime = record.scheduled_time || '';
            const userId = record.user_id;
            
            // 日付のフォーマット
            let formattedDate = '日付不明';
            if (scheduledTime) {
              const [year, month, day] = scheduledTime.split('-');
              if (month && day) {
                formattedDate = `${parseInt(month)}月${parseInt(day)}日`;
              }
            }
            
            // 日付ごとのグループを初期化
            if (!groupedByDate[scheduledTime]) {
              groupedByDate[scheduledTime] = {
                day_txt: formattedDate,
                day_key: scheduledTime,
                user_id: '', // 日付エントリなのでuser_idは空
                user_name: '',
                isprint: false,
                check_val: false,
                userList: [] // ユーザーリストを格納する配列
              };
            }
            
            // スケジュール種別をオプションとして取得
            let scheduleOption = '';
            
            // スケジュール名からオプション値を直接マッピング
            if (record.schedule_name) {
              for (const [key, value] of Object.entries(scheduleNameToOption)) {
                if (record.schedule_name.includes(key)) {
                  scheduleOption = value;
                  break;
                }
              }
            }
            
            // ユーザーエントリを検索または作成
            if (userId && record.name) {
              let userEntry = groupedByDate[scheduledTime].userList.find(user => user.user_id === userId);
              
              // スケジュール情報をオブジェクトとして構築
              const scheduleInfo = {
                id: record.id || 0,
                schedule_id: record.schedule_id || 0,
                schedule_name: record.schedule_name || '',
                scheduled_time: scheduledTime
              };
              
              if (!userEntry) {
                // 新しいユーザーエントリを作成
                userEntry = {
                  id: record.id || 0,
                  user_id: userId,
                  name: record.name.replace(/\s+/g, ''),
                  selectedOptions: [],
                  selected: '',
                  startTime: '',
                  endTime: '',
                  scheduled_time: scheduledTime,
                  schedules: []
                };
                groupedByDate[scheduledTime].userList.push(userEntry);
              }
              
              // スケジュール情報を配列に追加（重複を確認）
              const existingSchedule = userEntry.schedules.find(
                s => s.schedule_id === scheduleInfo.schedule_id && 
                     s.scheduled_time === scheduleInfo.scheduled_time
              );
              
              if (!existingSchedule) {
                userEntry.schedules.push(scheduleInfo);
                
                // selectedOptionsに追加（重複を排除）
                if (scheduleOption && !userEntry.selectedOptions.includes(scheduleOption)) {
                  userEntry.selectedOptions.push(scheduleOption);
                }
              }
            }
          });
          
          // 各ユーザーのselectedを設定（最初のオプションを選択）
          Object.values(groupedByDate).forEach(dateEntry => {
            dateEntry.userList.forEach(user => {
              if (user.selectedOptions.length > 0 && !user.selected) {
                user.selected = user.selectedOptions[0];
              }
            });
            
            // ユーザーリストをユーザーIDでソート
            dateEntry.userList.sort((a, b) => a.user_id - b.user_id);
          });
          
          // グループ化されたデータを配列に変換
          this.MonthList_Kanri = Object.values(groupedByDate);
          
          // 日付でソート（新しい日付が先頭）
          this.MonthList_Kanri.sort((a, b) => new Date(b.day_key) - new Date(a.day_key));
          
          console.log('日付ごとにグループ化されたMonthList_Kanri:', this.MonthList_Kanri);
          return true;
        } else {
          console.error('無効なAPIレスポンス形式:', response);
          return false;
        }
      } catch (error) {
        console.error("月間データ取得中のエラー:", error);
        return false;
      }
    },


    async clear_NowSelectedItem() {
      const ResetVal = { check_val: false, day_txt: '', day_key: '', user_id: '', user_name: '' };
      this.nowSelectedItem = { ...ResetVal };
      for (const e of this.DateList_kojin) {
          e.check_val = false;
      }

      // printDataストアのクリア
      const printDataStore = usePrintDataStore();
      await printDataStore.clearRecords();
    },

    async clear_NowSelectedItem_Kanri() {
      const ResetVal = { check_val: false, day_txt: '', day_key: '' };
      this.nowSelectedItem_Kanri = { ...ResetVal };
      for (const e of this.MonthList_Kanri) {
          e.check_val = false;
      }

      // printDataストアのクリア
      const printDataStore = usePrintDataStore();
      await printDataStore.clearRecords();
    },

    async Clear_NowSelectedItem_ALL(){
      await this.clear_NowSelectedItem();
      await this.clear_NowSelectedItem_Kanri();
   },

    async ReLode_Kojinkiroku(){
        await this.setNowSelectedItem( this.nowSelectedItem); 
    },

    async setNowSelectedItem(record) {
      this.nowSelectedItem = { ...record };
      for (const e of this.DateList_kojin) {
        if(record.day_key == e.day_key && record.user_id == e.user_id){
          e.check_val = true;
        }else{
          e.check_val = false;
        }
      }

      // printDataストアを使用してデータを設定
      const printDataStore = usePrintDataStore();
      await printDataStore.resetAndAddRecord(record.day_key,record.user_id);
    },
    
    async ReLode_Kanri_Nissi(){
       await this.setNowSelectedItem_Kanri( this.nowSelectedItem_Kanri); 
    },

    async setNowSelectedItem_Kanri(value) {
      try {
        this.nowSelectedItem_Kanri = { ...value };
        console.log('nowSelectedItem_Kanri', this.nowSelectedItem_Kanri);
        
        const res = await apiService.getDay_KanriNissi(this.nowSelectedItem_Kanri.day_key);
        console.log('管理日誌データ', res);

        // kanri_nissi データを設定
        const defaultKanriNissi = {
          breakfast: '',
          community_interaction: '',
          created_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
          dinner: '',
          id: null,
          is_deleted: 0,
          log_date: this.nowSelectedItem_Kanri.day_key,
          lunch: '',
          recorded_staff_id: 1,
          recreation: '',
          snack: '',
          updated_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
          updated_staff_id: 1,
          visitors: ''
        };

        // res.data.logs[0]が存在する場合はそのデータを、存在しない場合はデフォルト値を使用
        this.nowSelectedItem_Kanri.kanri_nissi = res.data.logs && res.data.logs[0] 
          ? res.data.logs[0] 
          : defaultKanriNissi;

        console.log('設定された管理日誌データ:', this.nowSelectedItem_Kanri.kanri_nissi);

        // Bath_use配列を初期化
        this.nowSelectedItem_Kanri.Bath_use = [];

        // サービスデータの処理（入浴者の名前を集計する処理）
        this.nowSelectedItem_Kanri.Bath_use = [];//初期化
        if (res.data.services) {
          // services がオブジェクトの場合の処理
          Object.values(res.data.services).forEach(userServices => {
            if (userServices.bath && userServices.bath.length > 0) {
              const bathUser = userServices.bath[0];
              if (bathUser.user_name) {
                this.nowSelectedItem_Kanri.Bath_use.push({id:bathUser.id,user_id:bathUser.user_id,name:bathUser.user_name});
              }
            }
          });
        }

        // userList の各ユーザーに対応するサービスデータを紐付け
        if (this.nowSelectedItem_Kanri.userList && res.data.services) {
          this.nowSelectedItem_Kanri.userList = this.nowSelectedItem_Kanri.userList.map(user => {
            // res.data.services からユーザーIDに対応するデータを取得
            const userServices = res.data.services[user.user_id] || {};
            
            return {
              ...user,
              services: {
                special_note: userServices.special_note || [],
                picup_and_drop_off_services_start: userServices.picup_and_drop_off_services_start || [],
                picup_and_drop_off_services_end: userServices.picup_and_drop_off_services_end || [],
                visiting_services_start: userServices.visiting_services_start || [],
                visiting_services_end: userServices.visiting_services_end || [],
                recreation: userServices.recreation || [],
                night_patrol: userServices.night_patrol || [],
                bath: userServices.bath || [],
                excretions: userServices.excretions || [],
                meals: userServices.meals || [],
                vital: userServices.vital || [],
                weight: userServices.weight || [],
                care_plan: userServices.care_plan || []
              }
            };
          });
          //
        }

        await this.isStartTime_EndTime_Kanri();

        // チェック状態の更新
        for (const e of this.MonthList_Kanri) {
          if (value.day_key == e.day_key && value.user_id == e.user_id) {
            e.check_val = true;
          } else {
            e.check_val = false;
          }
        }

        const res_staff = await apiService.getStaff_Kanri(this.nowSelectedItem_Kanri.day_key);
        console.log('職員データ', res_staff);
        this.nowSelectedItem_Kanri.staff = res_staff.data.StaffList;


      } catch (error) {
        console.error('setNowSelectedItem_Kanri処理エラー:', {
          error: error.message,
          services: res?.data?.services,
          servicesType: typeof res?.data?.services
        });
        throw error;
      }
    },

    async isStartTime_EndTime_Kanri() {
      console.log('=== isStartTime_EndTime_Kanri 開始 ===');
      console.log('userList:', this.nowSelectedItem_Kanri.userList);

      this.nowSelectedItem_Kanri.userList.forEach(user => {
        console.log(`\n--- ユーザー ${user.name} (ID: ${user.user_id}) の処理開始 ---`);
        console.log('ユーザーのservicesデータ:', user.services);

        // 開始時間の処理
        if (user.services && user.services.visiting_services_start.length > 0) {
          console.log('訪問開始データあり:', user.services.visiting_services_start);
          user.startTime = user.services.visiting_services_start[0].served_time;
          console.log('訪問開始時間を設定:', user.startTime);
        } else if (user.services && user.services.picup_and_drop_off_services_start.length > 0) {
          console.log('送迎開始データあり:', user.services.picup_and_drop_off_services_start);
          user.startTime = user.services.picup_and_drop_off_services_start[0].served_time;
          console.log('送迎開始時間を設定:', user.startTime);
        } else {
          console.log('開始時間のデータなし');
        }

        // 終了時間の処理
        if (user.services && user.services.visiting_services_end.length > 0) {
          console.log('訪問終了データあり:', user.services.visiting_services_end);
          user.endTime = user.services.visiting_services_end[0].served_time;
          console.log('訪問終了時間を設定:', user.endTime);
        } else if (user.services && user.services.picup_and_drop_off_services_end.length > 0) {
          console.log('送迎終了データあり:', user.services.picup_and_drop_off_services_end);
          user.endTime = user.services.picup_and_drop_off_services_end[0].served_time;
          console.log('送迎終了時間を設定:', user.endTime);
        } else {
          console.log('終了時間のデータなし');
        }

        console.log('最終設定値:', {
          userName: user.name,
          userId: user.user_id,
          startTime: user.startTime,
          endTime: user.endTime
        });
      });

      console.log('\n=== isStartTime_EndTime_Kanri 完了 ===');
      console.log('更新後のuserList:', this.nowSelectedItem_Kanri.userList);
    },

   async setNowSelectedItem_Print(val) {
      this.nowSelectedItem = { ...val };
      for (const e of this.MonthList_Kanri) {

        if(val == e){
          
          if(e.check_val == true){
            e.check_val = false;
            //return e.check_val;
          }else{
            e.check_val = true;
            //return e.check_val;
          }
        }
      }
    },

    setAllClick_filteredRecords(val) {
      //let devnum = 0;
      for (const e of this.MonthList_Kanri) {
        if(e.user_id == val.user_id && e.day_key == val.day_key){
          e.check_val = true;
        }else{

        }
          
      }
    },

    setAll_ClearRecord() {
      for (const e of this.MonthList_Kanri) {
          e.check_val = false;
      }
    },

    removeSelectedRecord(user_id, day_key) {
      this.records = this.records.filter(record => record.user_id !== user_id || record.day_key !== day_key);
    },

   async resetAndAddRecord(user_id, day_key) {
      this.records = [{ user_id: user_id, day_key: day_key }];
    },

    getUniqueSortedRecords(records) {
      const uniqueRecords = records.reduce((acc, current) => {
        const key = `${current.day_key}-${current.user_id}`;
        if (!acc.find(item => `${item.day_key}-${item.user_id}` === key)) {
          acc.push(current);
        }
        return acc;
      }, []);

      return uniqueRecords.sort((a, b) => new Date(b.day_key) - new Date(a.day_key));
    },

   async SearchRecode(sendrecode){
      const response = await apiService.getRecode(sendrecode);
      if(response.data){
        return true;
      }else{
        return false;
      }
    },

    updateUserList(newUserList) {
      if (this.nowSelectedItem_Kanri && this.nowSelectedItem_Kanri.userList) {
        this.nowSelectedItem_Kanri.userList = newUserList;
        
        // MonthList_Kanriの該当する日付のエントリも更新
        const dateEntry = this.MonthList_Kanri.find(
          entry => entry.day_key === this.nowSelectedItem_Kanri.day_key
        );
        
        if (dateEntry) {
          dateEntry.userList = newUserList;
        }
      }
    },

    // 管理日誌データの更新アクション
   async updateKanriNissi_Free(datatype, newNissi) {
      console.log('管理日誌の自由入力欄登録の処理実行');
      if (this.nowSelectedItem_Kanri && this.nowSelectedItem_Kanri.kanri_nissi) {
        switch (datatype) {
          case 'meals':
            this.nowSelectedItem_Kanri.kanri_nissi.breakfast = newNissi.breakfast;
            this.nowSelectedItem_Kanri.kanri_nissi.lunch = newNissi.lunch;
            this.nowSelectedItem_Kanri.kanri_nissi.dinner = newNissi.dinner;
            this.nowSelectedItem_Kanri.kanri_nissi.snack = newNissi.snack;
            this.nowSelectedItem_Kanri.kanri_nissi.updated_at = newNissi.updated_at;
            break;

          case 'recreation':
            this.nowSelectedItem_Kanri.kanri_nissi.recreation = newNissi.recreation;
            this.nowSelectedItem_Kanri.kanri_nissi.updated_at = newNissi.updated_at;
            break;

          case 'menkai':
            this.nowSelectedItem_Kanri.kanri_nissi.visitors = newNissi.visitors;
            this.nowSelectedItem_Kanri.kanri_nissi.updated_at = newNissi.updated_at;
            break;
          case 'community':
            this.nowSelectedItem_Kanri.kanri_nissi.community_interaction = newNissi.community_interaction;
            this.nowSelectedItem_Kanri.kanri_nissi.updated_at = newNissi.updated_at;
            break;
        
          default:
            console.log('不明なデータタイプ:', datatype);
            break;
        }

        try {
          console.log('自由入力欄を登録処理実行');
          const res = await apiService.Manager_Log(this.nowSelectedItem_Kanri.kanri_nissi);
          console.log('自由入力欄の登録のレスポンス', res);
          
          if (res && res.data && res.data.id) {
            console.log('登録処理成功: ID', res.data.id);
            this.nowSelectedItem_Kanri.kanri_nissi.id = res.data.id;
            return true;
          } else {
            console.log('登録処理成功したが、IDが返されませんでした', res);
            return true;
          }
        } catch (error) {
          console.error('自由入力欄の登録処理中にエラーが発生:', error);
          throw error;
        }
      } else {
        console.warn('管理日誌データが存在しないため、更新できません');
        return false;
      }
    },


    async delete_Service(service_record_id) {
      try {
        const response = await apiService.deleteService(service_record_id);
        if (response && response.data) {
          return true;
        }
        return false;
      } catch (error) {
        console.error('スタッフの削除に失敗しました:', error);
        return false;
      }
    }
  },

  persist: {
    enabled: true,
    strategies: [
      { key: 'selectedRecord-MonthList_Kanri', storage: localStorage, paths: ['MonthList_Kanri'] },
      { key: 'selectedRecord-DateList_kojin', storage: localStorage, paths: ['DateList_kojin'] },
      { key: 'selectedRecord-nowSelectedItem', storage: localStorage, paths: ['nowSelectedItem'] },
      { key: 'selectedRecord-records', storage: localStorage, paths: ['records'] }
    ]
  }
});
