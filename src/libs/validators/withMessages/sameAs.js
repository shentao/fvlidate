import sameAs from '../raw/sameAs'
import { unwrap } from '../utils/common'

export default (equalTo) => ({
  $validator: sameAs(equalTo),
  $message: ({ $params }) => `The value must be equal to the ${unwrap(equalTo)} value.`,
  $params: { equalTo }
})
