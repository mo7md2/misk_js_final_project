<template>
  <div class="poster-grid mx-1 pt-2">
    <template v-for="(item,index) in postersList">
      <slot v-bind:item="item" v-bind:index="index"></slot>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    postersList: Array
  },
  components: {},
  data() {
    return {};
  },
  methods: {}
};
</script>

<style >
.poster-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
