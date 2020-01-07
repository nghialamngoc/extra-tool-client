<template>
  <v-card :loading="loading">
    <v-toolbar dark color="primary">
      <v-btn icon dark @click="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title>New Article</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn dark text :disabled="!valid" @click="save">Save</v-btn>
      </v-toolbar-items>
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
            <v-col cols="1" class="pa-1">
              <v-switch v-model="isReviewed" :disabled="!($store.state.usData.usRole == 'Admin')" :label="'Active'" dense class="ml-4"></v-switch>
            </v-col>
            <v-col cols="6" class="pa-1">
              <v-select v-model="tagValue" :items="items" attach chips label="Tags" dense multiple></v-select>
            </v-col>
            <v-col md="6"></v-col>
            <v-col cols="12" class="pa-1">
              <p>Content*:</p>
              <editor-component class="editor-wrapper" ref="editor"></editor-component>
            </v-col>
          </v-row>
        </v-form>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import Editor from "./Editor";
import axios from "axios";

export default {
  props: {
    closeDialog: Function,
    update: Function,
    articleData: {}
  },
  components: {
    "editor-component": Editor
  },
  data: () => ({
    loading: false,
    valid: false,
    items: ["javascript", "vuejs", "css", "typescript", "react", "angular", "algorithms"],
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
    this.tagValue.push(this.articleData.tags);
    this.authorInputValue = this.articleData.author.name;
    this.titleInputValue = this.articleData.title;
    this.isReviewed = this.articleData.isReviewed;
    this.articleId = this.articleData._id
  },
  mounted(){
    this.$refs.editor.editor.setContent(this.articleData.content)
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
          content: this.$refs.editor.editor.getHTML(),
          isReviewed: this.isReviewed,
          editDate: Date.now()
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
.editor-wrapper {
  border: 1px solid #ccc;
  margin: 0 !important;
  .menubar {
    border-bottom: 1px solid #ccc;
    padding: 5px;
  }
  .editor__content {
    padding: 0 10px 0 10px;
    font-size: 15px;
  }
}
</style>