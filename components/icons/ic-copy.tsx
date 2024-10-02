import * as React from 'react'
import { SVGProps, memo } from 'react'
const IconCopy = memo((props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" {...props}>
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M10 4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-4a1 1 0 0 1-1-1V5a1 1 0 0 0-1-1h-2Zm4.063-2a3 3 0 0 1 2.305 1.08l3.937 4.724A3 3 0 0 1 21 9.724V15a3 3 0 0 1-3 3v1a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3h1V5a3 3 0 0 1 3-3h4.063ZM7 8H6a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-1h-6a3 3 0 0 1-3-3V8Zm10.865 0-2.904-3.485c.026.158.039.32.039.485v3h2.865Z"
      clipRule="evenodd"
    />
  </svg>
))
export default IconCopy

IconCopy.displayName = 'IconCopy'
