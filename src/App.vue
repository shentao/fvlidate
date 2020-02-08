<template>
  <div id="app">
    <!-- <div>
      <button class="button mr-2" to="/">Home</button>
      <button class="button" to="/about">About</button>
    </div> -->
    <PluginExample />
    <!-- <component :is="view"/> -->
  </div>
</template>

<script>
import PluginExample from '@/components/PluginExample'

export default {
  components: { PluginExample }
}
</script>

<style lang="stylus">
.button
  @apply bg-green-500 text-white font-bold py-2 px-4 rounded

  &:hover
    @apply bg-green-700

#app
  @apply p-4
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  color #2c3e50
</style>
