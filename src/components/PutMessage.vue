<template>  
    <div class="pushtxt">
        <input type="text" v-model="messageval" />
    </div>
</template>
  
  <script>
  import { signInWithEmailAndPassword } from "firebase/auth";
  
  export default {
    components: {
      LoadingAnimationComponent,
    },
    setup(props, { emit }) {
        const messageval = ref('');

            //--------------------------------------------------------------//
        return {
            messageval,
        };
    },
  };
  </script>
  
  <style scoped>
  .container input {
    width: 400px;
  }
  </style>
  