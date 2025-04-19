<template>
  <div class="modal" v-if="show">
    <div class="modal-content">
      <h3 class="modal-title">{{ editingMemo ? 'メモ編集' : '新規メモ追加' }}</h3>
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
          <textarea
            v-model="formData.content"
            class="w-full p-2 border rounded"
            rows="3"
            placeholder="メモの内容を入力してください"
            required
          ></textarea>
        </div>

        <div class="form-actions">
          <button
            type="button"
            @click="handleCancel"
            class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            キャンセル
          </button>
          <button
            type="submit"
            :disabled="isSaving"
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {{ isSaving ? '保存中...' : '保存' }}
          </button>
        </div>
      </form>
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
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 20px;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style> 