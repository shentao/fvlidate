import { h, isRef } from 'vue'

const unwrap = v => isRef(v) ? v.value : v

export default function WithErrorsPlugin (ErrorsListComp) {
  return function (baseReturns, props) {
    const { parsedSchema } = baseReturns
    const schemaWithErrorsList = unwrap(parsedSchema).map(el => {
      return {
        ...el,
        component: withErrorsComponent(el.component)
      }
    })

    return {
      ...baseReturns,
      parsedSchema: schemaWithErrorsList
    }
  }

  function withErrorsComponent (Comp) {
    return (props, { attrs }) => {
      const errors = props.vResults.$errors
      return h('div', {}, [
        h(Comp, {
          ...props,
          ...attrs,
          invalid: !!errors.length
        }),
        h(ErrorsListComp, { errors })
      ])
    }
  }
}
