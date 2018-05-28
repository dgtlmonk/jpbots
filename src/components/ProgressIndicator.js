import React from 'react'
import PropTypes from 'prop-types';
import { Progress } from 'antd'

class ProgressIndicator extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      progress: 0,
      status: props.status || ''
    }
  }

  /* eslint no-plusplus: 0 */
  componentDidMount = () => {
    const _this = this;

    this.interval = setInterval(() => {
      let progress = this.state.progress;

      if (progress > 20)
        this.setState({ status: 'Extinguishing fire ...' })

      if (progress > 35)
        this.setState({ status: 'Extinguished Done. ' })

      if (progress > 45)
        this.setState({ status: 'Recycling initialized ...' })

      if (progress > 60)
        this.setState({ status: 'Recycling ...' })

      if (progress > 75)
        this.setState({ status: 'Sorting and Preparing for shipment ...' })

      if (progress === 100) {
        clearInterval(this.interval);
        this.setState({ status: 'DONE!' })
        _this.props.handleOnProgressFinished()
        return;
      }

      progress++;
      this.setState({ progress });
    }, 10);
  }

  componentWillUnmount = () => {
    if (this.interval) {
      clearInterval(this.interval);
    }
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
