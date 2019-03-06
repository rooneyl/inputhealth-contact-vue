<template>
  <q-input
    :value="value"
    v-bind="$attrs"
    float-label="Search"
    :after="[{icon: 'arrow_forward', content: true, handler () {}}]"
    class="search-bar"
    @input="onChange"
  />
</template>
<script>
export default {
  inheritAttrs: false,
  props: {
    value: [String, Number]
  },
  methods: {
    onChange(event) {
      console.log(this.$route.model);
      this.$emit("input", this.$route.model);
    }
  }
};
</script>

<style scoped>
</style>