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
import { ref, computed, markRaw } from 'vue'
import FormText from '../components/form-elements/FormText.vue'
import FormSelect from '../components/form-elements/FormSelect.vue'
import FormCheckbox from '../components/form-elements/FormCheckbox.vue'

import SchemaForm from '../libs/formvuelatte/SchemaForm.vue'

const SCHEMA = {
  firstName: {
    component: markRaw(FormText),
    label: 'First Name'
  },
  lastName: {
    component: markRaw(FormText),
    label: 'Last Name'
  },
  email: {
    component: markRaw(FormText),
    label: 'Email',
    required: true,
    config: {
      type: 'email'
    }
  },
  nested: {
    // NOTE: Nested SchemaForm!
    component: markRaw(SchemaForm),
    schema: {
      firstName: {
        component: markRaw(FormText),
        label: 'Nested First Name'
      },
      lastName: {
        component: markRaw(FormText),
        label: 'Nested Last Name'
      },
      email: {
        component: markRaw(FormText),
        label: 'Nested Email',
        required: true,
        config: {
          type: 'email'
        }
      }
    }
  },
  isVueFan: {
    component: markRaw(FormCheckbox),
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
