import apiService from '@/services/api.js';
import { defineStore, setActivePinia } from 'pinia';

// InputDataの初期値を生成する関数 - ファイルの先頭で定義
function ClearForm() {
  const defaultVal = (val = null, row_id = 0) => ({ val, row_id });
  //alert('クリアフォーム');
  console.log('🚓クリアフォーム');
  return {
    user_id: "",
    day_key: '',
    care_plan: [],
    kirokuList: [],
    tokkiList: [],
    NightPatrolList: [],

    // DailyActivitiesSectionの構造を修正
    DailyActivitiesSection: {
      Bath: {
        id: null,
        user_id: null,
        user_name: null,
        item_id: null,
        service_item_name: null,
        served_time: null,
        date: null,
        time: null,
        note: null,
        is_deleted: null,
        schedule_id: null,
        recorded_staff_id: null,
        staff_name: null,
        created_at: null
      },
      Haisetu: {
        haisetuList: []
      },
      Recreation: {
        id: null,
        user_id: null,
        user_name: null,
        item_id: null,
        service_item_name: null,
        served_time: null,
        date: null,
        time: null,
        note: null,
        is_deleted: null,
        schedule_id: null,
        recorded_staff_id: null,
        staff_name: null,
        created_at: null
      },
      Weight: {
        id: null,
        user_id: null,
        user_name: null,
        item_id: null,
        service_item_name: null,
        served_time: null,
        date: null,
        time: null,
        note: null,
        is_deleted: null,
        schedule_id: null,
        recorded_staff_id: null,
        staff_name: null,
        created_at: null
      }
    },

    Vitals: Array.from({ length: 3 }, () => ({
      created_at:null,
      date:null,
      id : null,
      is_deleted : null,
      item_id:null,
      note: null,
      recorded_staff_id:null,
      schedule_id:null,
      served_time:null,
      service_item_name:null,
      staff_name:null,
      time:null,
      user_id:null,
      user_name:null,
    })),
    
    // 食事データを配列形式に変更
    Meals: Array.from({ length: 3 }, () => ({
      service_record_id: null,
      user_id: null,
      user_name: null,
      item_id: null,
      service_item_name: null,
      served_time: null,
      date: null,
      time: null,
      meal_category_id: null,
      meal_category: null,
      main_dish_id: null,
      main_dish_intake: null,
      side_dish_id: null,
      side_dish_intake: null,
      note: null,
      is_deleted: null,
      schedule_id: null,
      recorded_staff_id: null,
      staff_name: null,
      created_at: null
    })),


  };
}

// 初期の空オブジェクト（最小限のデータ構造）
const emptyData = {
  user_id: "",
  day_key: '',
  care_plan: [],
  kirokuList: [],
  tokkiList: [],
  // ... 他の必要な初期値
};

export const usePrintDataStore = defineStore('printData', {
  state: () => ({
    InputData: ClearForm(),
    records: [],
    printRecords: [],
    userInfo: {
      user_id: null,
      user_name: '',
      day_key: ''
    }
  }),

  persist: {
    enabled: true,
    strategies: [
      { key: 'printData-InputData', storage: localStorage, paths: ['InputData'] },
      { key: 'printData-records', storage: localStorage, paths: ['records'] },
      { key: 'printData-printRecords', storage: localStorage, paths: ['printRecords'] },
      { key: 'printData-userInfo', storage: localStorage, paths: ['userInfo'] }
    ]
  },

//-------------------------「 action 」---------------------------------//
actions: { 
  // 初期化メソッドを追加
  initialize() {
    // this.InputData = this.ClearForm();
    // this.EditBefore_Data = this.ClearForm();
  },


 //-------　[印刷データを作成し直す関数]-----------------------------------------------//
 async getPrintList() {
    this.PrintList = []; // 初期化

  },
//--------　[印刷データを作成し直す関数]------------------------------------------------//


//------- 全て選択のチェックボックスのクリックで実行される　レコードをセットする処理-----------------------------------------------//
async setRecords_All(newRecord) {
  try {
    console.log("setRecords_All開始:", newRecord);

    const response = await apiService.getPrint(newRecord);
    if (!response || !response.data) {
      console.error("データ取得失敗:", response);
      return;
    }

    this.records.push({ 
      r_id: newRecord.user_id + newRecord.day_key, 
      data: response.data 
    });

    console.log("setRecords_All: records更新完了", this.records);

    // `await` を追加して非同期処理の完了を確実に待つ
    await this.getPrintList();
    await this.fetchDataFromStore();

    console.log("setRecords_All完了");
  } catch (error) {
    console.error("setRecords_All エラー:", error);
  }
},


//------- 全て選択のチェックボックスのクリックで実行される　レコードをセットする処理-----------------------------------------------//

//-------------------------------【 レコードをセットに連動して　印刷データと入力フォームのデータを作成する処理　】--------------------------------------------------//
async setRecords_Print(newRecord) {
  let flg = false;
  const new_id = `${newRecord.user_id}${newRecord.day_key}`;

  try {
    console.log("setRecords_Print開始:", newRecord);

    for (const e of this.records) {
      if (new_id === e.r_id) {
        flg = true;
        this.removeRecordById(e.r_id);

        console.log("setRecords_Print: 既存レコード削除＆処理完了");
        break;
      }
    }

    if (!flg) {
      const response = await apiService.getPrint(newRecord);
      if (!response || !response.data) {
        console.error("新しいレコードの追加中にエラーが発生しました:", response);
        return;
      }

      this.records.push({
        r_id: new_id,
        data: response.data,
      });

      console.log("setRecords_Print: 新しいレコード追加");
    }

    await this.getPrintList();
    await this.fetchDataFromStore();

    console.log("setRecords_Print完了");
  } catch (error) {
    console.error("setRecords_Print エラー:", error);
  }
},
//------------------------ レコードをセットする処理---------------------------------------------------------------//


//----------------------------------------「削除系の処理」--------------------------------------------------------//
// r_id が指定された key と一致する要素を削除
removeRecordById(key) {
  this.records = this.records.filter(record => record.r_id !== key);

  this.getPrintList();
  this.fetchDataFromStore();
},


clear_Submit() {
  this.records = []; // 配列をクリアして全てのデータを削除
  this.PrintList = [];
},

async clearRecords() {
  console.log('個人記録のデータクリア');
  this.records = []; // 配列をクリアして全てのデータを削除
  this.InputData = await this.ClearForm();
  this.EditBefore_Data = await this.ClearForm();
  this.PrintList = [];
},

removeRecord(index) {
  if (index >= 0 && index < this.records.length) {
    this.records.splice(index, 1); // 指定されたインデックスのレコードを削除
  }
},
//---------------------------------------------[削除系処理]---------------------------------------------------//

//------------------------[更新、新規追加モードで選択状態を常に1件にする用の処理]------------------------------------//
async resetAndAddRecord(day_key,user_id) {
  try {
    this.records = []; // 配列をリセット

    const response = await apiService.getPrint(day_key,user_id); // 非同期処理でデータ取得
    console.log("個人記録1件のresponse",response);
    this.records.push({ r_id: user_id + day_key, day_key: day_key, user_id: user_id, data: response.data }); // 新しいレコードを追加

    await this.Load_Kojin_Kiroku(response.data,user_id,day_key); 
    await this.getPrintList(); // 非同期処理の完了を待つ

  } catch (error) {
    console.error('Error in resetAndAddRecord:', error);
  }
},
//------------------------[更新、新規追加モードで選択状態を常に1件にする用の処理]------------------------------------//


//-----------------------[フォームのクリア関数]--------------------------------------------//-
async ClearForm() {
  return ClearForm(); // 外部関数を呼び出す
},
//---------------------------[フォームのクリア関数]-------------

//--------------------------------[スペースの削除処理]-----------------------------------------------------//
  removeSpaces(str) {//スペースの除去
      return str.replace(/[\u3000\u0020]/g, '');
  },
//--------------------------------[スペースの削除処理]-----------------------------------------------------//
          
  // --【データの取り出し順番の指定用　関数　8時～23時　は　当日　0時～7時59分59秒までは次の日として扱うようにソートをかけている】---------                      //
  //-------------------------------------------------------------------//
  IS_Day_Next(timeStr) {
  
      // 時間形式かどうか確認
      const timeFormat = /^\d{2}:\d{2}(?::\d{2})?$/;  // 秒が省略されても許可
      if (!timeFormat.test(timeStr)) {
          return 3; // 時間文字列でなければ 3 を返す（無効な値）
      }
  
      // 時間を分割して取得（秒がない場合にはデフォルトで 0 を設定）
      const [hours, minutes, seconds = 0] = timeStr.split(':').map(Number);
  
      // 判定範囲の開始と終了時間
      const startTime = new Date();
      startTime.setHours(0, 0, 0); // '00:00:00'
      const endTime = new Date();
      endTime.setHours(7, 59, 59); // '07:59:59'
  
      // 引数の時間をDateオブジェクトに設定
      const inputTime = new Date();
      inputTime.setHours(hours, minutes, seconds);
  
      // 判定（次の日は 2、当日は 1 を返す）
      const isNextDay = inputTime >= startTime && inputTime <= endTime;
  
      return isNextDay ? 2 : 1;
  },
  
  //------------- 時間の昇順でソートする関数
// 時間の昇順でソートする非同期関数
async sortTestPlace(testPlace) {
  // 非同期にフォーマットされた時間を取得
  const formattedTestPlace = await Promise.all(
      testPlace.map(async (item) => ({
          ...item,
          formattedTime: await this.formatTime(item.entry_datetime), // 非同期処理を解決
          isNextDay: this.IS_Day_Next(await this.formatTime(item.entry_time)), // 次の日判定
      }))
  );

  // ソート処理
  formattedTestPlace.sort((a, b) => {
      // 「次の日」と「当日」での優先順位付け
      if (a.isNextDay !== b.isNextDay) {
          return a.isNextDay - b.isNextDay; // 当日 (1) を先に、次の日 (2) を後に
      }

      // 両方が同じカテゴリ（当日または次の日）の場合、時間の昇順で比較
      return a.formattedTime.localeCompare(b.formattedTime);
  });

  return formattedTestPlace; // ソート済みのデータを返す
},
    

  //-------------------------------------------【時間と曜日の関数】-------------------------------------------------------------------//
      // ユーティリティメソッド：日時から時間部分を抽出して表示形式を整える関数
  async formatTime(dateString) {

        if (!dateString) return '';

        const dateObj = new Date(dateString);
        const hours = ('0' + dateObj.getHours()).slice(-2); // 時
        const minutes = ('0' + dateObj.getMinutes()).slice(-2); // 分

        return `${hours}:${minutes}`; // "HH:MM" 形式で返す
        },

 async formatDay(date_val,num){
            // 年、月、日を取得してフォーマット
        const year = date_val.getFullYear();
        const month = ('0' + (date_val.getMonth() + 1)).slice(-2);
        const day = ('0' + date_val.getDate()).slice(-2);

        if(num==1){
        return `${year}年${month}月${day}日`;
        }else{
        return `${year}-${month}-${day}`;
        }

        },

        // 日付から曜日を取得するメソッド
 async getDayOfWeek(dateString) {
        // 入力がない場合は空文字を返す
        if (!dateString) return '';

        const formattedDateString = dateString.replace(/-/g, '/'); // '2024-01-01' => '2024/01/01'
        const day_key = new Date(formattedDateString);

        // 曜日の名前の配列（0=日曜日, 1=月曜日, ... , 6=土曜日）
        const daysOfWeek = ['日', '月', '火', '水', '木', '金', '土'];

        // `getDay()` メソッドで曜日番号を取得し、対応する曜日名を返す
        const dayName = daysOfWeek[day_key.getDay()];

        return dayName;
        },

 async akaiFont_Is(dateStr1) {
        // Date オブジェクトに変換
        const day_key1 = new Date(dateStr1);

        // 時間部分を取得
        const hours = day_key1.getHours();
        const minutes = day_key1.getMinutes();
        const seconds = day_key1.getSeconds();

        // 時間の条件に応じて判定
        // 8:00:00 ～ 17:59:59 は false
        if (hours >= 8 && hours < 18) {
          return false;
        }

        return true;
  },
//-----------------------------------------------------------//

  //----------------------------------------------------「時間と曜日」-------------------------------------//

  // ここに追加する
  async resetAndAddRecordByDate(day_key) {
    try {
      this.records = []; // 配列をリセット
      this.records.push({ day_key: day_key }); // 日付のみのレコードを追加
      
      // 必要に応じて他の処理を追加（getPrintListやfetchDataFromStoreの呼び出しなど）
      console.log('日付のみのレコードを追加しました:', day_key);
    } catch (error) {
      console.error('Error in resetAndAddRecordByDate:', error);
    }
  },



  // データオブジェクトをInputDataに格納するメソッド
  async Load_Kojin_Kiroku(data, user_id, day_key) {
    try {
      // まず初期化してきれいな状態にする
      this.InputData = ClearForm();
      
      // ユーザー情報の設定
      if (user_id && day_key) {
        this.InputData.user_id = user_id;
        this.InputData.day_key = day_key;
      } else if (data.vital && data.vital.length > 0) {
        this.InputData.user_id = data.vital[0].user_id;
        this.InputData.day_key = data.vital[0].date;
      }

      // ケアプラン情報の設定
      if (data.care_plan && Array.isArray(data.care_plan)) {
        this.InputData.care_plan = data.care_plan;
      }

      // バイタルデータの処理
      if (data.vital && Array.isArray(data.vital) && data.vital.length > 0) {
        await this.processVitalData(data.vital);
      }

      // 体重データの処理
      if (data.weight && Array.isArray(data.weight) && data.weight.length > 0) {
        await this.processWeightData(data.weight);
      }

      // 入浴データの処理
      if (data.bath && Array.isArray(data.bath) && data.bath.length > 0) {
        await this.processBathData(data.bath);
      }

      // レクリエーションデータの処理
      if (data.recreation && Array.isArray(data.recreation) && data.recreation.length > 0) {
        await this.processRecreationData(data.recreation);
      }

      // 排泄データの処理
      if (data.excretions && Array.isArray(data.excretions)) {
        this.InputData.DailyActivitiesSection.Haisetu.haisetuList = [];
        await this.processExcretionData(data.excretions);
      }

      // 特記事項の処理
      if (data.special_note && Array.isArray(data.special_note)) {
        this.InputData.tokkiList = [];
        await this.processSpecialNotes(data.special_note);
      }

      // 夜間巡視データの処理
      if (data.night_patrol && Array.isArray(data.night_patrol)) {
        this.InputData.NightPatrolList = [];
        await this.processNightPatrolData(data.night_patrol);
      }

      // 食事データの処理を追加
      if (data.meals && Array.isArray(data.meals)) {
        await this.processMealData(data.meals);
      }

      // 記録の集約
      await this.extractKirokuFromAllSources(data);

      // 変更前のデータも保存（編集キャンセル用）
      this.EditBefore_Data = JSON.parse(JSON.stringify(this.InputData));
      
      console.log('データをInputDataに格納しました:', this.InputData);
      return true;
    } catch (error) {
      console.error('データのInputDataへの格納中にエラーが発生しました:', error);
      return false;
    }
  },

  // 全てのデータソースからnote情報を抽出してkirokuListに追加するメソッド
  async extractKirokuFromAllSources(data) {
    // 記録リストを初期化
    this.InputData.kirokuList = [];
    
    // 各データソースを順に処理（夜間巡視を除外）
    const sourcesToExtract = [
      //{ key: 'special_note', type: '特記' },
      { key: 'bath', type: '入浴' },
      { key: 'recreation', type: 'レクリエーション' },
      { key: 'excretions', type: '排泄' },
      { key: 'vital', type: 'バイタル' },
      { key: 'night_patrol', type: '夜間巡視'}
    ];
    
    for (const source of sourcesToExtract) {
      if (data[source.key] && Array.isArray(data[source.key]) && data[source.key].length > 0) {
        await this.extractNoteFromSource(data[source.key], source.type);
      }
    }
    
    // 時間順にソート
    this.InputData.kirokuList.sort((a, b) => {
      // entry_datetimeが存在する場合はそれでソート
      if (a.entry_datetime && b.entry_datetime) {
        return new Date(a.entry_datetime) - new Date(b.entry_datetime);
      }
      // timeが存在する場合はそれでソート
      if (a.time && b.time) {
        return a.time.localeCompare(b.time);
      }
      return 0;
    });
    
    console.log('集約された記録リスト:', this.InputData.kirokuList);
  },

  // 特定のデータソースからnote情報を抽出するメソッド
  async extractNoteFromSource(sourceData, sourceType) {
    for (const item of sourceData) {
      if (item.note && item.note.trim() !== '') {
        // 記録日時の処理
        let entryTime = '';
        if (item.entry_datetime) {
          entryTime = item.entry_datetime;
        } else if (item.time) {
          entryTime = item.time;
        } else {
          // 日時情報がない場合は現在の日時を使用
          entryTime = new Date().toISOString();
        }
        
        // 1つのnoteに複数の行がある場合は分割して処理
        const noteLines = item.note.split('\n');
        
        for (const line of noteLines) {
          if (line.trim() !== '') {
            this.InputData.kirokuList.push({
              Not_selected_note: false,
                  Not_selected_sf: false,
                  Not_selected_tm: false,
              row_id: item.id || 0,
              entry_datetime: entryTime,
              time: item.time || await this.formatTime(entryTime),
              txt_val: line.trim(),
              staff_id: item.staff_id || item.recorded_staff_id,
              staff_name: item.staff_name || '',
              record_type: sourceType,
              nightPatrol: sourceType === '夜間巡視',
              kanri_flg: item.kanri_flg || false,
              update_flg: true,
              is_delete_flg: false,
              });
          }
      }
  }
    }
  },

  // ユーザー情報を設定するヘルパーメソッド
  setUserInfo(data) {
    // 優先順位順に確認
    const dataSources = ['meals', 'excretions', 'special_note', 'bath', 'vital'];
    
    for (const source of dataSources) {
      if (data[source] && data[source].length > 0) {
        this.InputData.user_id = data[source][0].user_id;
        this.InputData.day_key = data[source][0].date;
        return;
      }
    }
  },

  // 特記データを処理するヘルパーメソッド
  processSpecialNotes(notes) {
    if (!notes || !Array.isArray(notes)) {
      console.log('特記事項データが存在しないか、配列ではありません');
      this.InputData.tokkiList = [];
      return;
    }

    // 削除されていない最新の特記事項を探す
    const validNotes = notes.filter(note => !note.is_deleted);
    if (validNotes.length === 0) {
      console.log('有効な特記事項が存在しません');
      this.InputData.tokkiList = [];
      return;
    }

    // 最新の特記事項を取得（配列の最初の要素）
    const latestNote = validNotes[0];
    
    // 特記事項を設定
    this.InputData.tokkiList = [{
      // APIレスポンスの完全なオブジェクト構造を保持
      id: latestNote.id,
      user_id: latestNote.user_id,
      user_name: latestNote.user_name,
      item_id: latestNote.item_id,
      service_item_name: latestNote.service_item_name,
      served_time: latestNote.served_time,
      date: latestNote.date,
      time: latestNote.time,
      note: latestNote.note,
      is_deleted: latestNote.is_deleted,
      schedule_id: latestNote.schedule_id,
      recorded_staff_id: latestNote.recorded_staff_id,
      staff_name: latestNote.staff_name,
      created_at: latestNote.created_at,
      
      // 後方互換性のために残す古い構造
      Not_selected_note: false,
      Not_selected_sf: false,
      row_id: latestNote.id,
      txt_val: latestNote.note,
      staff_id: latestNote.recorded_staff_id,
      update_flg: true,
      is_delete_flg: false
    }];
    
    console.log('特記データ処理完了:', {
      totalNotes: notes.length,
      validNotes: validNotes.length,
      processedNote: this.InputData.tokkiList[0]
    });
  },

  // 入浴データを処理するヘルパーメソッド
  async processBathData(bathData) {
    if (bathData.length === 0) return;
    
    const bath = bathData[0];
    this.InputData.DailyActivitiesSection.Bath = {
      id: bath.id || null,
      user_id: bath.user_id || null,
      user_name: bath.user_name || null,
      item_id: bath.item_id || null,
      service_item_name: bath.service_item_name || null,
      served_time: bath.served_time || null,
      date: bath.date || null,
      time: bath.time || null,
      note: bath.note || null,
      is_deleted: bath.is_deleted || null,
      schedule_id: bath.schedule_id || null,
      recorded_staff_id: bath.recorded_staff_id || null,
      staff_name: bath.staff_name || null,
      created_at: bath.created_at || null
    };

    // kirokuListへの追加処理は変更なし
    if (bath.note) {
      this.InputData.kirokuList.push({
        Not_selected_note: false,
        Not_selected_sf: false,
        Not_selected_tm: false,
        row_id: bath.id,
        entry_datetime: bath.served_time,
        time: bath.time,
        txt_val: `【入浴】${bath.note}`,
        staff_id: bath.recorded_staff_id,
        staff_name: bath.staff_name,
        record_type: '入浴',
        nightPatrol: false,
        kanri_flg: false,
        update_flg: true,
        is_delete_flg: false
      });
    }
  },

  // 体重データを処理するヘルパーメソッド
  async processWeightData(weightData) {
    if (weightData.length === 0) return;
    
    const weight = weightData[0];
    this.InputData.DailyActivitiesSection.Weight = {
      id: weight.id || null,
      user_id: weight.user_id || null,
      user_name: weight.user_name || null,
      item_id: weight.item_id || null,
      service_item_name: weight.service_item_name || null,
      served_time: weight.served_time || null,
      date: weight.date || null,
      time: weight.time || null,
      note: weight.note || null,
      is_deleted: weight.is_deleted || null,
      schedule_id: weight.schedule_id || null,
      recorded_staff_id: weight.recorded_staff_id || null,
      staff_name: weight.staff_name || null,
      created_at: weight.created_at || null
    };

    // kirokuListへの追加処理は変更なし
    if (weight.note) {
      this.InputData.kirokuList.push({
        Not_selected_note: false,
        Not_selected_sf: false,
        Not_selected_tm: false,
        row_id: weight.id,
        entry_datetime: weight.served_time,
        time: weight.time,
        txt_val: `【体重】${weight.note}kg`,
        staff_id: weight.recorded_staff_id,
        staff_name: weight.staff_name,
        record_type: '体重',
        nightPatrol: false,
        kanri_flg: false,
        update_flg: true,
        is_delete_flg: false
      });
    }
  },

  // レクリエーションデータを処理するヘルパーメソッド
  async processRecreationData(recreationData) {
    if (recreationData.length === 0) return;
    
    const recreation = recreationData[0];
    this.InputData.DailyActivitiesSection.Recreation = {
      id: recreation.id || null,
      user_id: recreation.user_id || null,
      user_name: recreation.user_name || null,
      item_id: recreation.item_id || null,
      service_item_name: recreation.service_item_name || null,
      served_time: recreation.served_time || null,
      date: recreation.date || null,
      time: recreation.time || null,
      note: recreation.note || null,
      is_deleted: recreation.is_deleted || null,
      schedule_id: recreation.schedule_id || null,
      recorded_staff_id: recreation.recorded_staff_id || null,
      staff_name: recreation.staff_name || null,
      created_at: recreation.created_at || null
    };

    // kirokuListへの追加処理は変更なし
    if (recreation.note) {
      this.InputData.kirokuList.push({
        Not_selected_note: false,
                  Not_selected_sf: false,
                  Not_selected_tm: false,
        row_id: recreation.id,
        entry_datetime: recreation.served_time,
        time: recreation.time,
        txt_val: `【レクリエーション】${recreation.note}`,
        staff_id: recreation.recorded_staff_id,
        staff_name: recreation.staff_name,
        record_type: 'レクリエーション',
        nightPatrol: false,
        kanri_flg: false,
        update_flg: true,
        is_delete_flg: false
      });
    }
  },

  // 排泄データを処理するヘルパーメソッド
  processExcretionData(excretionData) {
    if (!excretionData || !Array.isArray(excretionData) || excretionData.length === 0) return;
    
    // 排泄データを DailyActivitiesSection に設定
    this.InputData.DailyActivitiesSection.Haisetu.haisetuList = excretionData.map(item => ({
      // APIレスポンスの完全なオブジェクト構造を保持
      service_record_id: item.service_record_id || null,
      user_id: item.user_id || null,
      user_name: item.user_name || null,
      item_id: item.item_id || null,
      service_item_name: item.service_item_name || null,
      served_time: item.served_time || null,
      date: item.date || null,
      time: item.time || null,
      urine_quantity: item.urine_quantity || null,
      defecate_quantity_id: item.defecate_quantity_id || null,
      defecate_quantity: item.defecate_quantity || null,
      defecate_condition_id: item.defecate_condition_id || null,
      defecate_condition: item.defecate_condition || null,
      exchange_id: item.exchange_id || null,
      exchange_name: item.exchange_name || null,
      note: item.note || null,
      is_deleted: item.is_deleted || null,
      schedule_id: item.schedule_id || null,
      recorded_staff_id: item.recorded_staff_id || null,
      staff_name: item.staff_name || null,
      created_at: item.created_at || null,
      
      // 後方互換性のために古い構造も保持
      excretion_type: item.excretion_type || 0,
      urine_quantity_id: item.urine_quantity_id || 0,
      id: item.service_record_id || item.id || null
    }));
    
    console.log('排泄データ処理完了:', this.InputData.DailyActivitiesSection.Haisetu.haisetuList);
  },

  // 食事データを処理するヘルパーメソッド
  processMealData(mealData) {
    if (!mealData || !Array.isArray(mealData) || mealData.length === 0) return;
    
    // 食事データを初期化
    this.InputData.Meals = Array.from({ length: 3 }, () => ({
      service_record_id: null,
      user_id: null,
      user_name: null,
      item_id: null,
      service_item_name: null,
      served_time: null,
      date: null,
      time: null,
      meal_category_id: null,
      meal_category: null,
      main_dish_id: null,
      main_dish_intake: null,
      side_dish_id: null,
      side_dish_intake: null,
      note: null,
      is_deleted: null,
      schedule_id: null,
      recorded_staff_id: null,
      staff_name: null,
      created_at: null
    }));
    
    // 食事カテゴリごとにデータを整理
    const mealsByCategory = {
      '朝食': null,
      '昼食': null,
      '夕食': null
    };
    
    // 各食事データを対応するカテゴリに割り当て
    mealData.forEach(meal => {
      if (meal.meal_category === '朝食') {
        mealsByCategory['朝食'] = meal;
      } else if (meal.meal_category === '昼食') {
        mealsByCategory['昼食'] = meal;
      } else if (meal.meal_category === '夕食') {
        mealsByCategory['夕食'] = meal;
      }
    });
    
    // カテゴリ順に配列に格納
    const categories = ['朝食', '昼食', '夕食'];
    categories.forEach((category, index) => {
      const meal = mealsByCategory[category];
      if (meal) {
        this.InputData.Meals[index] = {
          service_record_id: meal.service_record_id,
          user_id: meal.user_id,
          user_name: meal.user_name,
          item_id: meal.item_id,
          service_item_name: meal.service_item_name,
          served_time: meal.served_time,
          date: meal.date,
          time: meal.time,
          meal_category_id: meal.meal_category_id,
          meal_category: meal.meal_category,
          main_dish_id: meal.main_dish_id,
          main_dish_intake: meal.main_dish_intake,
          side_dish_id: meal.side_dish_id,
          side_dish_intake: meal.side_dish_intake,
          note: meal.note,
          is_deleted: meal.is_deleted,
          schedule_id: meal.schedule_id,
          recorded_staff_id: meal.recorded_staff_id,
          staff_name: meal.staff_name,
          created_at: meal.created_at
        };

        // 食事記録を記録リストに追加
        if (meal.note) {
          this.InputData.kirokuList.push({
            Not_selected_note: false,
            Not_selected_sf: false,
            Not_selected_tm: false,
            row_id: meal.service_record_id,
            entry_datetime: meal.served_time,
            time: meal.time,
            txt_val: `【${meal.meal_category}】${meal.note}`,
            staff_id: meal.recorded_staff_id,
            staff_name: meal.staff_name,
            record_type: '食事',
            nightPatrol: false,
            kanri_flg: false,
            update_flg: true,
            is_delete_flg: false
          });
        }
      }
    });
    
    console.log('食事データ処理完了:', this.InputData.Meals);
  },

  // バイタルデータを処理するヘルパーメソッド
  processVitalData(vitalData) {
    if (!vitalData || !Array.isArray(vitalData) || vitalData.length === 0) return;
    
    // 最大2件まで取得（3件から変更）
    const maxEntries = Math.min(vitalData.length, 2);
    
    for (let i = 0; i < maxEntries; i++) {
      this.InputData.Vitals[i] = {
        id: vitalData[i].service_record_id || null,
        user_id: vitalData[i].user_id || null,
        user_name: vitalData[i].user_name || null,
        item_id: vitalData[i].item_id || null,
        service_item_name: vitalData[i].service_item_name || null,
        served_time: vitalData[i].served_time || null,
        date: vitalData[i].date || null,
        time: vitalData[i].time || null,
        max_bp: vitalData[i].max_bp || null,
        min_bp: vitalData[i].min_bp || null,
        pulse: vitalData[i].pulse || null,
        kt: vitalData[i].kt || null,
        spo2: vitalData[i].spo2 || null,
        note: vitalData[i].note || null,
        is_deleted: vitalData[i].is_deleted || null,
        schedule_id: vitalData[i].schedule_id || null,
        recorded_staff_id: vitalData[i].recorded_staff_id || null,
        staff_name: vitalData[i].staff_name || null,
        created_at: vitalData[i].created_at || null
      };
    }
    
    // 未使用のVitalsエントリをクリア
    for (let i = maxEntries; i < this.InputData.Vitals.length; i++) {
      this.InputData.Vitals[i] = {
        created_at: null,
        date: null,
        id: null,
        is_deleted: null,
        item_id: null,
        note: null,
        recorded_staff_id: null,
        schedule_id: null,
        served_time: null,
        service_item_name: null,
        staff_name: null,
        time: null,
        user_id: null,
        user_name: null,
        max_bp: null,
        min_bp: null,
        pulse: null,
        kt: null,
        spo2: null
      };
    }
    
    // 体重情報があれば設定
    vitalData.forEach(vital => {
      if (vital.weight) {
        this.InputData.DailyActivitiesSection.Weight = { 
          val: vital.weight, 
          row_id: vital.service_record_id 
        };
      }
    });
  },

  // 夜間巡視データを処理するヘルパーメソッド
  processNightPatrolData(patrolData) {
    if (!patrolData || !Array.isArray(patrolData) || patrolData.length === 0) return;
    
    // NightPatrolListを初期化
    this.InputData.NightPatrolList = [];
    
    // 夜間巡視データを処理してNightPatrolListに追加
    this.InputData.NightPatrolList = patrolData.map(item => ({
      Not_selected_note: false,
      Not_selected_sf: false,
      Not_selected_tm: false,
      row_id: item.id || 0,
      entry_datetime: item.served_time || item.created_at || item.time,
      time: item.time || '',
      txt_val: item.note || '',
      staff_id: item.recorded_staff_id || item.staff_id,
      staff_name: item.staff_name || '',
      record_type: '夜間巡視',
      nightPatrol: true,
      kanri_flg: false,
      update_flg: true,
      is_delete_flg: false,
      
      // APIレスポンスの構造も保持
      id: item.id || 0,
      user_id: item.user_id || null,
      user_name: item.user_name || null,
      item_id: item.item_id || null,
      service_item_name: item.service_item_name || '夜間巡視',
      served_time: item.served_time || null,
      date: item.date || null,
      note: item.note || null,
      is_deleted: item.is_deleted || false,
      schedule_id: item.schedule_id || null,
      recorded_staff_id: item.recorded_staff_id || null,
      created_at: item.created_at || null,
    }));
    
    // 時間順にソート
    this.InputData.NightPatrolList.sort((a, b) => {
      if (a.entry_datetime && b.entry_datetime) {
        return new Date(a.entry_datetime) - new Date(b.entry_datetime);
      }
      if (a.time && b.time) {
        return a.time.localeCompare(b.time);
      }
      return 0;
    });
    
    console.log('夜間巡視データ処理完了:', this.InputData.NightPatrolList);
  },
},//------------------action----------------//

});



