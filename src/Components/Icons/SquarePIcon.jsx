import React from "react";
import { Icon } from "@chakra-ui/react";

function SquarePIcon(props) {
  return (
    <Icon viewBox="0 0 448 512" {...props}>
      <g fill="currentColor">
        <defs></defs>
        <path d="M248 128h-96c-13.2 0-24 10.8-24 24v208c0 13.3 10.8 24 24 24s24-10.75 24-24v-56h72c48.53 0 88-39.47 88-88s-39.5-88-88-88zm0 128h-72v-80h72c22.1 0 40 17.9 40 40s-17.9 40-40 40z"></path>
        <path
          d="M384 32H64C28.65 32 0 60.65 0 96v320c0 35.35 28.65 64 64 64h320c35.35 0 64-28.65 64-64V96c0-35.35-28.7-64-64-64zM248 304h-72v56c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.2 10.8-24 24-24h96c48.53 0 88 39.47 88 88s-39.5 88-88 88zm0-128h-72v80h72c22.1 0 40-17.9 40-40s-17.9-40-40-40z"
          opacity=".2"
        ></path>
      </g>
    </Icon>
  );
}

export default SquarePIcon;
