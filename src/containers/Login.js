import React from 'react'
import { withRouter } from "react-router-dom";
import { Layout, Button, Icon, Row, Col, Form, Input, } from 'antd'
import { Wrapper } from 'styles/global-styles'
import PropTypes from 'prop-types';

const { Content } = Layout;
const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}


class Login extends React.Component {
  componentDidMount() {
    // To disabled submit button at the beginning.
    this
      .props
      .form
      .validateFields();
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this
      .props
      .form
      .validateFields((err) => {
        if (!err) {
         //  console.log('Received values of form: ', values);
        }
      });
  }
  render() {
    const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;

    // Only show error after a field is touched.
    const userNameError = isFieldTouched('userName') && getFieldError('userName');
    const passwordError = isFieldTouched('password') && getFieldError('password');
    return (
      <Wrapper>
        <Content>
          <div style={{ textAlign: "center"}}>
            <Row>
              <Col>
                <img src="assets/robot.png" alt="JP Robots" style={{ width: '300px', padding: '2em'}}/>
              </Col>
              <Col>
                <Form layout="inline" onSubmit={this.handleSubmit}>
                  <FormItem
                    validateStatus={userNameError
                      ? 'error'
                      : ''}
                    help={userNameError || ''}>
                    {getFieldDecorator('userName', {
                      rules: [
                        {
                          required: true,
                          message: 'Please input your username!'
                        }
                      ]
                    })(
                      <Input
                        prefix={< Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Username" />
                    )}
                  </FormItem>
                  <FormItem
                    validateStatus={passwordError
                      ? 'error'
                      : ''}
                    help={passwordError || ''}>
                    {getFieldDecorator('password', {
                      rules: [
                        {
                          required: true,
                          message: 'Please input your Password!'
                        }
                      ]
                    })(
                      <Input
                        prefix={< Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="Password" />
                    )}
                  </FormItem>
                  <FormItem>
                    <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())} onClick={() => this.props.history.push("/main")}>
                      Log in
                </Button>
                  </FormItem>
                </Form>
              </Col>
            </Row>
          </div>
        </Content>
      </Wrapper>
    );
  }
}

Login.propTypes =  {
  form: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

export default withRouter(Form.create()(Login))
