# el-tree-table

## 简介

el-tree-table组件基于vue和element-ui，在vue-element-admin(https://github.com/PanJiaChen/vue-element-admin/tree/master/src/components/TreeTable)的实现基础上增加一些新特性。

## 快速上手

`npm install el-tree-table --save`

或

`npm i el-tree-table -S`

`import TreeTable from 'el-tree-table'`
`Vue.use(TreeTable)`

> 示例
    <template>
      <div id="app" class="example">
        <treeTable :data="tree_table" :columns="columns" checkBox expandAll parentChild border @treeTableSelect="getTreeTableSelect" />
      </div>
    </template>

    <script>

    export default {
      name: 'app',
      data(){
        return {
          columns: [
            {
              value: "id",
              text: "值",
            },
            {
              value: "name",
              text: "名字"
            }
          ],
          tree_table:[
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
                      name: "第1-1-2-1级",
                    },
                    {
                      id: "1-1-2-2",
                      name: "第1-2-2-2级",
                    },
                      ]
                    },
                 ]
               },
               {
                 id: "1-2",
                 name: "第1-2级",
                 Children: [
                    {
                      id: "1-2-1",
                      name: "第1-2-1级",
                    },
                    {
                      id: "1-2-2",
                      name: "第1-2-2级",
                    },
                 ]
               },
              ]
            }
          ]
        }
      },
      methods: {
        getTreeTableSelect(val){
          console.log(val);
        }
      },
    }
    </script>

## 文档
1. 参数：`data` 说明：`树形数据` 类型：`Array, Object` 必填：`true` 补充：``