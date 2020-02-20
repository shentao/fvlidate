<template>
  <div id="app">
    <div class="mb-2">
      <a
        v-for="view of vldViews"
        :key="view.name"
        :href="view.slug"
        class="button mr-2"
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
import FancyPluginExample from '@/examples/FancyPluginExample'

const fvlViews = [
  { comp: SimpleForm, name: 'Simple Schema Form', slug: '#simple-form' },
  { comp: FancyForm, name: 'Fancy Schema Form', slug: '#fancy-form' },
  { comp: Formception, name: 'Formception', slug: '#formception-form' }
]

const vldViews = [
  { comp: SimpleValidations, name: 'Simple Validations', slug: '#simple-vuelidate' },
  { comp: NestedValidations, name: 'Nested Validations', slug: '#nested-vuelidate' },
  { comp: AsComposition, name: 'Composition API', slug: '#composition-api' }
]

const comboViews = [
  { comp: PluginExample, name: 'FormVueLatte + Vuelidate', slug: '#form-vue-latte-vuelidate' },
  { comp: FancyPluginExample, name: 'Fancy FormVueLatte + Vuelidate', slug: '#fancy-form-vue-latte-vuelidate' }
]

export default {
  setup () {
    const currentViewSlug = ref(location.hash)
    const comboViewsEnabled = ref(true)

    window.addEventListener('hashchange', (...a) => {
      currentViewSlug.value = location.hash
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
      return slug === currentViewSlug.value
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

.button-blue
  @apply bg-blue-500

  &:hover
    @apply bg-blue-700

.button-purple
  @apply bg-purple-500 text-purple-500

  &:hover
    @apply bg-purple-700

#app
  @apply p-4
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  color #2c3e50
</style>
