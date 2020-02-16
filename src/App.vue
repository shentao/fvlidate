<template>
  <div id="app">
    <div class="mb-2">
      <a
        v-for="view of vldViews"
        :key="view.name"
        :href="view.slug"
        class="button mr-2"
      >
        {{ view.name }}
      </a>
    </div>
    <div class="mb-2">
      <a
        v-for="view of fvlViews"
        :key="view.name"
        :href="view.slug"
        class="button mr-2 bg-blue-500 hover:bg-blue-700"
      >
        {{ view.name }}
      </a>
    </div>
    <div v-if="comboViewsEnabled" class="mb-2">
      <a
        v-for="view of comboViews"
        :key="view.name"
        :href="view.slug"
        class="button mr-2 bg-purple-500 hover:bg-purple-700"
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
import ModalForm from '@/examples/ModalForm'
import Formception from '@/examples/Formception'
import SimpleValidations from '@/examples/SimpleValidations'
import NestedValidations from '@/examples/NestedValidations'
import AsComposition from '@/examples/AsComposition'
import PluginExample from '@/examples/PluginExample'
import FancyPluginExample from '@/examples/FancyPluginExample'

const fvlViews = [
  { comp: SimpleForm, name: 'Simple Schema Form', slug: '#simple-form' },
  { comp: ModalForm, name: 'Fancy Schema Form', slug: '#modal-form' },
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
      currentViewSlug
    }
  }
}
</script>

<style lang="stylus">
.button
  @apply bg-green-500 text-white font-bold py-2 px-4 rounded inline-block

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
