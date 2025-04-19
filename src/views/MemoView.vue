<template>
  <div class="bg-white p-6 rounded-lg shadow">
    <h3 class="text-xl font-semibold mb-4">メモ</h3>
    
    <!-- 新規メモ作成フォーム -->
    <div class="mb-6">
      <textarea
        v-model="newMemoContent"
        class="w-full p-2 border rounded"
        rows="3"
        placeholder="新しいメモを入力してください"
      ></textarea>
      <button
        @click="createMemo"
        class="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        :disabled="!newMemoContent.trim()"
      >
        メモを追加
      </button>
    </div>

    <!-- メモ一覧 -->
    <div v-if="memos.length > 0">
      <MemoItem
        v-for="memo in memos"
        :key="memo.id"
        :memo="memo"
        @update="handleUpdate"
        @delete="handleDelete"
      />
    </div>
    <p v-else class="text-gray-500">メモがありません</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { db } from '../firebase_settings/index.js';
import { collection, getDocs, addDoc, query, orderBy } from 'firebase/firestore';
import MemoItem from '../items/MemoItem.vue';

const memos = ref([]);
const newMemoContent = ref('');

// メモの取得
const fetchMemos = async () => {
  try {
    const memosRef = collection(db, 'memos');
    const q = query(memosRef, orderBy('created_at', 'desc'));
    const querySnapshot = await getDocs(q);
    
    memos.value = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('メモの取得に失敗しました:', error);
  }
};

// 新規メモ作成
const createMemo = async () => {
  if (!newMemoContent.value.trim()) return;
  
  try {
    const memosRef = collection(db, 'memos');
    await addDoc(memosRef, {
      content: newMemoContent.value,
      created_at: new Date(),
      updated_at: new Date()
    });
    
    newMemoContent.value = '';
    await fetchMemos();
  } catch (error) {
    console.error('メモの作成に失敗しました:', error);
  }
};

// メモの更新処理
const handleUpdate = (updatedMemo) => {
  const index = memos.value.findIndex(memo => memo.id === updatedMemo.id);
  if (index !== -1) {
    memos.value[index] = updatedMemo;
  }
};

// メモの削除処理
const handleDelete = (memoId) => {
  memos.value = memos.value.filter(memo => memo.id !== memoId);
};

onMounted(() => {
  fetchMemos();
});
</script>
