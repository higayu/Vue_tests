<template>
  <div>
    <h2>画像アップロード</h2>
    <input type="file" @change="onFileChange" accept="image/*" />
    <button @click="uploadImage" :disabled="!file">アップロード</button>
    <p v-if="message">{{ message }}</p>
    <img v-if="imageUrl" :src="imageUrl" alt="Uploaded Image" width="200" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      file: null,
      message: "",
      imageUrl: null,
    };
  },
  methods: {
    onFileChange(event) {
      this.file = event.target.files[0];
    },
    async uploadImage() {
      if (!this.file) {
        this.message = "画像を選択してください。";
        return;
      }
      try {
        this.message = "アップロード中...";
        const response = await fetch("/api/blob-url", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: this.file.name }),
        });
        if (!response.ok) throw new Error("Blob URL 取得失敗");
        const data = await response.json();
        const uploadResponse = await fetch(data.url, {
          method: "PUT",
          headers: { "Content-Type": this.file.type },
          body: this.file,
        });
        if (!uploadResponse.ok) throw new Error("アップロード失敗");
        this.imageUrl = data.url.split("?")[0];
        this.message = "アップロード完了！";
      } catch (error) {
        console.error(error);
        this.message = "エラーが発生しました。";
      }
    },
  },
};
</script>
