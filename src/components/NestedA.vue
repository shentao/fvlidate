<template lang="html">
  <fieldset class="p-2 m-2 mb-4 border border-black">
    <h3 class="text-lg">Nested Component A</h3>
    <hr class="my-2">
    <div class="flex">
      <div class="w-1/2">
        <h4 class="font-bold">Form</h4>
        <FormText
          label="Nested Value"
          v-model="nestedValue"
          :config="{ type: 'number' }"
          :invalid="v$.nestedValue.$invalid"
        />
        <ErrorsList :errors="v$.nestedValue.$errors" />
      </div>
      <div class="w-1/2">
        <h4 class="font-bold">Dynamic Rules</h4>
        <FormText
          label="Max"
          v-model="maximum"
          :config="{ type: 'number' }"
        />
        <FormText
          label="Min"
          v-model="minimum"
          :config="{ type: 'number' }"
        />
      </div>
    </div>
    <!-- NOTE 1: Another child with validations -->
    <NestedB
      :max="maximum"
      :min="minimum"
    />
  </fieldset>
</template>

<script>
import { ref } from 'vue'
import useVuelidate from '@/libs/vuelidate'
import { required, maxValue, minValue } from '@/libs/validators/withMessages'
import NestedB from '@/components/NestedB'
import FormText from '@/components/form-elements/FormText'
import ErrorsList from '@/components/ErrorsList'

export default {
  name: 'NestedA',
  components: { NestedB, FormText, ErrorsList },
  data () {
    return {
      min: 4
    }
  },
  setup () {
    const nestedValue = ref(8)
    const maximum = ref(5)
    const minimum = ref(2)

    const rules = {
      nestedValue: {
        required,
        // NOTE 2: Validator arguments can be reactive
        maxValue: maxValue(maximum),
        minValue: minValue(minimum),
        // NOTE 3: Automatically trigger $dirty on value change
        $autoDirty: true
      }
    }
    // NOTE 4: Register validation results under that string
    const v$ = useVuelidate(rules, { nestedValue }, 'NestedForm')

    return { nestedValue, v$, maximum, minimum }
  }
}
</script>

<style lang="css" scoped>
</style>
