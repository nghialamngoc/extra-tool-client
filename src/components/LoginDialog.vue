<template>
  <v-card class="elevation-12" :loading="isLoading">
    <v-toolbar color="primary" dark flat>
      <v-toolbar-title>Login</v-toolbar-title>
      <v-spacer />
    </v-toolbar>
    <v-card-text class="pb-2">
      <v-form ref="form" v-model="valid" lazy-validation>
        <br v-if="!errorMessage && !notifyMessage">
        <p v-if="errorMessage" class="pt-4 mb-0 red--text font-weight-medium font-italic subtitle-1">- {{errorMessage}}</p>
        <div v-if="notifyMessage" class="pt-4 mb-0 subtitle-1 d-flex align-center ">
          <v-icon class="yellow--text text--darken-3 fs-35">mdi-alert-box-outline</v-icon>
          <span class="ml-2">{{notifyMessage}}</span>
        </div>
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
          :rules="passwordRules"
          type="password"
          required
          autocomplete="new-password"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn color="primary" :disabled="!valid" @click="submit">Login</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'

export default {
  props: {
    closeDialog: Function
  },
  data: () => {
    return {
      valid: true,
      email: "",
      password: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      passwordRules: [v => !!v || "Password is required"],
      errorMessage: "",
      notifyMessage: "",
      isLoading: false
    };
  },
  mounted(){
  },
  destroyed(){
    console.log('login component detroy')
  },
  methods: {
    ...mapActions(['saveUserData']),
    submit() {
      if (this.$refs.form.validate()) {
        axios.post( this.$store.state.dbUrl + '/user/login',{
          email: this.email,
          password: this.password
        },
        {
          withCredentials: true
        }).then(res => {
          this.isLoading = false;
          const status = res.data.status;
          if( status === 'success' ){
            this.saveUserData({
              userData: res.data.data, 
              isLogin: true
            });
            this.$emit('closeDialog');
          }
          else {
            const error_code = res.data.error_code;
            if( error_code && error_code === 'EMAIL_OR_PASSWORD_INCORRECT' ){
              this.errorMessage = '- Email or password incorrect.'
            }
          }
        }).catch(err => {
          this.isLoading = false;
          console.log(err);
          this.$emit('closeDialog')
          this.$router.push('/error')
        });
        this.isLoading = true;
      }
    },
  }
};
</script>
