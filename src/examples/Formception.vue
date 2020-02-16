<template>
  <div class="flex">
    <SchemaForm
      class="w-1/2"
      :schema="schema"
      v-model="userData"
    />
    <pre class="w-1/2">{{ userData }}</pre>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import FormText from '@/components/form-elements/FormText'
import FormSelect from '@/components/form-elements/FormSelect'
import FormCheckbox from '@/components/form-elements/FormCheckbox'
import EmailModal from '@/components/form-elements/EmailModal'
import SchemaForm from '@/libs/formvuelatte/SchemaForm'

const SCHEMA = {
  firstName: {
    component: FormText,
    label: 'First Name'
  },
  lastName: {
    component: FormText,
    label: 'Last Name'
  },
  email: {
    component: FormText,
    label: 'Your email',
    required: true,
    config: {
      type: 'email'
    }
  },
  nested: {
    component: SchemaForm,
    schema: {
      firstName: {
        component: FormText,
        label: 'First Name'
      },
      lastName: {
        component: FormText,
        label: 'Last Name'
      },
      email: {
        component: FormText,
        label: 'Your email',
        required: true,
        config: {
          type: 'email'
        }
      }
    }
  },
  isVueFan: {
    component: FormCheckbox,
    label: 'Are you a Vue fan?'
  }
}

export default {
  components: { SchemaForm },
  setup () {
    const userData = ref({})

    return {
      userData,
      schema: SCHEMA
    }
  }
}
</script>
