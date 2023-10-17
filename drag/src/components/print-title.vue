<!--
 * @Author: along
 * @Description: 
 * @Date: 2023-10-16 14:02:16
 * @LastEditors: along
 * @LastEditTime: 2023-10-16 14:43:17
 * @FilePath: /cxy-case/drag/src/components/print-title.vue
-->
<template>
  <div class="PrintTitle" draggable="true">标题</div>
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
  width: 160px;
  height: 32px;
  border: 1px #a0a4a8 solid;
  border-radius: 6px;
  text-align: center;
  line-height: 32px;
  cursor: move;
}
.dragging {
  opacity: 0.5;
}
</style>
