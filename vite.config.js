import { defineConfig, loadEnv } from "vite"; 
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig(({ mode }) => {
  // .envファイルの内容を読み込む
  const env = loadEnv(mode, process.cwd());

    // 環境変数を出力して確認
    console.log('VITE_API_URL:', env.VITE_API_URL);
    console.log('VITE_GET_RECODE:', env.VITE_GET_RECODE);

    return {
      plugins: [vue()],
      root: "./src",
      envDir: '../',  // これを追加
      build: {
        outDir: "../dist",
        rollupOptions: {
          input: path.resolve(__dirname, "src/index.html"),
        },
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
        },
      },
      define: {
        '__VUE_PROD_HYDRATION_MISMATCH_DETAILS__': false,
      },
      server: {
        // サーバーの設定（例: ポートやプロキシ）を必要に応じて追加
      },
      test: {
        globals: true,
        environment: "jsdom",
      },
    };
  });
