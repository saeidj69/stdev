import * as React from "react"
const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <path
      fill="#28A4DA"
      fillRule="evenodd"
      d="M0 12.853v2.703A.44.44 0 0 0 .444 16h2.703a.417.417 0 0 0 .31-.133l9.707-9.698-3.333-3.333-9.698 9.697a.437.437 0 0 0-.133.32Zm15.742-9.262a.885.885 0 0 0 0-1.253l-2.08-2.08a.885.885 0 0 0-1.253 0l-1.627 1.626 3.334 3.334 1.626-1.627Z"
      clipRule="evenodd"
    />
  </svg>
)
export default SvgComponent
