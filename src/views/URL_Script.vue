<template>
  <div style="width: 500px;height: auto;margin: 50px auto;padding: 100px;background-color: aquamarine;">
    <h2>[URLのリンクファイル作成ページ]</h2>
    <div class="wrap">
        <div>
            <input style="font-size:25px;" id="text1" placeholder="ファイル名"></input>
            <button onclick="pasteToField('text1')" style="font-size:20px;">Paste</button>
        </div>
        <div>
            <input style="font-size:25px;" id="text2" placeholder="URL"></input>
            <button onclick="pasteToField('text2')" style="font-size:20px;">Paste</button>
        </div>
        <button onclick="downloadTextFile()" style="width: 100px;height: 50px;">Download</button>
    </div>
</div>


<div>
    <p><a href="https://qiita.com/studyhiminato1107/">Qiita</a></p>
</div>
<div>
    <p><a href="https://github.com/higayu/">GitHub</a></p>
</div>
</template>

<script>

export default {
  name: 'URL_Script',
  components: {
    
  },

  setup(props, { emit }) {
    const envmoji = import.meta.env.VITE_API_URL;
    const moji1 = `Option Explicit

Const BROWSER = "chrome"

Const URL = "`;

const moji2 = `"

Const DELIMS = " "

Dim objWshShell
Set objWshShell = CreateObject("WScript.Shell")

objWshShell.run BROWSER & DELIMS & URL

Set objWshShell = Nothing`;

        // 入力フィールドにクリップボードの内容をペーストする関数
        async function pasteToField(fieldId) {
            try {
                // クリップボードのテキストを取得
                const text = await navigator.clipboard.readText();

                // 指定された入力フィールドに設定
                document.getElementById(fieldId).value = text;
            } catch (err) {
                alert("クリップボードの内容を読み取れませんでした: " + err);
            }
        }


    function downloadTextFile() {
        // テキストエリアの値を取得
        const txt_name = document.getElementById('text1').value;
        const txt_url = document.getElementById('text2').value;

        // 文字列を結合
        const combinedText = moji1 + txt_url + moji2;

        // テキストファイルを作成
        const blob = new Blob([combinedText], { type: 'text/plain' });

        // ダウンロードリンクを作成
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = txt_name + '.vbs'; // ダウンロードファイル名
        document.body.appendChild(link);

        // 自動的にリンクをクリックしてダウンロードを開始
        link.click();

        // リンクを削除
        document.body.removeChild(link);
    }
    
      return {
        envmoji,
        moji1,
        moji2,
        pasteToField,
        downloadTextFile,
      };
    },

}
</script>
<style>
  .wrap {
      display:flex;
      flex-flow: column;
      border:2px #ccc solid;
      height:300px;
      margin:0 0 1em;
      gap: 50px;
  }
</style>