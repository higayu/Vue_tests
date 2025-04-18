<template>
  <div class="flex flex-col h-full">
    <div class="text-center mb-4">
      <p class="text-gray-600">NFCタグを端末に近づけてください</p>
    </div>

    <!-- NFC読み取り状態 -->
    <div v-if="errorMessage" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
      {{ errorMessage }}
    </div>
    <div v-if="ShareStore.LoginData" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
      NFCタグを読み取りました
    </div>

    <!-- NFC読み取りボタン -->
    <div class="flex justify-center mb-4">
      <button 
        @click="startNFC" 
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        :disabled="isReading"
      >
        {{ isReading ? '読み取り中...' : 'NFC読み取りを開始' }}
      </button>
    </div>

    <!-- 読み取り結果 -->
    <div v-if="message" class="mt-4 p-4 bg-gray-100 rounded-lg">
      <h2 class="text-lg font-semibold mb-2">読み取ったデータ:</h2>
      <pre class="whitespace-pre-wrap">{{ message }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue';
import { useShareStore } from "../stores/useShareData.js";

const emit = defineEmits(['close']);
const ShareStore = useShareStore();
const { proxy } = getCurrentInstance();

const message = ref(null);
const errorMessage = ref(null);
const isReading = ref(false);

// トースト通知用の関数
const showSuccessToast = (moji) => {
  if (!proxy || !proxy.$toast) {
    console.error("Toast instance is undefined. Ensure VueToast is properly registered.");
    return;
  }
  proxy.$toast.open({
    message: moji,
    type: "success",
    duration: 1000,
    position: "top",
  });
};

async function startNFC() {
  if (!('NDEFReader' in window)) {
    errorMessage.value = "Web NFC API はこのブラウザでサポートされていません。";
    return;
  }

  isReading.value = true;
  errorMessage.value = null;
  message.value = null;

  try {
    const ndef = new NDEFReader();
    await ndef.scan();

    ndef.onreading = async (event) => {
      const decoder = new TextDecoder();
      let nfcData = '';
      
      for (const record of event.message.records) {
        nfcData += decoder.decode(record.data);
      }

      message.value = nfcData;

      try {
        // NFCデータをJSONとして解析
        const extractedData = JSON.parse(nfcData);
        console.log("NFCデータ:", extractedData);

        if (extractedData.login_code && extractedData.password) {
          await ShareStore.sendLoginData(extractedData.login_code, extractedData.password);
          
          if (ShareStore.LoginData) {
            emit('close');
            showSuccessToast('ログインに成功しました。');
          } else {
            errorMessage.value = 'ログインに失敗しました。';
          }
        } else {
          errorMessage.value = `無効なNFCデータです。必要なデータが含まれていません。\nlogin_code: ${!!extractedData.login_code}\npassword: ${!!extractedData.password}`;
        }
      } catch (error) {
        console.error('NFCデータの処理中にエラーが発生しました:', error);
        errorMessage.value = 'NFCデータの処理中にエラーが発生しました。';
      }
    };

    ndef.onreadingerror = () => {
      errorMessage.value = "読み取りエラーが発生しました。";
      isReading.value = false;
    };

  } catch (error) {
    errorMessage.value = `エラー: ${error.message}`;
    isReading.value = false;
  }
}

// コンポーネントのアンマウント時にNFC読み取りを停止
onMounted(() => {
  return () => {
    isReading.value = false;
  };
});
</script>

<style scoped>
.container {
  padding: 20px;
}

.message-box, .error-box {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>
  