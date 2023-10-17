<template>
  <div class="dragBox">
    <div
      class="dragItem"
      :style="{ background: `url(${base64})` }"
      @dragstart="handleDragStart"
      @dragend="handleDragEnd"
    >
      <div
        v-for="(record, index) in itemList"
        :key="index"
        :data-index="index"
        draggable
        class="dragNav"
        @mousedown="handleClickDom"
      >
        {{ record.title }}
      </div>
    </div>
    <div
      class="dragComponents"
      :style="{ background: `url(${base64})` }"
      @dragover="handleDragOver"
      @drop="handleDrop"
    >
      <DragItem
        v-for="(com, key) in drawList"
        :key="key"
        :left.sync="com.config.x"
        :top.sync="com.config.y"
      >
        <component :is="com.componentsName" />
      </DragItem>
      <DragLine />
    </div>
  </div>
</template>

<script>
import { base64 } from './index.js';
import PrintTitle from '@/components/print-title.vue';
import DragItem from './components/drag-item.vue';
import DragLine from './components/drag-line.vue';

export default {
  components: { PrintTitle, DragItem, DragLine },
  data() {
    return {
      base64,
      itemList: [
        {
          title: '标题',
          componentsName: 'PrintTitle',
          id: '',
          config: {
            x: '',
            y: '',
          },
        },
      ],
      currentIndex: '',
      drawList: [],
      clickConfig: {
        x: '',
        y: '',
      },
    };
  },
  watch: {},
  mounted() {},
  methods: {
    // 设置样式
    // setStyle(style) {
    //   return {
    //     position: 'absolute',
    //     left: style.config.x + 'px',
    //     top: style.config.y + 'px',
    //   };
    // },

    // 点击拖拽组件
    handleClickDom(event) {
      const { x, y, target } = event;

      this.clickConfig = {
        x: x - target.offsetLeft,
        y: y - target.offsetTop,
      };

      console.log('===event===', this.clickConfig);
    },

    // 开始拖拽左侧
    handleDragStart(event) {
      this.currentIndex = event.target.dataset.index;
      event.target.classList.add('dragging');

      // console.log('currentIndex', this.currentIndex);
      console.log('event', event);
    },

    // 拖拽左侧结束
    handleDragEnd(e) {
      e.target.classList.remove('dragging');

      e.preventDefault();
      e.stopPropagation();
      e.dataTransfer.clearData();
      const index = this.currentIndex;
      const rectInfo = document
        .querySelector('.dragComponents')
        .getBoundingClientRect();

      console.log('===index====', index);

      if (index || index === 0) {
        const component = JSON.parse(JSON.stringify(this.itemList[index]));
        component.config.x = e.clientX - rectInfo.x - this.clickConfig.x;
        component.config.y = e.clientY - rectInfo.y - this.clickConfig.y;
        component.id = 'box_' + new Date().getTime();
        this.drawList.push({ ...component });

        console.log('drawList', this.drawList);
      }
    },

    // 拖拽中
    handleDragOver(e) {
      console.log('拖拽中', event);
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
    },

    // 拖拽结束
    handleDrop(event) {
      console.log('拖拽结束', event);
    },
  },
};
</script>

<style lang="scss">
@import url('./index.scss');
</style>
