import { toRefs, reactive, watch } from 'vue'
import { required } from '@/libs/validators/withMessages'

export default function VuelidatePlugin (useVuelidate) {
  return function (baseReturns, props, { emit }) {
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

    const vResults = useVuelidate({ x: 1 }, { x: { required } })

    emit('update:validations', vResults)

    return {
      ...baseReturns,
      vResults: reactive(vResults)
    }
  }
}
