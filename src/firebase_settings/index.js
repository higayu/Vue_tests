// Firebase SDKから必要なモジュールをインポート
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Firebaseの設定情報
const firebaseConfig = {
  apiKey: "AIzaSyCGsijJNUboJEwwhH7Zj3CIQzfzCGP5sHs",
  authDomain: "vue-firebase-example-cf684.firebaseapp.com",
  projectId: "vue-firebase-example-cf684",
  storageBucket: "vue-firebase-example-cf684.appspot.com",
  messagingSenderId: "1035208541092",
  appId: "1:1035208541092:web:ae61b13967c1dbe29bf731",
  measurementId: "G-796CPEPGV9",
};

// Firebaseの初期化
const app = initializeApp(firebaseConfig);

// 各サービスの初期化
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app); // Storageの初期化

// 名前付きエクスポート
export { app, analytics, db, auth, storage };
export default { app, analytics, db, auth, storage }; // デフォルトエクスポートを追加