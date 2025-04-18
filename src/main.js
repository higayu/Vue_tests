// main.js
import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPersist from 'pinia-plugin-persistedstate'; // 追加
import App from "./App.vue";
import router from "./router";
import "./index.css";
import axios from "axios";
// Vue Datepickerに関するimport
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import { LoadingPlugin } from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'

// axiosの設定は services/api.js に移行
axios.defaults.withCredentials = true;

const app = createApp(App);
const pinia = createPinia();

// piniaに永続化プラグインを追加
pinia.use(piniaPersist);
app.use(LoadingPlugin, {
  color: '#4CAF50',
  loader: 'spinner',
  width: 64,
  height: 64,
  backgroundColor: '#ffffff',
  opacity: 0.5,
});
app.use(VueToast);
app.use(pinia);
app.use(router);

  
// Vue Datepickerのコンポーネントを登録
app.component('VueDatePicker', VueDatePicker);
app.mount("#app");
