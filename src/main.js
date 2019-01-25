import Vue from 'vue'
import App from './App.vue'
import 'element-ui/lib/theme-chalk/index.css';
import { Table, TableColumn } from 'element-ui';
Vue.use(Table);
Vue.use(TableColumn);

// 导入组件库
import TreeTable from './components/index'
// 注册组件库
Vue.use(TreeTable)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
