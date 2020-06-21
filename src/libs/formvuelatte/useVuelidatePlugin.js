import { h, markRaw, toRefs, unref } from 'vue'
import useVuelidate from '../vuelidate/index.js'

export default function VuelidatePlugin (baseReturns) {
  // Take the parsed schema from SchemaForm setup returns
  const { parsedSchema } = baseReturns

  // Wrap all components with the "withVuelidate" component
  const schemaWithVuelidate = unref(parsedSchema).map(el => {
    return {
      ...el,
      component: markRaw(withVuelidate(el.component))
    }
  })

  return {
    ...baseReturns,
    parsedSchema: schemaWithVuelidate
  }
}

export function withVuelidate (Comp) {
  return {
    props: ['model', 'modelValue', 'validations'],
    setup (props, { attrs }) {
      const { model, validations, modelValue } = toRefs(props)
      const propertyName = model.value

      // Setup validation results for that schema leaf
      const vuelidateResults = useVuelidate(
        { [propertyName]: validations.value },
        { [propertyName]: modelValue },
        propertyName
      )

      return () => h(Comp, {
        ...props,
        ...attrs,
        vuelidateResults
      })
    }
  }
}
