<template>
  <div class="mt-4 mb-1">
    <button class="button" type="button" @click="modalShown = !modalShown">
      Edit Email Template
    </button>

    <Modal v-if="modalShown">
      <p>Configure your email:</p>
      <FormText
        label="Title"
        v-model="values.title"
      />
      <FormText
        label="Content"
        v-model="values.content"
      />

      <div class="mt-3">
        <button class="button mr-2" @click="save">Save</button>
        <button class="button" @click="modalShown = false">Cancel</button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { toRefs, ref } from 'vue'
import FormText from './FormText.vue'
import Modal from './Modal.vue'
import useVuelidate from '../../libs/vuelidate/index.js'
import { required, minValue } from '../../libs/validators/withMessages'

export default {
  components: { Modal, FormText },
  props: {
    // NOTE 1: Make it compatible with v-model
    modelValue: { required: true },
    schema: { type: Object, required: false }
  },
  setup (props, { emit }) {
    const modalShown = ref(false)
    const values = ref({ ...props.modelValue })
    const { modelValue } = toRefs(props)

    return { save, modalShown, values }

    function save () {
      // NOTE 2: Make it compatible with v-model
      emit('update:modelValue', {
        ...modelValue.value,
        ...values
      })

      modalShown.value = false
    }
  }
}
</script>

<style lang="stylus" scoped>
.baseButton
  margin-bottom: 2rem
</style>
