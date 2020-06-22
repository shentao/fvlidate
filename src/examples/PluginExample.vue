<template>
  <div class="flex">
    <SchemaFormWithValidations
      v-model="userData"
      class="w-1/2"
      :schema="schema"
    >
      <template #afterForm>
        <button
          type="button"
          class="button mt-3"
          :disabled="$v.$invalid"
          @click="$v.$touch"
        >
          Submit
        </button>
      </template>
    </SchemaFormWithValidations>
    <div class="w-1/2">
      <h2 class="text-xl">
        SchemaForm Value
      </h2>
      <pre class="pre">userData: {{ userData }}</pre>
      <h2 class="text-xl">
        Vuelidate Output
      </h2>
      <pre class="pre">{{ $v }}</pre>
    </div>
  </div>
</template>

<script>
import { ref, markRaw } from 'vue'
import FormText from '../components/form-elements/FormText.vue'
import ErrorsList from '../components/ErrorsList.vue'
import SchemaFormFactory from '../libs/formvuelatte/SchemaFormFactory.js'
import useVuelidate from '../libs/vuelidate/index.js'
import VuelidatePlugin from '../libs/formvuelatte/useVuelidatePlugin.js'
import WithErrorsPlugin from '../libs/formvuelatte/useWithErrorsPlugin.js'
import { required, email } from '../libs/validators/withMessages/index.js'

const SchemaFormWithValidations = SchemaFormFactory([
  WithErrorsPlugin(ErrorsList),
  VuelidatePlugin
])

const SCHEMA = {
  firstName: {
    component: markRaw(FormText),
    label: 'First Name',
    validations: {
      required
    }
  },
  lastName: {
    component: markRaw(FormText),
    label: 'Last Name',
    validations: {
      required
    }
  },
  email: {
    component: markRaw(FormText),
    label: 'Your email',
    validations: {
      email,
      required
    }
  }
}

export default {
  components: { SchemaFormWithValidations },
  setup (props, context) {
    const userData = ref({
      firstName: 'John',
      lastName: '',
      email: ''
    })

    const updateUserData = value => {
      userData.value = value
    }

    const $v = useVuelidate()

    return {
      schema: SCHEMA,
      userData,
      updateUserData,
      $v
    }
  }
}
</script>

<style lang="stylus">
.steps
  max-width: 35rem
  text-align: left
  margin: 0 auto 4rem
  line-height: 1.6
</style>
