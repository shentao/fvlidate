<template>
  <div>
    <label :for="label">
      {{ label }}
    </label>
    <input
      class="input"
      :value="modelValue"
      :type="config.type"
      :required="required"
      :id="label"
      :disabled="readOnly"
      @input="$emit('update', $event.target.value)"
    >
  </div>
</template>

<script>
export default {
  props: {
    required: {
      type: Boolean,
      default: () => false
    },
    modelValue: { required: true },
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
.input
  @apply p-2 border border-gray-300 rounded block

.input:disabled
  background-color: lightgrey
</style>
