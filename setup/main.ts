import { defineAppSetup } from '@slidev/types'
import { Network } from '@lucide/vue'

export default defineAppSetup(({ app }) => {
  app.component('Network', Network)
})
