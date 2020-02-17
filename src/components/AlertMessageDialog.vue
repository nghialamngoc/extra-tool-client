<template>
  <div class="alert-message-wrapper">
    <template v-if="warningList.length > 0">
      <div class="container">
        <div
          v-for="( warning, index ) in warningList"
          v-bind:key="index"
          class="alert-message_one d-flex align-center"
          :style="{ 'border-left': '10px solid', 'border-color': warning.borderColor, 'top': (index * 80) + 'px' }"
        >
          <div class="alert-message-one__icon">
            <v-icon :class="warning.iconClass">{{warning.icon}}</v-icon>
          </div>
          <div class="alert-message-one__content">
            <p>{{warning.type}}</p>
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
      switch (warning.type){
        case "Error": 
          warning.borderColor = "red";
          warning.icon = "mdi-close-circle";
          warning.iconClass = "red--text"
          break;
        case "Warning":
          warning.borderColor = "#FFC122";
          warning.icon = "mdi-alert";
          warning.iconClass = "amber--text text-darken-1"
          break;
        case "Info":
          warning.borderColor = "blue";
          warning.icon = "mdi-alert-circle";
          warning.iconClass = "blue--text"
      }
      _seft.warningList.push(warning);
      setTimeout(function (){
        _seft.warningList.shift()
      }, 5000)
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
    width: 450px;
    position: relative;
    .alert-message_one {
      position: absolute;
      background-color: white;
      padding: 10px 40px 10px 20px;
      margin-bottom: 10px;
      width: 100%;
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