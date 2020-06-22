<template>
  <div class="flex">
    <form
      class="w-1/2"
      @submit.prevent="submit"
    >
      <h2 class="text-xl">
        Form
      </h2>
      <!-- NOTE 1: Using $model for auto dirty-->
      <FormText
        v-model="userEmail"
        label="Email"
        :invalid="v$.userEmail.$invalid"
      />
      <ErrorsList :errors="v$.userEmail.$errors" />
      <FormText
        v-model="v$.password.$model"
        label="Password"
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
      <h2 class="text-xl">
        Vuelidate Output:
      </h2>
      <pre class="pre">v$: {{ v$ }}</pre>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import FormText from '../components/form-elements/FormText.vue'
import useVuelidate from '../libs/vuelidate/index.js'
import { required, email, minLength } from '../libs/validators/withMessages/index.js'
import ErrorsList from '../components/ErrorsList.vue'

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
      {
        userEmail,
        password
      }
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
