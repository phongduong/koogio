<template lang="pug">
  .layout
    header.header
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
    footer.footer
      p Designed &amp; developed by KOOGIO
</template>

<static-query>
</static-query>

<style></style>
