<template>
  <div style="padding-top: 2rem;">
    <div style="float: right">
      <pre>{{ v$ }}</pre>
    </div>
    <button class="button" type="button" @click="v$.$touch">Touch</button>
    <div style="margin-bottom: 20px">
      <FormText
        label="NumberX"
        v-model="numberX"
        :config="{ type: 'number' }"
      />
      <FormText
        label="NumberY"
        v-model="numberY"
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
import NestedA from '@/components/NestedA'

export default {
  components: { NestedA, FormText },
  setup () {
    const numberX = ref(0)
    const numberY = ref(0)

    const validations = {
      numberX: { required, minValue: minValue(3), $autoDirty: true },
      numberY: { required, minValue: minValue(3) }
    }

    const v$ = useVuelidate(
      validations,
      { numberX, numberY }
    )

    return { v$, numberX, numberY }
  }
}
</script>
