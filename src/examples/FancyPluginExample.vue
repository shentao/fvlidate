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
      <pre>userData: {{ userData }}</pre>
      <pre>v$: {{ validations }}</pre>
    </div>
  </div>
</template>

<script>
import FormText from '@/components/form-elements/FormText'
import SchemaFormFactory from '@/libs/formvuelatte/SchemaFormFactory'
import useVuelidate from '@/libs/vuelidate'
import VuelidatePlugin from '@/libs/formvuelatte/useVuelidatePlugin'
import { required, email } from '@/libs/validators/withMessages'
import { ref, h, watch, toRefs } from 'vue'
import EmailModal from '@/components/form-elements/EmailModal'

const SchemaFormWithValidations = SchemaFormFactory([VuelidatePlugin(useVuelidate)])

const withErrors = Comp => (props, { attrs }) => {
  const errors = props.vResults.$errors
  return h('div', {}, [
    h(Comp, {
      ...props,
      ...attrs,
      invalid: !!errors.length
    }),
    errors.map(error => h('small', { class: 'block mb-2' }, `${error.$message}`))
  ])
}

const withVuelidate = (Comp, useVuelidate) => ({
  setup (props, { attrs }) {
    const { validations, modelValue, model } = toRefs(props)

    const v$ = useVuelidate({ [model.value]: validations.value }, { [model.value]: modelValue }, model.value)

    return {
      v$,
      props,
      attrs
    }
  },
  render (context) {
    return h('div', {}, [
      h(Comp, {
        ...this.props,
        ...this.attrs
      }),
      this.v$.$errors.map(error => h('small', { class: 'block mb-2' }, `${error.$message}`))
    ])
  }
})

const SCHEMA = {
  firstName: {
    component: withVuelidate(FormText, useVuelidate),
    label: 'First Name',
    validations: {
      required
    }
  },
  lastName: {
    component: withVuelidate(FormText, useVuelidate),
    label: 'Last Name',
    validations: {
      required
    }
  },
  email: {
    component: withVuelidate(FormText, useVuelidate),
    label: 'Your email',
    required: true,
    config: {
      type: 'email'
    },
    validations: {
      email,
      required
    }
  },
  emailTemplate: {
    component: EmailModal
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
