<template>
  <div class="pdf-container">
    <input type="file" @change="handleFileUpload" accept="application/pdf" />
    <div v-if="images.length">
      <h3>PDFのページを画像化</h3>
      <div class="image-list">
        <img v-for="(image, index) in images" :key="index" :src="image" alt="PDF Page" />
      </div>
    </div>
  </div>
</template>

<script>
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.entry";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export default {
  data() {
    return {
      images: [],
    };
  },
  methods: {
    async handleFileUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.readAsArrayBuffer(file);

      reader.onload = async (e) => {
        const arrayBuffer = e.target.result;
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

        let imagesArray = [];
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const viewport = page.getViewport({ scale: 2 });

          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          canvas.width = viewport.width;
          canvas.height = viewport.height;

          const renderContext = {
            canvasContext: context,
            viewport: viewport,
          };

          await page.render(renderContext).promise;
          imagesArray.push(canvas.toDataURL("image/png"));
        }
        this.images = imagesArray;
      };
    },
  },
};
</script>

<style scoped>
.pdf-container {
  text-align: center;
  margin-top: 20px;
}
.image-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
}
.image-list img {
  max-width: 200px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
