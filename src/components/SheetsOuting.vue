<template>
<!----------------------シーツ　外出と受診------------------------------>
<!-- シーツ 外出 受診の全体を囲む枠 -->
<div class="flex space-x-10 w-full">
  <!-- シーツグループ -->
  <div class="flex-1">
    <h3 class="font-bold font-mono mb-2">シーツ</h3>
    <!-- 備考欄 -->
    <textarea
      v-model="local_val.sheetsMemo.val"
      type="text"
      class="w-full p-2 border border-gray-300 rounded-md text-center"
      placeholder="◯または✕を入力 備考を入力"
      :maxlength="20"
    />
  </div>

  <!-- 外出グループ -->
  <div class="flex-1">
    <h4 class="font-semibold font-mono">外出</h4>
    <div class="p-1 font-mono">
      <label>
        <input type="radio" v-model="local_val.outing.val" :value="1" class="cursor-pointer">
        あり
      </label>
      <label>
        <input type="radio" v-model="local_val.outing.val" :value="0" class="cursor-pointer">
        なし
      </label>
    </div>
    <!-- 備考欄 -->
    <input
      v-model="local_val.outingMemo.val"
      type="text"
      class="w-full p-2 border border-gray-300 rounded-md"
      placeholder="詳細を入力"
      :maxlength="20"
    />
  </div>

  <!-- 受診・往診グループ -->
  <div class="flex-1">
    <h4 class="font-semibold font-mono">受診・往診</h4>
    <div class="p-1 font-mono">
      <label>
        <input type="radio" v-model="local_val.medicalVisit.val" :value="1" class="cursor-pointer">
        あり
      </label>
      <label>
        <input type="radio" v-model="local_val.medicalVisit.val" :value="0" class="cursor-pointer">
        なし
      </label>
    </div>
    <!-- 備考欄 -->
    <input
      v-model="local_val.medicalVisitMemo.val"
      type="text"
      class="w-full p-2 border border-gray-300 rounded-md"
      placeholder="受診先等を入力"
      :maxlength="20"
    />
  </div>
</div>
<!--------------------------シーツ　外出と受診--------------------------->

  </template>
  
<script>
import { defineComponent, watch } from "vue";
  
  export default defineComponent({
    props: {
      modelValue: {
        type: Object, // 期待されるデータが Object の場合
        required: true,
      },
    },
  
    data() {
      return {
        local_val: { ...this.modelValue }, // 親から受け取ったデータをローカルで管理
      };
    },
    
    watch: {
      modelValue: {
        handler(newVal) {
          this.local_val = { ...newVal }; // 親からの変更をローカル変数に反映
        },
        deep: true, // 深い変更も検知する
      },
    }

  });
</script>