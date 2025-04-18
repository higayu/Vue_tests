// router/index.js
import { createRouter, createWebHistory, createWebHashHistory } from "vue-router";
// import PersonalRecordForm from "../components/PersonalRecordForm.vue";
import HeaderBar from "../layout/HeaderBar.vue";
// import NavBar1 from "../layout/NavBar1.vue";
// import NavBar2 from "../layout/NavBar2.vue";
import NavBar3 from "../layout/NavBar3.vue";

import UserList from "../pages/Touroku.vue";
import UserSchedule from "../pages/UserSchedule.vue";
import Nitijo from "../pages/Nitijo.vue";
import nissi from "../pages/Nissi.vue";
import kiroku from "../pages/Kiroku.vue";
import SideBar from "../pages/SideBar.vue";
import SideBar_kanri from "../pages/SideBar_kanri.vue";
import { useShareStore } from "../stores/useShareData"; // Piniaストアをインポート
import { useSelectedRecordStore } from '../stores/selectedRecord'; // 新しいストアをインポート
import { usePrintDataStore } from '../stores/printData';
// import List from "@/components/List.vue"; // 利用者一覧
// import Kiroku from "@/components/Kiroku.vue"; // 個人記録

// Define routes
const routes = [
  {
    path: '/',
    name: "UserSchedule",
    components: {
      header: HeaderBar,
      navbar: NavBar3,
      main: UserSchedule,
    }
  },
  {
    path: '/touroku',
    name: "UserList",
    components: {
      header: HeaderBar,
      navbar: NavBar3,
      main: UserList,
    }
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
    meta: { checkServiceStatus: true } // このルートではサービスステータスをチェックするフラグを追加
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
    // props: (route) => ({ queryParams: route.query }),
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
  },


  // { path: "/list", name: "List", component: List },  // 追加
  // { path: "/kiroku", name: "Kiroku", component: Kiroku },  // 追加
];

const router = createRouter({
  history: createWebHistory(),
  //history: createWebHashHistory(), // ← ここを変更
  routes,
});

//-----------------------------------------------------------------------------------------------//

export default router;
