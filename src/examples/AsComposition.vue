<template>
  <div style="padding-top: 2rem;">
    <div style="margin-bottom: 20px">
      <FormText label="Minimal password length" type="number" v-model.number="minimumLength" :config="{ type: 'number' }"/>
    </div>
    <div style="margin-bottom: 10px">
      <FormText label="Password: " type="text" v-model="password" />
    </div>
    <div style="margin-bottom: 10px">
      <FormText label="Repeat Password: " type="text" v-model="repeatPassword" />
    </div>
    <button class="button" type="button" @click="v$.$touch">Submit</button>

    <div
      v-for="(error, index) of v$.$errors"
      :key="index"
    >
      <strong>{{ error.$validator }}</strong>
      <small style="color: black"> on property</small>
      <strong class="ml-1 text-red-400">{{ error.$property }}</strong>
      <small style="color: black"> says:</small>
      <strong class="ml-1 text-red-400">{{ error.$message }}</strong>
    </div>
    <pre style="background-color: white;">{{ v$.$errors }}</pre>
  </div>
</template>

<script>
import { ref } from 'vue'
import useVuelidate from '@/libs/vuelidate'
import { required, minLength, sameAs, helpers } from '@/libs/validators/withMessages'
import FormText from '@/components/form-elements/FormText'

const { withMessage, withParams, unwrap } = helpers

function $t (key, params) {
  return {
    'errors.sameAs': `It has to be the same as ${params}`
  }[key]
}

const asyncValidator = {
  $async: true,
  $validator: v => new Promise(resolve => {
    setTimeout(() => {
      resolve(v === 'aaaa')
    }, 2000)
  }),
  $message: ({ $pending, $model }) => $pending ? 'Checking!' : `Error! ${$model} Isn’t "aaaa"`
}

function usePassword ({ minimumLength }) {
  const password = ref('')
  const repeatPassword = ref('')

  const rules = {
    password: {
      required: withMessage('This field is required', required),
      minLength: withMessage(
        ({ $params }) => `Has to be at least ${$params.length} characters long`,
        minLength(minimumLength)
      ),
      asyncValidator,
      $autoDirty: true
    },
    repeatPassword: {
      required,
      sameAs: withMessage(
        ({ $params }) => $t('errors.sameAs', $params.equalTo),
        sameAs(password)
      ),
      $autoDirty: true
    }
  }

  const v$ = useVuelidate(
    rules, { password, repeatPassword }, 'usePassword'
  )

  return {
    v$,
    password,
    repeatPassword,
    rules
  }
}

const hasKeys = keyLength => value => Object.keys(value).length === unwrap(keyLength)
const hasKeysWithParams = keys => withParams({ keys }, hasKeys(keys))

export default {
  components: { FormText },
  setup () {
    const minimumLength = ref(7)
    const { password, repeatPassword, v$ } = usePassword({ minimumLength })

    return { password, repeatPassword, v$, minimumLength }
  }
}
</script>
