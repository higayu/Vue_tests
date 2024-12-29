import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from './router'; // ルーターのインポート

const app = createApp(App);
app.use(router); // Vue Router を登録
app.mount('#app');