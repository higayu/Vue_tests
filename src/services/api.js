// services/api.js

import axios from 'axios';
import { useShareStore } from "../stores/useShareData.js"; // Piniaストアをインポート

class ApiService {

    constructor() {
        this.api = axios.create({
            baseURL: import.meta.env.VITE_API_URL,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });

        // ✅ すべてのリクエストに認証トークンをセット（ログインリクエストを除外）
        this.api.interceptors.request.use(
            (config) => {
                const shareStore = useShareStore(); // Piniaストアを取得
                const token = shareStore.LoginData?.token; // Piniaからトークン取得
                
                if (token && config.url !== '/login' && config.url !== '/nfc-login') {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );
    }

    //----------------------------------------------------//

        // NFCログイン
        async nfcLogin(nfchasu) {
            try {
                const sendData = {nfchasu:nfchasu};
                console.log('NFCログインデータ:', sendData);
                const response = await this.api.post(import.meta.env.VITE_NFC_LOGIN, sendData);
                return response.data;
            } catch (error) {
                console.error("NFCログインAPI失敗:", error);
                throw error;
            }
        }
    
        // ログイン
        async login(login_code, password) {
            try {
                console.log("🟢 [ログインデータ送信] Sending data:", { login_code, password });
        
                const sendData = {
                    login_code: login_code,
                    password: password
                };
                console.log("🟢 ENVファイルの値：",import.meta.env.VITE_LOGIN );
                const response = await this.api.post(import.meta.env.VITE_LOGIN, sendData);
        
                console.log("✅ [認証結果] Response:", response.data);
        
                // if (response.data.token) {
                //     this.setAuthToken(response.data.token);
                // }
        
                return response.data;
            } catch (error) {
                console.error('❌ [Login Failed] Error:', error.response?.data || error); // ✅ エラーログ
        
                // APIエラーの詳細をコンソールに表示
                if (error.response) {
                    console.error('🔴 [API Error Response] Status:', error.response.status);
                    console.error('🔴 [API Error Response] Data:', error.response.data);
                } else {
                    console.error('🔴 [Unknown Error]', error);
                }
        
                throw error;
            }
        }
        
    
        // ログアウト
        async logout() {
            const response = await this.api.post('/logout');
            this.clearAuthToken();
            return response;
        }
    
    //------------------------------------------------------//

    // 選択した1日分のサイドバー情報を取得するメソッド
    async getSideByDate(dateStr) {
        try {
            // 日付のフォーマットを正規化
            let formattedDate;
            
            if (typeof dateStr === 'string') {
                // 文字列の場合、YYYY-MM-DD形式に変換
                const parts = dateStr.split('-');
                if (parts.length === 3) {
                    const year = parts[0];
                    const month = parts[1].padStart(2, '0'); // 一桁の月の場合は先頭に0を追加
                    const day = parts[2].padStart(2, '0');   // 一桁の日の場合は先頭に0を追加
                    formattedDate = `${year}-${month}-${day}`;
                } else {
                    formattedDate = dateStr; // 分割できない場合はそのまま使用
                }
            } else if (dateStr instanceof Date) {
                // Dateオブジェクトの場合
                const year = dateStr.getFullYear();
                const month = String(dateStr.getMonth() + 1).padStart(2, '0');
                const day = String(dateStr.getDate()).padStart(2, '0');
                formattedDate = `${year}-${month}-${day}`;
            } else {
                throw new Error('無効な日付形式です');
            }
            
            console.log('APIに送信する正規化された日付:', formattedDate); // デバッグ用
            
            const response = await this.api.get(`${import.meta.env.VITE_SIDEBAR_DATE}/?date=${formattedDate}`);
            
            console.log('API Response:', response.data.data); // デバッグ用
            return response.data.data;
        } catch (error) {
            console.error('Error fetching sidebar info for month:', error);
            throw error;
        }
    }
    //----------------------------------------------------------------//
    // 選択した1か月分の月のサイドバー情報を取得するメソッド
    async getSideByMonth_Kanri(dateStr) {
        try {
            // 日付文字列のバリデーション（YYYY-MM形式）
            if (!dateStr || !/^\d{4}-\d{2}$/.test(dateStr)) {
                throw new Error(`無効な日付形式です: ${dateStr} (YYYY-MM形式が必要です)`);
            }

            console.log('月間データAPI呼び出し:', {
                url: '/sidebar-month_kanri',
                requestData: { target_date: dateStr },
                timestamp: new Date().toISOString()
            });

            const response = await this.api.get(`${import.meta.env.VITE_SIDEBAR_MONTH_KANRI}/?target_date=${dateStr}`, {
                withCredentials: true
            });

            // レスポンスのバリデーション
            if (!response.data) {
                throw new Error('APIレスポンスにデータが含まれていません');
            }

            // レスポンス形式を統一
            const formattedResponse = {
                success: response.data.status === 'success',
                message: response.data.message,
                data: response.data.data
            };

            console.log('月間データAPIレスポンス:', {
                success: formattedResponse.success,
                recordCount: formattedResponse.data?.length || 0
            });
            
            return formattedResponse;
        } catch (error) {
            console.error('月間データAPI呼び出しエラー:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });
            throw error;
        }
    }


        //-----------------------[追加保存処理]-------------------------------------------// 
        async postInputData(formData) {
            try {
                // 送信データの作成
                const dataToSend = {
                    form: formData,
                };
                const shareStore = useShareStore(); // Piniaストアを取得
                const token = shareStore.LoginData.token; // Piniaからトークン取得
                const response = await this.api.post(import.meta.env.VITE_SAVE_DATA, dataToSend,
                    {
                        Authorization: `Bearer ${token}`
                    });
                
              //  alert("データが保存されました！");
        
                return response; // 成功時に response オブジェクトを返す
            } catch (error) {
                console.error("保存中にエラーが発生しました", error);
                alert("保存に失敗しました");
                return error.response || error; // エラー時にも response またはエラーオブジェクトを返す
            }
        }
    //-------------------------------更新処理------------------------------------///
        async postUpdateData(formData) {
            try {
                // 送信データの作成
                const dataToSend = {
                    form: formData,
                };
                const shareStore = useShareStore(); // Piniaストアを取得
                const token = shareStore.LoginData.token; // Piniaからトークン取得
                const response = await this.api.post(import.meta.env.VITE_UPDATE, dataToSend,
                    {
                        Authorization: `Bearer ${token}`
                    });
                
               // alert("データが更新されました！");
        
                return response; // 成功時に response オブジェクトを返す
            } catch (error) {
                console.error("更新中にエラーが発生しました", error);
                alert("更新に失敗しました");
                return error.response || error; // エラー時にも response またはエラーオブジェクトを返す
            }
        }

//-------------------------------------------------------------------//
// 選択した日付と名前からすでに保存しているデータが存在するか取得するメソッド
async getRecode(sendrecode) {
    try {
        const shareStore = useShareStore(); // Piniaストアを取得
        const token = shareStore.LoginData.token; // Piniaからトークン取得
        const postData = { user_id: sendrecode.user_id, day_key: sendrecode.day_key };
        const response = await this.api.post(import.meta.env.VITE_GET_RECODE, postData, 
            { 
                withCredentials: true,
                Authorization: `Bearer ${token}`
            });

        // レスポンスでデータが存在するかを確認
        if (response.data) {
            return true;  // データが取得できた場合
        } else {
            return false; // データが存在しない場合
        }

    } catch (error) {
        console.error('Error fetching データ:', error);
        return false; // 取得に失敗した場合は false を返す
    }
}

//------------------------------------------------------------------//

    async getExcel_template(){

        const API_URL = import.meta.env.VITE_API_URL+import.meta.env.VITE_EXCEL_KANRI;

        try {
            const shareStore = useShareStore(); // Piniaストアを取得
            const token = shareStore.LoginData.token; // Piniaからトークン取得
          const response = await axios.get(API_URL, {
            responseType: 'arraybuffer',
            Authorization: `Bearer ${token}`
          });
    
          return response.data;
        } catch (error) {
          console.error('Error fetching the Excel file with ExcelJS:', error);
        }
    }

    //------------------------------------------------------------------------//
        // 選択した日付と名前の印刷に必要なデータ1件を取得するようにする
    async getKanri_kiroku(start,end) {
        try {
            const shareStore = useShareStore(); // Piniaストアを取得
            const token = shareStore.LoginData.token; // Piniaからトークン取得
            const postData = { start_datetime: start,end_datetime:end };
            const response = await this.api.post(import.meta.env.VITE_KANRI_KIROKU, postData, 
                {
                     withCredentials: true,
                     Authorization: `Bearer ${token}`    
                });
            return response.data;
        } catch (error) {
            console.error('Error fetching print 管理日誌:', error);
            throw error;
        }
    }    
    //---------------------------------------------------------------------------//
    //------------------------------------------------------------------------//
        // 選択した日付と名前の印刷に必要なデータ1件を取得するようにする
        async getKanri_userList(sendrecode) {
           
            try {
                // const postData = { day_val: sendrecode };
                const shareStore = useShareStore(); // Piniaストアを取得
                const token = shareStore.LoginData.token; // Piniaからトークン取得
                const postData = { day_val: sendrecode };
                const response = await this.api.post(import.meta.env.VITE_KANRI_USERLIST, postData, 
                    {
                         withCredentials: true,
                         Authorization: `Bearer ${token}`
                    });
                return response.data;
            } catch (error) {
                console.error('Error fetching ユーザリスト:', error);
                throw error;
            }
        }    
    //---------------------------------------------------------------------------//
    // トークンをセットする関数
    setAuthToken(token) {
        localStorage.setItem('token', token);
        this.api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    // トークンをクリアする関数
    clearAuthToken() {
        localStorage.removeItem('token');
        delete this.api.defaults.headers.common['Authorization'];
    }
    //-----------------------------------------------------------//
        //---------------------------------------------------------------------------//

            // ユーザーリスト取得メソッド
            async getUserList(target_date) {
                try {
                    // const postData = { day_val: sendrecode };
                    const postData = { target_date: target_date };
                    console.log('利用者取得の日付',target_date);
                    const response = await this.api.get(`${import.meta.env.VITE_USER_LIST}/?target_date=${target_date}`, { withCredentials: true });
                    return response.data;
                } catch (error) {
                    console.error('Error fetching ユーザ data:', error);
                    throw error;
                }
            }
            //--------------------------------------------------------------------//
            // ユーザー取得メソッド
            async getUser_Schedules(target_date) {
                try {
                
                    console.log('日付文字列',target_date);
                    const response = await this.api.get(`${import.meta.env.VITE_USER_SCHEDULE}?target_date=${target_date}`, { withCredentials: true });
                    return response.data;
                } catch (error) {
                    console.error('Error fetching user schedules:', error);
                    throw error;
                }
            }


            // ユーザースケジュール保存メソッド（修正後）
            async saveUserSchedule(target_day, scheduleData) {
                try {
                    // postData の作成（served_time を削除）
                    const postData = {
                        user_id: scheduleData.user_id,      // scheduleData から取得
                        schedule_id: scheduleData.schedule_id,  // scheduleData から取得
                        scheduled_time: target_day,        // target_day を使用
                        recorded_staff_id: scheduleData.recorded_staff_id // scheduleData から取得
                    };

                    // API 呼び出し
                    const response = await this.api.post(import.meta.env.VITE_SAVE_SCHEDULE, postData);
                    console.log("スケジュール追加成功:", response.data);
                    return response.data;
                } catch (error) {
                    console.error("スケジュールの追加に失敗:", error.response?.data || error.message);
                    throw error;
                }
            }

            //--------------------------------------------------------------------//
                // スケジュール削除メソッド
            async deleteSchedule(idList) {
                try {
                    console.log("🟢 削除リクエスト送信:", idList);
                    
                    // バックエンドは配列を期待しているので、正しい形式でデータを準備
                    const config = { 
                        data: { data: idList },
                        withCredentials: true 
                    };
                    
                    const response = await this.api.delete(import.meta.env.VITE_DELETE_SCHEDULE, config);
                    console.log("🟢 削除レスポンス:", response.data);
                    return response.data;
                } catch (error) {
                    console.error('Error deleting schedule:', error.response?.data || error);
                    throw error;
                }
            }

            //------------------------------------------------------//
            // サービス追加メソッド
            async InsertService(serviceData) {
                try {
                    console.log("🟢 サービス追加リクエスト送信:", serviceData);
                    
                    // データの型を確認
                    if (typeof serviceData.item_id !== 'number') {
                        serviceData.item_id = Number(serviceData.item_id);
                    }
                    if (typeof serviceData.user_id !== 'number') {
                        serviceData.user_id = Number(serviceData.user_id);
                    }
                    
                    const response = await this.api.post(import.meta.env.VITE_SERVICE, serviceData);
                    console.log("🟢 サービス追加レスポンス:", response.data);
                    return response.data;
                } catch (error) {
                    console.error('サービス追加エラー:', error.response?.data || error);
                    throw error;
                }
            }

            // サービス更新メソッド
            async UpdateService(serviceData) {
                try {
                    console.log("🟢 サービス更新リクエスト送信:", serviceData);
                    
                    // データの型を確認 
                    if (typeof serviceData.item_id !== 'number') {
                        serviceData.item_id = Number(serviceData.item_id);
                    }
                    if (typeof serviceData.user_id !== 'number') {
                        serviceData.user_id = Number(serviceData.user_id);
                    }       
                    
                    // service_record_idが存在するか確認
                    if (!serviceData.service_record_id) {
                        throw new Error('service_record_idが必要です');
                    }
                    
                    
                    // user_idが必須であることを確認
                    if (!serviceData.user_id) {
                        throw new Error('user_idが必要です');
                    }
                    
                    const response = await this.api.put(`${import.meta.env.VITE_SERVICE}/${serviceData.user_id}`, serviceData);
                    console.log("🟢 サービス更新レスポンス:", response.data);
                    return response.data;
                } catch (error) {
                    console.error('サービス更新エラー:', error.response?.data || error);
                    throw error;
                }
            }

            //サービス取得メソッド
            async getService(user_id, item_id, served_time) {
                try {
                    const shareStore = useShareStore(); // Piniaストアを取得    
                    const token = shareStore.LoginData.token; // Piniaからトークン取得
                    const params = new URLSearchParams({
                        served_time: served_time,
                        item_id: item_id
                    });

                    const response = await this.api.get(`${import.meta.env.VITE_SERVICE}/${user_id}?${params.toString()}`, {
                        withCredentials: true,
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    return response.data;
                } catch (error) {
                    console.error('サービス取得エラー:', error.response?.data || error);
                    throw error;
                }
            }

            //サービス削除メソッド
            async deleteService(service_record_id) {
                try {
                    const response = await this.api.delete(`${import.meta.env.VITE_SERVICE}/${service_record_id}`, { withCredentials: true });
                    return response.data;
                } catch (error) {
                    console.error('サービス削除エラー:', error.response?.data || error);
                    throw error;
                }
            }

            //------------------------------------------------------//
            // サービスステータス取得メソッド
            async getServiceStatus() {
                try {
                    const response = await this.api.get(`${import.meta.env.VITE_GET_SERVICE_STATUS}`, { withCredentials: true });
                    return response.data;   
                } catch (error) {
                    console.error('サービスステータス取得エラー:', error.response?.data || error);
                    throw error;
                }
            }

            // async getServiceStatus(user_id) {
            //     try {
            //         const response = await this.api.get(`${import.meta.env.VITE_GET_SERVICE_STATUS}?user_id=${user_id}`, { withCredentials: true });
            //         return response.data;   
            //     } catch (error) {
            //         console.error('サービスステータス取得エラー:', error.response?.data || error);
            //         throw error;
            //     }
            // }

            // バイタル登録メソッド
            async storeVital(request, id) {
                try {

                    const postData = {
                        service_record_id: request.service_record_id,
                        user_id: id,
                        time: request.time,
                        date: request.date,
                        max_bp: request.max_bp,
                        min_bp: request.min_bp,
                        pulse: request.pulse,       
                        kt: request.kt,
                        spo2: request.spo2,
                        weight: request.weight,
                        note: request.note,
                        schedule_id: null,
                        recorded_staff_id: 1
                    };
                    
                    const response = await this.api.post(import.meta.env.VITE_VITAL+'/'+id, postData, { withCredentials: true });
                    return response.data;
                } catch (error) {
                    console.error('バイタル登録エラー:', error.response?.data || error);
                    throw error;
                }
            }          

            // バイタル取得メソッド
            async getVital(id,service_time) {
                try {
                    const response = await this.api.get(`${import.meta.env.VITE_VITAL}/${id}?served_time=${service_time}`, { withCredentials: true });
                    return response.data;
                } catch (error) {
                    console.error('バイタル登録エラー:', error.response?.data || error);
                    throw error;
                }
            }

            async getMeal(id,service_time) {
                try {
                    const response = await this.api.get(`${import.meta.env.VITE_MEAL}/${id}?served_time=${service_time}`, { withCredentials: true });
                    return response.data;
                } catch (error) {
                    console.error('バイタル登録エラー:', error.response?.data || error);
                    throw error;
                }
            }

            // 排泄記録の保存（新規・更新共通）
            async storeExcretion(data) {
                try {
                    const response = await this.api.post(`${import.meta.env.VITE_EXCRETION}/${data.user_id}`, data);
                    return response.data;
                } catch (error) {
                    console.error('排泄登録エラー:', error.response?.data);
                    throw error;
                }
            }

            // 食事登録メソッド
            async storeMeal(request,user_id) {
                try {
                    const postData = {
                        service_record_id: request.service_record_id,
                        user_id: user_id,
                        served_time: request.served_time,           
                        meal_category_id: request.meal_category_id,
                        main_dish_id: request.main_dish_id,
                        side_dish_id: request.side_dish_id,
                        note: request.note,
                        schedule_id: null,
                        recorded_staff_id: 1
                    };
                    const response = await this.api.post(import.meta.env.VITE_MEAL+'/'+user_id, postData, { withCredentials: true });
                    return response.data;
                } catch (error) {
                    console.error('食事登録エラー:', error.response?.data || error);
                    throw error;
                }
            }           

            //--------------------------------------------------------------------//

            // 訪問登録メソッド
            async Insert_Visiting_Services(request) {
                try {

                    console.log("🟢 訪問記録の保存リクエスト:", request);

                    const response = await this.api.post(import.meta.env.VITE_INSERT_VISITING_SERVICES, request, { withCredentials: true });
                    return response.data;
                } catch (error) {
                    console.error('訪問記録登録エラー:', error.response?.data || error);
                    throw error;
                }
            }
            //--------------------------------------------------------------------//

            //------------------------------------------------------------------------//

    // 日付の印刷に必要なデータを取得するメソッド（日付のみ表示の場合）
    async getPrint(date, id) {
        try {
            const shareStore = useShareStore(); // Piniaストアを取得
            const token = shareStore.LoginData?.token; // Piniaからトークン取得
            
            console.log("印刷データ取得リクエスト:", { date, id });
            
            // パラメータのチェックと修正
            if (!date) {
                throw new Error('日付パラメータが必要です');
            }
            
            if (!id || isNaN(parseInt(id))) {
                console.warn('ユーザーIDが提供されていないか無効です。デフォルト値1を使用します');
                id = 1;
            }
            

            if (typeof date === 'string' && !date.includes('-')) {
                console.warn('日付形式が不正です。YYYY-MM-DD形式に変換します');
                // 適切な日付変換処理を行う
            }
            
            console.log(`POSTリクエスト送信: ${import.meta.env.VITE_PRINT}/${id}`, date);
            
            const response = await this.api.get(`${import.meta.env.VITE_PRINT}/${id}?served_time=${date}`, {
                 withCredentials: true,
                 headers: {
                    Authorization: token ? `Bearer ${token}` : undefined
                 }
            });
            
            console.log("印刷データ取得成功:", response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching 一件のデータ for date:', error);
            throw error;
        }
    }

        // ユーザーリスト取得メソッド
    async getDay_KanriNissi(target_date) {
            try {
                const shareStore = useShareStore();
                const token = shareStore.LoginData?.token;
                
                if (!token) {
                    throw new Error('認証トークンが見つかりません');
                }

                // リクエストの設定
                const config = {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                };

                const response = await this.api.get(
                    import.meta.env.VITE_KANRI_NISI_DATE
                    +`?served_time=${target_date}`, 
                    config
                );
                
                return response.data;
            } catch (error) {
                console.error('API呼び出しエラー:', {
                    message: error.message,
                    response: error.response?.data,
                    status: error.response?.status
                });
                throw error;
            }
        }

        ///---------管理日誌の自由入力欄の登録及び更新
       async Manager_Log(logdata){
            const shareStore = useShareStore(); 
            const token = shareStore.LoginData?.token;

            const response = await this.api.post(import.meta.env.VITE_KANRI_NISI_MANAGERLOG, logdata,{
                withCredentials: true,
                headers: {
                Authorization: token ? `Bearer ${token}` : undefined
                }
            });
            return response.data;
       }
        //----------------------------------------------------------------------//

        // 職員リスト取得メソッド
        async getStaff_Kanri(target_date) {
            const shareStore = useShareStore(); 
            const token = shareStore.LoginData?.token;

            const response = await this.api.get(`${import.meta.env.VITE_STAFF_KANRI}/?target_date=${target_date}`,{
                withCredentials: true,
                headers: {
                   Authorization: token ? `Bearer ${token}` : undefined
                }
           });
           return response.data;
        }

        // 職員リスト取得メソッド
        // スタッフリスト取得メソッド
        async getStaffs(target_date) {
            try {
                const shareStore = useShareStore(); // Piniaストアを取得
                const token = shareStore.LoginData?.token; // Piniaからトークン取得 

                console.log('日付文字列',target_date);
                const response = await this.api.get(`${import.meta.env.VITE_STAFF_LIST}/?target_date=${target_date}`, { withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                return response.data;
            } catch (error) {
                console.error('Error fetching staff data:', error);
                throw error;
            }
        }


}

// インスタンスをエクスポートして、他のモジュールで再利用可能に
const apiService = new ApiService();
export default apiService;
