<template>
  <div class="bg-white p-6 rounded-lg shadow mb-4 hover:shadow-md transition-shadow duration-200">
    <div class="flex flex-col space-y-4">
      <!-- ヘッダー部分 -->
      <div class="flex justify-between items-start">
        <div class="flex-1">
          <h4 class="font-bold text-xl text-gray-800 mb-2">{{ memo.title }}</h4>
          <div class="flex items-center space-x-2 text-sm text-gray-500">
            <span class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              {{ getProjectTitle(memo.projectId) }}
            </span>
          </div>
        </div>
        <div class="flex space-x-2">
          <button
            @click="$emit('edit', memo)"
            class="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors duration-200"
          >
            編集
          </button>
          <button
            @click="$emit('delete', memo.id)"
            class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200"
          >
            削除
          </button>
        </div>
      </div>

      <!-- メモ内容 -->
      <div class="bg-gray-50 p-4 rounded-lg">
        <div class="prose prose-sm max-w-none" v-html="renderedContent"></div>
      </div>

      <!-- フッター部分（日付情報） -->
      <div class="flex justify-between text-sm text-gray-500 border-t pt-3">
        <div class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>作成: {{ formatDate(memo.created_at) }}</span>
        </div>
        <div class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          <span>更新: {{ formatDate(memo.updated_at) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { marked } from 'marked';

const props = defineProps({
  memo: {
    type: Object,
    required: true
  },
  projects: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['edit', 'delete']);

// マークダウンをHTMLに変換
const renderedContent = computed(() => {
  return marked(props.memo.content || '');
});

const getProjectTitle = (projectId) => {
  if (!projectId) return '未設定';
  const project = props.projects.find(p => p.id === projectId);
  return project ? project.title : '不明なプロジェクト';
};

const formatDate = (timestamp) => {
  if (!timestamp) return '';
  const date = timestamp.toDate();
  return date.toLocaleString('ja-JP');
};
</script>

<style scoped>
/* マークダウンのスタイルを追加 */
.prose {
  color: #374151;
}

.prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 {
  color: #111827;
  font-weight: 600;
  margin-top: 1.5em;
  margin-bottom: 0.5em;
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
  background-color: #f3f4f6;
  padding: 0.2em 0.4em;
  border-radius: 0.25em;
  font-family: monospace;
}

.prose pre {
  background-color: #1f2937;
  color: #f3f4f6;
  padding: 1em;
  border-radius: 0.5em;
  overflow-x: auto;
  margin-top: 1em;
  margin-bottom: 1em;
}

.prose a {
  color: #3b82f6;
  text-decoration: underline;
}

.prose blockquote {
  border-left: 4px solid #e5e7eb;
  padding-left: 1em;
  margin-left: 0;
  margin-right: 0;
  color: #6b7280;
}
</style>
