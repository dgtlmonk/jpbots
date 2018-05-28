import React from 'react'
import RQAMain from 'containers/RQAMain'
import Login from 'containers/Login'

import { Layout, Row, Col } from 'antd'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Wrapper } from 'styles/global-styles'

const { Header } = Layout

/* eslint "react/jsx-boolean-value": 0 */
function Routes() {
  return (
    <Router>
      <Wrapper>
        <Header>
          <Row>
            <Col span={12}>
              <h4>Dashboard</h4>
            </Col>
            <Col span={12} style={{textAlign: 'right'}}>
              <h2>JP Bots Shipping LCC</h2>
            </Col>
          </Row>
        </Header>
        <Layout style={{ padding: '0' }}>
          <Route path="/" exact={true} component={Login} />
          <Route path="/main" component={RQAMain} />
        </Layout>
      </Wrapper>
    </Router>
  )
}

export default Routes
