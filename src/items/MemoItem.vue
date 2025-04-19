<template>
  <div class="bg-white p-4 rounded-lg shadow mb-4">
    <div v-if="isEditing" class="space-y-4">
      <textarea
        v-model="editedContent"
        class="w-full p-2 border rounded"
        rows="3"
        placeholder="メモを入力してください"
      ></textarea>
      <div class="flex justify-end space-x-2">
        <button
          @click="saveMemo"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          保存
        </button>
        <button
          @click="cancelEdit"
          class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          キャンセル
        </button>
      </div>
    </div>
    <div v-else>
      <div class="flex justify-between items-start">
        <p class="text-gray-700">{{ memo.content }}</p>
        <div class="flex space-x-2">
          <button
            @click="startEdit"
            class="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            編集
          </button>
          <button
            @click="deleteMemo"
            class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            削除
          </button>
        </div>
      </div>
      <div class="text-sm text-gray-500 mt-2">
        {{ formatDate(memo.created_at) }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { db } from '../firebase_settings/index.js';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';

const props = defineProps({
  memo: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['update', 'delete']);

const isEditing = ref(false);
const editedContent = ref('');

const startEdit = () => {
  editedContent.value = props.memo.content;
  isEditing.value = true;
};

const cancelEdit = () => {
  isEditing.value = false;
  editedContent.value = '';
};

const saveMemo = async () => {
  try {
    const memoRef = doc(db, 'memos', props.memo.id);
    await updateDoc(memoRef, {
      content: editedContent.value,
      updated_at: new Date()
    });
    emit('update', { ...props.memo, content: editedContent.value });
    isEditing.value = false;
  } catch (error) {
    console.error('メモの更新に失敗しました:', error);
  }
};

const deleteMemo = async () => {
  try {
    const memoRef = doc(db, 'memos', props.memo.id);
    await deleteDoc(memoRef);
    emit('delete', props.memo.id);
  } catch (error) {
    console.error('メモの削除に失敗しました:', error);
  }
};

const formatDate = (timestamp) => {
  if (!timestamp) return '';
  const date = timestamp.toDate();
  return date.toLocaleString('ja-JP');
};
</script>
