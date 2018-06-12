import React from 'react'
import PropTypes from 'prop-types';
import { Progress } from 'antd'

export const PROGRESS_STATUS = {
  ESTINGUISHING_FIRE_INIT: 'Extinguishing fire ...',
  ESTINGUISHING_FIRE_DONE: 'Extinguish Done.',
  RECYCLE_INIT: 'Recycling initialized ...',
  RECYCLE_DONE: 'Recycling Done.',
  SHIPMENT_INIT: 'Sorting and Preparing for shipment ...',
  SHIPMENT_DONE: 'Sorting and Preparing for shipment Done.',
}

class ProgressIndicator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      progress: 0,
      status: props.status || ''
    }
  }

  componentDidMount = () => {
    this._startProgress()
  }

  /* eslint no-plusplus: 0 */
  _startProgress = () => {
    const _this = this;

    this.interval = setInterval(() => {
      let progress = this.state.progress;

      if (progress > 20) {
        this.setState({ status: PROGRESS_STATUS.ESTINGUISHING_FIRE_INIT})
      }

      if (this.state.progress > 35)
        this.setState({ status: PROGRESS_STATUS.ESTINGUISHING_FIRE_DONE})

      if (this.state.progress > 45)
        this.setState({ status: PROGRESS_STATUS.RECYCLE_INIT })

      if (this.state.progress > 60)
        this.setState({ status: PROGRESS_STATUS.RECYCLE_DONE })

      if (this.state.progress > 75)
        this.setState({ status: PROGRESS_STATUS.SHIPMENT_INIT})

      if (progress === 100) {
        clearInterval(this.interval);
        this.setState({ status: PROGRESS_STATUS.SHIPMENT_DONE })
        _this.props.handleOnProgressFinished()

        if (_this.interval)
          clearInterval(this.interval);
      }

      progress++;
      this.setState({
        progress
      });
    }, 40);
  }

  render() {

    return (
      <div>
        <Progress type="circle" percent={this.state.progress} />
        <p className="progress-text">{this.state.status}</p>
      </div>
    )
  }
}

/* eslint "react/no-unused-prop-types":0 */
ProgressIndicator.propTypes = {
  handleOnProgressFinished: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
};

export default ProgressIndicator;
