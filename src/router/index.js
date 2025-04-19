// router/index.js
import { createRouter, createWebHistory, createWebHashHistory } from "vue-router";
// import PersonalRecordForm from "../components/PersonalRecordForm.vue";
import HeaderBar from "../layout/HeaderBar.vue";
import NavBar3 from "../layout/NavBar3.vue";
import DashBoard from "../pages/DashBoard.vue";
import SideBar from "../sidebars/SideBar.vue";
import ProjectManager from "../pages/ProjectManager.vue";
import MemoView from "../views/MemoView.vue";
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
      sidebar: SideBar,
    },
    meta: { requiresAuth: true } // 認証が必要なページ
  },
  {
    path: '/project-manager',
    name: "ProjectManager",
    components: {
      header: HeaderBar,
      navbar: NavBar3,
      main: ProjectManager,
      sidebar: SideBar,
    },
    meta: { requiresAuth: true } // 認証が必要なページ
  },
  {
    path: '/memo/:id',
    name: "MemoView",
    components: {
      header: HeaderBar,
      navbar: NavBar3,
      main: MemoView,
      sidebar: SideBar,
    },
    meta: { requiresAuth: true }
  },
];

const router = createRouter({
  history: createWebHistory(),
  //history: createWebHashHistory(), // ← ここを変更
  routes,
});

//-----------------------------------------------------------------------------------------------//

export default router;
