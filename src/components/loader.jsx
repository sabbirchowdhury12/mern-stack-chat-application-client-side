import React from "react";
import styled, { keyframes } from "styled-components";

// Keyframe animation for spinning
const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// Styled component for the loader
const Loader = styled.div`
  border: 4px solid #f3f3f3; /* Light grey */
  border-top: 4px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: ${spin} 2s linear infinite; /* Apply animation */
`;

// Component definition
const Loading = () => {
  return <Loader />;
};

export default Loading;
