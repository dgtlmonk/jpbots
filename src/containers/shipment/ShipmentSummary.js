import React from 'react'
import PropTypes from 'prop-types';
import pure from 'recompose/pure'
import { connect } from 'react-redux';
import { Layout, Table, Row, Col, message } from 'antd'
import { ShipmentSummaryColumns as columns } from 'common/table.config'
import { Wrapper } from 'styles/global-styles'

const {Content} = Layout;

const ShipmentSummary = ({ shipmentData }) => {
  message.success('Shipment Success!')

  return (
    <Wrapper>
      <Content>
        <Row>
          <Col>
            <h2 style={{ color: '#000'}}>Shipment Summary</h2>
          </Col>
          <Col>
            <Table columns={columns} dataSource={shipmentData} />
          </Col>
        </Row>

      </Content>
    </Wrapper>
  )
}

ShipmentSummary.propTypes = {
  shipmentData: PropTypes.array.isRequired
}

const mapStateToProps = state => {
  const shipmentData = state.shipment.toJS().shipmentData

  return {
    shipmentData
  }
}

export default connect(mapStateToProps, null)(pure(ShipmentSummary));

