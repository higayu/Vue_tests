<template>
  <div class="flex flex-col h-full">
    <div class="text-center mb-4">
      <p class="text-gray-600">QRコードをカメラで読み取ってください</p>
    </div>

    <!-- カメラ選択 -->
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-2">カメラを選択</label>
      <select v-model="selectedConstraints" class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none">
        <option v-for="option in constraintOptions" :key="option.label" :value="option.constraints">
          {{ option.label }}
        </option>
      </select>
    </div>

    <!-- QRコードの検出 -->
    <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
      {{ error }}
    </div>
    <div v-if="ShareStore.LoginData" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
      QRコードを読み取りました
    </div>

    <!-- カメラビュー -->
    <div class="flex-1 relative min-h-[240px] max-h-[400px] w-full">
      <div class="absolute inset-0 flex items-center justify-center">
        <qrcode-stream
          :constraints="selectedConstraints"
          :track="trackFunctionSelected.value"
          :formats="selectedBarcodeFormats"
          @error="onError"
          @detect="onDetect"
          @camera-on="onCameraReady"
          class="w-full h-full object-contain"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, getCurrentInstance } from "vue";
import { QrcodeStream } from "vue-qrcode-reader";
import { useShareStore } from "../stores/useShareData.js";
import { useRouter } from 'vue-router';

const emit = defineEmits(['close']);
const ShareStore = useShareStore();
const router = useRouter();

/*** QRコードの検出処理 ***/
const result = ref("");

async function onDetect(detectedCodes) {
  console.log("QRコード検出:", detectedCodes);
ShareStore.$patch({ isLoading: true }); // ストアの状態を直接更新
  try {
    // QRコードの内容 (rawValue) を取り出して連想配列に変換
    const extractedData = JSON.parse(detectedCodes[0].rawValue);

    // 取り出した内容をコンソールに出力
    console.log("QRコード内容の連想配列:", extractedData);
    console.log("login_code:", extractedData.login_code);
    console.log("password:", extractedData.password);
    
    if (extractedData.login_code && extractedData.password) {
      await ShareStore.sendLoginData(extractedData.login_code, extractedData.password);
      
      if (ShareStore.LoginData) {
        // ログイン成功時
        emit('close');
        //router.push('/dashboard');
        showSuccessToast('ログインに成功しました。');
      } else {
        error.value = 'ログインに失敗しました。';
      }
    } else {
      error.value = `無効なQRコードです。必要なデータが含まれていません。\nlogin_code: ${!!extractedData.login_code}\npassword: ${!!extractedData.password}`;
    }
  } catch (error) {
    console.error('QRコードの処理中にエラーが発生しました:', error);
    console.error('QRコードの生データ:', detectedCodes[0].rawValue);
    error.value = 'QRコードの処理中にエラーが発生しました。';
  }finally{
    ShareStore.$patch({ isLoading: false }); // ストアの状態を直接更新
  }
}

// getCurrentInstanceの設定
const { proxy } = getCurrentInstance();

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

/*** カメラ選択 ***/
const selectedConstraints = ref({ facingMode: "environment" });
const defaultConstraintOptions = [
  { label: "リアカメラ", constraints: { facingMode: "environment" } },
  { label: "フロントカメラ", constraints: { facingMode: "user" } },
];
const constraintOptions = ref(defaultConstraintOptions);

async function onCameraReady() {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoDevices = devices.filter(({ kind }) => kind === "videoinput");

    constraintOptions.value = [
      ...defaultConstraintOptions,
      ...videoDevices.map(({ deviceId, label }) => ({
        label: `${label} (ID: ${deviceId})`,
        constraints: { deviceId },
      })),
    ];

    error.value = "";
  } catch (err) {
    console.error("カメラの取得に失敗:", err);
    error.value = "カメラの取得に失敗しました。ブラウザの設定を確認してください。";
  }
}

/*** 強調表示（トラッキング） ***/
function paintBoundingBox(detectedCodes, ctx) {
  for (const detectedCode of detectedCodes) {
    const {
      boundingBox: { x, y, width, height },
    } = detectedCode;

    ctx.lineWidth = 3;
    ctx.strokeStyle = "blue";
    ctx.strokeRect(x, y, width, height);
  }
}

const trackFunctionOptions = [
  { text: "なし (デフォルト)", value: undefined },
  { text: "境界ボックス", value: paintBoundingBox },
];
const trackFunctionSelected = ref(trackFunctionOptions[1]);

/*** バーコードフォーマット選択 ***/
const barcodeFormats = ref({
  qr_code: true,
});
const selectedBarcodeFormats = computed(() => {
  return Object.keys(barcodeFormats.value).filter((format) => barcodeFormats.value[format]);
});

/*** エラーハンドリング ***/
const error = ref("");

function onError(err) {
  error.value = `[${err.name}]: `;

  if (err.name === "NotAllowedError") {
    error.value += "カメラのアクセス許可が必要です。";
  } else if (err.name === "NotFoundError") {
    error.value += "このデバイスにはカメラがありません。";
  } else if (err.name === "NotSupportedError") {
    error.value += "HTTPS または localhost で実行してください。";
  } else if (err.name === "NotReadableError") {
    error.value += "カメラが使用中か、利用できません。";
  } else {
    error.value += err.message;
  }
}
</script>

<style scoped>
.qrcode-stream {
  width: 100%;
  height: 100%;
  object-fit: contain;
  background-color: #f3f4f6;
  border-radius: 0.5rem;
}

/* カメラビューのアスペクト比を維持 */
.qrcode-stream video {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* モバイル対応 */
@media (max-width: 640px) {
  .qrcode-stream {
    max-height: 240px;
  }
}

/* タブレット対応 */
@media (min-width: 641px) and (max-width: 1024px) {
  .qrcode-stream {
    max-height: 320px;
  }
}

/* デスクトップ対応 */
@media (min-width: 1025px) {
  .qrcode-stream {
    max-height: 400px;
  }
}
</style>
