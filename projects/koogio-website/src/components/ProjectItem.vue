<template lang="pug">
  section(
    :class="`project-item flex items-center flex-col py-4 ${border}`"
    )
    g-image(
      :src="project.icon"
      :alt="project.title"
    )
    h2(
      class="text-4xl py-2 text-primary"
    ) {{ project.title }}
    g-link(
      :to="`/project/${project.id}/`"
      class="text-primary hover:text-white bg-transparent hover:bg-primary border-primary hover:border-transparent py-2 px-4 border-2 font-semibold"
    ) See more
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: ["project", "hasBorder"],
  computed: {
    border: function() {
      return this.hasBorder ? "border-dotted border-primary border-t-4" : "";
    }
  }
});
</script>

<style lang="scss" scoped></style>
