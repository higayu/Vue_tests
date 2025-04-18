import { ref } from 'vue';

// グローバルな状態を作成
const visible = ref(false);
const message = ref('');
const type = ref('success'); // success, error, warning, info

export function useToast() {
  // トースト表示関数
  const showToast = (msg, toastType = 'success', duration = 3000) => {
    message.value = msg;
    type.value = toastType;
    visible.value = true;
    
    // 指定時間後に自動的に閉じる
    setTimeout(() => {
      visible.value = false;
    }, duration);
  };
  
  // トースト非表示関数
  const hideToast = () => {
    visible.value = false;
  };
  
  return {
    visible,
    message,
    type,
    showToast,
    hideToast
  };
} 