import { h, markRaw, computed } from 'vue'

export default function ErrorsPlugin (ErrorsListComp) {
  return function (setupOutput) {
    const { parsedSchema } = setupOutput

    const schemaWithErrorsList = computed(() => parsedSchema.value.map(el => ({
      ...el,
      component: markRaw(withErrors(el.component))
    })))

    return {
      ...setupOutput,
      parsedSchema: schemaWithErrorsList
    }
  }

  function withErrors (Comp) {
    return (props) => {
      const errors = props.vuelidateResults.value.$errors

      return [
        h(Comp, {
          ...props,
          invalid: !!errors.length
        }),
        h(ErrorsListComp, { errors })
      ]
    }
  }
}
