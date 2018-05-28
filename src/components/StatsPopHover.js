import React from 'react'
import pure from 'recompose/pure'
import { Popover, Icon } from 'antd'

const StatsPopHover = () => {
  const stats = (
    <div>
      <p>Has Sentience: 12</p>
      <p>Has Wheels: 12</p>
      <p>On Fire: 20</p>
      <p>Rusty: 20</p>
      <p>Loose Screws: 20</p>
      <p>Scratched paint: 20</p>
    </div>
  );

  return (
    <Popover content={stats} title="Robots Inventory Statistics" placement="left">
      Statistics <Icon style={{ fontSize: 16, color: '#08c' }} type="exclamation-circle-o" />
    </Popover>
  )
}

export default pure(StatsPopHover)
