<template>
  <q-page padding class="flex flex-center">
    <q-list>
      <ProjectItem
        v-for="(project, index) in projects"
        :key="index"
        :project="project"
      />
    </q-list>
  </q-page>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
import TYPES from "../store/projects/types";
import ProjectItem from "../components/ProjectItem.vue";

export default Vue.extend({
  name: "PageIndex",
  components: {
    ProjectItem
  },
  computed: {
    ...mapState({
      projects: ({ projects: { projects } }: any) => projects
    })
  },
  mounted() {
    this.$store.dispatch(`projects/${TYPES.GET_PROJECTS}`);
  },
});
</script>
