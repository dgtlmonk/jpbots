import React from 'react'
import PropTypes from 'prop-types'

class StatusMarker extends React.PureComponent {
  render() {
    const { color, status } = this.props;

    return (
      <span style={{ display: 'block' }}>
        <span id="badge" style={{ color }}>&nbsp;&#x25cf;</span> {status}
      </span>
    )
  }
}

StatusMarker.propTypes = {
  color: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

StatusMarker.defaultProps = {
  color: '#fff',
  status: 'none'
};

export default StatusMarker
