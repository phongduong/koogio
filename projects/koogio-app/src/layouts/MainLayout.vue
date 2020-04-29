<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-white">
        <q-btn
          flat
          round
          dense
          color="primary"
          icon="menu"
          class="q-mr-sm"
          @click="drawer = !drawer"
        />
        <q-toolbar-title class="text-primary">
          KOOGIO
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="drawer"
      :width="200"
      elevated
      content-class="drawer-content"
    >
      <q-scroll-area class="fit">
        <q-list>
          <q-item
            v-for="(menuItem, index) in menuItems"
            :key="index"
            clickable
            :to="menuItem.link"
          >
            <q-item-section>
              <p class="text-primary text-bold">{{ menuItem.label }}</p>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
export default {
  name: "MainLayout",

  data() {
    return {
      drawer: false,
      menuItems: [
        { label: "Projects", link: "/" },
        { label: "About KOOGIO", link: "/about" }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.drawer-content {
}
</style>
