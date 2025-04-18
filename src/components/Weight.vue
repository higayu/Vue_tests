<template>
  <!-- 新しいグループ（入浴、排泄、体重）を横並びで、各項目に外枠を追加 -->
  <div class="mt-1">
    <div class="flex space-x-8">
      <!-- 新しい入浴グループ -->
      <div class="w-2/5"> <!-- 幅を2/5に設定 -->
        <div class="flex flex-col">
          <!-- 入浴の有無（ラジオボタン） -->
          <div class="">
            <h3 class="text-lg font-bold font-mono mb-2">入浴</h3>
            <div class="flex items-center space-x-2 font-mono mb-0">
              <label> 
                <input type="radio" v-model="local_val.bath.val" :value="1" class="cursor-pointer" />
                実施
              </label>
              <label>
                <input type="radio" v-model="local_val.bath.val" :value="0" class="cursor-pointer"/>
                なし
              </label>
            </div>
            <!-- 入浴に関するテキストボックス -->
            <input
              v-model="local_val.bathContent.val"
              type="text"
              class="w-full p-2 border border-gray-300 rounded-md"
              placeholder="入浴内容を入力"
            />
          </div>
        </div>
      </div>
  
      <!-- 新しい排泄グループ -->
      <div class="w-2/5"> <!-- 幅を2/5に設定 -->
        <div class="space-y-4">
          <div class="flex flex-col">
            <h3 class="text-lg font-bold font-mono mb-2">排便</h3>
            <textarea
              v-model="local_val.toiletContent.val"
              class="w-full p-2 border border-gray-300 rounded-md text-center"
              rows="2"
              placeholder="分量 （排便未日数）"
              @input="haibenInput"
            ></textarea>
          </div>
        </div>
      </div>
  
      <!-- 体重（幅を縮める） -->
      <div class="w-1/5"> <!-- 幅を1/5に設定 -->
        <div class="">
          <h3 class="text-lg font-bold font-mono mb-2">体重</h3>
          <input
            v-model.number="local_val.weight.val"
            type="number"
            step="1"
            class="bg-white w-full p-2 border border-gray-300 rounded-md text-right"
            placeholder="kg"
            min="0"
            max="1000"
            @input="validateWeight"
          />
        </div>
      </div>
  
      <!-- "kg"の表示 -->
      <div class="w-1/7 pt-11" style="text-align: left;width: 40px;">kg</div>
    </div>
  </div>
  
    </template>
    
    <script>
    import { defineComponent, reactive, watch } from "vue";
    
    export default defineComponent({
      props: {
        modelValue: {
          type: Object, // 期待されるデータが Object であるため Object を指定
          required: true,
        },
      },


  setup(props, { emit }) {
    // 親から受け取ったデータをローカルで管理
    const local_val = reactive({ ...props.modelValue });

    // 排便テキストエリアの入力制限
    const haibenInput = (event) => {
      let value = event.target.value;

      // 各行の最大文字数を15文字に制限
      const lines = value.split("\n").map((line) => line.slice(0, 15));

      // 最大行数を超えた場合アラートを表示
      if (lines.length > 5) {
        alert("5行を超える入力はできません");
        lines.splice(5); // 5行を超えた部分を削除
      }

      // 最終的なテキストを反映
      event.target.value = lines.join("\n");
    };

    // 体重入力制限
    const validateWeight = (event) => {
      let value = parseFloat(event.target.value);

      // 体重の最大値を1000に制限
      if (value > 1000) {
        value = 1000;
      }
      local_val.weight.val = value; // local_valに反映
      emit("update:modelValue", { ...local_val }); // 親に変更を通知
    };

    // 親コンポーネントからの変更をローカルデータに反映
    watch(
      () => props.modelValue,
      (newVal) => {
        Object.assign(local_val, newVal); // 新しい値でlocal_valを更新
      },
      { deep: true }
    );

    // ローカルデータが更新されたら親コンポーネントにも反映
    watch(
      local_val,
      (newVal) => {
        emit("update:modelValue", { ...newVal });
      },
      { deep: true }
    );

    return {
      local_val,
      haibenInput,
      validateWeight,
    };
  },
  
  
  });
</script>
    