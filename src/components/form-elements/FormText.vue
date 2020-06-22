<template>
  <div
    class="mt-2 mb-1"
    :class="invalid && 'has-errors'"
  >
    <label
      :for="label"
      class="font-bold"
    >
      {{ label }}
    </label>
    <input
      :id="label"
      class="input"
      :value="modelValue"
      :type="config.type"
      :required="required"
      :disabled="readOnly"
      autocomplete="off"
      @input="$emit('update:modelValue', $event.target.value)"
    >
  </div>
</template>

<script>
export default {
  props: {
    invalid: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: () => false
    },
    modelValue: {
      type: [String, Number],
      default: ''
    },
    label: {
      type: String,
      required: true
    },
    config: {
      type: Object,
      default: () => ({ type: 'text' })
    },
    readOnly: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="stylus">
.has-errors
  label
    @apply text-red-600
  .input
    @apply border-red-500

.input
  @apply p-2 border border-gray-300 rounded block

.input:disabled
  background-color: lightgrey
</style>
