const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// ミドルウェア
app.use(express.json());
app.use(cors());

// メール送信エンドポイント
app.post('/send-email', async (req, res) => {
  const { hashValue } = req.body;

  if (!hashValue) {
    return res.status(400).send('ハッシュ値が提供されていません');
  }

  // Nodemailerのトランスポーター設定
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  try {
    // メール送信
    const info = await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.RECIPIENT_EMAIL,
      subject: 'NFCのハッシュ値',
      text: `生成されたハッシュ値: ${hashValue}`,
    });

    res.status(200).send(`メールが送信されました: ${info.response}`);
  } catch (error) {
    console.error('メール送信エラー:', error);
    res.status(500).send(`メール送信中にエラーが発生しました: ${error.message}`);
  }
});

// サーバー起動
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
