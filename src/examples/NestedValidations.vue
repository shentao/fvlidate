<template>
  <div class="flex">
    <div class="w-1/2">
      <fieldset class="p-2 m-2 border border-black">
        <h3 class="text-lg">Wrapper Form</h3>
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
      <NestedA />
      <button
        class="button"
        type="button"
        :disabled="v$.$invalid"
        @click="v$.$touch"
      >
        Submit
      </button>
      <ErrorsList :errors="v$.$errors" />
    </fieldset>
    </div>
    <div class="w-1/2">
      <h2 class="text-xl">Vuelidate Output:</h2>
      <pre class="pre">{{ v$ }}</pre>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import useVuelidate from '@/libs/vuelidate'
import NestedA from '@/components/NestedA'
import ErrorsList from '@/components/ErrorsList'
import { required, email } from '@/libs/validators/withMessages'

export default {
  components: { NestedA, ErrorsList },
  setup () {
    // Collect child validation results
    const v$ = useVuelidate(
      { userEmail: { required, email } },
      { userEmail: 'hello' }
    )

    return { v$ }
  }
}
</script>
