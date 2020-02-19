<template>
  <div class="flex">
    <div class="w-1/2">
      <h2 class="text-xl">Form</h2>
      <FormText
        label="Email"
        v-model="v$.userEmail.$model"
        :invalid="v$.userEmail.$invalid"
        :config="{ type: 'email' }"
      />
      <ErrorsList :errors="v$.$errors" />
      <!-- <div>
        <span v-for="(error, index) of v$.$errors" :key="index" class="text-red-500">
          {{ error.$message }}
        </span>
      </div> -->
      <button
        class="button mt-3"
        type="button"
        :disabled="v$.$invalid"
        @click="v$.$touch"
      >
        Submit (with $touch)
      </button>
    </div>
    <div class="w-1/2">
      <h2 class="text-xl">Vuelidate Output:</h2>
      <pre class="pre">{{ v$ }}</pre>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import FormText from '@/components/form-elements/FormText'
import useVuelidate from '@/libs/vuelidate'
import { required, email } from '@/libs/validators/withMessages'
import ErrorsList from '@/components/ErrorsList'

export default {
  components: { FormText, ErrorsList },
  setup () {
    const userEmail = ref('')

    const v$ = useVuelidate(
      { userEmail: { required, email } },
      { userEmail }
    )

    return { v$, userEmail }
  }
}
</script>
