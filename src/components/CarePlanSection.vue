<template>
    <section class="bg-white p-4 mb-4 border border-gray-300 rounded">
      <h2 class="text-base font-bold mb-3 border-b border-gray-300 pb-1">ケアプラン内容</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="(plan, index) in modelValue" :key="index" class="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div class="text-sm text-gray-600">
            {{ plan.service_detail }}
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
import { ref, watch, onMounted } from 'vue';

  export default {
    name: 'CarePlanSection',

    props: {
      modelValue: {
          type: Array,
          default: () => ([]),
          required: true,
        },
    },

    setup(props, { emit }) {

      // ユーザーIDに基づいてケアプランを取得するメソッド
      // 実際のアプリケーションではAPIからデータを取得する
     const fetchCarePlans = () => {
        // ここでAPIからデータを取得する処理を実装
        // 今回はダミーデータを使用
        console.log(`ユーザーID: ${this.userId} のケアプランを取得`);
      }

      return {
        fetchCarePlans
      }
    },

  }
  </script>
  
  <style scoped>
  /* スタイルが必要な場合はここに追加 */
  </style>
  