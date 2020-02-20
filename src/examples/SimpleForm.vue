<template>
  <div class="flex">
    <SchemaForm
      class="w-1/2"
      :schema="schema"
      v-model="userData"
    />
    <div class="w-1/2">
      <h2 class="text-xl">SchemaForm Value</h2>
      <pre class="pre">userData: {{ userData }}</pre>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import SchemaForm from '@/libs/formvuelatte/SchemaForm'

// NOTE 1: Import input components
import FormText from '@/components/form-elements/FormText'
import FormSelect from '@/components/form-elements/FormSelect'
import FormCheckbox from '@/components/form-elements/FormCheckbox'

const SCHEMA = {
  firstName: {
    // NOTE 2: Declare component to handle input for this property
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
    // NOTE 3: Config is a catch-all object that
    // will be spread to the handler  component
    config: {
      type: 'email'
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
