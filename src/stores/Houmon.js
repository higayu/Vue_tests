import { defineStore } from 'pinia';
import apiService from '@/services/api.js';

export const useHoumonStore = defineStore('HoumonStore', {
  state: () => ({
    VitalData: null,// バイタル記録のテーブル用保存
    PhysicalCare_Data: null,// 身体介護記録のjson用保存
    LifeSupport_Data: null,// 生活援助記録のjson用保存
    Note_Data: null,// 備考記録のjson用保存
    SpecialChange_Data: null,// 特変記録のテーブル用保存
  }),

  actions: {

    // 特変記録
    setSpecialChange(value) {
        this.SpecialChange_Data = value;
    },

    // バイタル記録
    setVital(VitalList) {
      this.VitalData = VitalList;
    },


    //訪問テーブルの取得
    async getVisiting(user_id, item_id, served_time) {
        const response = await apiService.getService(user_id, item_id, served_time);
        return response;
    }, 


    async Insert_Service(serviceData) {
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
        console.log("✅ サービス追加成功:", response);
        return response;
      } catch (error) {
        console.error("❌ サービス追加エラー:", error.response?.data || error);
        throw error;
      }
  },


    async seveComplete(id, formattedTime) {
        console.log("🟢 訪問の保存処理開始");
        try {
          console.log("🟢 利用者ID:",id);
            const response = await this.saveVital(this.VitalData,id);
            console.log("🟢 バイタル記録の保存結果:", response);
            if (response) {
                console.log("特変の保存開始");
                const specialChangeResponse = await this.Insert_Service({
                    user_id: Number(id),
                    item_id: 12, // 特変のID
                    served_time: this.SpecialChange_Data.served_time,
                    note: this.SpecialChange_Data.note,
                    schedule_id: this.SpecialChange_Data.schedule_id || 1, // デフォルト値を設定
                    recorded_staff_id: 1
                });

                console.log("🟢 特変の保存結果:", specialChangeResponse);

                // JSON文字列に変換
                const visitingServicesjson = {
                    vital: this.VitalData,
                    physicalCare: this.PhysicalCare_Data,
                    lifeSupport: this.LifeSupport_Data,
                    note: this.Note_Data,
                    specialChange: this.SpecialChange_Data,
                    service_time: formattedTime,
                };

                const postData = {
                  user_id: Number(id),
                  served_time: formattedTime,
                  service_json: JSON.stringify(visitingServicesjson),
                  note: null,
                  schedule_id: null,
                  recorded_staff_id: 1
              };

                // JSON.stringifyを使用して文字列に変換
                const visitingResponse = await apiService.Insert_Visiting_Services(postData);
                console.log("🟢 訪問記録が完了しました:", visitingResponse);
            }
        } catch (error) {
            console.error("データ取得中のエラー:", error);
            // エラー内容を詳細にログに出力
            if (error.response) {
                console.error("APIエラー:", error.response.data);
            }
        }
    },

     async saveVital(request, id) {
        try {
          console.log("バイタル記録を送信:", request);  // データ全体を確認
   
          // request.firstMeasurement が存在するか確認
          if (request[0] && request[0].time && request[0].date) {
            const response = await apiService.storeVital(request[0], id);
            if (response) {
              console.log("バイタル1回目の更新が完了しました");
            }
          } else {
            console.error("エラー: firstMeasurement が存在しないか、served_time が未定義です。");
            return false;
          }
   
          // request.reMeasurement が存在するか確認
          if (request[1] && request[1].time && request[1].date) {
            const response = await apiService.storeVital(request[1], id);
            if (response) {
              console.log("バイタル2回目の更新が完了しました");
              return true;
            }
          } else if (request[1]) {
            console.error("エラー: reMeasurement が存在するが、served_time が未定義です。");
          }

          return true;
        } catch (error) {
          console.error("データ取得中のエラー:", error);
     }
   },

    // 身体介護記録
    setPhysicalCare(value) {
        this.PhysicalCare_Data = value;
    },

    // 生活援助記録
    setLifeSupport(value) {
        this.LifeSupport_Data = value;
    },

    // 備考記録
    setNote(value) {
        this.Note_Data = value;
    },

  },

  persist: {
    enabled: true,
    strategies: [
      { key: 'houmon-VitalData', storage: localStorage, paths: ['VitalData'] },
      { key: 'houmon-PhysicalCare_Data', storage: localStorage, paths: ['PhysicalCare_Data'] },
      { key: 'houmon-LifeSupport_Data', storage: localStorage, paths: ['LifeSupport_Data'] },
      { key: 'houmon-Note_Data', storage: localStorage, paths: ['Note_Data'] },
      { key: 'houmon-SpecialChange_Data', storage: localStorage, paths: ['SpecialChange_Data'] }
    ]
  }
});
