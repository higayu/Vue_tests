<template>
    <body>
      <header>
        <div class="title">Vue Firebase Example</div>
      </header>
  
      <main>
        <div class="container">
          <p>ID(メールアドレス)</p>
          <input type="email" v-model="inputValueId" />
          <p></p>
        </div>
  
        <div class="container">
          <p>パスワード</p>
          <input type="password" v-model="inputValuePassword" />
          <p></p>
        </div>
  
        <div class="message">
          <p class="red">{{ errorMessage }}&nbsp;</p>
        </div>
  
        <div>
          <button class="btn_standard" type="submit" v-on:click="logIn">ログインする</button>
        </div>
  
        <div class="loading_animation_container">
          <div class="loading_animation" v-if="isLoading">
            <LoadingAnimationComponent />
          </div>
        </div>
        <SideBar />
        <URL_Script />
        <img_upload />
      </main>
  
      <FooterComponent />
    </body>
  </template>
  
  <script>
  import FooterComponent from "../components/FooterComponent.vue";
  import LoadingAnimationComponent from "../components/LoadingAnimationComponent.vue";
  import { signInWithEmailAndPassword } from "firebase/auth";
  import { auth } from "../firebase_settings/index.js";
  import SideBar from "./SideBar.vue";
  import URL_Script from "./URL_Script.vue";
  import img_upload from "./img_upload.vue";
  
  export default {
    components: {
      FooterComponent,
      LoadingAnimationComponent,
      URL_Script,
      SideBar,
      img_upload,
    },
    methods: {
      goToHome() {
        this.$router.push("/");
      },
      logIn() {
        if (!this.inputValueId || !this.inputValuePassword) {
          this.errorMessage = "IDまたはパスワードが未入力です";
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
            console.log("ログイン成功 " + user.email);
            this.goToHome();
          })
          .catch((error) => {
            const errorCode = error.code;
            console.log(`ログインエラー: ${errorCode}`);
            this.JudgeErrorCode(errorCode);
  
            this.isLoading = false;
          });
      },
      JudgeErrorCode(errorCode) {
        if (
          ["auth/wrong-password", "auth/invalid-email", "auth/user-not-found"].includes(
            errorCode
          )
        ) {
          this.errorMessage = "ログインに失敗しました。IDまたはパスワードが間違っています";
        } else {
          this.errorMessage = "ログインに失敗しました。予期せぬエラーが発生しました。";
        }
      },
    },
    data() {
      return {
        isLoading: false,
        errorMessage: "",
        inputValueId: "",
        inputValuePassword: "",
      };
    },
  };
  </script>
  
  <style scoped>
  header {
    min-height: 120px;
  }
  
  header .title {
    font-size: 40px;
    padding: 20px 0 0;
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
  </style>
  