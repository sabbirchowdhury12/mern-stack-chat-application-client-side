import React from "react";
import { Link, useRouteError } from "react-router-dom";
import styled from "styled-components";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <Container>
      <div>
        <h1>404</h1>

        <p className="mb-8 text-center text-gray-500 md:text-lg">
          The page you’re looking for doesn’t exist.
        </p>
        <Link
          to="/"
          className="live px-5 py-2 rounded-md text-blue-100 bg-blue-600 hover:bg-blue-700"
        >
          Go home / Live Link
        </Link>
      </div>
    </Container>
  );
};

export default ErrorPage;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 20px;
  text-align: center;

  .live {
    display: block;
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
  }
`;
