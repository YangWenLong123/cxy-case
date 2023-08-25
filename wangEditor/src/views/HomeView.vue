<!--
 * @Author: along
 * @Description: 
 * @Date: 2023-08-25 13:45:54
 * @LastEditors: along
 * @LastEditTime: 2023-08-25 15:30:40
 * @FilePath: /cxy-case/wangEditor/src/views/HomeView.vue
-->
<template>
  <div class="box">
    <div class="left">
      <div style="border: 1px solid #ccc;">
        <Toolbar
          style="border-bottom: 1px solid #ccc"
          :editor="editor"
          :defaultConfig="toolbarConfig"
          :mode="mode"
        />
        <Editor
          style="height: 500px; overflow-y: hidden;"
          v-model="html"
          :defaultConfig="editorConfig"
          :mode="mode"
          @onCreated="onCreated"
        />
      </div>
      <br />
      <button @click="getHtml()">获取html内容</button>
      <button @click="setHtml()">设置内容</button>
      <button @click="clearHtml()">清空</button>
    </div>
    <div class="right">
      <pre>
        <code>
          {{  code }}
        </code>
      </pre>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
  import "@wangeditor/editor/dist/css/style.css";

  @Component({
    components: { Editor, Toolbar },
  })
  export default class HomeView extends Vue {
    public code: string = "";
    public editor: any = null;
    public html: any = null;
    public toolbarConfig: object = {};
    public editorConfig: any = {
      placeholder: "请输入内容",
      MENU_CONF: {
        uploadImage: {
          server: "/api/upload-img",
          timeout: 5 * 1000, // 5s
          fieldName: "custom-fileName",
          meta: { token: "xxx", a: 100 },
          metaWithUrl: true, // join params to url
          headers: { Accept: "text/x-json" },
          maxFileSize: 10 * 1024 * 1024, // 10M
          base64LimitSize: 5 * 1024, // insert base64 format, if file's size less than 5kb
          onBeforeUpload(file: any) {
            console.log("onBeforeUpload", file);
            return file; // will upload this file
          },
          onProgress(progress: any) {
            console.log("onProgress", progress);
          },
          onSuccess(file: any, res: any) {
            console.log("onSuccess", file, res);
          },
          onFailed(file: any, res: any) {
            alert(res.message);
            console.log("onFailed", file, res);
          },
          onError(file: any, err: any, res: any) {
            alert(err.message);
            console.error("onError", file, err, res);
          },
        },
      },
    };
    public mode: string = "default";

    onCreated(editor: any) {
      this.editor = Object.seal(editor);
    }

    beforeDestroy() {
      const editor = this.editor;
      if (editor == null) return;
      editor.destroy(); // 组件销毁时，及时销毁编辑器
    }

    mounted() {}

    setEditConfig() {}

    getHtml() {
      const html = this.editor.getHtml();

      this.code = html;

      console.log(html);
    }

    setHtml() {
      this.html = `<p>模拟 Ajax 异步设置内容 HTML</p><h1>1</h1><h3>22</h3><p>333</p><p><strong>1111。</strong><em><strong>3223。</strong></em><span style="color: rgb(225, 60, 57);"><em><strong>2312324。 </strong></em></span></p><p><br></p><ul><li><span style="color: rgb(225, 60, 57);"><em><strong>11</strong></em></span></li><li><span style="color: rgb(225, 60, 57);"><em><strong>2</strong></em></span></li><li><span style="color: rgb(225, 60, 57);"><em><strong>32</strong></em></span></li><li></li></ul><p><span style="color: rgb(225, 60, 57);"><em><strong>😀</strong></em></span></p><p><span style="color: rgb(225, 60, 57);"><em><strong> </strong></em></span><a href="http://www.alongweb.top" target="_blank">112</a> </p><p><br></p><p><br></p>`;
    }

    clearHtml() {
      this.editor.clear();
      this.code = "";
    }
  }
</script>

<style lang="scss">
  .box {
    width: 100%;
    display: flex;
    .left,
    .right {
      width: 50%;
      padding: 24px;
      code {
        white-space: normal;
      }
    }
  }
</style>
