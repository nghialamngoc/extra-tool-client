<template>
  <v-card :loading="loading" class="editDialog">
    <v-toolbar dark color="primary">
      <v-btn icon dark @click="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title>Edit Article</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-container fluid>
        <v-form 
          ref="form"
          v-model="valid"
          @submit.prevent
        >
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
              ></v-text-field>
            </v-col>
            <v-col cols="2" class="pa-1 d-flex align-center">
              <p class="ma-2">Active:</p>
              <div style="height:100%;">
                <neumorphism-toggle ref="activeToggle"></neumorphism-toggle>
              </div>
            </v-col>
            <v-col cols="6" class="pa-1">
              <v-select v-model="tagValue" :items="items" attach chips label="Tags" dense multiple></v-select>
            </v-col>
            <v-col md="6"></v-col>
            <v-col cols="12" class="pa-1">
              <p>Content*:</p>
              <froala :tag="'textarea'" :config="froalaConfig" v-model="content"></froala>
            </v-col>
          </v-row>
        </v-form>
      </v-container>
      <neumorphism-button :text="'Save'" v-on:func='save()'></neumorphism-button>
    </v-card-text>
  </v-card>
</template>

<script>
//<editor-component class="editor-wrapper" ref="editor"></editor-component>
//import Editor from './EditorQuill';
import axios from 'axios';
import NeumorphismButton from '../components/NeumorphismButton'
import NeumorphismToggle from '../components/NeumorphimsmToggle'

export default {
  props: {
    closeDialog: Function,
    update: Function,
    articleData: {}
  },
  components: {
    //'editor-component': Editor,
    'neumorphism-button': NeumorphismButton,
    'neumorphism-toggle': NeumorphismToggle
  },
  data: vm => ({
    froalaConfig: vm.$store.state.froalaConfig,
    content: "",
    loading: false,
    valid: false,
    items: ["javascript", "vuejs", "css", "typescript", "react", "design", "algorithms"],
    tagValue: [],
    isReviewed: false,
    titleInputValue: "",
    titleRules: [
      v => !!v || "Title is required",
      v => (v && v.length < 100) || "Title must be less than 100 characters"
    ],
    authorInputValue: "",
    articleId: ''
  }),
  created(){
    this.content = this.articleData.content;
    this.tagValue.push(this.articleData.tags);
    this.authorInputValue = this.articleData.author.name;
    this.titleInputValue = this.articleData.title;
    this.isReviewed = this.articleData.isReviewed;
    this.articleId = this.articleData._id
  },
  mounted(){
    //this.$refs.editor.htmlForEditor = this.articleData.content;
  },
  methods: {
    close(){
      this.$emit("closeDialog");
    },
    save() {
      this.loading = true;      
      axios
        .put(this.$store.state.dbUrl + "/article", {
          articleId: this.articleId,
          authorId: this.$store.state.usData.usId,
          title: this.titleInputValue,
          tags: this.tagValue.join(","),
          content: this.$refs.editor.htmlForEditor,
          isReviewed: this.isReviewed,
          editDate: Date.now()
        },{
          withCredentials: true
        })
        .then(res => {
          this.loading = false;
          this.$emit('update', res.data.data)
          this.close()
        })
        .catch(err => {
          this.loading = false;
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss">
.editDialog{
  background: #ececec !important;
}

</style>