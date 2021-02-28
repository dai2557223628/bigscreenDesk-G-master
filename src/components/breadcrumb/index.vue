<template lang="pug">
  el-breadcrumb(separator="/")
    el-breadcrumb-item(v-for="(item,index) in breadcrumbArr" :key="index" :to="{ path: item.path }") {{item.name}}
</template>

<script>
export default {
  name: 'breadcrumb',
  props: {
    breadcrumbArr: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data () {
    return {
      
    }
  },
  created() {
  },
  methods: {
    
  }
}
</script>

<style>
  .el-breadcrumb-item {
    cursor: pointer;
  }
</style>
