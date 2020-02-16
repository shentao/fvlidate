<template lang="html">
  <div class="">
    <div style="margin-bottom: 20px">
      <FormText
        label="numberA"
        v-model.number="numberA"
        :config="{ type: 'number' }"
      />
      <FormText
        label="max"
        v-model.number="max"
        :config="{ type: 'number' }"
      />
      <FormText
        label="min"
        v-model.number="min"
        :config="{ type: 'number' }"
      />
    </div>
    <NestedB
      :max="max"
      :min="min"
    />
    <pre style="background-color: white;">{{ v$.$errors }}</pre>
  </div>
</template>

<script>
import { ref } from 'vue'
import useVuelidate from '@/libs/vuelidate'
import { required, maxValue } from '@/libs/validators/withMessages'
import NestedB from '@/components/NestedB'
import FormText from '@/components/form-elements/FormText'

export default {
  name: 'NestedA',
  components: { NestedB, FormText },
  data () {
    return {
      min: 4
    }
  },
  setup () {
    const numberA = ref(8)

    const max = ref(5)
    const rules = { numberA: { required, maxValue: maxValue(max) } }
    const v$ = useVuelidate(rules, { numberA }, 'NestedA')

    return { numberA, v$, max }
  }
}
</script>

<style lang="css" scoped>
</style>
