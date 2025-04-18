<template>
  <!----------------------- 水分摂取量グループ --------------->
  <div class="w-full">
    <h3 class="text-lg font-bold font-mono mb-2">水分摂取量</h3>

    <!-- flex-rowで項目を横並びに配置 -->
    <div class="flex flex-row space-x-4 w-full">
      <!-- 各水分量入力フィールド -->
      <div class="flex-1" v-for="(field, key) in waterIntakeFields" :key="key">
        <h4 class="block text-sm font-medium text-gray-700 mb-1">{{ field.label }}</h4>
        <div class="flex flex-col space-y-2">
          <input
            v-model.number="modelValue[key].val"
            type="number"
            class="w-full p-2 border border-gray-300 rounded-md"
            :placeholder="field.placeholder"
            min="0"
            max="10000"
            @input="validateWaterIntake(key)"
          />
        </div>
      </div>

      <!-- 総量の表示 -->
      <div class="flex-1" style="text-align: right;width: 80px;">
        <h4 class="font-semibold" style="text-align: right;width: 80px;">総量</h4>
        <div class="text-xl font-bold pt-2" style="text-align: right;width: 80px;">
          {{ totalAmount }} cc
        </div>
      </div>
    </div>
  </div>
  <!--------------水分摂取量グループ終了------------------>
</template>
  
  <script>
import { defineComponent, ref, computed, watch } from "vue";
  
  export default defineComponent({
      props: {
        modelValue: {
          type: Object, // 期待されるデータが Object の場合
          required: true,
        },
      },


  setup(props, { emit }) {
    // 各入力フィールドのラベルとプレースホルダー
    const waterIntakeFields = {
      waterIntakeMorning: { label: "朝", placeholder: "朝の水分量" },
      waterIntake9am: { label: "9時", placeholder: "9時の水分量" },
      waterIntakeLunch: { label: "昼", placeholder: "昼の水分量" },
      waterIntake15pm: { label: "15時", placeholder: "15時の水分量" },
      waterIntakeDinner: { label: "夕", placeholder: "夕の水分量" },
      waterIntakeOther: { label: "その他", placeholder: "その他" },
    };

    // 入力制限のバリデーション関数
    const validateWaterIntake = (field) => {
      if (props.modelValue[field].val > 10000) {
        props.modelValue[field].val = 10000; // 最大値制限
      }
      // emitで変更を通知
      emit("update:modelValue", { ...props.modelValue });
    };

    // 水分摂取量の合計を計算するコンピューテッドプロパティ
    const totalAmount = computed(() => {
      return Object.values(props.modelValue).reduce(
        (sum, item) => sum + (item.val || 0),
        0
      );
    });

    return {
      waterIntakeFields,
      validateWaterIntake,
      totalAmount,
    };
  },

});
  //--------------------------------------------//
  </script>
  
  <style scoped>
  /* 必要に応じてスタイルを追加または修正してください */
  </style>
  