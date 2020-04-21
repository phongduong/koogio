<template>
  <q-item>
    <q-item-label>{{ project.title }}</q-item-label>
  </q-item>
</template>

<script lang="ts">
/// <reference path="../store/projects/project.d.ts"/>

import Vue, { PropType } from "vue";

export default Vue.extend({
  props: { project: { type: Object } }
});
</script>

<style lang="scss" scoped></style>
