<template>
    <body>
      <main>
        <!-- ログイン前 -->
        <div v-if="!userStore.isLoggedIn" style="height: 150px; background-color: pink; text-align: center; overflow: hidden;">
          <h1 class="truncate">Google Login</h1>
          <button class="google-login-btn flex items-center justify-center truncate" @click="GoogleLogin">
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google Icon"
              class="google-icon image-responsive"
            />
            Login with Google
          </button>
        </div>
  
        <!-- ログイン後 -->
        <div v-else class="user-info flex items-center justify-center" style="height: 150px; background-color: lightgreen; text-align: center;">
          <img
            :src="userStore.user.image"
            alt="Profile Picture"
            class="profile-img image-responsive"
            title="Click to logout"
            @click="handleLogout"
          />
          <p class="truncate">
            氏名: <strong>{{ userStore.user.name }}</strong><br />
            Email: {{ userStore.user.email }}
          </p>
        </div>
      </main>
    </body>
</template>
  

  
<script>
// Firebase関連のインポート
import { signInWithRedirect, getRedirectResult, GoogleAuthProvider, signOut } from "firebase/auth";
import Firebase from "../firebase_settings/index.js";
import { useUserStore } from "../stores/userStore";

const auth = Firebase.auth;
const provider = new GoogleAuthProvider();

export default {
  methods: {
    // Googleでリダイレクトログイン
    async GoogleLogin() {
      try {
        this.isLoading = true;
        await signInWithRedirect(auth, provider); // Googleリダイレクトログイン
      } catch (error) {
        console.error("Googleログインエラー: ", error);
        this.errorMessage = "Googleログインに失敗しました。";
        this.isLoading = false;
      }
    },

    // リダイレクト結果の処理
    async handleRedirectResult() {
      try {
        const result = await getRedirectResult(auth); // リダイレクト結果を取得
        if (result) {
          const user = result.user; // Firebaseユーザー情報
          console.log("Googleログイン成功: ", user.email);

          // ストアにユーザー情報を保存
          const userInfo = {
            id: user.uid,
            name: user.displayName || "匿名ユーザー",
            email: user.email || "メールアドレス不明",
            image: user.photoURL || "/default-avatar.png",
          };
          this.userStore.setUser(userInfo);
        }
      } catch (error) {
        console.error("リダイレクト結果エラー: ", error);
      } finally {
        this.isLoading = false;
      }
    },

    // ログアウト処理
    async handleLogout() {
      try {
        await signOut(auth);
        this.userStore.clearUser(); // ストアをクリア
        console.log("ログアウト成功");
      } catch (error) {
        console.error("ログアウトエラー: ", error);
      }
    },
  },

  data() {
    return {
      isLoading: false,
      errorMessage: "",
      userStore: useUserStore(), // ユーザーストアを使用
    };
  },

  mounted() {
    // ページロード時にリダイレクト結果を処理
    this.handleRedirectResult();
  },
};
</script>
  
<style scoped>
header {
  height: 120px;
}

header .title {
  font-size: 40px;
  padding: 20px 0 0;
}

main {
  padding: 30px auto;
}

.google-login-btn {
  width: 200px;
  height: 50px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  margin: 10px auto;
}

.google-icon {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}

.user-info img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
  cursor: pointer;
}

.user-info p {
  margin: 0;
  font-size: 14px;
}
</style>
