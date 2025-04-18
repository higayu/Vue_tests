<template>
  <section class="bg-white p-4 mb-4 border border-gray-300 rounded">
    <div class="flex items-center mb-3 border-b border-gray-300 pb-1">
      <h2 class="text-base font-bold">{{ title }}</h2>
      <button 
        type="button" 
        class="text-gray-600 hover:text-gray-800 ml-3 mb-2"
        :disabled="!selectedRecordStore.nowSelectedItem_Kanri?.day_key || selectedRecordStore.nowSelectedItem_Kanri.day_key === ''" 
        @click="toggleEditMode"
        v-if="selectedRecordStore.nowSelectedItem_Kanri?.day_key && selectedRecordStore.nowSelectedItem_Kanri.day_key !== ''"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
        </svg>
      </button>
    </div>

    <!-- 表示モード -->
    <div v-if="!isEditing" class="grid grid-cols-1 gap-4">
      <div v-if="items && items.length > 0" class="font-medium">
        <ul class="list-none pl-0">
          <li v-for="(item, index) in items" :key="index" class="flex items-start mb-1">
            <span class="mr-1">・</span>
            <span>{{ item }}</span>
          </li>
        </ul>
      </div>
      <div v-else class="font-medium">{{ emptyMessage }}</div>
    </div>

    <!-- 編集モード -->
    <div v-else>
      <template v-if="type === 'meals'">
        <!-- 食事用の編集フォーム -->
        <div class="space-y-4">
          <div v-for="(field, key) in mealFields" :key="key" class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">{{ field.label }}</label>
            <textarea 
              v-model="editingMeals[key]" 
              class="w-full p-2 text-sm border border-gray-300 rounded resize-vertical" 
              rows="2"
              :placeholder="field.placeholder"
            ></textarea>
          </div>
        </div>
      </template>
      <template v-else>
        <!-- 通常の編集フォーム -->
        <textarea 
          v-model="editingContent" 
          class="w-full p-2 text-sm border border-gray-300 rounded resize-vertical mb-3" 
          rows="5"
          :placeholder="placeholder"
        ></textarea>
      </template>

      <div class="flex justify-end gap-2">
        <button 
          type="button" 
          class="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          @click="cancelEdit"
        >
          キャンセル
        </button>
        <button 
          type="button" 
          class="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
          @click="saveContent"
        >
          保存
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, computed } from 'vue';
import { useSelectedRecordStore } from '@/stores/selectedRecord';

export default {
  name: 'FreeInput',
  props: {
    modelValue: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'normal',
      validator: (value) => ['normal', 'meals'].includes(value)
    },
    emptyMessage: {
      type: String,
      default: '記録はありません'
    },
    placeholder: {
      type: String,
      default: '内容を入力してください'
    }
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const isEditing = ref(false);
    const editingContent = ref('');
    const editingMeals = ref({
      breakfast: '',
      lunch: '',
      dinner: '',
      snack: ''
    });
    const selectedRecordStore = useSelectedRecordStore();

    const mealFields = {
      breakfast: { label: '朝食', placeholder: '朝食の内容を入力してください' },
      lunch: { label: '昼食', placeholder: '昼食の内容を入力してください' },
      dinner: { label: '夕食', placeholder: '夕食の内容を入力してください' },
      snack: { label: 'おやつ', placeholder: 'おやつの内容を入力してください' }
    };

    const items = computed(() => props.modelValue);

    const toggleEditMode = () => {
      isEditing.value = !isEditing.value;
      if (isEditing.value) {
        if (props.type === 'meals') {
          // 食事の場合、各項目を個別に設定
          const meals = items.value.reduce((acc, item) => {
            if (item.startsWith('朝食：')) acc.breakfast = item.replace('朝食：', '');
            if (item.startsWith('昼食：')) acc.lunch = item.replace('昼食：', '');
            if (item.startsWith('夕食：')) acc.dinner = item.replace('夕食：', '');
            if (item.startsWith('おやつ：')) acc.snack = item.replace('おやつ：', '');
            return acc;
          }, {
            breakfast: '',
            lunch: '',
            dinner: '',
            snack: ''
          });
          editingMeals.value = meals;
        } else {
          editingContent.value = items.value.join('\n');
        }
      }
    };

    const saveContent = async () => {
      try {
        let newItems = [];
        if (props.type === 'meals') {
          if (editingMeals.value.breakfast) newItems.push(`朝食：${editingMeals.value.breakfast}`);
          if (editingMeals.value.lunch) newItems.push(`昼食：${editingMeals.value.lunch}`);
          if (editingMeals.value.dinner) newItems.push(`夕食：${editingMeals.value.dinner}`);
          if (editingMeals.value.snack) newItems.push(`おやつ：${editingMeals.value.snack}`);
        } else {
          newItems = editingContent.value
            .split('\n')
            .map(item => item.trim())
            .filter(item => item);
        }
        
        //await selectedRecordStore.updateKanriNissi_Free(props.type, newItems);
        
        // emit を Promise.resolve() でラップ
        await Promise.resolve(emit('update:modelValue', newItems));
        
        // 状態をリセットする前に少し待機
        await new Promise(resolve => setTimeout(resolve, 100));
        
        isEditing.value = false;
        editingContent.value = '';
        editingMeals.value = {
          breakfast: '',
          lunch: '',
          dinner: '',
          snack: ''
        };

        // データを保存した後、selectedRecordStoreのデータを更新
        await selectedRecordStore.ReLode_Kanri_Nissi();
      } catch (error) {
        console.error('コンテンツの保存中にエラーが発生しました:', error);
      }
    };

    const cancelEdit = () => {
      isEditing.value = false;
      editingContent.value = '';
      editingMeals.value = {
        breakfast: '',
        lunch: '',
        dinner: '',
        snack: ''
      };
    };

    return {
      isEditing,
      editingContent,
      editingMeals,
      mealFields,
      items,
      toggleEditMode,
      saveContent,
      cancelEdit,
      selectedRecordStore
    };
  }
};
</script>

<style scoped>
textarea {
  min-height: 100px;
}
</style> 