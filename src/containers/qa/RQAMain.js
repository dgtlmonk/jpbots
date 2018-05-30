import React from 'react'
import PropTypes from 'prop-types';
import { RQAStart, ShipmentStart, ShipmentSummary } from 'containers'
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { Button, Layout, Steps, Icon, message, Row, Col } from 'antd'
import { actions as qa} from 'modules/qa/actions'
import { actions as app} from 'modules/app/actions'

const { Content } = Layout;
const Step = Steps.Step;

class RQAMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  }

  componentDidMount() {
    this.props.onAppStart()
  }

  /* eslint "consistent-return": 0 */
  next() {
    if ((this.state.current === 1) && (this.props.shipmentData.length < 1)) {
        message.error('Please select and add item for Shipment first!')
        return false
    }
    const next = this.state.current + 1;
    this.setState({ current: next });
    this.props.onNextStep({ next })
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  render() {
    const { current } = this.state;
    const opts = {};
    const steps = [{
      title: 'QA',
      content: <RQAStart datasource={this.props.datasource}/>,
    }, {
      title: 'Shipment',
      content: <ShipmentStart datasource={this.props.datasource}/>,
    }, {
      title: 'Shipment Summary',
      content: <ShipmentSummary/>,
    }];

    if (!this.props.qaPassed) {
      opts.disabled = "disabled";
    }

    return (
      <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
        <Row>
          <Col>
            <Steps current={current}>
              {steps.map(item => <Step key={item.title} title={item.title} />)}
            </Steps>
            <div className="steps-content">{steps[this.state.current].content}</div>
          </Col>
          <Col>
            <div className="steps-action" style={{ textAlign: 'center' }}>
              {
              this.state.current !== steps.length - 1
              &&
                <Button {...opts} type="primary" onClick={() => this.next()}>
                  { this.state.current === 0 ? 'Shipment 1 of 2' : 'Send Shipment'}<Icon type="right" />
                </Button>
              }
              {
                this.state.current === steps.length - 1
                &&
                <Button style={{ marginLeft: 8 }} onClick={() => message.success('Processing complete!')}>
                  Done
                </Button>
              }
            </div>
          </Col>
        </Row>
      </Content>
    )
  }
}

RQAMain.defaultProps ={
  stepStatus: {},
  datasource: [],
  qaPassed: false
}

RQAMain.propTypes = {
  onAppStart: PropTypes.func.isRequired,
  onNextStep: PropTypes.func.isRequired,
  shipmentData: PropTypes.array.isRequired,
  datasource: PropTypes.array,
  qaPassed: PropTypes.bool,
  stepStatus: PropTypes.shape({
    step: 0,
    completed: false
  })
};

/* eslint "one-var": 0 */
const mapStateToProps = state => {
  const { qaPassed } = state.qa.toJS(),
    { stepStatus } = state.app.toJS(),
    datasource = state.qa.toJS().inventory.data,
    shipmentData = state.shipment.toJS().shipmentData

  return {
    stepStatus,
    datasource,
    qaPassed,
    shipmentData
  }
}

function mapDispatchToProps(dispatch) {
const onAppStart = qa.getBotList;
const onNextStep = app.moveStep;

  return bindActionCreators({
    onAppStart,
    onNextStep
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RQAMain);

