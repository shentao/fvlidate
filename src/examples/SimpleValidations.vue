<template>
  <div class="flex">
    <div class="w-1/2">
      <h2 class="text-xl">Form</h2>
      <!-- NOTE 1: Using $model -->
      <FormText
        label="Email"
        v-model="userEmail"
        :invalid="v$.userEmail.$invalid"
      />
      <ErrorsList :errors="v$.$errors" />
      <button
        class="button mt-3"
        type="button"
        :disabled="v$.$invalid"
        @click="v$.$touch"
      >
        Submit (with $touch)
      </button>

      <button
        class="button mt-3 button-secondary"
        type="button"
        @click="v$.$reset"
      >
        $reset
      </button>
    </div>
    <div class="w-1/2">
      <h2 class="text-xl">Vuelidate Output:</h2>
      <pre class="pre">v$: {{ v$ }}</pre>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import FormText from '@/components/form-elements/FormText'
import useVuelidate from '@/libs/vuelidate'
import { required, email } from '@/libs/validators/withMessages'
import ErrorsList from '@/components/ErrorsList'

// NOTE 3: Lazy validators
const loggingValidator = v => {
  console.log('loggingValidator called with: ', v)
  return true
}

export default {
  components: { FormText, ErrorsList },
  setup () {
    const userEmail = ref('')

    const v$ = useVuelidate(
      // NOTE 2: $autoDirty
      { userEmail: { required, email, loggingValidator } },
      { userEmail }
    )

    return { v$, userEmail }
  }
}
</script>
