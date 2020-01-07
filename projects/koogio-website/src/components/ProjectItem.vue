<template lang="pug">
  section.project-item
    h2 {{ project.title }}
    g-link(
      to="/project/"
    ) See more
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: ["project"],
  mounted() {
    console.log(this.project.project)
  }
});
</script>

<style lang="scss" scoped></style>
