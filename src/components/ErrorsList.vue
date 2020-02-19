<template>
  <div>
    <span v-for="(error, index) of errors" :key="index" class="text-red-500 block">
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
