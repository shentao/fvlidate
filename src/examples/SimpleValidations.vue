<template>
  <div style="flex">
    <div class="w-1/2">
      <button class="button" type="button" @click="v$.$touch">Touch</button>
      <FormText
        label="password"
        v-model="v$.password.$model"
        :config="{ type: 'password' }"
      />
    </div>
    <div class="w-1/2">
      <pre>{{ v$ }}</pre>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import FormText from '@/components/form-elements/FormText'
import useVuelidate from '@/libs/vuelidate'
import { required, minValue, sameAs } from '@/libs/validators/withMessages'

export default {
  components: { FormText },
  setup () {
    const requireCaptcha = ref(false)
    const password = ref('')
    const captchaCode = ref('')
    const randomCaptchaCode = String(Math.random()).substr(0, 4)
    //
    // const validations = computed(() => {
    //   const rules = { password: { required, minValue: minValue(3) } }
    //
    //   return requireCaptcha.value
    //     ? {
    //       ...rules,
    //       captchaCode: {
    //         sameAs: sameAs(randomCaptchaCode)
    //       }
    //     }
    //     : rules
    // })

    const v$ = useVuelidate(
      { password: { required, minValue: minValue(3) } },
      { password, captchaCode }
    )

    return { v$, password, captchaCode, requireCaptcha }
  }
}
</script>
