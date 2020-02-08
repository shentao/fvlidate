<template>
  <div>
    <label>
      <input
        type="checkbox"
        :checked="value"
        @input="$emit('input', $event.target.checked)"
      >
      {{ label }}
    </label>
  </div>
</template>

<script>
import FormMixin from '@/libs/formvuelatte/FormMixin'

export default {
  mixins: [FormMixin],
  props: {
    value: { required: true },
    label: {
      type: String,
      required: true
    }
  }
}
</script>
