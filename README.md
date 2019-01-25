# el-tree-table

## 简介

el-tree-table组件基于vue和element-ui，在vue-element-admin(https://github.com/PanJiaChen/vue-element-admin/tree/master/src/components/TreeTable)的实现基础上增加一些新特性。
并在此声明treetable的业务实现再来上述开源项目，如有冒犯，请及时联系。
共同依据element-ui的table(http://element-cn.eleme.io/#/zh-CN/component/table)写成。
>扩展主要包括：显示边框、固定高度、显示复选框、复选框选中是否遵循父子关联、复选框禁用条件。

### [在线访问](http://tree-transfer.zhongxiang.shop/) - [GitHub](https://github.com/hql7/el-tree-table)

## 快速上手

`npm install el-tree-table --save`

或

`npm i el-tree-table -S`

`import TreeTable from 'el-tree-table'`
`Vue.use(TreeTable)`

> 示例
    <template>
      <div id="app" class="example">
        <treeTable :data="tree_table" :columns="columns" 
         checkBox expandAll parentChild border :options="{key:'id', children:'Children'}"
         @treeTableSelect="getTreeTableSelect" />
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
1. 参数：`data` 说明：`树形数据` 类型：`Array, Object` 必填：`true` 补充：`对象或数组`

2. 参数：`columns` 说明：` 列属性` 类型：`Array` 必填：`false` 补充：`text: 显示在表头的文字,value: 对应data的key。treeTable将显示相应的value, width: 每列的宽度，为一个数字(可选),如果你想要每个字段都有自定义的样式或者嵌套其他组件，columns可不提供，直接像在el-table一样写即可，如果没有自定义内容，提供columns将更加的便捷方便`

3. 参数：`expandAll` 说明：`是否展开全部` 类型：`Boolean` 必填：`false`

4. 参数：`evalFunc` 说明：`解析函数` 类型：`Function`
 
5. 参数：`evalArgs` 说明：`解析函数参数` 类型：`Array`

>以上说明详见(https://github.com/PanJiaChen/vue-element-admin/tree/master/src/components/TreeTable)。

6. 参数：`options` 说明：`nodekey字段及children字段` 类型：`Boolean` 必填：`false` 补充：`重要！根据id和children盒子字段来父子关联处理数据，默认{key: "id", children: "children"},如需自定义，请一块修改`

7. 参数：`checkBox` 说明：`是否显示复选框` 类型：`Boolean` 必填：`false`

8. 参数：`height` 说明：`用于固定表头` 类型：`Number` 必填：`false`

9. 参数：`border` 说明：`显示边框` 类型：`Boolean` 必填：`false` 补充：`默认为true显示边框`

10. 参数：`disabled` 说明：`当checkBox为true显示复选框时可用，判断是否禁用字段` 类型：`String` 补充：`此参数传入内容为：data中表示复选框是否禁用的数据字段 例{isDisabled: true, id: 1, children:[]}，则disabled: 'isDisabled'`

11. 参数：`parentChild` 说明：`当checkBox为true显示复选框时可用，表示是否遵循父子关联` 类型：`Boolean` 补充：`默认false`

12. 事件：`openChildren` 说明：`点击图标展开子元素事件` 回调：`function(row), 返回点击行`

13. 事件：`treeTableClick` 说明：`点击列表行事件` 回调：`function(row), 返回点击行，注意：重复点击则取消选中并返回{}`
 
14. 事件：`treeTableSelect` 说明：`复选框选中事件` 回调：`function(val), 返回选中数据`

15. slot：`这是一个自定义列的插槽` `slot`和`columns属性`可同时存在,columns里面的数据列会在slot自定义列的左边展示