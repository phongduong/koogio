<template>
  <q-item>
    <q-card class="project-card">
      <q-card-section class="flex flex-center">
        <q-avatar rounded size="128px">
          <img :src="project.icon" :alt="project.title"/></q-avatar
      ></q-card-section>
      <q-card-section class="flex flex-center">
        <h3 class="text-h3 text-primary">{{ project.title }}</h3>
      </q-card-section>
      <q-separator dark />
      <q-card-actions align="center">
        <q-btn :to="`/${project.id}`" color="primary">View more</q-btn>
      </q-card-actions></q-card
    >
  </q-item>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";

export default Vue.extend({
  props: { project: { type: Object } }
});
</script>

<style lang="scss" scoped>
.project-card {
  width: 100%;
}
</style>
