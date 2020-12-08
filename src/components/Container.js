import styled from "@emotion/styled";

const ContainerStyle = styled.main`
  position: relative;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  @media (min-width: 520px) {
    max-width: 480px;
  }
`;

function Container({ children, ...rest }) {
  return <ContainerStyle {...rest}>{children}</ContainerStyle>;
}

export default Container;
