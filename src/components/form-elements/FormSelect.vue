<template>
  <div class="mt-2 mb-1">
    <label :for="label" class="block font-bold">
      {{ label }}
    </label>
    <div class="inline-block relative w-64">
      <select
        class="select"
        :value="modelValue"
        :required="required"
        :id="label"
        @input="$emit('update:modelValue', $event.target.value)"
      >
        <option
          v-for="option in options"
          :key="option"
          :value="option"
          :selected="option === modelValue"
        >
          {{ option }}
        </option>
      </select>
      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
      </div>
    </div>
  </div>
</template>

<script>
import FormMixin from '@/libs/formvuelatte/FormMixin'

export default {
  props: {
    label: { type: String, required: true },
    options: { type: Array, required: true },
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
    }
  }
}
</script>

<style>
.select {
  @apply block appearance-none w-full bg-white border px-4 py-2 pr-8 rounded leading-tight;
  -moz-appearance: none;
}
</style>
