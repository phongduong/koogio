<template lang="pug">
  .content
    header(
      class="header flex justify-center py-2"
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
    main(
      class="layout container my-4 mx-auto md:w-1/2 py-4 px-2"
      )
      slot 
    footer(
      class="footer flex justify-center py-2"
      )
      p(
        class="text-primary font-medium"
      ) Designed &amp; developed by KOOGIO
</template>

<static-query>
</static-query>

<style lang="scss"></style>
