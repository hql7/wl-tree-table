import treeTable from './tree-table.vue'

// 为组件提供 install 安装方法，供按需引入
treeTable.install = function (Vue) {
  Vue.component(treeTable.name, treeTable)
}

// 默认导出组件
export default treeTable