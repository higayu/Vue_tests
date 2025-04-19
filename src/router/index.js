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
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Firebase from "../firebase_settings/index.js";

// Define routes
const routes = [
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
];

const router = createRouter({
  history: createWebHistory(),
  //history: createWebHashHistory(), // ← ここを変更
  routes,
});

//-----------------------------------------------------------------------------------------------//

export default router;
