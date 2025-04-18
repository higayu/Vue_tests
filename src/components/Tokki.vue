<template>
  <!------------特記グループ -------------------------------------->
  <div class="w-full flex flex-col gap-1">
    <h3 class="text-lg font-bold font-mono mb-2">特記</h3>
    <div class="w-full" v-for="(tok, index) in modelValue" :key="index">
      <div v-show="!tok.is_delete_flg">

        <div class="flex space-x-4 w-full items-center">
          <!-- 特記の入力欄（幅を縮める） -->
          <div class="flex-grow">
            <input v-model="tok.txt_val"
             type="text"
             class="w-full p-2 border rounded-md"
             placeholder="特記事項の入力"
             :maxlength="40"
             :class="['w-full',  { 'border-red-500 border-2': tok.Not_selected_note, 'border-gray-300': !tok.Not_selected_note}]"
             >
          </div>


          <!-- 記録者のドロップダウンリスト（幅を広げる） -->
          <div>
            <!-- <label class="block text-sm font-medium text-gray-700 mb-1">記録者</label> -->
            <div>
              <select v-model="tok.staff_id" class="bg-white min-w-[140px] p-2 border rounded-md" 
              :class="['w-full', { 'border-red-500 border-2': tok.Not_selected_sf, 'border-gray-300': !tok.Not_selected_sf}]"
                v-if="ShareStore && ShareStore.staffList.length > 0">
                <option disabled value="" selected hidden>スタッフ選択</option>
                <option v-for="user in ShareStore.staffList" :value="user.id" :key="user.id">{{ user.name }}</option>
              </select>
              <div v-else>Loading staff...</div> <!-- staffListが空の場合に表示 -->
            </div>
          </div>


          <!-- 削除ボタン（高さを44pxに統一） -->
          <div class="flex-none self-center">
            <button
              @click="removeTokki(index)"
              type="button"
              class="min-w-[44px] h-[44px] max-xl:min-w-[36px] max-xl:h-[36px] font-mono text-black border border-white rounded-full transition duration-300 flex items-center justify-center hover:bg-gray-500 hover:text-black hover:border-gray-500"
              style="background-color: transparent;">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 追加ボタン -->
    <div class="w-full flex justify-end mt-4">
      <button @click="addTokki" type="button" class="font-mono bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300">
        特記事項を追加
      </button>
    </div>
  </div>
</template>



<script>
import { useShareStore } from "../stores/useShareData.js"; // Piniaストアをインポート
import { ref, watch, onMounted } from 'vue';
export default {
  props: {
    modelValue: {
      type: Array,
      default: () => ([]),
      required: true,
    },
  },

  setup(props, { emit }) {
    const ShareStore = useShareStore();
    // const staffList = ref([]);
    //const localTokki = ref([...props.modelValue]); // 親から受け取ったデータをローカルで保持

    // スタッフリストの取得
    onMounted(() => {
      ShareStore.getStaff();
    });

    // staffListの長さを監視し、0の場合は再読み込みを実行
    watch(
      () => ShareStore.staffList,
      async (newLength) => {
        if (newLength.length == 0) {
          await ShareStore.getStaff();
        }else{
          
        }
      }
    );

    // 特記事項を追加
    const addTokki = () => {
      if (props.modelValue.filter(item => !item.is_delete_flg).length >= 8) {
        alert('これ以上追加できません');
      } else {
        const newRecord = {
          Not_selected_note : false,
          Not_selected_sf : false,
          row_id: 0,
          txt_val: '',
          staff_id: '',
          update_flg: false,
          is_delete_flg: false
        };
        emit('update:modelValue', [...props.modelValue, newRecord]);
      }

    };


        // 特記事項を削除
    const removeTokki = (index) => {

      if (MessageBox_Yes_No('選択項目を削除します。')) {
        if (props.modelValue[index].update_flg) {
          props.modelValue[index].is_delete_flg = true;
          const updatedRecords = [...props.modelValue];
          emit('update:modelValue', updatedRecords);

        } else {
          props.modelValue.splice(index, 1);
          const updatedRecords = [...props.modelValue];
          emit('update:modelValue', updatedRecords);
        }
      }
    };


    // メッセージボックスの確認
    const MessageBox_Yes_No = (message) => {
      return confirm(message + "\nよろしいですか？");
    };

    return {
      //localTokki,
      ShareStore,
      addTokki,
      removeTokki,
      MessageBox_Yes_No,
      // getMaxLength, // これを追加
      // limitInput,
    };
  },
};


</script>

<style scoped>
/* リスト全体のスタイル */
.todo-list {
  list-style-type: none;
  padding: 0;
  margin: 5px auto;
  width: 90%; /* リストの幅を40%に変更 */
}

/* 各リスト項目のスタイル */
.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  margin-bottom: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fffbea; /* 薄い黄色の背景色 */
}

/* 削除ボタンのスタイル */
.remove-btn {
  padding: 3px 8px;
  border: 1px solid #d9534f;
  background-color: #d9534f;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

.remove-btn:hover {
  background-color: #c9302c;
}
</style>
