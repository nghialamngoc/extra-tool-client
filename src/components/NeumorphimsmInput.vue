<template>
  <div class="wrapper">
    <input type="text" placeholder="Search..." class="neumorphimsm-input" v-model="searchString">
    <i class="clearable__clear" v-show="isDisplay" @click="clear">&times;</i>
  </div>
</template>

<script>
export default {
  data(){
    return {
      searchString: ''
    }
  },
  computed: {
    isDisplay(){
      return this.searchString != '';
    }
  },
  methods: {
    clear(){
      this.searchString = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper{
  position: relative;
  .neumorphimsm-input{
    font-style: italic;
    padding: 8px 15px;
    width: 100%;
    height: 44px;
    background-color: #e6e6e6;
    border: none;
    outline: none;
    font-size: 17px;
    border-radius: 10px;
    box-shadow: -7px -7px 20px rgba(255, 255, 255, 0.8), 7px 7px 20px rgba(0, 0, 0, 0.2);
    &:focus{
      box-shadow: inset -7px -7px 20px rgba(255, 255, 255, 0.8),inset 7px 7px 20px rgba(0, 0, 0, 0.2);
    }
  }
  .clearable__clear{
    font-size: 25px;
    position: absolute;
    cursor: pointer;
    top: 50%;
    right: 2%;
    transform: translate(-50%, -50%);
  }
}

</style>