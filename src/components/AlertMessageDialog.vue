<template>
  <div class="alert-message-wrapper">
    <template v-if="warningList.length > 0">
      <div v-for="( warning, index ) in warningList" v-bind:key="index" class="alert-message_one d-flex align-center" :style="{ 'border-left': '10px solid', 'border-color': 'red' }">
        <div class="alert-message-one__icon">
          <v-icon class="red--text icon">mdi-close-circle</v-icon>
        </div>
        <div class="alert-message-one__content">
          <p>Error</p>
          <p>Content is required</p>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  data(){
    return {
      warningList: []
    }
  },
  methods: {
    warningPush( warning ){
      this.warningList.push(warning);
    }
  }
}
</script>

<style lang="scss" scoped>
  .alert-message-wrapper{
    width: auto;
    height: auto;
    z-index: 999;
    position: fixed;
    top: 60px;
    right: 0;
    .alert-message_one{
      background-color: white;
      min-width: 400px;
      padding: 10px 40px 10px 20px;
      margin-bottom: 10px;
      .alert-message-one__icon{
        padding: 0 20px 0 10px;
        .icon{
          font-size: 30px;
        }
      }
      .alert-message-one__content{
        p:nth-child(1){
          font-size: 19px;
          font-weight: 500;
        }
        p:nth-child(2){
          font-size: 15px;
          color: gray;
        }
      }
    }
  }
</style>