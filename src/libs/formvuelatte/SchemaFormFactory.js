import SchemaForm from './SchemaForm'

export default function SchemaFormFactory (plugins = [], config) {
  const originalSetup = SchemaForm.setup

  function setup (props, context) {
    const baseSchemaFormReturns = originalSetup(props, context)

    if (!plugins.length) return baseSchemaFormReturns
    else {
      return plugins.reduce((schemaFormReturns, plugin) => {
        return plugin(schemaFormReturns, props)
      }, baseSchemaFormReturns)
    }
  }

  return {
    ...SchemaForm,
    setup
  }
}
