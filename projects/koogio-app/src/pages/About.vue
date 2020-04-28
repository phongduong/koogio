<template>
  <q-page padding class="text-center">
    <h2 class="text-h2 text-primary">About KOOGIO</h2>
    <p class="text-body1 text-primary">{{ description }}</p>
  </q-page>
</template>

<script>
export default {
  name: "About",

  data() {
    return {
      description: "We are an indie game studio. We create casual games."
    };
  }
};
</script>
