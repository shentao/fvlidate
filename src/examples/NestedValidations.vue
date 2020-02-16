<template>
  <div style="padding-top: 2rem;">
    <div style="float: right">
      <pre>{{ v$ }}</pre>
    </div>
    <button class="button" type="button" @click="v$.$touch">Touch</button>
    <div style="margin-bottom: 20px">
      <FormText
        label="NumberX"
        v-model="v$.numberX.$model"
        :config="{ type: 'number' }"
      />
    </div>
    <NestedA />
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import FormText from '@/components/form-elements/FormText'
import useVuelidate from '@/libs/vuelidate'
import { required, minValue } from '@/libs/validators/withMessages'
import NestedA from './NestedA'

export default {
  components: { NestedA, FormText },
  setup () {
    const numberX = ref(0)
    const conditionalParam = ref('')

    const validations = computed(() => {
      const v = { numberX: { required, minValue: minValue(3) } }
      if (numberX.value > 5) {
        v.conditionalParam = { required }
      }
      return v
    })

    const v$ = useVuelidate(
      validations,
      { numberX, conditionalParam }
    )

    return { v$, numberX, conditionalParam }
  }
}
</script>
