<template>
  <div style="background-color: white;">
    <quill-editor ref="myTextEditor"
      v-model="content"
      :options="editorOption"
    >
    </quill-editor>
  </div>
</template>

<script>
import hljs from 'highlight.js'
import 'quill/dist/quill.snow.css'

export default {
  data() {
    return {
      content: ``,
      editorOption: {
        placeholder: 'Fill you content here',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'font': [] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'align': [] }],
            ['clean'],
            ['link', 'image', 'video']
          ],
          syntax: {
            highlight: text => { 
              console.log(hljs.highlightAuto(text).value)
              return hljs.highlightAuto(text).value
            }
          }
        }
      }
    };
  }
};
</script>

<style>
.ql-editor{
  font-family: "Roboto", sans-serif;
  height: 20vh !important;
}
</style>