<template>
  <div
    class="DragitemComponents"
    :style="dragStyle"
    :class="[
      {
        'vue-drag-active': active,
        'vue-drag-moving': draging,
      },
    ]"
    @mousedown.stop.prevent="handleDragStart($event)"
  >
    <slot />

    <div class="vue-drag-info" v-if="draging">
      <span v-if="draging">X：{{ left }}，Y：{{ top }}</span>
    </div>
  </div>
</template>

<script>
import eventBus from './eventBus';

export default {
  props: {
    left: {
      type: Number,
      default: 0,
    },
    top: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      draging: false,
      active: false,
      beforeMove: {
        left: '',
        top: '',
      },
      snapNumber: 1, //吸顶范围
    };
  },
  computed: {
    dragStyle() {
      return {
        left: this.left + 'px',
        top: this.top + 'px',
        zIndex: 10,
        position: 'absolute',
      };
    },
  },
  mounted() {},
  methods: {
    handleDragStart(event) {
      this.active = true;
      event.stopPropagation();

      const { pageX, pageY } = event;
      this.setBeforeMove({ oldPageX: pageX, oldPageY: pageY });
      this.draging = true;
      document.onmousemove = (event) => this.handleDragMove(event);
      document.onmouseup = () => {
        //拖动结束，将数据清空
        document.onmousemove = null;
        document.onmouseup = null;
        eventBus.$emit('moved');
        this.beforeMove = {
          left: null,
          top: null,
          oldPageX: null,
          oldPageY: null,
        };
        this.draging = false;
      };
    },

    //存储resize前位置信息
    setBeforeMove(position) {
      this.beforeMove = {
        left: this.left,
        top: this.top,
        ...position,
      };
    },

    //移动中
    async handleDragMove(event) {
      let { pageX, pageY } = event;
      let { top, left, oldPageX, oldPageY } = this.beforeMove;

      let newTop = 0,
        newLeft = 0;
      if (this.snap && this.snapNumber > 0) {
        newTop =
          Math.round((pageY - oldPageY) / this.snapNumber) * this.snapNumber +
          top;
        newLeft =
          Math.round((pageX - oldPageX) / this.snapNumber) * this.snapNumber +
          left;
      } else {
        newTop = pageY - oldPageY + top;
        newLeft = pageX - oldPageX + left;
      }
      let snapObj = {
        left: newLeft,
        top: newTop,
      };

      // 吸顶辅助线
      snapObj = await this.snapCheck({
        left: newLeft,
        top: newTop,
        width: 162,
        height: 34,
      });

      Object.assign({ left: this.left, top: this.top }, snapObj);
      this.$emit('update:left', snapObj.left);
      this.$emit('update:top', snapObj.top);
    },

    //吸附对齐
    snapCheck(obj) {
      let { width, height, left, top } = obj;
      //这里+15是为了扩大吸附范围
      let snapNumber = this.snapNumber + 15;
      return new Promise((resolve) => {
        const childNode = this.$el.parentNode.childNodes;

        console.log('childNode', childNode);

        for (let i = 0; i < childNode.length - 1; i++) {
          let node = childNode[i];
          if (node.className.includes('vue-drag-moving')) {
            continue;
          }
          let style = node.style;
          let cw = parseFloat(style.width),
            ch = parseFloat(style.height),
            cl = parseFloat(style.left),
            ct = parseFloat(style.top);

          //左对左
          const lTol = Math.abs(cl - left) < snapNumber;
          //右对右
          const rTor = Math.abs(cl + cw - left - width) < snapNumber;
          //左对右
          const lToR = Math.abs(cw + cl - left) < snapNumber;
          //右对左
          const rTol = Math.abs(cl - left - width) < snapNumber;
          //中对中
          const cToc = Math.abs(cl + cw / 2 - left - width / 2) < snapNumber;

          //顶对顶
          const tTot = Math.abs(ct - top) < snapNumber;
          //顶对底
          const tTob = Math.abs(ct - top - height) < snapNumber;
          //底对底
          const bTob = Math.abs(ct + ch - top - height) < snapNumber;
          //底对顶
          const bTot = Math.abs(ct + ch - top) < snapNumber;
          //中对中
          const CToC = Math.abs(ct + ch / 2 - top - height / 2) < snapNumber;
          if (
            lTol ||
            rTor ||
            lToR ||
            rTol ||
            cToc ||
            tTot ||
            tTob ||
            bTob ||
            bTot
          ) {
            if (lTol) {
              left = cl;
              eventBus.$emit('moving', 'yl', left);
            }
            if (rTor) {
              left = cl + cw - width;
              eventBus.$emit('moving', 'yr', cl + cw);
            }
            if (lToR) {
              left = cw + cl;
              eventBus.$emit('moving', 'yl', left);
            }
            if (rTol) {
              left = cl - width;
              eventBus.$emit('moving', 'yr', cl);
            }
            if (cToc) {
              left = cl + cw / 2 - width / 2;
              eventBus.$emit('moving', 'yc', cl + cw / 2);
            }
            if (tTot) {
              top = ct;
              eventBus.$emit('moving', 'xt', top);
            }
            if (tTob) {
              top = ct - height;
              eventBus.$emit('moving', 'xt', ct);
            }
            if (bTob) {
              top = ct + ch - height;
              eventBus.$emit('moving', 'xt', ct + ch);
            }
            if (bTot) {
              top = ct + ch;
              eventBus.$emit('moving', 'xt', top);
            }
            if (CToC) {
              top = ct + ch / 2 - height / 2;
              eventBus.$emit('moving', 'xc', ct + ch / 2);
            }
          } else {
            eventBus.$emit('moving');
          }
        }
        resolve({ left, top, width, height });
      });
    },
  },
};
</script>

<style lang="scss">
.DragitemComponents {
  .vue-drag-info {
    position: absolute;
    bottom: -33px;
    left: 50%;
    border-radius: 4px;
    transform: translateX(-50%);
    background: #fff;
    border: 1px solid #303133;
    z-index: 2075;
    padding: 6px 14px;
    font-size: 12px;
    line-height: 1.2;
    min-width: 100px;
    word-wrap: break-word;
    &::before {
      content: '';
      border-style: solid;
      border-width: 0 5px 5px;
      border-color: transparent transparent #303133;
      position: absolute;
      top: -5px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>
