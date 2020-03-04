<template>
  <div id="app">
    <div class="mb-2">
      <a
        v-for="view of vldViews"
        :key="view.name"
        :href="view.slug"
        class="button mr-2 button-teal"
        :class="[ isCurrent(view.slug) && 'active' ]"
      >
        {{ view.name }}
      </a>
    </div>
    <div class="mb-2">
      <a
        v-for="view of fvlViews"
        :key="view.name"
        :href="view.slug"
        class="button mr-2 button-blue"
        :class="[ isCurrent(view.slug) && 'active' ]"
      >
        {{ view.name }}
      </a>
    </div>
    <div v-if="comboViewsEnabled" class="mb-2">
      <a
        v-for="view of comboViews"
        :key="view.name"
        :href="view.slug"
        class="button mr-2 button-purple"
        :class="[ isCurrent(view.slug) && 'active' ]"
      >
        {{ view.name }}
      </a>
    </div>
    <hr class="my-3">
    <component v-if="currentView" :is="currentView.comp"/>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import SimpleForm from '@/examples/SimpleForm'
import FancyForm from '@/examples/FancyForm'
import Formception from '@/examples/Formception'
import SimpleValidations from '@/examples/SimpleValidations'
import NestedValidations from '@/examples/NestedValidations'
import AsComposition from '@/examples/AsComposition'
import PluginExample from '@/examples/PluginExample'

const fvlViews = [
  { comp: SimpleForm, name: 'Simple Schema Form', slug: '#simple-form' },
  { comp: FancyForm, name: 'Fancy Schema Form', slug: '#fancy-form' },
  { comp: Formception, name: 'Formception', slug: '#formception-form' }
]

const vldViews = [
  { comp: SimpleValidations, name: 'Lazy Validations', slug: '#simple-vuelidate' },
  { comp: NestedValidations, name: 'Nested Validations', slug: '#nested-vuelidate' },
  { comp: AsComposition, name: 'Composition API', slug: '#composition-api' }
]

const comboViews = [
  { comp: PluginExample, name: 'FormVueLatte + Vuelidate', slug: '#form-vue-latte-vuelidate' }
]

export default {
  setup () {
    const currentViewSlug = ref(location.hash)
    const comboViewsEnabled = ref(true)
    const visited = ref([location.hash])

    window.addEventListener('hashchange', (...a) => {
      currentViewSlug.value = location.hash
      visited.value.push(location.hash)
    })

    const allViews = fvlViews.concat(vldViews, comboViews)

    const currentView = computed(
      () => allViews.find(v => v.slug === currentViewSlug.value)
    )

    return {
      fvlViews,
      vldViews,
      comboViews,
      comboViewsEnabled,
      currentView,
      currentViewSlug,
      isCurrent
    }

    function isCurrent (slug) {
      return slug === currentViewSlug.value || isVisited(slug)
    }

    function isVisited (slug) {
      return visited.value.includes(slug)
    }
  }
}
</script>

<style lang="stylus">
.pre
  @apply p-3 bg-gray-800 text-green-200 overflow-auto
  max-height: 70vh

.button
  @apply bg-green-500 text-white font-bold py-2 px-4 mb-2 mr-2 rounded inline-block

  &:hover
    @apply bg-green-700 text-white

  &:disabled
    @apply bg-gray-400 pointer-events-none

  &.active
    @apply text-white

.button-teal
  @apply bg-teal-500 text-teal-500

  &:hover
    @apply bg-teal-700

.button-blue
  @apply bg-blue-500 text-blue-500

  &:hover
    @apply bg-blue-700

.button-purple
  @apply bg-purple-500 text-purple-500

  &:hover
    @apply bg-purple-700

.button-secondary
  @apply bg-gray-300 text-gray-700

  &:hover
    @apply bg-gray-200 text-gray-900

#app
  @apply p-4
  font-family Lato, Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  color #2c3e50
</style>
