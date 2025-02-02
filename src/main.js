import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from './router'; // ルーターのインポート
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persistedstate';

const app = createApp(App)
const pinia = createPinia();
pinia.use(piniaPersist); // persist プラグインを追加

app.use(pinia);
app.use(router)

app.mount('#app')