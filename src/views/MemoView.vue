<template>
  <div class="bg-white p-6 rounded-lg shadow">
    <div class="flex justify-between items-center mb-6">
      <h3 class="text-xl font-semibold">{{ memo?.title }}</h3>
      <div class="flex space-x-2">
        <button
          @click="handleEdit"
          class="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors duration-200"
        >
          編集
        </button>
        <button
          @click="handleDelete"
          class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200"
        >
          削除
        </button>
      </div>
    </div>

    <!-- メモ情報 -->
    <div class="mb-6 flex items-center text-sm text-gray-500">
      <span class="flex items-center mr-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
        {{ getProjectTitle(memo?.projectId) }}
      </span>
      <span class="flex items-center mr-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        作成: {{ formatDate(memo?.created_at) }}
      </span>
      <span class="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
        更新: {{ formatDate(memo?.updated_at) }}
      </span>
    </div>

    <!-- メモ内容 -->
    <div class="prose prose-lg max-w-none bg-gray-50 p-6 rounded-lg">
      <div v-html="renderedContent"></div>
    </div>

    <!-- メモモーダル -->
    <MemoModal
      :show="showEditModal"
      :editing-memo="memo"
      :projects="projects"
      @submit="handleMemoSubmit"
      @cancel="showEditModal = false"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { db } from '../firebase_settings/index.js';
import { collection, getDocs, getDoc, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { marked } from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import MemoModal from '../Modals/MemoModal.vue';

const route = useRoute();
const router = useRouter();
const memo = ref(null);
const projects = ref([]);
const showEditModal = ref(false);

// markedの設定
marked.setOptions({
  highlight: function(code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang }).value;
    }
    return hljs.highlightAuto(code).value;
  }
});

// マークダウンをHTMLに変換
const renderedContent = computed(() => {
  return marked(memo.value?.content || '');
});

// メモの取得
const fetchMemo = async () => {
  try {
    const memoRef = doc(db, 'memos', route.params.id);
    const memoSnap = await getDoc(memoRef);
    
    if (memoSnap.exists()) {
      memo.value = {
        id: memoSnap.id,
        ...memoSnap.data()
      };
    } else {
      router.push('/memo-manager');
    }
  } catch (error) {
    console.error('メモの取得に失敗しました:', error);
  }
};

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

// メモの更新処理
const handleMemoSubmit = async (memoData) => {
  try {
    const memoRef = doc(db, 'memos', memo.value.id);
    await updateDoc(memoRef, {
      ...memoData,
      updated_at: new Date()
    });
    
    await fetchMemo();
    showEditModal.value = false;
  } catch (error) {
    console.error('メモの更新に失敗しました:', error);
  }
};

// メモの編集
const handleEdit = () => {
  showEditModal.value = true;
};

// メモの削除
const handleDelete = async () => {
  if (confirm('このメモを削除してもよろしいですか？')) {
    try {
      const memoRef = doc(db, 'memos', memo.value.id);
      await deleteDoc(memoRef);
      router.push('/memo-manager');
    } catch (error) {
      console.error('メモの削除に失敗しました:', error);
    }
  }
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
  fetchMemo();
});
</script>

<style>
/* Tailwind CSSのデフォルトスタイルを強制的に上書き */
.items-center a {
  color: #0366d6 !important;
  text-decoration: none !important;
}

.items-center a:hover {
  color: #0056b3 !important;
  text-decoration: underline !important;
}

/* URLのスタイルを特別に設定 */
.items-center a[href^="http"] {
  color: #0366d6 !important;
  text-decoration: none !important;
  border-bottom: 1px solid #0366d6 !important;
  padding-bottom: 1px !important;
}

.items-center a[href^="http"]:hover {
  color: #0056b3 !important;
  border-bottom-color: #0056b3 !important;
  text-decoration: none !important;
}
</style>

<style scoped>
/* Qiita風のマークダウンスタイル */
.prose {
  color: #333;
  line-height: 1.8;
  font-size: 16px;
}

.prose h1 {
  font-size: 2em;
  border-bottom: 1px solid #ddd;
  padding-bottom: 0.3em;
  margin-top: 1.5em;
  margin-bottom: 1em;
}

.prose h2 {
  font-size: 1.5em;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.3em;
  margin-top: 1.5em;
  margin-bottom: 1em;
}

.prose h3 {
  font-size: 1.25em;
  margin-top: 1.5em;
  margin-bottom: 1em;
}

.prose p {
  margin-top: 1em;
  margin-bottom: 1em;
}

.prose ul, .prose ol {
  margin-top: 1em;
  margin-bottom: 1em;
  padding-left: 1.5em;
}

.prose li {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}

.prose code {
  background-color: #f7f7f7;
  padding: 0.2em 0.4em;
  border-radius: 3px;
  font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace;
  font-size: 0.9em;
  color: #e83e8c;
}

.prose pre {
  background-color: #f7f7f7;
  border-radius: 3px;
  padding: 16px;
  overflow-x: auto;
  margin-top: 1em;
  margin-bottom: 1em;
}

.prose pre code {
  background-color: transparent;
  padding: 0;
  color: #333;
  font-size: 0.9em;
}

/* Tailwind CSSのデフォルトスタイルをコメントアウト */
/* .prose a {
    color: inherit;
    text-decoration: inherit;
} */

/* 既存のスタイルは維持 */
.prose a {
  color: #0366d6 !important;
  text-decoration: none !important;
  transition: color 0.2s ease;
  cursor: pointer;
}

.prose a:hover {
  color: #0056b3 !important;
  text-decoration: underline !important;
}

.prose a[href^="http"] {
  color: #0366d6 !important;
  text-decoration: none !important;
  border-bottom: 1px solid #0366d6 !important;
  padding-bottom: 1px !important;
  transition: all 0.2s ease;
  cursor: pointer;
}

.prose a[href^="http"]:hover {
  color: #0056b3 !important;
  border-bottom-color: #0056b3 !important;
  text-decoration: none !important;
}

.prose blockquote {
  border-left: 4px solid #dfe2e5;
  padding: 0 1em;
  color: #6a737d;
  margin-left: 0;
  margin-right: 0;
}

.prose table {
  border-collapse: collapse;
  width: 100%;
  margin-top: 1em;
  margin-bottom: 1em;
}

.prose th, .prose td {
  border: 1px solid #dfe2e5;
  padding: 6px 13px;
}

.prose th {
  background-color: #f6f8fa;
}

.prose img {
  max-width: 100%;
  height: auto;
  margin-top: 1em;
  margin-bottom: 1em;
}

.prose hr {
  height: 0.25em;
  padding: 0;
  margin: 24px 0;
  background-color: #e1e4e8;
  border: 0;
}
</style>