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
    config: {
      type: 'email'
    }
  },
  emailTemplate: {
    component: EmailModal
  },
  favoriteThingAboutVue: {
    component: FormSelect,
    label: 'Favorite thing about Vue',
    required: true,
    options: [
      'Ease of use',
      'Documentation',
      'Community'
    ]
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
    const schema = computed(() => userData.value.isVueFan
      ? {
        ...SCHEMA,
        feedback: {
          component: FormText,
          label: 'Gimme some feedback'
        }
      }
      : SCHEMA
    )

    return {
      userData,
      schema
    }
  }
}
</script>
