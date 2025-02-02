import { defineStore, setActivePinia } from 'pinia';

export const useUserStore = defineStore('userStore', {
  state: () => ({
    user: null,
    records: [], 
    SelectItem:null,
    isLoggedIn:false,
  }),

  actions: {

    async getDataList(){
      if(!this.user){
        return;
      }
      const Gmail = this.user.email;
      console.log('Gメール',Gmail);
      const response = await apiService.getDataList(Gmail);
      console.log('レスポンスデータ',response);
      this.records =response.data;
    },

    // ユーザー情報を設定する
   async setUser(userInfo) {
      this.user = userInfo;
      if(this.user){
        this.isLoggedIn = true;
        await this.getDataList();
      }else{
        this.isLoggedIn = false;
      }
      console.log('ユーザーデータ',this.user);
    },

    // ユーザー情報をクリアする
    clearUser() {
      this.user = null;
      this.isLoggedIn = false;
      this.SelectItem = null;
      this.records = [];
      localStorage.removeItem('user-data'); // persistでも消去されるが明示的に追加
    },

    setSelectItem(item){
      this.SelectItem = item;
    },


  },

  persist: {
    enabled: true,
    strategies: [
      { key: 'user-data', storage: localStorage, paths: ['user'] },
    ],
  },
});