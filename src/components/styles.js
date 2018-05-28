import styled from 'styled-components';
import { Layout } from 'antd';
import { palette } from 'themes/default/palette.js'

export const Wrapper = styled(Layout)`
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
;`
