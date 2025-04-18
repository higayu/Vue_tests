<template>
  <div class="modal-overlay">
    <div class="bg-white w-full h-full md:w-[70%] md:max-w-lg md:h-[70vh] md:rounded-lg p-4 flex flex-col">
      <div class="flex justify-between items-center mb-4">
        <span class="text-lg font-bold">数値入力</span>
        <span class="text-base text-gray-600">{{ ShareStore.selected_user.name || '●●●●' }} 様</span>
      </div>
      <div class="flex-1">
        <div id="keypad-display" class="bg-gray-100 p-4 rounded-lg mb-4">
          <div class="text-sm text-gray-600 mb-2">{{ inputLabel }}</div>
          <div class="text-2xl text-right">{{ currentValue }}</div>
          <div class="error" :style="{ visibility: errorMessage ? 'visible' : 'hidden', opacity: errorMessage ? '1' : '0' }">
            {{ errorMessage }}
          </div>
        </div>
        <div class="grid grid-cols-3 gap-2">
          <button 
            v-for="num in ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.', '←']" 
            :key="num"
            class="keypad-button" 
            :class="{ 'disabled': num === '.' && !allowDecimal }"
            @click="handleKeypadClick(num)"
          >
            {{ num }}
          </button>
        </div>
      </div>
      <div class="flex mt-4">
        <button 
          class="flex-1 bg-gray-300 text-gray-700 py-2 rounded" 
          :class="{ 'opacity-50 cursor-not-allowed': !isValid }"
          :disabled="!isValid"
          @click="confirmValue"
        >
          確定
        </button>
        <button 
          class="flex-1 bg-red-500 text-white py-2 rounded" 
          @click="$emit('close')"
        >
          キャンセル
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import { useShareStore } from "../stores/useShareData.js"; // Piniaストアをインポート

export default {
  props: {
    modalId: String,
    userName: String,
    initialValue: {
      type: String,
      default: ''
    },
    inputLabel: {
      type: String,
      default: '数値'
    },
    fieldType: {
      type: String,
      default: 'default'
    }
  },
  
  emits: ['close', 'update:value'],
  
  setup(props, { emit }) {
    const ShareStore = useShareStore();
    const currentValue = ref(props.initialValue || '');
    const errorMessage = ref('');
    
    // フィールドタイプに基づいて小数点入力を許可するかどうか
    const allowDecimal = computed(() => {
      return props.fieldType === 'temperature';
    });
    
    // 入力値の検証
    const validateInput = (value) => {
      if (!value) return { isValid: true, message: '' };
      
      const numValue = parseFloat(value);
      let isValid = true;
      let message = '';
      
      switch(props.fieldType) {
        case 'bloodPressureMax':
          if (numValue < 60 || numValue > 200) {
            isValid = false;
            message = '60-200の範囲で入力してください';
          }
          break;
        case 'bloodPressureMin':
          if (numValue < 40 || numValue > 130) {
            isValid = false;
            message = '40-130の範囲で入力してください';
          }
          break;
        case 'pulse':
          if (numValue < 30 || numValue > 200) {
            isValid = false;
            message = '30-200の範囲で入力してください';
          }
          break;
        case 'temperature':
          if (numValue < 35.0 || numValue > 42.0) {
            isValid = false;
            message = '35.0-42.0の範囲で入力してください';
          }
          break;
        case 'spo2':
          if (numValue < 70 || numValue > 100) {
            isValid = false;
            message = '70-100の範囲で入力してください';
          }
          break;
      }
      
      return {isValid, message};
      
    };
    
    // 入力値が有効かどうか
    const isValid = computed(() => {
      const validation = validateInput(currentValue.value);
      return validation.isValid;
    });
    
    // 入力値が変更されたときにバリデーションを実行
    watch(currentValue, (newValue) => {
      const validation = validateInput(newValue);
      errorMessage.value = validation.message;
    });
    
    // テンキーボタンがクリックされたときの処理
    const handleKeypadClick = (value) => {
      if (value === '.' && !allowDecimal.value) {
        return;
      }
      
      if (value === '←') {
        // バックスペースの処理
        // 文字列に変換してから処理
        currentValue.value = String(currentValue.value || '');
        currentValue.value = currentValue.value.slice(0, -1);
      } else if (value === '.' && String(currentValue.value).includes('.')) {
        // 小数点が既に含まれている場合は何もしない
        return;
      } else {
        // 数字または小数点を追加
        // 文字列として連結
        currentValue.value = (currentValue.value || '') + value;
      }
    };
    
    // 値を確定して親コンポーネントに通知
    const confirmValue = () => {
      if (isValid.value) {
        emit('update:value', currentValue.value);
        emit('close');
      }
    };
    
    return {
      currentValue,
      errorMessage,
      allowDecimal,
      isValid,
      handleKeypadClick,
      confirmValue,
      ShareStore,
    };
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 200;
}

.keypad-button {
  padding: 14px;
  font-size: 24px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.keypad-button:hover {
  background-color: #218838;
}

.keypad-button:active {
  background-color: #1e7e34;
}

.keypad-button.disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.error {
  color: #ffffff;
  font-size: 16px;
  margin-top: 10px;
  padding: 10px;
  background-color: #dc3545;
  border-radius: 4px;
  font-weight: bold;
  text-align: center;
  width: 100%;
  box-sizing: border-box;
  min-height: 25px;
  display: block;
  transition: opacity 0.2s, visibility 0.2s;
}
</style>
  