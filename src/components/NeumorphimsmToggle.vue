<template>
  <div class="toggle">
    <input type="checkbox" v-model="model">
  </div>
</template>

<script>
export default {
  data(){
    return {
      model: false
    }
  }
}
</script>

<style lang="scss" scoped>
  .toggle{
    position: absolute;
    height: 50px;
    width: 110px;
    box-shadow: -7px -7px 15px rgba(255, 255, 255, 0.65), 7px 7px 15px rgba(70, 70, 70, 0.12);
    border-radius: 5px;
    display: flex;
    align-items: center;

    input[type="checkbox"] {
      position: absolute;
      -webkit-appearance: none;
      height: 40px;
      width: 75px;
      border-radius: 40px;
      border: 2px solid #ececec;
      box-shadow: -7px -7px 15px rgba(255, 255, 255, 0.65), 7px 7px 15px rgba(70, 70, 70, 0.12),
      inset -7px -7px 15px rgba(255, 255, 255, 0.65), inset 7px 7px 15px rgba(70, 70, 70, 0.12);
      left: 5px;
      outline: none;
      cursor: pointer;

      &::before, &::after {
        content: "";
        position: absolute;
        margin: auto;
        top: 0;
        bottom: 0;
        transition: 0.3s
      };

      &::before {
        height: 26px;
        width: 26px;
        background-color: #ececec;
        border-radius: 50%;
        box-shadow: -7px -7px 15px rgba(255, 255, 255, 0.65), 7px 7px 15px rgba(70, 70, 70, 0.12);
        left: 5px;
      };

      &::after {
        height: 8px;
        width: 8px;
        background-color: gray;
        border-radius: 50%;
        left: 80px;
      };

      &:checked::before{
        left: 38px;
      };

      &:checked::after{
        background-color: #55f696;
      }
    }
  }
</style>