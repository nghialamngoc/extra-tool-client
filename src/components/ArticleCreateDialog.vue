<template>
  <v-card :loading="loading">
    <v-toolbar dark color="primary">
      <v-btn icon dark @click="onClose">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title>New Article</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn dark text :disabled="!valid" @click="onSave">Save</v-btn>
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
    addNewArticle: Function
  },
  components: {
    "editor-component": Editor
  },
  data: vm => ({
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
    authorInputValue: vm.$store.state.usData.usName
  }),
  watch: {
    $route() {
      this.tagValue = this.$route.query.type ? [this.$route.query.type] : [];
    }
  },
  mounted() {
    this.tagValue = this.$route.query.type ? [this.$route.query.type] : [];
  },
  methods: {
    onClose() {
      this.$emit("closeDialog");
    },
    onSave() {
      this.loading = true;      
      axios
        .post(this.$store.state.dbUrl + "/article", {
          authorId: this.$store.state.usData.usId,
          title: this.titleInputValue,
          tags: this.tagValue.join(","),
          content: this.$refs.editor.editor.getHTML(),
          isReviewed: this.isReviewed,
          createDate: Date.now()
        })
        .then(res => {
          this.loading = false;
          this.$emit('addNewArticle', res.data.data)
          this.onClose();
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