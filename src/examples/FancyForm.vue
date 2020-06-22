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
import EmailModal from '../components/form-elements/EmailModal.vue'
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
    label: 'Your email',
    config: {
      type: 'email'
    }
  },
  emailTemplate: {
    // NOTE 1: This is a special component
    component: markRaw(EmailModal)
  },
  favoriteThingAboutVue: {
    component: markRaw(FormSelect),
    label: 'Favorite thing about Vue',
    required: true,
    options: [
      'Ease of use',
      'Documentation',
      'Community'
    ]
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
    // NOTE 2: Schema can be dynamic
    const schema = computed(() => userData.value.isVueFan
      ? {
        ...SCHEMA,
        feedback: {
          component: markRaw(FormText),
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
