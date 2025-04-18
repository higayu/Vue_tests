// router/index.js
import { createRouter, createWebHistory, createWebHashHistory } from "vue-router";
// import PersonalRecordForm from "../components/PersonalRecordForm.vue";
import HeaderBar from "../layout/HeaderBar.vue";
// import NavBar1 from "../layout/NavBar1.vue";
// import NavBar2 from "../layout/NavBar2.vue";
import NavBar3 from "../layout/NavBar3.vue";

import UserList from "../pages/Touroku.vue";
import DashBoard from "../pages/DashBoard.vue";
import Nitijo from "../pages/Nitijo.vue";
import nissi from "../pages/Nissi.vue";
import kiroku from "../pages/Kiroku.vue";
import SideBar from "../pages/SideBar.vue";
import SideBar_kanri from "../pages/SideBar_kanri.vue";
import LoginView from "../views/LoginView.vue"; // ログインページをインポート
import { useShareStore } from "../stores/useShareData"; // Piniaストアをインポート
import { useSelectedRecordStore } from '../stores/selectedRecord'; // 新しいストアをインポート
import { usePrintDataStore } from '../stores/printData';
// 画面遷移前にログイン済みかを判定するメソッドに必要なFirebaseのメソッド
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Firebase from "../firebase_settings/index.js";
// import List from "@/components/List.vue"; // 利用者一覧
// import Kiroku from "@/components/Kiroku.vue"; // 個人記録

// Define routes
const routes = [
  {
    path: '/login',
    name: "Login",
    component: LoginView,
    meta: { requiresAuth: false } // 認証不要のページ
  },
  {
    path: '/',
    name: "DashBoard",
    components: {
      header: HeaderBar,
      navbar: NavBar3,
      main: DashBoard,
    },
    meta: { requiresAuth: true } // 認証が必要なページ
  },
  {
    path: '/touroku',
    name: "UserList",
    components: {
      header: HeaderBar,
      navbar: NavBar3,
      main: UserList,
    },
    meta: { requiresAuth: true }
  },
  {
    path: "/nitijo/:id",
    name: "Nitijo",
    components: {
      header: HeaderBar,
      navbar: NavBar3,
      main: Nitijo,
    },
    props: true,
    meta: { 
      requiresAuth: true,
      checkServiceStatus: true 
    }
  },
  {
    path: "/nissi",
    name: "Kanri",
    components: {
      header: HeaderBar,  
      navbar: NavBar3,
      main: nissi,
      sidebar: SideBar_kanri,
    },
    meta: { requiresAuth: true }
  },
  {
    path: "/kiroku",
    name: "Kiroku",
    components: {
      header: HeaderBar,
      navbar: NavBar3,
      main: kiroku,
      sidebar: SideBar
    },
    meta: { requiresAuth: true }
  },


  // { path: "/list", name: "List", component: List },  // 追加
  // { path: "/kiroku", name: "Kiroku", component: Kiroku },  // 追加
];

const router = createRouter({
  history: createWebHistory(),
  //history: createWebHashHistory(), // ← ここを変更
  routes,
});

// ナビゲーションガード
router.beforeEach(async (to, from, next) => {
  const auth = getAuth();
  const user = auth.currentUser;
  
  // 認証が必要なページかどうかを確認
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  
  if (requiresAuth && !user) {
    // 認証が必要なページに未ログインでアクセスした場合
    next('/login');
  } else if (to.path === '/login' && user) {
    // ログイン済みでログインページにアクセスした場合
    next('/');
  } else {
    // その他の場合は通常通り遷移
    next();
  }
});

//-----------------------------------------------------------------------------------------------//

export default router;
