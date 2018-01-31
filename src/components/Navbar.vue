<template lang="html">
  <b-navbar fixed="top" toggleable="md" type="dark" variant="info">

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-navbar-brand :to="{ name: 'home' }" href="#">Protein Screener</b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">

      <b-navbar-nav>
        <b-nav-item href="#"></b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">

        <b-nav-item-dropdown text="Lang" right>
          <b-dropdown-item href="#">English</b-dropdown-item>
          <b-dropdown-item href="#">Nederlands</b-dropdown-item>
          <b-dropdown-item href="#">Suomi</b-dropdown-item>
        </b-nav-item-dropdown>

      </b-navbar-nav>

    </b-collapse>
  </b-navbar>

</template>

<script>
export default {
}
</script>

<style lang="css">
</style>
