<template>
  <div id="app">
    <ckeditor
      :editor="editor"
      v-model="editorData"
    ></ckeditor>
  </div>
</template>

<script>
import CKEditor from '@ckeditor/ckeditor5-vue2';
//import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import FullBuild from "./ckeditor/build/ckeditor";


export default {
  name: "app",
  components: {
    ckeditor: CKEditor.component,
  },
  data() {
    return {
      editor: FullBuild,
      editorData: "<p>Content of the editor.</p>",
      editorConfig: {
        toolbar: {
					items: [
						'heading',
						'|',
						'undo',
						'redo',
						'|',
						'alignment',
						'|',
						'bold',
						'italic'
					]
				},
      },
    };
  },
};
</script>