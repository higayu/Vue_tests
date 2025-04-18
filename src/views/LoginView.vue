<template>
    <div class="min-h-screen bg-gray-100">
        <div class="login_container">
            <div class="login_form">
                <h1>ログイン</h1>
                <div class="input_group">
                    <input 
                        type="email" 
                        v-model="email" 
                        placeholder="メールアドレス"
                        class="input_field"
                        @keyup.enter="handleLogin"
                    >
                </div>
                <div class="input_group">
                    <input 
                        type="password" 
                        v-model="password" 
                        placeholder="パスワード"
                        class="input_field"
                        @keyup.enter="handleLogin"
                    >
                </div>
                <button 
                    @click="handleLogin" 
                    class="login_button"
                    :disabled="isLoading"
                >
                    <span v-if="isLoading">ログイン中...</span>
                    <span v-else>ログイン</span>
                </button>
                <div v-if="error" class="error_message">{{ error }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase_settings/index.js";
import { useShareStore } from "../stores/useShareData.js";

export default {
    setup() {
        const router = useRouter();
        const ShareStore = useShareStore();
        const email = ref('');
        const password = ref('');
        const error = ref('');
        const isLoading = ref(false);

        const handleLogin = async () => {
            if (!email.value || !password.value) {
                error.value = 'メールアドレスとパスワードを入力してください。';
                return;
            }

            try {
                isLoading.value = true;
                error.value = '';
                
                // Firebase認証を使用してログイン
                const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
                console.log('🟢 ログイン成功:', userCredential.user);
                
                // ログイン情報をShareStoreに保存
                const loginData = {
                    email: userCredential.user.email,
                    uid: userCredential.user.uid,
                    displayName: userCredential.user.displayName || email.value.split('@')[0],
                    photoURL: userCredential.user.photoURL,
                    emailVerified: userCredential.user.emailVerified,
                    lastLoginAt: new Date().toISOString()
                };
                
                // ShareStoreにログインデータを保存
                ShareStore.setLoginData(loginData);
                console.log('🟢 ログインデータを保存:', loginData);
                
                // ログイン成功後、ホームページにリダイレクト
                router.push('/');
            } catch (err) {
                console.error('❌ ログインエラー:', err);
                switch (err.code) {
                    case 'auth/invalid-email':
                        error.value = 'メールアドレスの形式が正しくありません。';
                        break;
                    case 'auth/user-not-found':
                        error.value = 'このメールアドレスは登録されていません。';
                        break;
                    case 'auth/wrong-password':
                        error.value = 'パスワードが間違っています。';
                        break;
                    case 'auth/too-many-requests':
                        error.value = 'ログイン試行回数が多すぎます。しばらく待ってから再度お試しください。';
                        break;
                    default:
                        error.value = 'ログインに失敗しました。もう一度お試しください。';
                }
            } finally {
                isLoading.value = false;
            }
        };

        return {
            email,
            password,
            error,
            isLoading,
            handleLogin
        };
    }
};
</script>

<style scoped>
.login_container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f5f5f5;
}

.login_form {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
}

h1 {
    text-align: center;
    margin-bottom: 2rem;
    color: #333;
}

.input_group {
    margin-bottom: 1rem;
}

.input_field {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
}

.input_field:focus {
    outline: none;
    border-color: #4CAF50;
    box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
}

.login_button {
    width: 100%;
    padding: 0.75rem;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s;
}

.login_button:hover:not(:disabled) {
    background-color: #45a049;
}

.login_button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
}

.error_message {
    color: #ff0000;
    margin-top: 1rem;
    text-align: center;
    font-size: 0.9rem;
}
</style>
  