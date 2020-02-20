<template>
  <div class="flex">
    <div class="w-1/2 bg-gray-200">
      <div class="max-w-sm mx-auto mt-8 rounded overflow-hidden shadow-lg bg-white">
        <div class="px-6 py-4">
          <h3 class="text-2xl font-bold">Create Account</h3>
          <FormText label="Username" type="text" v-model="userName" />
          <ErrorsList :errors="v$.userName.$errors" />
          <FormText label="Password" type="text" v-model="password" />
          <ErrorsList :errors="v$.password.$errors" />
          <FormText label="Repeat Password" type="text" v-model="repeatPassword" />
          <ErrorsList :errors="v$.repeatPassword.$errors" />
          <button
            class="button mt-4"
            type="button"
            :disabled="v$.$invalid || v$.$pending"
            @click="signup"
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
    <div class="w-1/2 pl-8">
      <h2 class="text-xl">Vuelidate Output:</h2>
      <pre class="pre">v$: {{ v$ }}</pre>
    </div>
  </div>
</template>

<script>
import { ref, nextTick } from 'vue'
import useVuelidate from '@/libs/vuelidate'
import { required, minLength, sameAs } from '@/libs/validators/withMessages'
import FormText from '@/components/form-elements/FormText'
import ErrorsList from '@/components/ErrorsList'

// NOTE 1: Building custom validators:
const uniqueUsername = {
  $async: true,
  $validator: v => new Promise(resolve => {
    setTimeout(() => {
      resolve(v !== 'shentao')
    }, 1200)
  }),
  $message: ({ $pending, $model }) => $pending
    ? 'Checking username!'
    : `Sorry, "${$model}" is already in use.`
}

function useSignup ({ passwordMinLength }) {
  const userName = ref('')
  const password = ref('')
  const repeatPassword = ref('')

  const rules = {
    userName: {
      required,
      uniqueUsername
    },
    password: {
      required,
      minLength: minLength(passwordMinLength)
    },
    repeatPassword: {
      required,
      sameAs: sameAs(password)
    }
  }

  const v$ = useVuelidate(rules, { password, repeatPassword, userName })

  const signup = () => {
    v$.value.$touch()
    nextTick(() => {
      if (!v$.value.$invalid && !v$.value.$pending) {
        alert('Account created!')
      }
    })
  }

  return {
    v$,
    password,
    repeatPassword,
    signup,
    userName
  }
}

export default {
  components: { FormText, ErrorsList },
  setup () {
    const passwordMinLength = ref(7)
    const { password, repeatPassword, userName, v$, signup } = useSignup({ passwordMinLength })

    return { password, repeatPassword, userName, v$, passwordMinLength, signup }
  }
}
</script>
