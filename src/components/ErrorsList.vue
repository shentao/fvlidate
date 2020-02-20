<template>
  <div>
    <span
      v-for="(error, index) of errors"
      :key="index"
      class="block"
      :class="[ error.$pending ? 'text-blue-500' : 'text-red-500' ]"
    >
      {{ error.$message }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    errors: {
      type: Array,
      required: true
    }
  }
}
</script>
