<template>
  <div>
    <slot name="beforeForm"></slot>
    <form class="schema-form">
      <component
        v-for="field in parsedSchema"
        :key="field.model"
        :is="field.component"
        v-bind="binds(field)"
        :value="val(field)"
        @input="update(field.model, $event)"
        @update-batch="updateBatch(field.model, $event)"
      />
      <slot/>
      <pre>{{ vResults }}</pre>
    </form>
    <slot name="afterForm"></slot>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import useVuelidate from '@/libs/vuelidate'
import { required } from '@/libs/validators/withMessages'

export default {
  setup (props, { emit }) {
    const state = reactive({ name: '' })
    const nameVal$ = useVuelidate({ name: { required } }, state)

    const parsedSchema = computed(() => {
      if (Array.isArray(props.schema)) return props.schema

      const arraySchema = []
      for (const model in props.schema) {
        arraySchema.push({
          ...props.schema[model],
          model
        })
      }

      return arraySchema
    })

    const update = (property, value) => {
      emit('input', {
        ...props.value,
        [property]: value
      })
    }

    const updateBatch = (property, values) => {
      emit('input', {
        ...props.value,
        ...values
      })
    }

    const binds = (field) => {
      return field.schema
        ? { schema: field.schema }
        : { ...props.sharedConfig, ...field }
    }

    const val = (field) => {
      if (field.schema && !props.value[field.model]) {
        return {}
      }

      return props.value[field.model]
    }

    return {
      parsedSchema,
      val,
      binds,
      update,
      updateBatch,
      name,
      nameVal$,
      state
    }
  },
  props: {
    schema: {
      type: [Object, Array],
      required: true,
      validator (schema) {
        if (!Array.isArray(schema)) return true

        return schema.filter(field => !field.model && !field.schema).length === 0
      }
    },
    value: {
      type: Object,
      required: true
    },
    sharedConfig: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
