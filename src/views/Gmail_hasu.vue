<template>
  <div>
    <h1>ハッシュ値生成＆送信</h1>
    <button @click="sendHash">ハッシュ値を生成してサーバーに送信</button>
    <p v-if="hashValue">生成されたハッシュ値: {{ hashValue }}</p>
    <p v-if="emailStatus">{{ emailStatus }}</p>
  </div>
</template>

<script>
import axios from 'axios';
import CryptoJS from 'crypto-js';

export default {
  data() {
    return {
      hashValue: null,
      emailStatus: null,
    };
  },
  methods: {
    // ハッシュ値を生成する関数
    generateHash() {
      const now = new Date();
      const dateStr = now.toISOString().replace(/[-:.TZ]/g, "").slice(0, 15); // YYYYMMDDHHMMSS形式
      const uniqueId = `${dateStr}-${now.getMilliseconds()}`;

      // MD5ハッシュを生成
      const md5Hash = CryptoJS.MD5(uniqueId).toString();

      // CRC32ハッシュ生成（擬似処理）
      const crc32Hash = parseInt(md5Hash, 16).toString(32); // MD5をCRC32に変換した擬似処理
      this.hashValue = crc32Hash;

      return crc32Hash;
    },

    // サーバーにハッシュ値を送信する関数
    async sendHash() {
      try {
        // ハッシュ値を生成
        const hash = this.generateHash();

        const api_url = import.meta.env.VITE_SERVER;
        // サーバーに送信
        const response = await axios.post(api_url, {
          hashValue: hash,
        });

        // サーバーからのレスポンス
        this.emailStatus = response.data;
        console.log(response.data);
      } catch (error) {
        // エラーハンドリング
        this.emailStatus = `エラーが発生しました: ${error.message}`;
        console.error(error);
      }
    },
  },
};
</script>

<style>
button {
  margin-top: 10px;
}
p {
  margin-top: 10px;
  font-weight: bold;
}
</style>
