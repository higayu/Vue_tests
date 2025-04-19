<template>
  <div class="modal" v-if="show">
    <div class="modal-content">
      <h3 class="modal-title">{{ editingProject ? 'プロジェクト編集' : '新規プロジェクト追加' }}</h3>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label>タイトル</label>
          <input v-model="formData.title" type="text" required>
        </div>
        <div class="form-group">
          <label>説明</label>
          <textarea v-model="formData.description" required></textarea>
        </div>
        <div class="form-group">
          <label>開始日</label>
          <input v-model="formData.startDate" type="date" required>
        </div>
        <div class="form-group">
          <label>終了予定日</label>
          <input v-model="formData.endDate" type="date">
        </div>
        <div class="form-group">
          <label>終了日</label>
          <input v-model="formData.completedDate" type="date">
        </div>
        <div class="form-group">
          <label>ステータス</label>
          <select v-model="formData.status" required>
            <option value="active">進行中</option>
            <option value="pending">保留中</option>
            <option value="completed">完了</option>
          </select>
        </div>
        <div class="form-actions">
          <button type="button" @click="handleCancel">キャンセル</button>
          <button type="submit" :disabled="isSaving">{{ isSaving ? '保存中...' : '保存' }}</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue';

export default {
  name: 'ProjectModal',
  props: {
    show: {
      type: Boolean,
      required: true
    },
    editingProject: {
      type: Object,
      default: null
    }
  },
  emits: ['submit', 'cancel'],
  setup(props, { emit }) {
    const formData = ref({
      title: '',
      description: '',
      startDate: '',
      endDate: '',
      completedDate: '',
      status: 'active'
    });

    const isSaving = ref(false);

    watch(() => props.editingProject, (newVal) => {
      if (newVal) {
        formData.value = { ...newVal };
      } else {
        formData.value = {
          title: '',
          description: '',
          startDate: '',
          endDate: '',
          completedDate: '',
          status: 'active'
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
  max-width: 400px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 12px;
}

.form-group label {
  display: block;
  margin-bottom: 4px;
  font-size: 0.9rem;
  font-weight: bold;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 6px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 0.9rem;
}

.form-group textarea {
  min-height: 80px;
  resize: vertical;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 16px;
}

.form-actions button {
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
}

.form-actions button[type="button"] {
  background-color: #f5f5f5;
  border: 1px solid #d9d9d9;
}

.form-actions button[type="submit"] {
  background-color: #1890ff;
  color: white;
  border: none;
}

.form-actions button[type="submit"]:hover {
  background-color: #40a9ff;
}

.form-actions button[type="submit"]:disabled {
  background-color: #bfbfbf;
  cursor: not-allowed;
}
</style> 