<template>
  <button class="btn__style_1" @click="onClick">{{text}}</button>
</template>

<script>
export default {
  props: {
    func: Function,
    text: {
      type: String
    }
  },
  methods: {
    onClick: function(){
      this.$emit('func')
    }
  }
}
</script>

<style lang="scss" scoped>
  .btn__style_1{
    width: 100px;
    padding: 11px 10px;
    margin: 0px 10px 10px;
    background: #e6e6e6;
    border: none;
    border-radius: 20px;
    color: rgb(50, 207, 207);
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 2px;
    box-shadow: -7px -7px 20px 0 rgba(255, 255, 255, 0.7), 7px 7px 20px 0 rgba(0, 0, 0, 0.2);
    outline: none;

    &:hover{
      box-shadow: inset -7px -7px 20px 0 rgba(255, 255, 255, 0.7), inset 7px 7px 20px 0 rgba(0, 0, 0, 0.2);
    }
  }
</style>