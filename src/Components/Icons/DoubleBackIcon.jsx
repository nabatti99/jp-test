import React from "react";
import { Icon } from "@chakra-ui/react";

function DoubleBackIcon(props) {
  return (
    <Icon viewBox="0 0 448 512" {...props}>
      <g fill="currentColor">
        <defs></defs>
        <path d="M224 480c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25l192-192c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l169.4 169.4c12.5 12.5 12.5 32.75 0 45.25C240.4 476.9 232.2 480 224 480z"></path>
        <path
          d="M416 480c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25l192-192c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L269.3 256l169.4 169.4c12.5 12.5 12.5 32.75 0 45.25-6.3 6.25-14.5 9.35-22.7 9.35z"
          opacity="0.4"
        ></path>
      </g>
    </Icon>
  );
}

export default DoubleBackIcon;
