<template>
  <v-card class="login-wrapper">
    <div class="bg_1" ref="loginBg_1">
      
    </div>
    <div class="bg_2" ref="loginBg_2"></div>
    <div class="bg_3" ref="loginBg_3"></div>
    <v-row>
      <v-col cols="6" class="illustration opa_0" ref="signup">
        <v-form ref="form" lazy-validation class="pa-10" v-show="!onSignIn">
          <p class="display-1 font-weight-bold mb-6 linear-gradient_text_2">Sign Up</p>
          <div class>
            <v-text-field
              :rules="emailRules"
              prepend-icon="mdi-account"
              type="text"
              label="E-mail"
              required
            />
            <v-text-field
              label="Password"
              prepend-icon="mdi-lock"
              :rules="passwordRules"
              required
            />
            <v-text-field
              label="Password"
              prepend-icon="mdi-lock"
              :rules="passwordRules"
              required
            />
          </div>
          <div>
            <v-btn
              class="mt-5 linear-gradient_2 white--text"
              min-width="100%"
              :disabled="!valid"
            >Create Account</v-btn>
            <p class="mt-3 fs-15" style="text-align: center">
              <span>Do have account? Sign in </span>
              <span
                class="blue--text"
                style="cursor: pointer; text-decoration: underline;"
                @click="handleChange"
              >here.</span>
            </p>
          </div>
        </v-form>
      </v-col>
      <v-col cols="6" class="illustration" ref="signin">
        <v-form ref="form" v-model="valid" lazy-validation class="pa-10" v-show="onSignIn">
          <p class="display-1 font-weight-bold mb-4 linear-gradient_text_1">Sign In</p>
          <p class="errorMessage fs-15 red--text d-flex align-center">
            <v-icon class="red--text" v-if="loginErrorMessage">mdi-alert-circle-outline</v-icon>
            <span class="pl-1">{{loginErrorMessage}}</span>
          </p>
          <div>
            <v-text-field
              v-model="email"
              :rules="emailRules"
              prepend-icon="mdi-account"
              type="text"
              label="E-mail"
              required
            />
            <v-text-field
              v-model="password"
              label="Password"
              prepend-icon="mdi-lock"
              :append-icon="mouseoverPass ? showPassword ? 'mdi-eye' : 'mdi-eye-off' : ''"
              :rules="passwordRules"
              :type="showPassword ? 'text' : 'password'"
              @focus="mouseoverPass = true"
              @blur="mouseoverPass = false"
              @click:append="showPassword = !showPassword"
              required
              autocomplete="new-password"
            />
          </div>
          <div>
            <v-btn
              class="mt-5 linear-gradient_1 white--text"
              min-width="100%"
              :disabled="!valid || isLoading"
              @click="submit"
              :loading="isLoading"
            >Login</v-btn>
            <p class="mt-3 fs-15" style="text-align: center">
              <span>Don't have account? Create one </span>
              <span
                class="blue--text"
                style="cursor: pointer; text-decoration: underline;"
                @click="handleChange"
              >here.</span>
            </p>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";

export default {
  props: {
    closeDialog: Function
  },
  data: () => {
    return {
      onSignIn: true,
      mouseoverPass: false,
      showPassword: false,
      valid: true,
      email: "",
      password: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      passwordRules: [v => !!v || "Password is required"],
      loginErrorMessage: "",
      notifyMessage: "",
      isLoading: false
    };
  },
  mounted() {},
  destroyed() {
    console.log("login component detroy");
  },
  methods: {
    ...mapActions(["saveUserData"]),
    clearData(){
      this.loginErrorMessage = "";
    },
    handleChange() {
      this.clearData();
      this.onSignIn = !this.onSignIn;
      if( !this.onSignIn ){
        this.$refs.loginBg_1.classList.add("sign-up__animation");
        this.$refs.loginBg_1.classList.remove("sign-in__animation");
      }
      else {
        this.$refs.loginBg_1.classList.remove("sign-up__animation");
        this.$refs.loginBg_1.classList.add("sign-in__animation");
      }
      this.$refs.loginBg_2.classList.toggle("bg2-transition");
      this.$refs.loginBg_3.classList.toggle("bg3-transition");
      this.$refs.signin.classList.toggle("opa_0");
      this.$refs.signup.classList.toggle("opa_0");
    },
    submit() {
      if (this.$refs.form.validate()) {
        axios
          .post(
            this.$store.state.dbUrl + "/user/login",
            {
              email: this.email,
              password: this.password
            },
            {
              withCredentials: true
            }
          )
          .then(res => {
            this.isLoading = false;
            const status = res.data.status;
            if (status === "success") {
              this.saveUserData({
                userData: res.data.data,
                isLogin: true
              });
              this.$emit("closeDialog");
            } else {
              const error_code = res.data.error_code;
              if (error_code && error_code === "EMAIL_OR_PASSWORD_INCORRECT") {
                this.loginErrorMessage = "Email or password incorrect.";
              }
            }
          })
          .catch(err => {
            this.isLoading = false;
            console.log(err);
            this.loginErrorMessage = "No response from server. Please try later!";
            // this.$emit("closeDialog");
            // this.$router.push("/error");
          });
        this.isLoading = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.login-wrapper {
  position: relative;
  width: 900px;
  height: 475px;
  overflow: hidden;
  background-color: white;
  margin-top: -50px;
  .bg_1 {
    position: absolute;
    top: 0;
    left: -51%;
    width: 1000px;
    z-index: 0;
    height: 100%;
    background-image: url("../assets/bg2.png");
  }

  .bg_2{
    position: absolute;
    top: 30%;
    left: 10%;
    width: 383px;
    z-index: 1;
    height: 250px;
    background-image: url("../assets/bg_signIn_2.png");
    transition: all 1000ms linear;
  }

  .bg_3{
    position: absolute;
    top: 20%;
    right: -100%;
    width: 330px;
    z-index: 1;
    height: 250px;
    background-image: url("../assets/bd_signUp_2.png");
    transition: all 1000ms linear;
  }

  .illustration {
    z-index: 2;
    opacity: 1;
    transition: all 1200ms linear;
    .errorMessage{
      min-height: 25px;
    }
  }
}

.opa_0 {
  opacity: 0 !important;
}

.sign-up__animation {
  animation: bg-animation__1 1500ms forwards;
}

.sign-in__animation {
  animation: bg-animation__2 1500ms forwards;
}

.bg2-transition{
  left: -100% !important;
}

.bg3-transition{
  right: 10% !important;
}

@keyframes bg-animation__2 {
  0% {
    left: 50%;
    top: 0;
  }
  47% {
    left: 110%;
    top: 0;
  }
  48% {
    left: 110%;
    top: -100%;
  }
  49% {
    left: -110%;
    top: -100%;
  }
  50% {
    left: -110%;
    top: 0;
  }
  100% {
    left: -51%;
    top: 0;
  }
}

@keyframes bg-animation__1 {
  0% {
    left: -51%;
    top: 0;
  }
  47% {
    left: -110%;
    top: 0;
  }
  48% {
    left: -110%;
    top: -100%;
  }
  49% {
    left: 110%;
    top: -100%;
  }
  50% {
    left: 110%;
    top: 0;
  }
  100% {
    left: 50%;
    top: 0;
  }
}
</style>
