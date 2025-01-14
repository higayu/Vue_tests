<template>
    <div>
      <h2>Firebase Storageに画像をアップロード</h2>
      <input type="file" @change="onFileChange" accept="image/*" />
      <button @click="uploadImage" :disabled="!file">アップロード</button>
      <p v-if="message">{{ message }}</p>
      <p v-if="uploading">アップロード中...</p>
      <img v-if="imageUrl" :src="imageUrl" alt="Uploaded Image" width="200" />
    </div>
  </template>
  
  <script>
  import { storage } from './firebase';  // firebase.jsで設定したfirebaseインスタンスをインポート
  
  export default {
    data() {
      return {
        file: null,
        message: '',
        uploading: false,
        imageUrl: null,
      };
    },
    methods: {
      // ファイル選択時の処理
      onFileChange(event) {
        this.file = event.target.files[0];  // 選択されたファイルを格納
      },
      
      // 画像アップロード処理
      uploadImage() {
        if (!this.file) {
          this.message = '画像を選択してください。';
          return;
        }
  
        // アップロード中のフラグを立てる
        this.uploading = true;
        this.message = 'アップロード中...';
  
        // Firebase Storageの参照を作成（ファイル名はそのまま使用）
        const uploadTask = storage.ref(`images/${this.file.name}`).put(this.file);
  
        // アップロード状態の監視
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            // プログレスバーやアップロード状態の更新に使用できます（ここでは省略）
          },
          (error) => {
            // エラーハンドリング
            console.error(error);
            this.message = 'アップロード中にエラーが発生しました。';
            this.uploading = false;
          },
          () => {
            // アップロード完了後の処理
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              this.message = 'アップロード完了！';
              this.uploading = false;
              this.imageUrl = downloadURL;  // アップロードした画像のURLを表示
            });
          }
        );
      },
    },
  };
  </script>
  
  <style scoped>
  button {
    margin-top: 10px;
  }
  </style>
  