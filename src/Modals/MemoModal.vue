<template>
  <div class="modal" v-if="show">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title">{{ editingMemo ? 'メモ編集' : '新規メモ追加' }}</h3>
      </div>
      <div class="modal-body">
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label>タイトル</label>
            <input
              v-model="formData.title"
              type="text"
              class="w-full p-2 border rounded"
              placeholder="メモのタイトルを入力してください"
              required
            />
          </div>

          <div class="form-group">
            <label>プロジェクト</label>
            <select
              v-model="formData.projectId"
              class="w-full p-2 border rounded"
            >
              <option value="">プロジェクトを選択</option>
              <option
                v-for="project in projects"
                :key="project.id"
                :value="project.id"
              >
                {{ project.title }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label>内容</label>
            <div class="format-toolbar mb-2">
              <div class="format-group">
                <button
                  type="button"
                  @click="formatText('bold')"
                  class="format-btn"
                  title="太字"
                >
                  <strong>B</strong>
                </button>
                <button
                  type="button"
                  @click="formatText('red')"
                  class="format-btn text-red"
                  title="赤文字"
                >
                  A
                </button>
                <button
                  type="button"
                  @click="formatText('underline')"
                  class="format-btn"
                  title="下線"
                >
                  <u>U</u>
                </button>
                <button
                  type="button"
                  @click="formatText('red-bold')"
                  class="format-btn text-red"
                  title="赤太字"
                >
                  <strong>A</strong>
                </button>
              </div>
              <div class="format-group">
                <button
                  type="button"
                  @click="insertCodeBlock"
                  class="format-btn"
                  title="コードブロック"
                >
                  <code>{ }</code>
                </button>
                <button
                  type="button"
                  @click="insertLink"
                  class="format-btn link-btn"
                  title="リンク"
                >
                  <span class="link-icon">🔗</span>
                  <span class="link-text">URL</span>
                </button>
              </div>
            </div>
            <div class="textarea-container">
              <textarea
                ref="contentTextarea"
                v-model="formData.content"
                class="w-full p-2 border rounded"
                placeholder="メモの内容を入力してください"
                required
                @select="handleTextSelect"
              ></textarea>
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button
          type="button"
          @click="handleCancel"
          class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          キャンセル
        </button>
        <button
          type="submit"
          @click="handleSubmit"
          :disabled="isSaving"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {{ isSaving ? '保存中...' : '保存' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue';

export default {
  name: 'MemoModal',
  props: {
    show: {
      type: Boolean,
      required: true
    },
    editingMemo: {
      type: Object,
      default: null
    },
    projects: {
      type: Array,
      required: true
    }
  },
  emits: ['submit', 'cancel'],
  setup(props, { emit }) {
    const formData = ref({
      title: '',
      content: '',
      projectId: ''
    });

    const isSaving = ref(false);
    const contentTextarea = ref(null);
    const selectedText = ref('');

    watch(() => props.editingMemo, (newVal) => {
      if (newVal) {
        formData.value = { ...newVal };
      } else {
        formData.value = {
          title: '',
          content: '',
          projectId: ''
        };
      }
    }, { immediate: true });

    const handleTextSelect = (event) => {
      const textarea = event.target;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      selectedText.value = formData.value.content.substring(start, end);
    };

    const formatText = (format) => {
      if (!selectedText.value) return;

      const textarea = contentTextarea.value;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const before = formData.value.content.substring(0, start);
      const after = formData.value.content.substring(end);

      let formattedText = selectedText.value;
      switch (format) {
        case 'bold':
          formattedText = `**${selectedText.value}**`;
          break;
        case 'red':
          formattedText = `<span class="text-red">${selectedText.value}</span>`;
          break;
        case 'underline':
          formattedText = `<u>${selectedText.value}</u>`;
          break;
        case 'red-bold':
          formattedText = `<span class="text-red-bold">${selectedText.value}</span>`;
          break;
      }

      formData.value.content = before + formattedText + after;
      selectedText.value = '';
    };

    const insertCodeBlock = () => {
      const textarea = contentTextarea.value;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const before = formData.value.content.substring(0, start);
      const after = formData.value.content.substring(end);
      const selectedContent = formData.value.content.substring(start, end);

      const codeBlock = `<div class="code-frame" data-lang="text">
<div class="code-lang"><span class="bold">コード</span></div>
<div class="code-copy"><div class="code-copy__message" style="display: none;">Copied!</div><button class="code-copy__button" style="display: none;"><span class="fa fa-fw fa-clipboard"></span></button></div>
<div class="highlight"><pre><code>${selectedContent || 'ここにコードを入力してください'}</code></pre></div>
</div>`;

      formData.value.content = before + codeBlock + after;
      selectedText.value = '';
    };

    const insertLink = () => {
      const textarea = contentTextarea.value;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const before = formData.value.content.substring(0, start);
      const after = formData.value.content.substring(end);
      const selectedContent = formData.value.content.substring(start, end);

      const url = prompt('URLを入力してください:', 'https://');
      if (url) {
        const linkText = selectedContent || 'リンクテキスト';
        const link = `<a href="${url}" target="_blank" rel="noopener noreferrer">${linkText}</a>`;
        formData.value.content = before + link + after;
      }
      selectedText.value = '';
    };

    const handleSubmit = () => {
      isSaving.value = true;
      emit('submit', { ...formData.value });
      isSaving.value = false;
    };

    const handleCancel = () => {
      emit('cancel');
    };

    return {
      formData,
      isSaving,
      contentTextarea,
      selectedText,
      handleTextSelect,
      formatText,
      insertCodeBlock,
      insertLink,
      handleSubmit,
      handleCancel
    };
  }
}
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  border-radius: 8px;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
}

.modal-header {
  padding: 20px;
  border-bottom: 1px solid #e2e8f0;
}

.modal-body {
  padding: 20px;
  overflow-y: auto;
  flex: 1;
}

.modal-footer {
  padding: 20px;
  border-top: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  gap: 8px;
  background-color: white;
}

.modal-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

.format-toolbar {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  padding: 4px;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  background-color: #f8fafc;
}

.format-group {
  display: flex;
  gap: 4px;
}

.format-btn {
  padding: 4px 8px;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
  font-size: 14px;
  min-width: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.format-btn:hover {
  background-color: #f1f5f9;
}

.format-btn.text-red {
  color: #ff0000;
}

.textarea-container {
  position: relative;
  height: 400px;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
}

textarea {
  width: 100%;
  height: 100%;
  padding: 12px;
  border: none;
  resize: none;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
  font-size: 16px;
  line-height: 1.6;
}

textarea:focus {
  outline: none;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.format-btn.link-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  color: #0366d6;
  font-weight: 500;
  transition: all 0.2s ease;
}

.format-btn.link-btn:hover {
  background-color: #e3f2fd;
  border-color: #0366d6;
}

.link-icon {
  font-size: 16px;
}

.link-text {
  font-size: 14px;
}
</style> 