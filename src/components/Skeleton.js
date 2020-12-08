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
`;

function Skeleton({ children, ...rest }) {
  return <SkeletonStyle {...rest}>{children}</SkeletonStyle>;
}

export default Skeleton;
