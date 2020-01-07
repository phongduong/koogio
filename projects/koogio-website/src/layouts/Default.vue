<template lang="pug">
  main(
    class="layout container mx-auto py-4 px-2"
    )
    header(class="header flex justify-center")
      nav.nav
        g-link.nav__link(
          to="/"
        )
          g-image.logo(
            src="~/favicon.png" 
            width="32px" 
            height="32px" 
          )
    slot 
    footer(
      class="footer flex justify-center"
      )
      p Designed &amp; developed by KOOGIO
</template>

<static-query>
</static-query>

<style></style>
