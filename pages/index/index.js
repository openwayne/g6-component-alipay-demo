import G6 from '@antv/g6-mobile';
import graphData from './data';
import dagreLayout from '@antv/g6-mobile/dist/extends/layout/dagreLayout';
import TreeGraph from '@antv/g6-mobile/dist/extends/graph/treeGraph';

G6.registerLayout('dagreLayout', dagreLayout);
G6.registerGraph('TreeGraph', TreeGraph);

Page({
  data: {
    width: 300,
    height: 400,
    pixelRatio: 1,
  },
  onLoad() {
    const { windowWidth, windowHeight, pixelRatio } = my.getSystemInfoSync();
    this.setData({
      width: windowWidth,
      height: windowHeight,
      pixelRatio: pixelRatio,
    });
  },
  onCanvasInit(ctx, rect, canvas, renderer) {
    console.log(ctx, rect, canvas);
    this.graph = new G6.TreeGraph({
      context: ctx,
      renderer,
      width: this.data.width,
      height: this.data.height,
      linkCenter: true,
      modes: {
        default: [
          {
            type: 'collapse-expand',
            onChange: function onChange(item, collapsed) {
              const data = item.get('model');
              data.collapsed = collapsed;
              return true;
            },
          },
          'drag-canvas',
          'zoom-canvas',
        ],
      },
      defaultNode: {
        size: 40,
      },
      layout: {
        type: 'compactBox',
        direction: 'RL',
        getId: function getId(d) {
          return d.id;
        },
        getHeight: () => {
          return 26;
        },
        getWidth: () => {
          return 26;
        },
        getVGap: () => {
          return 20;
        },
        getHGap: () => {
          return 30;
        },
        radial: false,
      },
    });



    this.graph.node(function (node) {
      return {
        label: node.id,
      };
    });

    this.graph.data(graphData);
    this.graph.render();
    this.graph.fitView();

  },
  onTouch(e) {
    this.graph.emitEvent(e);
  },
});
