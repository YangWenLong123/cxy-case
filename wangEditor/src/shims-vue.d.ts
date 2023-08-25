/*
 * @Author: along
 * @Description:
 * @Date: 2023-08-25 13:45:54
 * @LastEditors: along
 * @LastEditTime: 2023-08-25 15:17:43
 * @FilePath: /cxy-case/wangEditor/src/shims-vue.d.ts
 */
// import { SlateElement } from "@wangeditor/editor";

declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}

declare module "@wangeditor/editor-for-vue";

// type ImageElement = SlateElement & {
//   src: string;
//   alt: string;
//   url: string;
//   href: string;
// };
