<template>
    <div style="width: 500px; height: auto; margin: 50px auto; padding: 100px; background-color: aquamarine;">
      <h2>[URLのリンクファイル作成ページ]</h2>
      <div class="wrap">
        <div>
          <input style="font-size: 25px;" v-model="fileName" placeholder="ファイル名" />
          <button @click="pasteToField('fileName')" style="font-size: 20px;">Paste</button>
        </div>
        <div>
          <input style="font-size: 25px;" v-model="fileUrl" placeholder="URL" />
          <button @click="pasteToField('fileUrl')" style="font-size: 20px;">Paste</button>
        </div>
        <button @click="downloadTextFile" style="width: 100px; height: 50px;">Download</button>
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
  import { ref } from 'vue';
  
  export default {
    name: 'URLScript',
    setup() {
      const fileName = ref('');
      const fileUrl = ref('');
  
      const moji1 = `Option Explicit
  
  Const BROWSER = "chrome"
  
  Const URL = "`;
      const moji2 = `"
  
  Const DELIMS = " "
  
  Dim objWshShell
  Set objWshShell = CreateObject("WScript.Shell")
  
  objWshShell.run BROWSER & DELIMS & URL
  
  Set objWshShell = Nothing`;
  
      async function pasteToField(field) {
        try {
          const text = await navigator.clipboard.readText();
          if (field === 'fileName') {
            fileName.value = text;
          } else if (field === 'fileUrl') {
            fileUrl.value = text;
          }
        } catch (err) {
          alert('クリップボードの内容を読み取れませんでした: ' + err);
        }
      }
  
      function downloadTextFile() {
        const txt_name = fileName.value;
        const txt_url = fileUrl.value;
  
        if (!txt_name || !txt_url) {
          alert('ファイル名とURLを入力してください。');
          return;
        }
  
        const combinedText = moji1 + txt_url + moji2;
        const blob = new Blob([combinedText], { type: 'text/plain' });
  
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${txt_name}.vbs`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
  
      return {
        fileName,
        fileUrl,
        pasteToField,
        downloadTextFile,
      };
    },
  };
  </script>
  
  <style>
  .wrap {
    display: flex;
    flex-direction: column;
    border: 2px #ccc solid;
    height: 300px;
    margin: 0 0 1em;
    gap: 50px;
  }
  </style>
  