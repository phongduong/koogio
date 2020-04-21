<template>
  <q-page class="flex flex-center">
    <q-list>
      <ProjectItem
        v-for="(project, index) in projectList"
        :key="index"
        :project="project"
      />
    </q-list>
  </q-page>
</template>

<script lang="ts">
import { mapGetters } from "vuex";
import TYPES from "../store/projects/types";
import ProjectItem from "../components/ProjectItem";

export default {
  name: "PageIndex",
  components: {
    ProjectItem
  },
  preFetch({ store, redirect }) {
    return store.dispatch(`projects/${TYPES.GET_PROJECTS}`);
  },
  computed: mapGetters(["projects/projectList"]),
  mounted() {
    console.log(this.projectList);
  }
};
</script>
