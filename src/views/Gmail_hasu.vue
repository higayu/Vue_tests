<template>
  <div>
    <h1>ハッシュ値生成＆送信</h1>
    <button @click="sendHashEmail">ハッシュ値をGmailで送信</button>
    <p v-if="hashValue">生成されたハッシュ値: {{ hashValue }}</p>
    <p v-if="emailStatus">{{ emailStatus }}</p>
  </div>
</template>

<script>
import CryptoJS from "crypto-js";
import nodemailer from "nodemailer";

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

    // Gmailでメールを送信する関数
    async sendHashEmail() {
      try {
        // 環境変数から情報を取得
        const mail = import.meta.env.VITE_GMAIL_USER;
        const pass = import.meta.env.VITE_GMAIL_PASS;
        const to_user = import.meta.env.VITE_RECIPIENT_EMAIL;

        // Nodemailerトランスポーターの作成
        const transporter = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: mail,
            pass: pass,
          },
        });

        // ハッシュ値を生成
        const hash = this.generateHash();

        // メール送信
        const info = await transporter.sendMail({
          from: mail,
          to: to_user,
          subject: "NFCのハッシュ値",
          text: `生成されたハッシュ値: ${hash}`,
        });

        // メール送信成功
        this.emailStatus = `メールが送信されました: ${info.response}`;
        console.log("Message sent: %s", info.response);
      } catch (error) {
        // エラーハンドリング
        this.emailStatus = `メール送信中にエラーが発生しました: ${error.message}`;
        console.error("Error sending email: %s", error);
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
