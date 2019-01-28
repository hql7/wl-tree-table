import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'

// import TreeTable from './components/index'
import TreeTable from '@weilan/el-tree-table'

Vue.use(TreeTable)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
