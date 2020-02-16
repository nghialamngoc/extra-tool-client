<template>
  <v-card :loading="loading" class="createDialog">
    <v-toolbar dark color="primary">
      <v-btn icon dark @click="onClose">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title>New Article</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-container fluid>
        <v-form ref="form" v-model="valid" @submit.prevent>
          <v-row class="mt-2">
            <v-col cols="2" class="pa-1">
              <v-text-field label="Author*" dense required v-model="authorInputValue" readonly></v-text-field>
            </v-col>
            <v-col cols="8" class="pa-1">
              <v-text-field
                label="Title*"
                dense
                required
                v-model="titleInputValue"
                :rules="titleRules"
                ref="titleInputEl"
              ></v-text-field>
            </v-col>
            <v-col cols="2" class="pa-1 d-flex align-center">
              <p class="ma-2">Active:</p>
              <div style="height:100%;">
                <neumorphism-toggle ref="activeToggle"></neumorphism-toggle>
              </div>
            </v-col>
            <v-col cols="6" class="pa-1">
              <v-select v-model="tagValue" :items="items" attach chips label="Tag" dense></v-select>
            </v-col>
            <v-col cols="6"></v-col>
            <v-col cols="12" class="pa-1">
              <p>Content*:</p>
              <froala :tag="'textarea'" :config="froalaConfig" v-model="content"></froala>
            </v-col>
          </v-row>
        </v-form>
      </v-container>
      <neumorphism-button :text="'Save'" v-on:func="onSave()"></neumorphism-button>
    </v-card-text>
  </v-card>
</template>

<script>
//<editor-component class="editor-wrapper" ref="editor"></editor-component>
//import Editor from "./EditorQuill";
import NeumorphismButton from "../components/NeumorphismButton";
import NeumorphismToggle from "../components/NeumorphimsmToggle";
import axios from "axios";
import { EventBus } from '../event-bus';

export default {
  props: {
    closeDialog: Function,
    addNewArticle: Function
  },
  components: {
    //"editor-component": Editor
    "neumorphism-button": NeumorphismButton,
    "neumorphism-toggle": NeumorphismToggle
  },
  data: vm => ({
    froalaConfig: {
      placeholderText: "Edit Your Content Here!",
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
    content: "",
    loading: false,
    valid: false,
    items: [
      "javascript",
      "vuejs",
      "css",
      "typescript",
      "react",
      "design",
      "algorithms",
      "english"
    ],
    tagValue: "",
    isReviewed: false,
    titleInputValue: "",
    titleRules: [
      v => !!v || "Title is required",
      v => (v && v.length < 100) || "Title must be less than 100 characters"
    ],
    authorInputValue: vm.$store.state.usData.usName
  }),
  watch: {
    $route() {
      this.tagValue = this.$route.query.type ? this.$route.query.type : "";
    }
  },
  mounted() {
    this.tagValue = this.$route.query.type ? this.$route.query.type : "";
  },
  methods: {
    onClose() {
      this.$emit("closeDialog");
    },
    onSave() {
      if( this.content === ""){
        EventBus.$emit('alert-message', { type: "error", message: "You can't create a new article with empty content"});
      }
      if ( this.$refs.form.validate() && this.content != "" ) {
        this.loading = true;
        axios
          .post(
            this.$store.state.dbUrl + "/article",
            {
              authorId: this.$store.state.usData.usId,
              title: this.titleInputValue,
              tags: this.tagValue,
              //content: this.$refs.editor.editor.getHTML(),
              //content: this.$refs.editor.htmlForEditor,
              content: this.content,
              isReviewed: this.$refs["activeToggle"].$data.status,
              createDate: Date.now()
            },
            {
              withCredentials: true
            }
          )
          .then(res => {
            this.loading = false;
            this.onClose();
            this.$emit("addNewArticle", res.data.data);
          })
          .catch(err => {
            this.loading = false;
            console.log(err);
          });
      }
    }
  }
};
</script>

<style lang="scss">
// .editor-wrapper {
//   border: 1px solid #ccc;
//   margin: 0 !important;
//   .menubar {
//     border-bottom: 1px solid #ccc;
//     padding: 5px;
//   }
//   .editor__content {
//     padding: 0 10px 0 10px;
//     font-size: 15px;
//   }
// }
.createDialog {
  background: #ececec !important;
}
</style>