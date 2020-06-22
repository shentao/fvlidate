<template>
  <div>
    <span
      v-for="(error, index) of errors"
      :key="index"
      class="block"
      :class="[ error.$pending ? 'text-blue-500' : 'text-red-500' ]"
    >
      {{ customMessage(error) }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    errors: {
      type: Array,
      required: true
    },
    customMessage: {
      type: Function,
      default: err => err.$message
    }
  }
}
</script>
