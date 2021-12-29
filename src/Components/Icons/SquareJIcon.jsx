import React from "react";
import { Icon } from "@chakra-ui/react";

function SquareJIcon(props) {
  return (
    <Icon viewBox="0 0 448 512" {...props}>
      <g fill="currentColor">
        <defs></defs>
        <path d="M280 128c-13.2 0-24 10.8-24 24v138.7c0 25-21.5 45.3-48 45.3s-48-20.3-48-45.3V280c0-13.2-10.7-24-24-24s-24 10.8-24 24v10.67c0 51.43 43.1 93.33 96 93.33s96-41.86 96-93.33V152c0-13.2-10.7-24-24-24z"></path>
        <path
          d="M384 32H64C28.65 32 0 60.65 0 96v320c0 35.35 28.65 64 64 64h320c35.35 0 64-28.65 64-64V96c0-35.35-28.7-64-64-64zm-80 258.7c0 51.4-43.1 93.3-96 93.3s-96-41.86-96-93.33V280c0-13.2 10.8-24 24-24s24 10.8 24 24v10.67c0 25.03 21.5 45.33 48 45.33s48-20.3 48-45.3V152c0-13.2 10.8-24 24-24s24 10.75 24 24v138.7z"
          opacity=".2"
        ></path>
      </g>
    </Icon>
  );
}

export default SquareJIcon;
