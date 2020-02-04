import Vue from 'vue'
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    froalaConfig: {
      imagePasteProcess: true,
      imageDefaultWidth: "100%",
      imageDefaultAlign: "left",
      events: {
        "image.beforeUpload": function(images) {
          var editor = this;
          if (images.length) {
            // Create a File Reader.
            var reader = new FileReader();
            // Set the reader to insert images when they are loaded.
            reader.onload = function(e) {
              var result = e.target.result;
              editor.image.insert(result, null, null, editor.image.get());
            };
            // Read image as base64.
            reader.readAsDataURL(images[0]);
          }
          editor.popups.hideAll();
          // Stop default upload chain.
          return false;
        }
      }
    },
    isLogin: undefined,
    isCheckLogin: false,
    usData: {
      usName: '',
      usId: '',
      usRole: '',
      usAva: ''
    },
    dbUrl: process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api/v1' : 'https://sharing-server.herokuapp.com/api/v1'
  },
  mutations:{
    checkLogin(state){
      if(state.isLogin === undefined && !state.isCheckLogin){
        try{          
          axios.post(state.dbUrl + '/user', {}, {
            withCredentials: true
          }).then( res => {          
            if( res.data && res.data.status === 'success' && res.data.data){
              state.isLogin = true;
              state.usData.usName = res.data.data.name;
              state.usData.usRole = res.data.data.rol;
              state.usData.usId = res.data.data.usId;
              state.usData.usAva = res.data.data.avatar;
            }
            else {
              state.isLogin = false;
            }
          }).catch( err => {
            console.log(err)
          })
        }
        finally{
          state.isCheckLogin = true;
        }
      }
    },
    saveUserData(state, { userData, isLogin }){
      if( userData != null && userData != undefined ){
        state.isLogin = isLogin;
        state.usData.usName = userData.name;
        state.usData.usRole = userData.rol;
        state.usData.usAva = userData.avatar;   
      }
    },
    userLogout(state){
      state.isLogin = false;
      state.usData.usName = '';
      state.usData.usRole = '';
      state.usData.usAva = '';
    },
  },
  actions: {
    checkLogin: ({ commit }) => {
      commit('checkLogin')
    },
    saveUserData: ({ commit }, data) => {
      commit('saveUserData', data)
    }
  },
  modules: {
  }
})