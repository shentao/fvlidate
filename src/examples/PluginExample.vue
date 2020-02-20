<template>
  <div class="flex">
    <SchemaFormWithValidations
      class="w-1/2"
      :schema="schema"
      v-model="userData"
      @update:validations="updateValidations"
    >
      <template #afterForm>
        <button
          type="button"
          class="button mt-3"
          :disabled="validations.$invalid"
          @click="validations.$touch"
        >
          Submit
        </button>
      </template>
    </SchemaFormWithValidations>
    <div class="w-1/2">
      <h2 class="text-xl">SchemaForm value</h2>
      <pre class="pre">userData: {{ userData }}</pre>
      <h2 class="text-xl">Validations results</h2>
      <pre class="pre">{{ validations }}</pre>
    </div>
  </div>
</template>

<script>
import FormText from '@/components/form-elements/FormText'
import ErrorsList from '@/components/ErrorsList'
import SchemaFormFactory from '@/libs/formvuelatte/SchemaFormFactory'
import useVuelidate from '@/libs/vuelidate'
import VuelidatePlugin from '@/libs/formvuelatte/useVuelidatePlugin'
import WithErrorsPlugin from '@/libs/formvuelatte/useWithErrorsPlugin'
import { required, email } from '@/libs/validators/withMessages'
import { ref, h, watch, toRefs } from 'vue'

const SchemaFormWithValidations = SchemaFormFactory([
  WithErrorsPlugin(ErrorsList),
  VuelidatePlugin(useVuelidate)
])

const SCHEMA = {
  firstName: {
    component: FormText,
    label: 'First Name',
    validations: {
      required
    }
  },
  lastName: {
    component: FormText,
    label: 'Last Name',
    validations: {
      required
    }
  },
  email: {
    component: FormText,
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

    const validations = ref({})
    const updateValidations = v => {
      validations.value = v.value
    }

    return {
      schema: SCHEMA,
      userData,
      updateUserData,
      validations,
      updateValidations
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
