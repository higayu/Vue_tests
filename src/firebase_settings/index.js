// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // getAuthを正しくインポート
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGsijJNUboJEwwhH7Zj3CIQzfzCGP5sHs",
  authDomain: "vue-firebase-example-cf684.firebaseapp.com",
  projectId: "vue-firebase-example-cf684",
  storageBucket: "vue-firebase-example-cf684.firebasestorage.app",
  messagingSenderId: "1035208541092",
  appId: "1:1035208541092:web:ae61b13967c1dbe29bf731",
  measurementId: "G-796CPEPGV9"
};

// Initialize Firebase// Firebaseの初期化
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// 各サービスのインスタンス
const db = getFirestore(app);
const auth = getAuth(app);

// 必要なインスタンスをエクスポート
export default { analytics, db, auth };