<template>
  <div style="background-color: violet;">
    <h1>Users</h1>
    <ul>
      <li v-for="user in users" :key="user.id">{{ user.name }}</li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { db } from '../firebase_settings/index.js'; // firebase.js をインポート
import { collection, getDocs } from "firebase/firestore";

const users = ref([]);

const fetchUsers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    users.value = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log("Fetched users:", users.value);
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

// コンポーネントがマウントされたときにデータを取得
onMounted(fetchUsers);
</script>
