<template>
  <q-page padding class="q-pa-lg flex flex-center column project-page">
    <q-avatar rounded size="128px">
      <img :src="project.icon" :alt="project.title" />
    </q-avatar>
    <a :href="project.googleLink"
      ><q-btn class="download-button" color="primary" text-color="white">
        Download
      </q-btn></a
    >
    <h2 class="text-h2 text-primary">{{ project.title }}</h2>
    <p class="text-body1 text-primary">{{ project.description }}</p>
    <h3 class="text-h3 text-primary">Screenshots</h3>
    <q-list class="screenshot__list row">
      <q-item
        class="screenshot__item col-xs-6 col-sm-3"
        v-for="(screenshot, i) in project.screenshots"
        :key="i"
      >
        <q-item-section>
          <img :src="screenshot" :alt="screenshot" />
        </q-item-section>
      </q-item>
    </q-list>
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
  },
  updated() {
    console.log(this.project);
  }
});
</script>

<style lang="scss" scoped>
.project-page {
  a {
    margin-top: 1rem;
    text-decoration: none;
    color: $secondary;
  }
  .screenshot {
    &__item {
      height: 50%;

      img {
        width: 100%;
      }
    }
  }
}
</style>
