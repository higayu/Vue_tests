<template>
  <div class="bg-white p-6 rounded-lg shadow">
    <div class="flex justify-between items-center mb-6">
      <h3 class="text-xl font-semibold">メモ一覧</h3>
      <button
        @click="showAddMemoModal = true"
        class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-200"
      >
        新規メモ追加
      </button>
    </div>

    <!-- 検索・フィルター -->
    <div class="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="relative">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="メモを検索..."
          class="w-full p-2 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <svg
          class="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <div>
        <select
          v-model="selectedProject"
          class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">すべてのプロジェクト</option>
          <option
            v-for="project in projects"
            :key="project.id"
            :value="project.id"
          >
            {{ project.title }}
          </option>
        </select>
      </div>
      <div>
        <select
          v-model="sortOrder"
          class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="newest">新しい順</option>
          <option value="oldest">古い順</option>
          <option value="title">タイトル順</option>
        </select>
      </div>
    </div>

    <!-- メモ一覧 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="memo in filteredMemos"
        :key="memo.id"
        class="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow duration-200 cursor-pointer"
        @click="selectMemo(memo)"
      >
        <div class="flex flex-col h-full">
          <h4 class="font-bold text-lg text-gray-800 mb-2 truncate">{{ memo.title }}</h4>
          <div class="flex items-center text-sm text-gray-500 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            {{ getProjectTitle(memo.projectId) }}
          </div>
          <div class="flex-grow">
            <p class="text-gray-600 line-clamp-3">{{ memo.content }}</p>
          </div>
          <div class="mt-2 text-xs text-gray-400">
            {{ formatDate(memo.updated_at) }}
          </div>
        </div>
      </div>
    </div>

    <!-- メモが存在しない場合 -->
    <div v-if="filteredMemos.length === 0" class="text-center py-8 text-gray-500">
      メモがありません
    </div>

    <!-- メモモーダル -->
    <MemoModal
      :show="showAddMemoModal"
      :editing-memo="editingMemo"
      :projects="projects"
      @submit="handleMemoSubmit"
      @cancel="showAddMemoModal = false"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { db } from '../firebase_settings/index.js';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import MemoModal from '../Modals/MemoModal.vue';

const router = useRouter();
const memos = ref([]);
const projects = ref([]);
const showAddMemoModal = ref(false);
const editingMemo = ref(null);
const searchQuery = ref('');
const selectedProject = ref('');
const sortOrder = ref('newest');

// プロジェクト一覧の取得
const fetchProjects = async () => {
  try {
    const projectsRef = collection(db, 'projects');
    const q = query(projectsRef, orderBy('title'));
    const querySnapshot = await getDocs(q);
    
    projects.value = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('プロジェクトの取得に失敗しました:', error);
  }
};

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

// フィルタリングとソート
const filteredMemos = computed(() => {
  let result = [...memos.value];

  // 検索クエリでフィルタリング
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(memo => 
      memo.title.toLowerCase().includes(query) ||
      memo.content.toLowerCase().includes(query)
    );
  }

  // プロジェクトでフィルタリング
  if (selectedProject.value) {
    result = result.filter(memo => memo.projectId === selectedProject.value);
  }

  // ソート
  switch (sortOrder.value) {
    case 'newest':
      result.sort((a, b) => b.updated_at.toDate() - a.updated_at.toDate());
      break;
    case 'oldest':
      result.sort((a, b) => a.updated_at.toDate() - b.updated_at.toDate());
      break;
    case 'title':
      result.sort((a, b) => a.title.localeCompare(b.title));
      break;
  }

  return result;
});

// メモの追加・更新処理
const handleMemoSubmit = async (memoData) => {
  try {
    if (editingMemo.value) {
      // 更新処理
      const memoRef = doc(db, 'memos', editingMemo.value.id);
      await updateDoc(memoRef, {
        ...memoData,
        updated_at: new Date()
      });
    } else {
      // 新規追加処理
      const memosRef = collection(db, 'memos');
      await addDoc(memosRef, {
        ...memoData,
        created_at: new Date(),
        updated_at: new Date()
      });
    }

    await fetchMemos();
    showAddMemoModal.value = false;
    editingMemo.value = null;
  } catch (error) {
    console.error('メモの保存に失敗しました:', error);
  }
};

// メモの選択
const selectMemo = (memo) => {
  router.push(`/memo/${memo.id}`);
};

// プロジェクト名の取得
const getProjectTitle = (projectId) => {
  if (!projectId) return '未設定';
  const project = projects.value.find(p => p.id === projectId);
  return project ? project.title : '不明なプロジェクト';
};

// 日付のフォーマット
const formatDate = (timestamp) => {
  if (!timestamp) return '';
  const date = timestamp.toDate();
  return date.toLocaleString('ja-JP');
};

onMounted(() => {
  fetchProjects();
  fetchMemos();
});
</script>
