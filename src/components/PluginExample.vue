<template>
  <div>
    <SchemaFormWithValidations
      :schema="schema"
      :value="userData"
    />
  </div>
</template>

<script>
import FormText from './form-elements/FormText'
import SchemaFormFactory from '@/libs/formvuelatte/SchemaFormFactory'
import useVuelidate from '@/libs/vuelidate'
import VuelidatePlugin from '@/libs/formvuelatte/useVuelidatePlugin'
import { required, email } from '@/libs/validators/withMessages'
import { ref } from 'vue'

const SchemaFormWithValidations = SchemaFormFactory([VuelidatePlugin(useVuelidate)])

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
    required: true,
    config: {
      type: 'email'
    },
    validations: {
      email
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

    return {
      schema: SCHEMA,
      userData
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
