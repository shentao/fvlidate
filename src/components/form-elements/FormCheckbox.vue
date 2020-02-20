<template>
  <div class="mt-2 mb-1">
    <label class="md:w-2/3 block font-bold">
      <input
        class="mr-2 leading-tight"
        type="checkbox"
        :checked="modelValue"
        @input="$emit('update:modelValue', $event.target.checked)"
      >
      <span>
        {{ label }}
      </span>
    </label>
  </div>
</template>

<script>
import FormMixin from '@/libs/formvuelatte/FormMixin'

export default {
  props: {
    modelValue: {
      required: true
    },
    required: {
      type: Boolean,
      default: () => false
    },
    config: {
      type: Object,
      default: () => {}
    },
    label: {
      type: String,
      required: true
    }
  }
}
</script>
