import { toRefs, isRef, reactive, watch, h } from 'vue'
import { required } from '@/libs/validators/withMessages'
const unwrap = v => isRef(v) ? v.value : v

export default function VuelidatePlugin (useVuelidate) {
  return function (baseReturns, props, { emit }) {
    // Take the parsed schema from SchemaForm setup returns
    const { parsedSchema } = baseReturns

    // Wrap all components with the "withVuelidate" component
    const schemaWithVuelidate = unwrap(parsedSchema).map(el => {
      return {
        ...el,
        component: withVuelidate(el.component, useVuelidate)
      }
    })

    const v$ = useVuelidate()
    emit('update:validations', v$)

    return {
      ...baseReturns,
      parsedSchema: schemaWithVuelidate,
      v$: reactive(v$)
    }
  }
}

export function withVuelidate (Comp, useVuelidate) {
  return {
    setup (props, { attrs }) {
      const { validations, modelValue, model } = toRefs(props)
      const propertyName = model.value

      // Setup validation results for that schema leaf
      const vResults = useVuelidate(
        { [propertyName]: validations.value },
        { [propertyName]: modelValue },
        propertyName
      )

      return {
        vResults,
        props,
        attrs
      }
    },
    render () {
      // It renders the original component with the
      // validation results as props
      return h(Comp, {
        ...this.props,
        ...this.attrs,
        vResults: this.vResults
      })
    }
  }
}
