<template lang="pug">
  Layout
    .project-list
      ProjectItem(
        v-for="(project, index) in $page.allProject.projects"
        :key="index"
        :project="project.project"
      )     
</template>

<page-query>
  query {
    allProject {
      projects: edges {
        project: node {
          id
          title
          description
          googleLink
          icon
          screenshots
        }
      }
    }
  }
</page-query>

<script lang="ts">
import Vue from "vue";
import ProjectItem from "~/components/ProjectItem.vue";

export default Vue.extend({
  metaInfo: {
    title: "Home"
  },
  components: { ProjectItem }
});
</script>

<style lang="scss"></style>>
