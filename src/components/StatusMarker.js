import React from 'react'
import pure from 'recompose/pure'

const StatusMarker = (color, status) => {
  return (
    <span style={{ display: 'block' }}>
      <span style={{ color }}>&nbsp; &#x25cf;</span>
      {status}
    </span>
  )
}

export default pure(StatusMarker)
