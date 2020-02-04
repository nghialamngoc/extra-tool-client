<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app temporary>
      <v-list dense>
        <template v-for="item in items">
          <v-row v-if="item.heading" :key="item.heading" align="center">
            <v-col cols="6">
              <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
            </v-col>
            <v-col cols="6" class="text-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-col>
          </v-row>
          <v-list-group
            v-else-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon
          >
            <template v-slot:activator>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>{{ item.text }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
            <v-list-item v-for="(child, i) in item.children" :key="i" link :to="child.linkTo" exact>
              <v-list-item-action v-if="child.icon">
                <v-icon :class="[child.textClass]">{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title :class="[child.textClass]">{{ child.text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item v-else :key="item.text" link>
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="#0A0A23" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <span>Dev'Coffee</span>
      </v-toolbar-title>
      <v-spacer />
      <v-menu
        close-on-click
        close-on-content-click
        offset-y
        v-if="$store.state.isLogin === true"
      >
      <template v-slot:activator="{ on }">
        <v-btn class="text-none"
          color="white"
          dark
          v-on="on"
          text
          small
        >
          <img :src="$store.state.usData.usAva" alt="avatar" width="30px" height="30px" class="mr-2">
          {{$store.state.usData.usName}}
          <v-icon right>mdi-menu-down</v-icon>
        </v-btn>
      </template>
      <v-list dense>
        <v-list-item
          v-for="(item, index) in userMenuItems"
          :key="index"
          @click="item.onClick"
        >
          <v-icon small class="mr-2">{{ item.icon }}</v-icon>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
      <v-btn icon @click="openLoginDialog()" v-if="$store.state.isLogin === false">
        <v-icon>mdi-login</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <router-view @login="openLoginDialog"></router-view>
    </v-content>
    <v-dialog
      v-model="isOpenLoginDialog"
      width="550px"
    >
      <app-login v-on:closeDialog="closeLoginDialog()" ref="loginComponent"></app-login>
    </v-dialog>
  </v-app>
</template>

<script>
import LoginComponent from './components/LoginDialog'
import { mapActions } from 'vuex'
import axios from 'axios'

export default {
  name: "App",
  components: {
    "app-login": LoginComponent
  },

  data: (vm) => ({
    isOpenLoginDialog: false,
    drawer: false,
    items: [
      {
        icon: "mdi-chevron-up",
        text: "Articles",
        model: true,
        "icon-alt": "mdi-chevron-down",
        children: [
          { icon: "mdi-language-javascript", text: "Javascripts", textClass: "yellow--text text--darken-2", linkTo: '/articles?type=javascript' },
          { icon: "mdi-vuejs", text: "VueJs", textClass: "green--text", linkTo: '/articles?type=vuejs' },
          { icon: "mdi-react", text: "ReactJs", textClass: "blue--text", linkTo: '/articles?type=reactjs' },
          { icon: "mdi-alpha-e-box-outline", text: "English", textClass: "red--text", linkTo: '/articles?type=english' }
        ]
      },
      { icon: "mdi-history", text: "TimeLine" },
    ],
    userMenuItems: [
      { title: 'Messages', icon: 'mdi-message-alert', onClick: vm.nothing },
      { title: 'Notification', icon: 'mdi-bell-ring', onClick: vm.nothing },
      { title: 'Logout', icon: 'mdi-logout', onClick: vm.logout }
    ],
  }),
  mounted(){
    this.checkLogin();
  },
  methods: {
    ...mapActions(['checkLogin', 'saveUserData']),
    nothing(){
      //TODO: will update later
    },
    logout(){
      try {
        axios.get(this.$store.state.dbUrl + '/user/logout', {
          withCredentials: true
        }).then(() => {
          this.saveUserData({
            userData: {}, 
            isLogin: false
          });
        });
      } catch( err ){
        console.log(err)
      }
    },
    openLoginDialog( notifyMessage ){
      if(this.$refs.loginComponent){
        this.$refs.loginComponent.$data.notifyMessage = '';
        this.$refs.loginComponent.$data.errorMessage = '';
        this.$refs.loginComponent.$refs.form.reset();
      }
      if( notifyMessage )
        this.$refs.loginComponent.$data.notifyMessage = notifyMessage;
      this.isOpenLoginDialog = true;
    },
    closeLoginDialog(){
      this.isOpenLoginDialog = false;
    },
  }
};
</script>
<style scoped>
  .row{ 
    margin: 0;
  }
</style>
