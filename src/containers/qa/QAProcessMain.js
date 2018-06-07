import React from 'react';
import PropTypes from 'prop-types';
import Components from 'components'
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { actions as qa } from "modules/qa/actions"
import { actions as app } from "modules/app/actions"
import QAComponents from 'modules/qa/components'
import { Layout, Button, Icon, Row, Col, notification, Popconfirm } from 'antd'
import { Wrapper } from 'styles/global-styles'

const { RobotsGridTable } = QAComponents;
const { ProgressIndicator} = Components;
const { Content } = Layout
const confirmText = "This will extinguish fire and recycle robots. Are you sure to Proceed?"

class QAProcessMain extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      qaInProgress: false,
      qaFinished: false
    }
  }

  onProgressFinish = () => {
    this.props.qaTaskFulfilled();
    this.props.extinguishTask({ data: this.props.datasource })
    this.openNotification()
    this.setState({
      qaFinished: true
    })
  }


  handleConfirm = () => {
    this.setState({
      qaInProgress: true
    })
  }

  openNotification = () => {
    const _this = this;
    const key = `open${Date.now()}`;
    const btn = <Button type="primary" size="small" onClick={() => notification.close(key)}> Ok </Button>

    notification.info({
      duration: 7,
      message: 'QA Process Completed',
      description: `${_this.props.factorySecond.length} robots moved to Factory Second.` +
                   `${_this.props.recycleRobots.length} robots moved to Recycle.\n` +
                   `${_this.props.passedQA.length} passed QA.`,
      btn,
      key
    });
  };

  /* eslint "react/self-closing-comp": 0 */
  render() {
    return (
      <Wrapper>
        <Content style={{ background: '#fff', padding: 15, margin: 0, minHeight: 280 }}>
          <div id="overlay-center" style={{ display: this.state.qaInProgress ? 'block' : 'none' }}>
            {
              this.state.qaInProgress && (<ProgressIndicator status="Starting QA Process, please wait ..." handleOnProgressFinished={this.onProgressFinish} />)
            }
            <div className="background"></div>
          </div>
          <RobotsGridTable datasource={this.props.datasource} />
        </Content>
          <Row style = {{ padding: '1em', textAlign: 'center', backgroundColor: "#fff" }}>
          {
            !this.props.qaPassed && (<h4 style={{ color: 'red'}}>Inventory has not been go through QA yet</h4>)
          }
          {
            this.props.qaPassed && (<h4 style={{ color: 'green' }}>QA Success</h4>)
          }
          <Col style={{ display: this.props.qaPassed ? 'none':'block'}}>
            <Popconfirm placement="top" title={confirmText} onConfirm={this.handleConfirm} okText="Yes" cancelText="No">
              <Button type="primary">Start QA<Icon type="solution" /></Button>
            </Popconfirm>
          </Col>
        </Row>
      </Wrapper>
    )
  }
}

QAProcessMain.defaultProps = {
  datasource: [],
  actorySecond: [],
  recycleRobots: [],
  passedQA: [],
  factorySecond: [],

}

/* eslint "react/no-unused-prop-types":0 */
QAProcessMain.propTypes = {
  datasource: PropTypes.array.isRequired,
  factorySecond: PropTypes.array.isRequired,
  recycleRobots: PropTypes.array.isRequired,
  passedQA: PropTypes.array.isRequired,
  qaTaskFulfilled: PropTypes.func.isRequired,
  extinguishTask: PropTypes.func.isRequired,
  qaPassed: PropTypes.bool.isRequired
};

/* eslint "one-var" : 0 */
const mapStateToProps = state => {
  const { recycleRobots, factorySecond, passedQA } = state.shipment.toJS(),
    { qaPassed }  = state.qa.toJS(),
    datasource = state.qa.toJS().inventory.data

  return {
    qaPassed,
    datasource,
    factorySecond,
    recycleRobots,
    passedQA
  }
}

function mapDispatchToProps(dispatch) {
  const qaTaskFulfilled = app.moveStepFulfilled;
  const extinguishTask = qa.extinguish;

  return bindActionCreators({
    qaTaskFulfilled,
    extinguishTask
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(QAProcessMain)

