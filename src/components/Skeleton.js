import styled from "@emotion/styled";

const SkeletonStyle = styled.section`
  width: 100%;
  height: 100%;
  background-color: var(--color-bg-1);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 50% 7%;
  border-bottom-right-radius: 50% 7%;
  padding: 1rem;
  box-shadow: 3px 3px rgba(0, 0, 0, 0.15), inset 2px 2px #000000;
  border: 3px solid #000000;
`;

function Skeleton({ children, ...rest }) {
  return <SkeletonStyle {...rest}>{children}</SkeletonStyle>;
}

export default Skeleton;
