
/* eslint "one-var": 0, "no-plusplus": 0 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { getIndexFromArray } from 'common/utils'
import { actions } from 'modules/shipment/actions'
import { ShipmentColumns as columns } from 'common/table.config'
import { Layout, Table, Icon, Tabs, Button, Row, Col } from 'antd'
import { Wrapper } from 'styles/global-styles'

const TabPane = Tabs.TabPane;
const { Content } = Layout
const SOURCE = {
  FACTORY_SECOND: 'FACTORY_SECOND',
  QA_PASSED: 'QA_PASSED'
}

const shipmentDataLookup = {}

class ShipmentMain extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      factorySecondDataSourceCache: this.props.factorySecondDataSource,
      passedQADataSourceCache: this.props.passedQADataSource,
      factorySecondShipmentData:[],
      passedQAShipmentData:[],
      shipmentData: [],
      unShipData: [],
      updated: false,
      defaultTab: "1"
    }
  }

  handleTabClick = (tabKey) => {
    this.setState({
      defaultTab: tabKey
    })
  }

  _getDataSource = tag =>{
    const STATE_DATA_SOURCE = {
      [SOURCE.FACTORY_SECOND]: () => {
        return {
          datasource: this.state.factorySecondShipmentData,
          cache: this.state.factorySecondDataSourceCache,
          updateState: cache => {
            const updateShipmentData = this.state.factorySecondShipmentData.concat(this.state.shipmentData);

            this.setState({
              factorySecondDataSourceCache: cache,
              shipmentData: updateShipmentData,
              factorySecondShipmentData: [],
              defaultTab: "3"
            })

            this.props.addToShipping({ data: updateShipmentData })
          }
        }
      },
      [SOURCE.QA_PASSED]: () => {
        return {
          datasource: this.state.passedQAShipmentData,
          cache: this.state.passedQADataSourceCache,
          updateState: cache => {
            const updateShipmentData = this.state.passedQAShipmentData.concat(this.state.shipmentData);

            this.setState({
              passedQADataSourceCache: cache,
              shipmentData: this.state.passedQAShipmentData.concat(this.state.shipmentData),
              passedQAShipmentData: [],
              defaultTab: "3"
            })

            this.props.addToShipping({ data: updateShipmentData })
          }
        }
      },
    }

    return STATE_DATA_SOURCE[tag]();
  }

  _handleRemoveFromShipment = e => {
  e.preventDefault()
  const datasource = this.state.unShipData,
    keys = [],
    cache = this.state.shipmentData;

  datasource.forEach(data => {
    // lookup keys
    keys.push(data.key)
  })

  keys.forEach(key => {
    const idx = getIndexFromArray(cache, key);
    cache.splice(idx, 1)
  });

  // Return list from original source
  Object.keys(shipmentDataLookup).forEach(lookup => {
    if (lookup.source === "QA_PASSED") {
      const data = this.state.passedQADataSourceCache;

      data.unshift(shipmentDataLookup[lookup].data)
      this.setState({
        passedQADataSourceCache: data,
        updated: true
      })
    } else {
      const data = this.state.factorySecondDataSourceCache;

      data.unshift(shipmentDataLookup[lookup].data)
      this.setState({
        factorySecondDataSourceCache: data,
        updated: true
      })
    }
  })

  this.setState({
    shipmentData: cache,
    unShipData: [],
    updated: true
  })

  // update shipment data
  this.props.addToShipping({ data: this.state.shipmentData })
}

_factorySecondOnRowSelection = () => {
  return {
    onChange: (selectedRowKeys, selectedRows) => {
      this.setState({
        factorySecondShipmentData: selectedRows,
      })
    },
    selections: false,
  }
};

_passedQARowSelection = () => {
  return {
    onChange: (selectedRowKeys, selectedRows) => {
      this.setState({
        passedQAShipmentData: selectedRows,
      })
    }
  }
};

_shipmentDataRowSelection = () => {
  return {
    onChange: (selectedRowKeys, selectedRows) => {
      this.setState({
        unShipData: selectedRows
      })
    }
  }
};

_handleAddToShipment = (e) => {
  const { tag } = e.currentTarget.dataset
  const keys = []

  const cache = this._getDataSource(SOURCE[tag]).cache,
    datasource = this._getDataSource(SOURCE[tag]).datasource;

  datasource.forEach(data => {
    shipmentDataLookup[data.key] = { source: SOURCE[tag], data };
    // lookup keys
    keys.push(data.key)
  })

  keys.forEach(key => {
    const idx = getIndexFromArray(cache, key);
    cache.splice(idx, 1)
  });

  this._getDataSource(SOURCE[tag]).updateState(cache);
}

render() {
    return (
      <Wrapper>
        <Content>
          <Tabs defaultActiveKey={this.state.defaultTab} activeKey={this.state.defaultTab} onTabClick={this.handleTabClick}>
            <TabPane tab={<span><Icon type="apple" />Factory Second</span>} key="1">
              <Row>
                <Col style={{ marginBottom: '1em', display: this.state.factorySecondShipmentData.length > 0 ? 'block':'none'}}>
                  <Button data-tag={SOURCE.FACTORY_SECOND} type="primary" onClick={this._handleAddToShipment}>Add to shipment</Button>
                </Col>
                <Col>
                  <Table rowSelection={this._factorySecondOnRowSelection()} columns={columns} dataSource={this.state.factorySecondDataSourceCache} />
                </Col>
              </Row>
            </TabPane>
            <TabPane tab={<span><Icon type="android" />Passed QA</span>} key="2">
              <Row>
                <Col style={{ marginBottom: '1em', display: this.state.passedQAShipmentData.length > 0 ? 'block' : 'none' }}>
                  <Button data-tag={SOURCE.QA_PASSED} type="primary" onClick={this._handleAddToShipment}>Add to shipment</Button>
                </Col>
                <Col>
                  <Table rowSelection={this._passedQARowSelection()} columns={columns} dataSource={this.state.passedQADataSourceCache} />
                </Col>
              </Row>
            </TabPane>
            <TabPane tab={<span><Icon type="shopping-cart" />Ready to ship</span>} key="3">
              <Row>
                <Col style={{ marginBottom: '1em', display: this.state.unShipData.length > 0 ? 'block' : 'none' }}>
                  <Button type="primary" onClick={this._handleRemoveFromShipment}>Remove from shipment</Button>
                </Col>
                <Col>
                  <Table rowSelection={this._shipmentDataRowSelection()} columns={columns} dataSource={this.state.shipmentData} />
                </Col>
              </Row>
            </TabPane>
          </Tabs>
        </Content>
      </Wrapper>)
    }
}

ShipmentMain.propTypes = {
  factorySecondDataSource: PropTypes.array.isRequired,
  passedQADataSource: PropTypes.array.isRequired,
  addToShipping: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const { stepStatus } = state.app.toJS()
  const factorySecondDataSource = state.shipment.toJS().factorySecond
  const passedQADataSource = state.shipment.toJS().passedQA

  return {
    stepStatus,
    factorySecondDataSource,
    passedQADataSource
  }
}

function mapDispatchToProps(dispatch) {
  const addToShipping = actions.addToShipment;

  return bindActionCreators({
    addToShipping,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ShipmentMain)

