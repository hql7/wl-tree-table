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

<style>
.example {
  padding: 60px;
}
</style>
