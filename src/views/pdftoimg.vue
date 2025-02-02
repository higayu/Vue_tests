<template>
  <div>
    <h1>OCR Web App with Tesseract.js</h1>
    <!-- PDF/画像ファイルのアップロード -->
    <input type="file" @change="onFileChange" accept="image/*,.pdf" />
    
    <!-- ページ番号入力（PDFのみ表示） -->
    <input
      v-if="file"
      type="number"
      v-model="pagenum"
      name="tentacles"
      min="1"
      max="100"
      class="input-large border border-blue-400 bg-emerald-200"
      @change="onInputPage"
      :disabled="!isPdf"
    />

    <!-- OCR実行ボタン -->
    <button 
      class="bg-emerald-200 border border-blue-400 rounded-full"
      @click="processOCR" 
      :disabled="!file"
    >
      Process OCR
    </button>
    
    <!-- 処理中メッセージ -->
    <p v-if="isProcessing">Processing...</p>
    
    <!-- 抽出されたテキスト -->
    <div v-if="ocrText" class="ocr-result">
      <h3>Extracted Text:</h3>
      <pre>{{ ocrText }}</pre>
    </div>
    
    <!-- 画像プレビュー -->
    <img v-if="imageSrc" :src="imageSrc" alt="Uploaded Image" class="image-preview" />
  </div>
</template>

<script>
import Tesseract from "tesseract.js";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";

// PDF.jsのワーカーパスを設定
GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.15.349/pdf.worker.min.js`;

export default {
  data() {
    return {
      file: null, // アップロードされたファイル (画像またはPDF)
      imageSrc: null, // プレビュー用の画像URL
      ocrText: "", // OCR結果
      isProcessing: false, // 処理中フラグ
      pagenum: 1, // 現在のページ番号
      isPdf: false, // ファイルがPDFかどうかを管理
    };
  },
  methods: {
    // ファイルを取得または特定ページを表示
    async onFileChange(event = null) {
      const file = event ? event.target.files[0] : this.file;
      if (!file) {
        this.file = null;
        this.imageSrc = null;
        this.isPdf = false;
        return;
      }

      this.file = file;
      this.isPdf = file.type === "application/pdf"; // PDFファイルかどうかを判定

      if (this.isPdf) {
        // PDF の指定ページを画像に変換
        const pdf = await getDocument(URL.createObjectURL(file)).promise;
        const page = await pdf.getPage(this.pagenum);
        const viewport = page.getViewport({ scale: 2 });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({ canvasContext: context, viewport }).promise;

        this.imageSrc = canvas.toDataURL("image/png"); // プレビュー用
      } else {
        // 画像ファイルの場合
        this.imageSrc = URL.createObjectURL(file);
      }
    },

    // ページ番号変更時に特定ページを表示
    async onInputPage() {
      if (this.file) {
        await this.onFileChange();
      } else {
        console.warn("No file selected.");
      }
    },

    // OCRを実行
    async processOCR() {
      if (!this.file) return;

      this.isProcessing = true;
      this.ocrText = "";

      let input;
      if (this.isPdf) {
        // PDFの場合、現在のプレビュー画像をOCRに渡す
        const response = await fetch(this.imageSrc);
        input = await response.blob();
      } else {
        // 画像ファイルの場合
        input = this.file;
      }

      Tesseract.recognize(input, "jpn", {
        logger: (info) => console.log(info), // ログ情報を表示
      })
        .then(({ data: { text } }) => {
          this.ocrText = text;
        })
        .catch((error) => {
          console.error("OCR Error:", error);
          this.ocrText = "An error occurred during OCR processing.";
        })
        .finally(() => {
          this.isProcessing = false;
        });
    },
  },
};
</script>

<style>
.input-large {
  font-size: 1.5rem; /* フォントサイズを大きくする */
  padding: 10px; /* 内側の余白を広げる */
  width: 150px; /* 幅を調整 */
  height: 50px; /* 高さを調整 */
  border-radius: 10px; /* 角を丸くする */
  text-align: center; /* テキストを中央揃え */
  margin: 10px 0; /* 上下の余白を調整 */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* 影をつけて目立たせる */
  cursor: pointer; /* カーソルをポインタに変更 */
}

.input-large:focus {
  outline: none; /* フォーカス時のデフォルトのアウトラインを削除 */
  border-color: #4caf50; /* フォーカス時の枠の色を変更 */
  box-shadow: 0 0 10px rgba(76, 175, 80, 0.5); /* フォーカス時に目立つ影を追加 */
}
.container {
  text-align: center;
  margin: 20px auto;
  max-width: 600px;
}

button {
  margin-top: 10px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

pre {
  text-align: left;
  white-space: pre-wrap;
  word-wrap: break-word;
  background: #f4f4f4;
  padding: 10px;
  border-radius: 5px;
  color: #333;
}

.image-preview {
  max-width: 100%;
  margin-top: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.ocr-result {
  margin-top: 20px;
  text-align: left;
  background: #e9f7ef;
  border: 1px solid #c3e6cb;
  padding: 15px;
  border-radius: 5px;
}
</style>
