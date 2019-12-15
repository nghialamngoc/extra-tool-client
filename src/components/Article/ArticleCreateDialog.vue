<template>
  <v-card>
    <v-toolbar dark color="primary">
      <v-btn icon dark @click="onClose">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title>New Article</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn dark text @click="onClose">Save</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-card-text>
      <v-container fluid>
        <v-row>
          <v-col class="pa-1 mt-2">
            <v-text-field label="Author*" dense required></v-text-field>
          </v-col>
          <v-col md="10"></v-col>
          <v-col cols="8" class="pa-1">
            <v-text-field label="Title*" dense required></v-text-field>
          </v-col>
          <v-col cols="6" class="pa-1">
            <v-select v-model="value" :items="items" attach chips label="Tags" dense multiple></v-select>
          </v-col>
          <v-col cols="12" class="pa-1">
            <p>Content*:</p>
            <editor-component class="editor-wrapper"></editor-component>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import Editor from "../Editor/Editor";
export default {
  props:{
    closeDialog: Function
  },
  components: {
    "editor-component": Editor
  },
  data: () => ({
    items: ["javascript", "vuejs", "web development", "tech"],
    value: []
  }),
  methods: {
    onClose(){
      this.$emit('closeDialog')
    }
  }
};
</script>

<style lang="scss" scoped>
.editor-wrapper {
  border: 1px solid #aacfec;
  border-radius: 10px;
  margin: 0 !important;
  padding: 20px;
}
</style>