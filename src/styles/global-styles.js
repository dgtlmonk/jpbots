import styled, { injectGlobal } from 'styled-components'
import { Layout } from 'antd';
import { palette } from 'themes/default/palette.js'


/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'aktiv-grotesk-std', Helvetica Neue, Arial, sans-serif !default;
  }
`

export const Wrapper = styled(Layout) `
  font-family: 'aktiv-grotesk-std', Helvetica Neue, Arial, sans-serif !default;
  background: #fff;
  padding: 0;

  .ant-layout-header, h4, h3, h2 {
    color: #fff;
  }
  .ant-table-thead > tr > th, .ant-table-tbody > tr > td {
    padding: 10px 10px;
  }

  .ant-layout {
    padding: 0;
  }

  .ant-layout-content {
      background: #fff;
      padding: 15px;
      margin: 0;
      minHeight: 280px;
  }

  #overlay-center {
    position:absolute;
    top:0;
    left:0;
    width: 100%;
    z-index:1;
    height: 98%;

    div {
      position: relative;
      left: 50%;
      top: 30%;
      margin-left: -124px;
      border-radius: 5px;
      palette: #FFF;
      width: 300px;
      z-index: 3;
      top: 10 px;
      palette: ${palette.darkgray};

      &.background {
        position: absolute;
        width: 100%;
        height: 98%;
        margin: auto;
        background-color: ${palette.white};
        opacity: 0.5;
        z-index: 2;
        top: 0;
        left: 0;
      }

      p {
        &.progress-text {
          display: block;
          text-align: center;
          width: 229px;
          padding-top: 1em;
          font-weight: bold;
        }
      }
    }
  }

  .ant-pagination {
    padding-right: 1em;
  }

  .ant-table {
    font-size: 12px;
  }

;`
