<template>
  <q-page class="flex flex-center">
    <h2 class="text-h2 text-primary">{{ project.title }}</h2>
  </q-page>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
import TYPES from "../store/projects/types";

export default Vue.extend({
  name: "PageProject",
  computed: {
    ...mapState({
      project: ({ projects: { project } }: any) => project
    })
  },
  mounted() {
    this.$store.dispatch(
      `projects/${TYPES.GET_PROJECT}`,
      this.$route.params.id
    );
  }
});
</script>
