<template lang="html">
  <fieldset class="p-2 m-2 border border-black">
    <h3 class="text-lg">Nested Form B</h3>
    <div class="flex">
      <div class="w-1/2">
        <h4 class="font-bold">Form</h4>
        <FormText
          label="Deeply Nested Value"
          v-model.number="deeplyNestedValue"
          :config="{ type: 'number' }"
          :invalid="v$.$invalid"
        />
        <ErrorsList :errors="v$.deeplyNestedValue.$errors" />
      </div>
      <div class="w-1/2">
        <h4 class="font-bold">Rules coming from parent component</h4>
      </div>
    </div>
  </fieldset>
</template>

<script>
import { ref, toRefs } from 'vue'
import useVuelidate from '@/libs/vuelidate'
import { required, maxValue, minValue } from '@/libs/validators/withMessages'
import FormText from '@/components/form-elements/FormText'
import ErrorsList from '@/components/ErrorsList'

export default {
  name: 'NestedB',
  components: { FormText, ErrorsList },
  setup (props) {
    // Get validator params from props
    const { max, min } = toRefs(props)
    const deeplyNestedValue = ref(8)
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
