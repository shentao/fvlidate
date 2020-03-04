<template>
  <div class="flex">
    <form class="w-1/2" @submit.prevent="submit">
      <h2 class="text-xl">Form</h2>
      <!-- NOTE 1: Using $model for auto dirty-->
      <FormText
        label="Email"
        v-model="userEmail"
        :invalid="v$.userEmail.$invalid"
      />
      <ErrorsList :errors="v$.userEmail.$errors" />
      <FormText
        label="Password"
        v-model="v$.password.$model"
        :invalid="v$.password.$invalid"
        :config="{ type: 'password' }"
      />
      <ErrorsList :errors="v$.password.$errors" />
      <button
        class="button mt-3"
        :disabled="v$.$invalid"
        @click="submit"
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
    </form>
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
import { required, email, minLength } from '@/libs/validators/withMessages'
import ErrorsList from '@/components/ErrorsList'

// NOTE 3: Lazy validators
const logger = v => {
  console.log('logger called with: ', v)
  return true
}

export default {
  components: { FormText, ErrorsList },
  setup () {
    const userEmail = ref('')
    const password = ref('')

    const v$ = useVuelidate(
      {
        userEmail: {
          required,
          email,
          logger
          // NOTE 2: $autoDirty
          // $autoDirty: true
        },
        password: {
          required,
          minLength: minLength(7)
        }
      },
      { userEmail, password }
    )

    return { v$, userEmail, password, submit }

    function submit () {
      v$.value.$touch()
      if (!v$.value.$invalid) {
        alert('submitted')
      }
    }
  }
}
</script>
