<script setup>
import { ref, computed, onMounted, getCurrentInstance } from "vue";
import { useShareStore } from "../stores/useShareData.js"; // Piniaストアをインポート
import { useRouter } from 'vue-router';
import QR_Login from '../certification/QR_Login.vue';
import NFCReader from '../certification/NFCReader.vue';
import { useRoute } from 'vue-router';

const route = useRoute();

// Androidデバイスかどうかを判定
const isAndroid = computed(() => {
  return /Android/i.test(navigator.userAgent);
});




const ShareStore = useShareStore();
const login_code = ref('');
const password = ref('');
const errorMessage = ref('');
const loading = ref(false);
const passwordType = ref('password'); // "password" か "text" を切り替える
const showQRLogin = ref(false);
const showNFCLogin = ref(false);

const togglePasswordVisibility = () => {
    passwordType.value = passwordType.value === 'password' ? 'text' : 'password';
};

// getCurrentInstanceの設定
const { proxy } = getCurrentInstance();

// トースト通知用の関数
const showSuccessToast = (moji) => {
  if (!proxy || !proxy.$toast) {
    console.error("Toast instance is undefined. Ensure VueToast is properly registered.");
    return;
  }
  proxy.$toast.open({
    message: moji,
    type: "success",
    duration: 1000,
    position: "top",
  });
};

const login = async () => {
    errorMessage.value = ''; // エラーメッセージをリセット
    console.log("🟢 ログインボタンがクリックされました。");
    console.log("🟢 ログインID:", login_code.value);
    console.log("🟢 パスワード:", password.value);
    console.log("🟢 環境変数:", import.meta.env);
    ShareStore.$patch({ isLoading: true }); // ストアの状態を直接更新
    try {
        console.log("🟢 ログインデータを送信開始...");
        await ShareStore.sendLoginData(login_code.value, password.value);
        console.log("🟢 ログインデータを送信完了");

        // 成功時のリダイレクト
        if (ShareStore.LoginData) {
            //router.push('/dashboard');
            showSuccessToast('ログインに成功しました。');
        } else {
            errorMessage.value = 'ログインに失敗しました。';
        }
    } catch (error) {
        errorMessage.value = 'ログインに失敗しました。';
    } finally {
        ShareStore.$patch({ isLoading: false }); // ストアの状態を直接更新
    }
};

const closeQRLogin = () => {
    showQRLogin.value = false;
};

const closeNFCLogin = () => {
    showNFCLogin.value = false;
};
</script>

<template>
    <div class="flex min-h-screen items-center justify-center bg-gray-100">
        <div class="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
            <h2 class="text-2xl font-bold text-center text-gray-700 mb-6">ログイン</h2>

            <form @submit.prevent="login" class="space-y-4">
                <div>
                    <label class="block text-gray-600 text-sm mb-2">ログインID</label>
                    <input type="text" v-model="login_code" required
                        class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none" 
                        placeholder="id123456" />
                </div>

                <div class="relative">
                    <label class="block text-gray-600 text-sm mb-2">パスワード</label>
                    <div class="flex items-center border rounded-lg w-full px-4 focus-within:ring-2 focus-within:ring-blue-400">
                        <input :type="passwordType" v-model="password" required
                            class="flex-1 outline-none bg-transparent pr-2"
                            placeholder="********" />
                        <!-- 目のアイコン -->
                        <button type="button" @click="togglePasswordVisibility"
                            class="flex items-center justify-center w-10 h-10">
                            <svg v-if="passwordType === 'password'" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-500"
                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round">
                                <path d="M2 12s4-8 10-8 10 8 10 8-4 8-10 8-10-8-10-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                            <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-500" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M17.94 17.94A10.06 10.06 0 0112 20c-6 0-10-8-10-8 1.64-2.94 4.25-5.32 7.32-6.53M9.09 9.09a3 3 0 014.24 4.24"></path>
                                <path d="M1 1l22 22"></path>
                            </svg>
                        </button>
                    </div>

                </div>

                <div class="flex space-x-4">
                    <button type="submit" :disabled="loading"
                        class="flex-1 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg 
                        transition-all duration-300 disabled:opacity-50 flex items-center justify-center">
                        <span v-if="!loading">ログイン</span>
                        <svg v-else class="w-5 h-5 animate-spin text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <circle cx="12" cy="12" r="10" stroke-width="4" stroke="currentColor" fill="none"></circle>
                        </svg>
                    </button>
                    <button type="button" @click="showQRLogin = true"
                        class="flex-1 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg 
                        transition-all duration-300 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                        </svg>
                        QRログイン
                    </button>
                    <button v-if="isAndroid" type="button" @click="showNFCLogin = true"
                        class="flex-1 py-2 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-lg 
                        transition-all duration-300 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        NFCログイン
                    </button>
                </div>
            </form>

            <p v-if="errorMessage" class="text-red-500 text-sm mt-4 text-center">{{ errorMessage }}</p>
        </div>

        <!-- QRログインモーダル -->
        <div v-if="showQRLogin" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white rounded-lg p-6 max-w-lg w-full mx-4">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-xl font-bold">QRコードログイン</h3>
                    <button @click="closeQRLogin" class="text-gray-500 hover:text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <QR_Login @close="closeQRLogin" />
            </div>
        </div>

        <!-- NFCログインモーダル -->
        <div v-if="showNFCLogin" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white rounded-lg p-6 max-w-lg w-full mx-4">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-xl font-bold">NFCログイン</h3>
                    <button @click="closeNFCLogin" class="text-gray-500 hover:text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <NFCReader @close="closeNFCLogin" />
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>
