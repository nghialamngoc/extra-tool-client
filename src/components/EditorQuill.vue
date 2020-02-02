<template>
  <div id="app">
    <vue-editor id="editor" v-model="htmlForEditor"> </vue-editor>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
//import axios from "axios";
import $ from "jquery";

export default {
  components: {
    VueEditor
  },
  data() {
    return {
      htmlForEditor: ""
    };
  },
  mounted(){
    this.$nextTick(() => {
      var self = this;
      $(".ql-editor").on("paste", function(e) {
        console.log('here')
        var orgEvent = e.originalEvent;
        for (var i = 0; i < orgEvent.clipboardData.items.length; i++) {
          if (
            orgEvent.clipboardData.items[i].kind == "file" &&
            orgEvent.clipboardData.items[i].type == "image/png"
          ) {
            var imageFile = orgEvent.clipboardData.items[i].getAsFile();
            var fileReader = new FileReader();
            fileReader.onloadend = function() {
              var imgElm = `<img src="${fileReader.result}" alt="">`;
              self.pasteHtmlAtCaret(imgElm)
            };
            fileReader.readAsDataURL(imageFile);
            break;
          }
        }
      });
    });
  },
  methods: {
    pasteHtmlAtCaret(html) {
      var sel, range;
      if (window.getSelection) {
        // IE9 and non-IE
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
          range = sel.getRangeAt(0);
          range.deleteContents();

          // Range.createContextualFragment() would be useful here but is
          // non-standard and not supported in all browsers (IE9, for one)
          var el = document.createElement("div");
          el.innerHTML = html;
          var frag = document.createDocumentFragment(),
            node,
            lastNode;
          while ((node = el.firstChild)) {
            lastNode = frag.appendChild(node);
          }
          range.insertNode(frag);

          // Preserve the selection
          if (lastNode) {
            range = range.cloneRange();
            range.setStartAfter(lastNode);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
          }
        }
      } else if (document.selection && document.selection.type != "Control") {
        // IE < 9
        document.selection.createRange().pasteHTML(html);
      }
    },
    //file, Editor, cursorLocation, resetUploader
    handleImageAdded: function() {
      console.log('here')
      // An example of using FormData
      // NOTE: Your key could be different such as:
      // formData.append('file', file)

      // var formData = new FormData();
      // formData.append("image", file);

      // axios({
      //   url: "https://fakeapi.yoursite.com/images",
      //   method: "POST",
      //   data: formData
      // })
      //   .then(result => {
      //     let url = result.data.url; // Get url from response
      //     Editor.insertEmbed(cursorLocation, "image", url);
      //     resetUploader();
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
    }
  }
};
</script>