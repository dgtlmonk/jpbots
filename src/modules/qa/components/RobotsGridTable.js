import React, { Component } from 'react'
import PropTypes from 'prop-types';
import StatsPopHover from 'components/StatsPopHover'
import { Table, Row, Col, Checkbox, Layout } from "antd"
import {filterDataByKeys, FILTER_KEY } from 'common/utils'
import { QAColumns as columns } from 'common/table.config'

const CheckboxGroup = Checkbox.Group;
const filters = [FILTER_KEY.RUSTY, FILTER_KEY.ONFIRE, FILTER_KEY.HAS_WHEELS, FILTER_KEY.SENTIENT, FILTER_KEY.LOOSE_SCREWS];

class RobotsGridTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      datasource: [],
      filteredData: [],
      loading: true
    }
  }

  componentWillReceiveProps = nextProps => {
    if (this.props.datasource !== nextProps.datasource) {
      this.setState({
        loading: false,
        filteredData: nextProps.datasource,
        datasource: nextProps.datasource,
      })
    }
  }

  onFilterChange = checkedList => {
    if (!checkedList.length) {
      this.setState({
        filteredData: this.props.datasource
      });
    } else {
      this.setState({
        filteredData: filterDataByKeys(checkedList, this.props.datasource)
      });
    }
  }

  clearFilters = () => {
    this.setState({ filteredInfo: null });
  }

  clearAll = () => {
    this.setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  }

  render() {
    return (
      <Layout>
        <Row style={{ padding: '1em', backgroundColor: '#fff'}}>
          <Col span={12}>
            <div>
              <h4>Filters</h4>
              <CheckboxGroup options={filters} onChange={this.onFilterChange} />
            </div>
          </Col>
          <Col span={12}>
            <div style={{ textAlign: 'right' }}>
              <StatsPopHover />
            </div>
          </Col>
        </Row>
        <Row>
          <Table loading={this.state.loading} scroll={{ y: 450 }} columns={columns} dataSource={this.state.filteredData} />
        </Row>
      </Layout>
    )
  }
}

RobotsGridTable.defaultProps = {
  datasource: []
}

RobotsGridTable.propTypes = {
  datasource: PropTypes.array
};

export default RobotsGridTable
