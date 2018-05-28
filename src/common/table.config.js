import React from 'react'

const renderStatusMarker = (color, status) => {
  return (
    <span style={{
      display: 'block'
    }}>
      <span style={{
        color
      }}>&nbsp; &#x25cf;</span>
      {status}
    </span>
  )
}

const renderRobotStatuses = statuses => {
  return statuses.map(status => {
    let tag = {}
    if (status === 'rusty')
      tag = renderStatusMarker("#c6a06d", status)
    if (status === 'on fire')
      tag = renderStatusMarker("red", status)
    if (status === 'loose screws')
      tag = renderStatusMarker("green", status)
    if (status === 'paint scratched')
      tag = renderStatusMarker("#c1bcbb", status)

    return (
      <span key={status}>
        {tag}
      </span>
    )
  })
}

export const QAColumns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
    width: 100,
    render: text => <span>{text}</span>
  },
  {
    title: 'Configuration',
    children:[{
        title: 'Sentience',
        dataIndex: 'configuration.hasSentience',
        key: 'configuration.hasSentience',
        sorter: (a, b) => a.configuration.hasSentience - b.configuration.hasSentience,
        width: 100,
        render: sentience => (
          <div style={{
            width: "100%",
            height: "100%"
          }}>
            { sentience
              ? 'Yes'
              : 'No'}
          </div>
        )
      }, {
        title: 'Colour',
        dataIndex: 'configuration.Colour',
        key: 'configuration.Colour',
        fixed: 'left',
        width: 150,
        sorter: (a, b) => a.configuration.Colour.length - b.configuration.Colour.length,
        render: text => <span>{text}</span>
      },
      {
        title: 'Has Wheels',
        dataIndex: 'configuration.hasWheels',
        key: 'configuration.hasWheels',
        sorter: (a, b) => a.configuration.hasWheels - b.configuration.hasWheels,
        width: 100,
        render: wheels => (
          <div style={{
            width: "100%",
            height: "100%"
          }}>
            {wheels
              ? 'Yes'
              : 'No'}
          </div>
        )
      }, {
        title: 'Rotors',
        dataIndex: 'configuration.numberOfRotors',
        key: 'configuration.numberOfRotors',
        width: 100,
        sorter: (a, b) => a.configuration.numberOfRotors - b.configuration.numberOfRotors,
        render: text => <span>{text}</span>
      }, {
        title: 'Has Tracks',
        dataIndex: 'configuration.hasTracks',
        key: 'configuration.hasTracks',
        width: 200,
        fixed: 'left',
        sorter: (a, b) => a.configuration.hasTracks - b.configuration.hasTracks,
        render: tracks => (
          <div style={{
            width: "100%",
            height: "100%"
          }}>
            {tracks
              ? 'Yes'
              : 'No'}
          </div>
        )
      }
    ]
  },{
    title: 'Status',
    key: 'statuses',
    width: 200,
    render: text => (
      <div>
        {
          renderRobotStatuses(text.statuses)
        }
      </div>
    )
  }
];


export const ShipmentColumns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
    width: 100,
    render: text => <span>{text}</span>
  },
  {
    title: 'Configuration',
    children:[{
        title: 'Sentience',
        dataIndex: 'configuration.hasSentience',
        key: 'configuration.hasSentience',
        sorter: (a, b) => a.configuration.hasSentience - b.configuration.hasSentience,
        width: 100,
        render: sentience => (
          <div style={{
            width: "100%",
            height: "100%"
          }}>
            { sentience
              ? 'Yes'
              : 'No'}
          </div>
        )
      }, {
        title: 'Colour',
        dataIndex: 'configuration.Colour',
        key: 'configuration.Colour',
        fixed: 'left',
        width: 150,
        sorter: (a, b) => a.configuration.Colour.length - b.configuration.Colour.length,
        render: text => <span>{text}</span>
      },
      {
        title: 'Has Wheels',
        dataIndex: 'configuration.hasWheels',
        key: 'configuration.hasWheels',
        sorter: (a, b) => a.configuration.hasWheels - b.configuration.hasWheels,
        width: 100,
        render: wheels => (
          <div style={{
            width: "100%",
            height: "100%"
          }}>
            {wheels
              ? 'Yes'
              : 'No'}
          </div>
        )
      }, {
        title: 'Rotors',
        dataIndex: 'configuration.numberOfRotors',
        key: 'configuration.numberOfRotors',
        width: 100,
        sorter: (a, b) => a.configuration.numberOfRotors - b.configuration.numberOfRotors,
        render: text => <span>{text}</span>
      }, {
        title: 'Has Tracks',
        dataIndex: 'configuration.hasTracks',
        key: 'configuration.hasTracks',
        width: 200,
        fixed: 'left',
        sorter: (a, b) => a.configuration.hasTracks - b.configuration.hasTracks,
        render: tracks => (
          <div style={{
            width: "100%",
            height: "100%"
          }}>
            {tracks
              ? 'Yes'
              : 'No'}
          </div>
        )
      }
    ]
  },{
    title: 'Status',
    key: 'statuses',
    width: 200,
    render: text => (
      <div>
        {
          renderRobotStatuses(text.statuses)
        }
      </div>
    )
  }
];


export const ShipmentSummaryColumns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
    width: 100,
    render: text => <span>{text}</span>
  },
  {
    title: 'Configuration',
    children: [{
      title: 'Sentience',
      dataIndex: 'configuration.hasSentience',
      key: 'configuration.hasSentience',
      sorter: (a, b) => a.configuration.hasSentience - b.configuration.hasSentience,
      width: 100,
      render: sentience => (
        <div style={{
          width: "100%",
          height: "100%"
        }}>
          {sentience
            ? 'Yes'
            : 'No'}
        </div>
      )
    }, {
      title: 'Colour',
      dataIndex: 'configuration.Colour',
      key: 'configuration.Colour',
      fixed: 'left',
      width: 150,
      sorter: (a, b) => a.configuration.Colour.length - b.configuration.Colour.length,
      render: text => <span>{text}</span>
    },
    {
      title: 'Has Wheels',
      dataIndex: 'configuration.hasWheels',
      key: 'configuration.hasWheels',
      sorter: (a, b) => a.configuration.hasWheels - b.configuration.hasWheels,
      width: 100,
      render: wheels => (
        <div style={{
          width: "100%",
          height: "100%"
        }}>
          {wheels
            ? 'Yes'
            : 'No'}
        </div>
      )
    }, {
      title: 'Rotors',
      dataIndex: 'configuration.numberOfRotors',
      key: 'configuration.numberOfRotors',
      width: 100,
      sorter: (a, b) => a.configuration.numberOfRotors - b.configuration.numberOfRotors,
      render: text => <span>{text}</span>
    }, {
      title: 'Has Tracks',
      dataIndex: 'configuration.hasTracks',
      key: 'configuration.hasTracks',
      width: 200,
      fixed: 'left',
      sorter: (a, b) => a.configuration.hasTracks - b.configuration.hasTracks,
      render: tracks => (
        <div style={{
          width: "100%",
          height: "100%"
        }}>
          {tracks
            ? 'Yes'
            : 'No'}
        </div>
      )
    }
    ]
  }, {
    title: 'Status',
    key: 'statuses',
    width: 200,
    render: text => (
      <div>
        {
          renderRobotStatuses(text.statuses)
        }
      </div>
    )
  }
];
