/**
 * auth: weilan
 * github: https://github.com/hql7
 * description: 一个数组操作函数库
 * date：2019-01-22
 */

// 从树形数据中递归筛选目标值
function valInDeep(arr = [], val, id, childs) {
  return arr.reduce((flat, item) => {
    return flat.concat(item[id] == val ? item : valInDeep(item[childs] || [], val, id, childs));
  }, []);
}

// 将树形数据向下递归为一维数组
function flattenDeep(arr = [], childs) {
  return arr.reduce((flat, item) => {
    return flat.concat(item, item[childs] ? flattenDeep(item[childs], childs) : [] );
  }, []);
}

// 将树形数据向上将此支线递归为一维数组
function flattenDeepParents(arr, parent) {
  return arr.reduce((flat, item) => {
    return flat.concat(item[parent] || [], item[parent] ? flattenDeepParents([item[parent]], parent) : [] );
  }, []);
}

// 根据条件递归祖先元素
function regDeepParents(row, parent, cb) {
    if(row[parent]){
      cb && cb(row[parent]);
      regDeepParents(row[parent], parent, cb);
    }
}

export { valInDeep, flattenDeep, flattenDeepParents, regDeepParents }
