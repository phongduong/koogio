<template>
  <div>
    <header class="bg-primary p-4 flex justify-between">
      <g-link class="text-4xl font-bold" to="/">
        {{ $static.metadata.siteName }}
      </g-link>
      <div class="nav-links"></div>
    </header>
    <main>
      <slot />
    </main>
    <footer class="bg-primary p-4">
      <p class="text-lg text-center font-semibold">
        Created by <a href="https://phongduong.dev">Phong Duong</a>
      </p>
    </footer>
  </div>
</template>

<script>
export default {};
</script>

<static-query>
query {
	metadata {
    siteName
  }
}
</static-query>

<style lang="scss">
a {
  &:hover {
    @apply underline;
  }
}
</style>
