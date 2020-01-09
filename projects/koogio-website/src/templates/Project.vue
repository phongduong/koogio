<template lang="pug">
  Layout
    div(
      class="project-content flex flex-col justify-center py-4 px-2"
      )
      div(
        class="project-content__icon self-center"
      )
        g-image(:src="$page.project.icon" width="120" :alt="`${$page.project.title} icon`")
      div(
        class="project-content__description mt-4 flex flex-col"
      )
        h1(
          class="text-5xl text-primary text-center"
        ) {{ $page.project.title }}
        p(
          class="text-primary self-center"
        ) {{ $page.project.description }}
      div(
        class="project-content__download mt-6"
      )
        h2(
          class="text-4xl text-primary text-center"
        ) Download
        p(
          class="text-red-700 text-center text-2xl font-semibold"
        ) 
          a(
            :href="$page.project.googleLink"
          ) Play Store
      div(
        class="project-content__screenshots mt-6"
      )
        h3(
          class="text-3xl text-primary text-center"
        ) Screenshots
        div(
          class="flex flex-wrap"
        )
          div(
            class="project-content__screenshot__image w-1/4 md:w-1/2 p-1 md:p-2"
            v-for="screenshot in $page.project.screenshots"
          )
            g-image(
              :src="screenshot"
              :alt="`${$page.project.title} screenshot`"
            )
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
