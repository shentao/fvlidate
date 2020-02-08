<template>
  <div>
    <label :for="label">
      {{ label }}
    </label>
    <input
      class="input"
      :value="value"
      :type="config.type"
      :required="required"
      :id="label"
      :disabled="readOnly"
      @input="$emit('input', $event.target.value)"
    >
  </div>
</template>

<script>
import FormMixin from '@/libs/formvuelatte/FormMixin'

export default {
  mixins: [FormMixin],
  props: {
    required: {
      type: Boolean,
      default: () => false
    },
    value: { required: true },
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
