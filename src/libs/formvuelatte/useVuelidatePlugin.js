import { toRefs, reactive } from 'vue'

export default function VuelidatePlugin (useVuelidate) {
  return function (baseReturns, props) {
    const state = toRefs(props).modelValue

    const { parsedSchema } = baseReturns
    const validationRules = parsedSchema.value.reduce((rules, field) => {
      if (field.validations) {
        return {
          ...rules,
          [field.model]: field.validations
        }
      }
      return rules
    }, { $autoDirty: true })

    // const newBinds = field => ({
    //   ...binds(field),
    //   validations: validationRules[]
    // )}

    // console.log(validationRules)

    const vResults = useVuelidate(validationRules, state)

    return {
      ...baseReturns,
      vResults: reactive(vResults)
    }
  }
}
