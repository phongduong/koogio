<template lang="pug">
  Layout
    div(
      class="description pt-4 pb-8"
    )
      h1(
        class="text-5xl text-center text-primary"
      ) About {{ $page.metadata.siteName }}
      h3(
        class="text-2xl text-primary text-center"
      ) {{ $page.metadata.siteDescription }}
    div(
      class="project-list"
    )
      h1(
        class="text-5xl text-center text-primary"
      ) Our projects
      ProjectItem(
        v-for="(project, index) in $page.allProject.projects"
        :key="index"
        :project="project.project"
        :has-border="!!index"
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
    metadata {
      siteName
      siteDescription
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
