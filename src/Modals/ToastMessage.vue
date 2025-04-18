<template>
  <transition name="toast">
    <div v-if="visible" :class="['toast', `toast-${type}`]">
      <div class="toast-content">
        <span class="toast-icon" v-if="type === 'success'">✓</span>
        <span class="toast-icon" v-else-if="type === 'error'">✗</span>
        <span class="toast-icon" v-else-if="type === 'warning'">!</span>
        <span class="toast-icon" v-else>i</span>
        <span class="toast-message">{{ message }}</span>
      </div>
      <button class="toast-close" @click="hideToast">&times;</button>
    </div>
  </transition>
</template>

<script>
import { useToast } from '@/composables/useToast';
import { useShareStore } from '@/stores/useShareData';

export default {
  setup() {
    const { visible, message, type, hideToast } = useToast();
    
    return {
      visible,
      message,
      type,
      hideToast
    };
  }
};
</script>

<style scoped>
.toast {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  min-width: 250px;
  max-width: 80%;
  padding: 12px 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
}

.toast-content {
  display: flex;
  align-items: center;
}

.toast-icon {
  margin-right: 12px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
}

.toast-message {
  font-size: 14px;
}

.toast-close {
  background: none;
  border: none;
  color: inherit;
  font-size: 18px;
  cursor: pointer;
  opacity: 0.7;
  margin-left: 12px;
}

.toast-close:hover {
  opacity: 1;
}

.toast-success {
  background-color: #28a745;
  color: white;
}

.toast-error {
  background-color: #dc3545;
  color: white;
}

.toast-warning {
  background-color: #ffc107;
  color: #212529;
}

.toast-info {
  background-color: #17a2b8;
  color: white;
}

/* トランジション効果 */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translate(-50%, 20px);
}
</style>
  