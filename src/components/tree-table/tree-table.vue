<template>
  <!-- <div> -->
  <!-- <el-input class="mg-bt" v-model="fe_filter" v-if="filter" placeholder="模糊搜索"></el-input> -->
  <el-table
    :data="formatData"
    :row-style="showRow"
    v-bind="$attrs"
    ref="tree-table"
    :border="border"
    :height="height"
    header-row-class-name="header-row-class"
    highlight-current-row
    @selection-change="handleSelectionChange"
    @select="tableSelect"
    @row-click="currentDicItemDtoChange"
  >
    <el-table-column
      width="55"
      v-if="checkBox"
      type="selection"
      reserve-selection
    ></el-table-column>
    <el-table-column v-if="columns.length === 0" width="150">
      <template slot-scope="scope">
        <span
          v-for="space in scope.row._level"
          class="ms-tree-space"
          :key="space"
        ></span>
        <span
          class="tree-ctrl"
          v-if="iconShow(0, scope.row)"
          @click.stop="toggleExpanded(scope.$index, scope.row)"
        >
          <i v-if="!scope.row._expanded" class="el-icon-plus"></i>
          <i v-else class="el-icon-minus"></i>
        </span>
        {{ scope.$index }}
      </template>
    </el-table-column>
    <el-table-column
      v-else
      v-for="(column, index) in columns"
      :key="column.value"
      :label="column.text"
      :width="column.width"
    >
      <template slot-scope="scope">
        <template v-if="index === 0">
          <span
            v-for="space in scope.row._level"
            class="ms-tree-space"
            :key="space"
          ></span>
        </template>
        <span
          class="tree-ctrl"
          v-if="iconShow(index, scope.row)"
          @click.stop="toggleExpanded(scope.$index, scope.row)"
        >
          <i v-if="!scope.row._expanded" class="el-icon-plus"></i>
          <i v-else class="el-icon-minus"></i>
        </span>
        {{ scope.row[column.value] }}
      </template>
    </el-table-column>
    <slot></slot>
  </el-table>
  <!-- </div> -->
</template>

<script>
/**
 * Auth: Lei.j1ang
 * Created: 2018/1/19-13:59
 * guthub: https://github.com/PanJiaChen/vue-element-admin/tree/master/src/components/TreeTable
 * 详细查看readme
 * edit: weilan
 * github: https://github.com/hql7
 * 此组件依据vue-element-admin的TreeTable组件，本次修改主要是在此基础上增加复选框及父子关系关联属性
 * 如有冒犯请及时联系。
 */
import treeToArray from "./eval";
import { flattenDeep, flattenDeepParents, regDeepParents } from "./array";

export default {
  name: "treeTable",
  data() {
    return {
      multipleSelection: [], // 多选
      fe_filter: "", // 筛选
      row_id: "", // 行id
      otableData: [], // 备份数据
      filterData: [] // 筛选数据
    };
  },
  props: {
    // 表身数据
    data: {
      type: [Array, Object],
      required: true
    },
    // 表头数据
    columns: {
      type: Array,
      default: () => []
    },
    evalFunc: Function,
    evalArgs: Array,
    expandAll: {
      type: Boolean,
      default: false
    },
    // nodekey,children
    options: {
      type: Object,
      default: () => {
        return {
          key: "id",
          children: "children"
        };
      }
    },
    // 显示复选框
    checkBox: {
      type: Boolean,
      default: false
    },
    // 高度 用来固定表头
    height: Number,
    // 显示边框
    border: {
      type: Boolean,
      default: true
    },
    // 禁用
    disabled: String,
    /* // 是否开启前端筛选
    filter: {
      type: Boolean,
      default: false
    },
    // 筛选条件
    filterOptions: {
      type: Object,
      default: () => {
        return {
          label: "Name",
          children: "Children"
        };
      }
    }, */
    // 是否父子关连
    parentChild: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    // 格式化数据源
    formatData: function() {
      let tmp;
      if (!Array.isArray(this.data)) {
        tmp = [this.data];
      } else {
        tmp = this.data;
      }
      const func = this.evalFunc || treeToArray;
      const args = this.evalArgs
        ? Array.concat([tmp, this.expandAll], this.evalArgs)
        : [tmp, this.expandAll];
      return func.apply(null, args);
    }
  },
  /* watch: {
    // 筛选
    fe_filter(val) {
      if (val) {
        this.filterData = [];
        this.tableFilter(this.otableData, val);
      }
    }
  }, */
  methods: {
    showRow: function(row) {
      const show = row.row.parent
        ? row.row.parent._expanded && row.row.parent._show
        : true;
      row.row._show = show;
      return show
        ? "animation:treeTableShow 1s;-webkit-animation:treeTableShow 1s;"
        : "display:none;";
    },
    // 切换下级是否展开
    toggleExpanded(trIndex, row) {
      const record = this.formatData[trIndex];
      record._expanded = !record._expanded;
      this.$nextTick(() => {
        this.$refs["tree-table"].doLayout();
      });
      this.$emit("openChildren", row, record._expanded);
    },
    // 图标显示
    iconShow(index, record) {
      return (
        index === 0 &&
        record[this.options.children] &&
        record[this.options.children].length > 0
      );
    },
    // 选中行
    currentDicItemDtoChange(row) {
      if (this.row_id === row[this.options.key]) {
        this.$refs["tree-table"].setCurrentRow();
        this.row_id = "";
        this.$emit("treeTableClick", {});
      } else {
        this.row_id = row[this.options.key];
        this.$emit("treeTableClick", row);
      }
    },
    // 多选选中
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.$emit("treeTableSelect", val);
    },
    // 父子关联
    tableSelect(val, row) {
      if (!this.parentChild) return;

      // 选中
      if (val.some(item => item[this.options.key] == row[this.options.key])) {
        // 父元素选中全选所有子孙元素
        for (let item of val) {
          if (
            !item[this.options.children] ||
            item[this.options.children].length == 0
          )
            continue;
          item.Children.forEach(i => {
            this.$refs["tree-table"].toggleRowSelection(i, true);
          });
        }
        // 子元素全选向上查找所有满足条件的祖先元素
        regDeepParents(row, "parent", parents => {
          let reg =
            parents &&
            parents[this.options.children].every(item => {
              return this.multipleSelection.some(
                it => it[this.options.key] == item[this.options.key]
              );
            });
          if (reg) this.$refs["tree-table"].toggleRowSelection(parents, true);
        });
      } else {
        // 非选中将所有子孙元素及支线上祖先元素清除
        let cancel_data = [
          ...flattenDeep(row[this.options.children], this.options.children),
          ...flattenDeepParents([row], "parent")
        ];
        for (let item of cancel_data) {
          this.$refs["tree-table"].toggleRowSelection(item, false);
        }
      }
    },
    // 递归筛选
    tableFilter(data, val) {
      data.forEach(item => {
        if (~item[this.filterOptions.label].indexOf(val)) {
          this.filterData.push(item);
        } else {
          if (
            item[this.filterOptions.children] &&
            item[this.filterOptions.children].length > 0
          ) {
            this.tableFilter(item[this.filterOptions.children], val);
          }
        }
      });
    },
    // 是否禁用
    useDisabled(row) {
      return this.disabled ? row[this.disabled] : true;
    }
  }
};
</script>
<style rel="stylesheet/css">
@keyframes treeTableShow {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@-webkit-keyframes treeTableShow {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>

<style lang="scss" rel="stylesheet/scss" scoped>
$color-blue: #2196f3;
$space-width: 18px;
.ms-tree-space {
  position: relative;
  top: 1px;
  display: inline-block;
  font-style: normal;
  font-weight: 400;
  line-height: 1;
  width: $space-width;
  height: 14px;
  &::before {
    content: "";
  }
}
.processContainer {
  width: 100%;
  height: 100%;
}
table td {
  line-height: 26px;
}

.tree-ctrl {
  position: relative;
  cursor: pointer;
  color: $color-blue;
  margin-left: -$space-width;
}

.i-icon {
  margin-right: 6px;
}
</style>
