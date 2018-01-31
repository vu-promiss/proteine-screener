<template>
  <div class="hello">
    <img src="../assets/logo_promiss.png">

    <h1>{{ $t('content') }}</h1>
    <router-link class="btn btn-primary btn-lg" :to="{ name: 'screener'}">{{ $t('home.button.title') }}</router-link>
    <hr>
    
    <button 
        v-on:click.stop="$i18n.set('nl')"
        :disabled="$i18n.locale() == 'nl'"
        class="btn btn-primary btn-lg">NL</button>
    <button 
        v-on:click.stop="$i18n.set('en')"
        :disabled="$i18n.locale() == 'en'"
        class="btn btn-primary btn-lg">EN</button>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

