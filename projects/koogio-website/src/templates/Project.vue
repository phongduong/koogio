<template lang="pug">
  Layout
    .project-content
      g-image(:src="$page.project.icon" width="100")
      h1 {{ $page.project.title }}
      p {{ $page.project.description }}
</template>

<page-query>
  query($id: ID!) {
    project(id: $id) {
      id
      title
      description
      googleLink
      icon
      screenshots
    }
  }
</page-query>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({});
</script>

<style lang="scss" scoped></style>
