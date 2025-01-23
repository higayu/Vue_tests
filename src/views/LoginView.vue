<template>
    <body>
        <header>
            <div class="title">Vue Firebase Example</div>
        </header>
  
        <main>
            <div class="container">
                <p>ID(メールアドレス)</p>
                <input type="email" v-model="inputValueId">
                <!-- この下の<p></p>はテキストボックスを中央に配置するために必要な疑似要素です -->
                <p></p>
            </div>
  
            <div class="container">
                <p>パスワード</p>
                <input type="password" v-model="inputValuePassword">
                <!-- この下の<p></p>はテキストボックスを中央に配置するために必要な疑似要素です -->
                <p></p>
            </div>
  
            <div class="message">
                <p class="red">{{ errorMessage }}&nbsp;</p>
            </div>
  
            <div>
                <button class="btn_standard" type="submit" v-on:click="logIn">ログインする</button>
            </div>
            <!-- ローディングアニメーション -->
            <div class="loading_animation_container">
                <div class="loading_animation" v-if="this.isLoading">
                    <LoadingAnimationComponent></LoadingAnimationComponent>
                </div>
            </div>
  
            <p>
              or Sign In with Google <br>
              <button @click="GoogleLogin" class="soctal-button">
                  <img alt="Google Logo" src="../assets/google_logo_icon.png">
              </button>
            </p>
  
            <div class="login_info_container">
                <div class="login_info">
                    <p>LoginIDとパスワードは以下の通りです</p>
                    <br>
                    <p>ID: hoge_taro_9999@gmail.com</p>
                    <p>Pass: hoge_taro_9999</p>
                    <br>
                    <p>ID: hoge_hanako_9999@gmail.com</p>
                    <p>Pass: hoge_hanako_9999</p>
                </div>
            </div>
            <SideBar />
            <URL_Script/>
        </main>
  
        <FooterComponent>
        </FooterComponent>
    </body>
  </template>
  
  <script>
  import FooterComponent from '../components/FooterComponent.vue'
  import LoadingAnimationComponent from '../components/LoadingAnimationComponent.vue'
  
  // Firebase関連のインポート
  import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
  import Firebase from "../firebase_settings/index.js"
  import SideBar from './SideBar.vue';
  import URL_Script from './URL_Script.vue';
  //import Gmail_hasu from './Gmail_hasu.vue';
  
  const auth = Firebase.auth
  const provider = new GoogleAuthProvider();
  
  export default {
  
    components: {
        FooterComponent,
        LoadingAnimationComponent,
        URL_Script,
        SideBar,
        //Gmail_hasu,
    },
  
    methods: {
    // Home画面へ遷移
    goToHome() {
        this.$router.push('/')
    },
  
    // ログイン
    logIn() {
        if (this.inputValueId === "" || this.inputValuePassword === "") {
            this.errorMessage = 'IDまたはパスワードが未入力です';
            return;
        }
  
        this.errorMessage = "";
        this.isLoading = true;
  
        const mId = this.inputValueId;
        const mPass = this.inputValuePassword;
        this.inputValuePassword = "";
  
        signInWithEmailAndPassword(auth, mId, mPass)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("ログイン成功: " + user.email);
                this.goToHome();
            })
            .catch((error) => {
                const errorCode = error.code;
                console.log('ログインエラー: ' + errorCode);
                this.JudgeErrorCode(errorCode);
                this.isLoading = false;
            });
    },
  
    // Googleでログイン
    GoogleLogin() {
        this.isLoading = true;
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                console.log("Googleログイン成功: " + user.email);
                this.goToHome();
            })
            .catch((error) => {
                console.error("Googleログインエラー: ", error);
                this.errorMessage = "Googleログインに失敗しました。";
                this.isLoading = false;
            });
    },
  
    JudgeErrorCode(mError) {
        const errorCode = String(mError);
        if (errorCode === 'auth/wrong-password' || errorCode === 'auth/invalid-email' || errorCode === 'auth/user-not-found') {
            this.errorMessage = "ログインに失敗しました。IDまたはパスワードが間違っています";
        } else {
            this.errorMessage = "ログインに失敗しました。予期せぬエラーが発生しました。";
        }
    },
    },
  
    data() {
        return {
            isLoading: false,
            errorMessage: '',
            inputValueId: "",
            inputValuePassword: "",
        };
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
  
  .container input {
    width: 400px;
  }
  
  .login_info {
    text-align: left;
    background-color: #efefef;
    padding: 20px 100px;
    border-radius: 20px;
  }
  
  .loading_animation_container {
    height: 15px;
    margin-top: 10px;
  }
  
  .soctal-button {
      width: 75px;
      background: white;
      padding: 10px;
      border-radius: 100%;
      box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
      outline: 0;
      border: 0;
  }
  .soctal-button:active {
      box-shadow: 0 2px 4px 0 rgba(0,0,0,0.1);
  }
  .soctal-button img {
      width: 100%;
  }
  </style>
  