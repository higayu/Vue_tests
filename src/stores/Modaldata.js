import { defineStore } from 'pinia';
import apiService from '@/services/api.js';

export const useModaldataStore = defineStore('ModaldataStore', {
  state: () => ({
    Vital_Data:null,
    Excretion_Data:null,
    Bath_Data:null,
    Meal_Data:null,
    ServiceRecord_Data:null,
    Schedule_Data:null,
  }),

  actions: {

    async Insert_Service(serviceData) {
      try {
        console.log("🟢 サービス追加開始:", serviceData);
        
        const response = await apiService.InsertService(serviceData);
        console.log("✅ サービス追加成功:", response);
        return response;
      } catch (error) {
        console.error("❌ サービス追加エラー:", error.response?.data || error);
        throw error;
      }
    },

  async Update_Service(serviceData) {
       console.log("🟢 サービス追加開始:", serviceData);
       
       try {
       
       const response = await apiService.UpdateService(serviceData);
       console.log("✅ サービス追加成功:", response);
       return response;
     } catch (error) {
       console.error("❌ サービス追加エラー:", error.response?.data || error);
       throw error;
     }
   },


  async Insert_to_Update_Service(serviceData) {
    try {
        console.log("🟢 サービス処理開始:", serviceData);
        
        
        // item_idが8（排泄）の場合の特別な処理
        if (serviceData.item_id === 8) {
          const response = await apiService.InsertService({
            ...serviceData,
            excretion_info: serviceData.excretion_info // 排泄固有の情報を含める
          });
          return response;
        }
        else if (serviceData.service_record_id) {
            // IDが存在する場合は更新処理
            console.log("🔄 更新処理を実行");
            return await apiService.UpdateService(serviceData);
        } else {
            // IDが存在しない場合は新規追加処理
            console.log("➕ 新規追加処理を実行");
            return await apiService.InsertService(serviceData);
        }
    } catch (error) {
        console.error("❌ サービス処理エラー:", error.response?.data || error);
        throw error;
    }
},


 async getService(user_id, item_id, served_time) {
     try {
         console.log("🟢 サービス取得開始", user_id, item_id, served_time);
         const response = await apiService.getService(user_id, item_id, served_time);
         return response;
     } catch (error) {
         console.error("❌ サービス取得エラー:", error.response?.data || error); 
         throw error;
     }
 },

    setVital_Data(value) {
      this.Vital_Data = value;
    },


    async getVital(id,service_time) {
      try {
        const response = await apiService.getVital(id,service_time);
        if (response.data) {
          return response.data;
        }
      } catch (error) {
        console.error("データ取得中のエラー:", error);
      }
    },

    async getMeal(id,service_time) {
      try {
        const response = await apiService.getMeal(id,service_time);
        if (response.data) {
          return response.data;
        }
      } catch (error) {
        console.error("データ取得中のエラー:", error);
      }
    },

    async saveVital(request, id) {
      try {
        console.log("バイタル記録を送信:", request);  // データ全体を確認
    
        // request.firstMeasurement が存在するか確認
        if (request[0] && request[0].time && request[0].date) {
          const response = await apiService.storeVital(request[0], id);
          if (response.data) {
            console.log("バイタル1回目の更新が完了しました");
          }
        } else {
          console.error("エラー: firstMeasurement が存在しないか、served_time が未定義です。");
        }
    
        // request.reMeasurement が存在するか確認
        if (request[1] && request[1].time && request[1].date) {
          const response = await apiService.storeVital(request[1], id);
          if (response.data) {
            console.log("バイタル2回目の更新が完了しました");
          }
        } else if (request[1]) {
          console.error("エラー: reMeasurement が存在するが、served_time が未定義です。");
        }
      } catch (error) {
        console.error("データ取得中のエラー:", error);
      }
    },
    

    async saveExcretion(request,user_id) {
      try {
        const response = await apiService.storeExcretion(request,user_id);
        if (response.data) {
          console.log("排泄記録が完了しました");
        }
      } catch (error) {
        console.error("データ取得中のエラー:", error);
      }
    },

    async saveMeal(mealsData, userId) {
      try {
        const promises = mealsData.map(mealData => {
          return apiService.storeMeal(mealData, userId);
        });
        
        const results = await Promise.all(promises);
        console.log('All meals saved successfully', results);
        return results;
      } catch (error) {
        console.error('保存エラー:', error);
        throw error;
      }
    },


    async getStaffs(targetDate) {
      try {
        const response = await apiService.getStaffs(targetDate);
        return response.data;
      } catch (error) {
        console.error('スタッフデータの取得に失敗しました:', error);  
      }
    }

  },

  persist: {
    enabled: true,
    strategies: [
      { key: 'modalData-Vital_Data', storage: localStorage, paths: ['Vital_Data'] },
      { key: 'modalData-Excretion_Data', storage: localStorage, paths: ['Excretion_Data'] },
      { key: 'modalData-Bath_Data', storage: localStorage, paths: ['Bath_Data'] },
      { key: 'modalData-Meal_Data', storage: localStorage, paths: ['Meal_Data'] },
      { key: 'modalData-ServiceRecord_Data', storage: localStorage, paths: ['ServiceRecord_Data'] },
      { key: 'modalData-Schedule_Data', storage: localStorage, paths: ['Schedule_Data'] }
    ]
  }
});
