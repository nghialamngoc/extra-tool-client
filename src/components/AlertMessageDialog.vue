<template>
  <div class="alert-message-wrapper">
    <template v-if="warningList.length > 0">
      <div class="container">
        <div
          v-for="( warning, index ) in warningList"
          v-bind:key="index"
          class="alert-message_one d-flex align-center"
          :style="{ 'border-left': '10px solid', 'border-color': 'red', 'top': (index * 80) + 'px' }"
        >
          <div class="alert-message-one__icon">
            <v-icon class="red--text icon">mdi-close-circle</v-icon>
          </div>
          <div class="alert-message-one__content">
            <p>Error {{index}}</p>
            <p>{{warning.message}}</p>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      warningList: []
    };
  },
  watch: {
  },
  methods: {
    warningPush(warning) {
      var _seft = this;
      _seft.warningList.push(warning);
      console.log(this.warningList)
      setTimeout(function (){
        _seft.warningList.shift()
      }, 4000)
    }
  }
};
</script>

<style lang="scss" scoped>
.alert-message-wrapper {
  width: auto;
  height: auto;
  z-index: 999;
  position: fixed;
  top: 60px;
  right: 0;
  .container {
    min-width: 500px;
    position: relative;
    .alert-message_one {
      position: absolute;
      background-color: white;
      padding: 10px 40px 10px 20px;
      margin-bottom: 10px;
      animation: alert-message-animation 5000ms linear;
      right: 0;
      .alert-message-one__icon {
        padding: 0 20px 0 10px;
        .icon {
          font-size: 30px;
        }
      }
      .alert-message-one__content {
        p:nth-child(1) {
          font-size: 19px;
          font-weight: 500;
        }
        p:nth-child(2) {
          font-size: 15px;
          color: gray;
        }
      }
    }
  }
}

@keyframes alert-message-animation {
  0% { right: -120%; }
  3% { right: 0%; }
  90% { right: 0%; }
}
</style>