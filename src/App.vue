<template>
  <div id="app" class="example">
    <h3 class="mg-bt">
      <a href="https://github.com/hql7/el-tree-table" target="_block">GitHub</a>
      -
      <a href="https://www.npmjs.com/package/@weilan/el-tree-table" target="_block">NPM</a>
      <!-- <a href="https://segmentfault.com/a/1190000015553081" target="_block">SegmentFault</a>
      <a href="https://blog.csdn.net/qq_15390381/article/details/80943549" target="_block">CSDN</a>
      <a href="https://juejin.im/post/5b3ecae8e51d4519213fae4b" target="_block">掘金</a>-->
    </h3>

    <treeTable
      :data="tree_table"
      :columns="columns"
      checkBox
      parentChild
      border
      :options="{ key: 'id', children: 'Children' }"
      @treeTableSelect="getTreeTableSelect"
      @treeTableClick="treeTableClick"
      @openChildren="openChildren"
    />

    <p>
      这里有一个兄弟组件-树形穿梭框：
      <a href="https://github.com/hql7/tree-transfer" target="_block">GitHub</a>
      -
      <a href="https://www.npmjs.com/package/el-tree-transfer" target="_block">NPM</a>
      -
      <a href="https://segmentfault.com/a/1190000015553081" target="_block">SegmentFault</a>
    </p>
  </div>
</template>

<script>
import treeTable from "@/components/tree-table";

export default {
  name: "app",
  components: { treeTable },
  data() {
    return {
      columns: [
        {
          value: "id",
          text: "值"
        },
        {
          value: "name",
          text: "名字"
        }
      ],
      tree_table: [
        {
          id: "1",
          name: "第1级",
          Children: [
            {
              id: "1-1",
              name: "第1-1级",
              Children: [
                /* {
                  id: "1-1-1",
                  name: "第1-1-1级",
                }, */
                {
                  id: "1-1-2",
                  name: "第1-1-2级",
                  Children: [
                    {
                      id: "1-1-2-1",
                      name: "第1-1-2-1级"
                    },
                    {
                      id: "1-1-2-2",
                      name: "第1-2-2-2级"
                    }
                  ]
                }
              ]
            },
            {
              id: "1-2",
              name: "第1-2级",
              Children: [
                {
                  id: "1-2-1",
                  name: "第1-2-1级"
                },
                {
                  id: "1-2-2",
                  name: "第1-2-2级"
                }
              ]
            }
          ]
        }
      ]
    };
  },
  methods: {
    getTreeTableSelect(val) {
      console.log("树表选中");
      console.log(val);
    },
    treeTableClick(val) {
      console.log("树表点击");
      console.log(val);
    },
    openChildren(val, status) {
      console.log("展开下级");
      console.log(val);
      console.log(status);
    }
  }
};
</script>

<style>
.example {
  padding: 60px;
}
.mg-bt {
  margin-bottom: 20px;
}
</style>
