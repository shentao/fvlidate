<template>
  <div id="app">
    <div>
      <a
        v-for="view of views"
        :key="view.name"
        :href="view.slug"
        class="button mr-2"
      >
        {{ view.name }}
      </a>
    </div>
    <component v-if="currentView" :is="currentView.comp"/>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import PluginExample from '@/examples/PluginExample'
import NestedValidations from '@/examples/NestedValidations'
import AsComposition from '@/examples/AsComposition'

export default {
  setup () {
    const currentViewSlug = ref(location.hash)
    const views = [
      { comp: PluginExample, name: 'FormVueLatte', slug: '#form-vue-latte' },
      { comp: NestedValidations, name: 'Nested Validations', slug: '#nested-vuelidate' },
      { comp: AsComposition, name: 'Composition API', slug: '#composition-api' }
    ]

    window.addEventListener('hashchange', (...a) => {
      currentViewSlug.value = location.hash
    })

    const currentView = computed(
      () => views.find(v => v.slug === currentViewSlug.value)
    )

    return {
      views,
      currentView,
      currentViewSlug
    }
  }
}
</script>

<style lang="stylus">
.button
  @apply bg-green-500 text-white font-bold py-2 px-4 rounded

  &:hover
    @apply bg-green-700

  &:disabled
    @apply bg-gray-400 pointer-events-none

#app
  @apply p-4
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  color #2c3e50
</style>
