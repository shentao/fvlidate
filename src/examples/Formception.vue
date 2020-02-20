<template>
  <div class="flex">
    <SchemaForm
      class="w-1/2"
      :schema="schema"
      v-model="userData"
    />
    <div class="w-1/2">
      <h2 class="text-xl">SchemaForm value</h2>
      <pre class="pre">userData: {{ userData }}</pre>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import FormText from '@/components/form-elements/FormText'
import FormSelect from '@/components/form-elements/FormSelect'
import FormCheckbox from '@/components/form-elements/FormCheckbox'

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
    label: 'Email',
    required: true,
    config: {
      type: 'email'
    }
  },
  nested: {
    // NOTE: Nested SchemaForm!
    component: SchemaForm,
    schema: {
      firstName: {
        component: FormText,
        label: 'Nested First Name'
      },
      lastName: {
        component: FormText,
        label: 'Nested Last Name'
      },
      email: {
        component: FormText,
        label: 'Nested Email',
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
