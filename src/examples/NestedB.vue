<template lang="html">
  <div class="">
    <div style="margin-bottom: 20px">
      <FormText
        label="Number B"
        v-model.number="numberB"
        :config="{ type: 'number' }"
      />
    </div>
    <!-- <NestedA /> -->
    <!-- <pre style="background-color: white;">{{ v$.$errors }}</pre> -->
  </div>
</template>

<script>
import { ref, toRefs } from 'vue'
import useVuelidate from '@/libs/vuelidate'
import { required, maxValue, minValue } from '@/libs/validators/withMessages'
import FormText from '@/components/form-elements/FormText'

export default {
  name: 'NestedB',
  components: { FormText },
  setup (props) {
    const { max, min } = toRefs(props)
    const numberB = ref(8)
    const rules = { numberB: { required, maxValue: maxValue(max), minValue: minValue(min) } }
    const v$ = useVuelidate(rules, { numberB }, 'NestedB')

    return { numberB, v$ }
  }
}
</script>

<style lang="css" scoped>
</style>
