<template lang="pug">
  main(
    class="layout container mx-auto py-4 px-2"
    )
    header(
      class="header flex justify-center mb-4"
      )
      nav.nav
        g-link.nav__link(
          to="/"
        )
          g-image.logo(
            src="~/favicon.png" 
            width="64px" 
            height="64px" 
            alt="Logo"
          )
    slot 
    footer(
      class="footer flex justify-center mt-4"
      )
      p(
        class="text-primary font-medium"
      ) Designed &amp; developed by KOOGIO
</template>

<static-query>
</static-query>

<style lang="scss"></style>
