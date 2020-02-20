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
import { toRefs } from 'vue'
import FormText from './FormText'
import Modal from './Modal'
import useVuelidate from '@/libs/vuelidate'
import { required, minValue } from '@/libs/validators/withMessages'

export default {
  components: { Modal, FormText },
  props: {
    modelValue: { required: true },
    schema: { type: Object, required: false }
  },
  setup (props, { emit }) {
    const { modelValue } = toRefs(props)

    function save () {
      emit('update:modelValue', {
        ...modelValue.value
      })
    }
  },
  data () {
    return {
      modalShown: false,
      values: { ...this.modelValue }
    }
  },
  methods: {
    save () {
      this.$emit('update:modelValue', {
        ...this.modelValue,
        ...this.values
      })

      this.modalShown = false
    }
  }
}
</script>

<style lang="stylus" scoped>
.baseButton
  margin-bottom: 2rem
</style>
