<template lang="pug">
  section(
    class="project-item flex items-center flex-col"
    )
    g-image(
      :src="project.icon"
    )
    h2(
      class="text-5xl"
    ) {{ project.title }}
    g-link(
      :to="`/project/${project.id}/`"
    ) See more
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: ["project"]
});
</script>

<style lang="scss" scoped></style>
