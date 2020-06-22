import { h, markRaw } from 'vue'

export default function WithErrorsPlugin (ErrorsListComp) {
  return function (baseReturns, props) {
    const { parsedSchema } = baseReturns

    const schemaWithErrorsList = parsedSchema.value.map(el => {
      return {
        ...el,
        component: markRaw(withErrorsComponent(el.component))
      }
    })

    return {
      ...baseReturns,
      parsedSchema: schemaWithErrorsList
    }
  }

  function withErrorsComponent (Comp) {
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
