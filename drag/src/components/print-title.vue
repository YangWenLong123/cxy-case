<!--
 * @Author: along
 * @Description: 
 * @Date: 2023-10-16 14:02:16
 * @LastEditors: along
 * @LastEditTime: 2023-10-17 10:41:51
 * @FilePath: /cxy-case/drag/src/components/print-title.vue
-->
<template>
  <div class="PrintTitle" draggable="true">
    <div>这是一个标题</div>
    <input type="text" />
  </div>
</template>

<script>
export default {
  components: {},
  filters: {},
  computed: {},
  data() {
    return {};
  },
  watch: {},
  mounted() {
    this.init();
  },
  methods: {
    init() {},
  },
};
</script>

<style lang="scss">
.PrintTitle {
  border: 1px #a0a4a8 solid;
  border-radius: 6px;
  text-align: center;
  cursor: move;
  display: flex;
  align-items: center;
}
.dragging {
  opacity: 0.5;
}
</style>
