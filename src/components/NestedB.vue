<template>
  <fieldset class="p-2 m-2 border border-black">
    <h3 class="text-lg">Nested Component B</h3>
    <h4 class="font-bold">Form</h4>
    <FormText
      label="Deeply Nested Value"
      v-model.number="deeplyNestedValue"
      :config="{ type: 'number' }"
      :invalid="v$.$invalid"
    />
    <ErrorsList :errors="v$.deeplyNestedValue.$errors" />
  </fieldset>
</template>

<script>
import { ref, toRefs } from 'vue'
import useVuelidate from '../libs/vuelidate/index.js'
import { required, maxValue, minValue } from '../libs/validators/withMessages/index.js'
import FormText from '../components/form-elements/FormText.vue'
import ErrorsList from '../components/ErrorsList.vue'

export default {
  name: 'NestedB',
  components: { FormText, ErrorsList },
  props: {
    min: Number,
    max: Number
  },
  setup (props) {
    // Get validator params from props
    const { max, min } = toRefs(props)

    console.log(max, props);
    const deeplyNestedValue = ref(1)
    const rules = {
      deeplyNestedValue: {
        required,
        maxValue: maxValue(max),
        minValue: minValue(min)
      }
    }
    const v$ = useVuelidate(rules, { deeplyNestedValue }, 'DeeplyNestedForm')

    return { deeplyNestedValue, v$ }
  }
}
</script>

<style lang="css" scoped>
</style>
