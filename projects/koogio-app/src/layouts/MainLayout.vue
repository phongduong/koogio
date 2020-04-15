<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-white" >
        <q-avatar square>
          <img src="statics/app-logo-128x128.png" />
        </q-avatar>
        <q-toolbar-title class="text-primary absolute-center">
          KOOGIO
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
export default {
  name: "MainLayout",

  data() {
    return {};
  }
};
</script>
