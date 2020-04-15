<template>
  <q-page class="flex flex-center"> </q-page>
</template>

<script lang="ts">
import TYPES from "../store/projects/types";

export default {
  name: "PageIndex",
  preFetch({ store, redirect }) {
    store.dispatch(`projects/${TYPES.GET_PROJECTS}`);
  }
};
</script>
