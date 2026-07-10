import { BatteryWarning, Check, CodeXml, Hourglass, Link, Network, TriangleAlert, Zap } from '@lucide/vue'
import { defineAppSetup } from '@slidev/types'

export default defineAppSetup(({ app }) => {
  app.component('NetworkIcon', Network)
  .component('HourglassIcon', Hourglass)
  .component('BatteryWarningIcon', BatteryWarning)
  .component('ZapIcon', Zap)
  .component('LinkIcon', Link)
  .component('CodeXmlIcon', CodeXml)
  .component('CheckIcon', Check)
  .component('TriangleAlertIcon', TriangleAlert)
})
