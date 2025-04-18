<template>
  <section class="bg-white p-4 mb-4 border border-gray-300 rounded">
    <h2 class="text-base font-bold mb-3 border-b border-gray-300 pb-1">記録欄</h2>
    <div class="overflow-x-auto">
      <!-- デバッグ情報（開発時のみ表示） -->
      <div v-if="false" class="mb-2 p-2 bg-gray-100 rounded text-xs">
        ModelValue length: {{ modelValue.length }}
        <pre>{{ JSON.stringify(modelValue, null, 2) }}</pre>
      </div>
      
      <table class="w-full border-collapse mb-2">
        <thead>
          <tr>
            <th class="border border-gray-300 p-2 bg-gray-100 text-sm text-left">時間</th>
            <th class="border border-gray-300 p-2 bg-gray-100 text-sm text-left">区分</th>
            <th class="border border-gray-300 p-2 bg-gray-100 text-sm text-left">記録内容</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(record, index) in formattedRecords" :key="index" class="hover:bg-blue-50">
            <td class="border border-gray-300 p-2 text-sm">{{ record.time }}</td>
            <td class="border border-gray-300 p-2 text-sm">{{ record.record_type }}</td>
            <td class="border border-gray-300 p-2 text-sm">{{ record.txt_val }}</td>
          </tr>
          <tr v-if="formattedRecords.length === 0">
            <td colspan="4" class="border border-gray-300 p-4 text-center text-gray-500">
              記録がありません
            </td>
          </tr>
        </tbody>
      </table>
      
      <!-- デバッグ情報（開発時のみ表示） -->
      <div v-if="false" class="mt-2 p-2 bg-gray-100 rounded text-xs">
        Formatted records length: {{ formattedRecords.length }}
        <pre>{{ JSON.stringify(formattedRecords, null, 2) }}</pre>
      </div>
    </div>
  </section>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'RecordSection',
  props: {
    modelValue: {
      type: Array,
      default: () => ([]),
      required: true,
    }
  },
  
  setup(props) {
    // props.modelValueの変更をログに出力（デバッグ用）
    console.log('記録の値:', props.modelValue);
    
    // 表示用にデータを整形する
    const formattedRecords = computed(() => {
      console.log('Computing formattedRecords with:', props.modelValue);
      
      // modelValueが存在しない場合は空配列を返す
      if (!props.modelValue) {
        console.log('modelValue is null or undefined');
        return [];
      }
      
      // modelValueが配列でない場合は空配列を返す
      if (!Array.isArray(props.modelValue)) {
        console.log('modelValue is not an array:', typeof props.modelValue);
        return [];
      }
      
      // 空の配列の場合
      if (props.modelValue.length === 0) {
        console.log('modelValue is an empty array');
        return [];
      }
      
      console.log('Processing', props.modelValue.length, 'records');
      
      // フィルタリングとマッピング
      const filtered = props.modelValue
        .filter(record => {
          // nullチェック
          if (!record) {
            console.log('Found null/undefined record');
            return false;
          }
          
          // 削除フラグのチェック
          if (record.is_delete_flg) {
            console.log('Filtered out deleted record');
            return false;
          }
          
          // txt_valが存在し、空でないことを確認
          const hasValidContent = record.txt_val && record.txt_val.trim() !== '';
          if (!hasValidContent) {
            console.log('Filtered out record with no content');
            return false;
          }
          
          return true;
        })
        .map(record => {
          console.log('Processing record:', record);
          return {
            time: record.time || '',
            record_type: record.record_type || '記録',
            txt_val: record.txt_val || '',
            staff_name: record.staff_name || '',
            row_id: record.row_id || 0
          };
        });
      
      // 時間順にソート
      const sorted = [...filtered].sort((a, b) => {
        // timeプロパティが両方存在する場合はそれでソート
        if (a.time && b.time) {
          return a.time.localeCompare(b.time);
        } 
        
        // timeがない場合は並び順をそのまま維持
        return 0;
      });
      
      console.log('Returning', sorted.length, 'formatted records');
      return sorted;
    });
    
    return {
      formattedRecords
    };
  }
}
</script>

<style scoped>
/* スタイリングが必要な場合はここに追加 */
</style> 