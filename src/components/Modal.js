import styled from "@emotion/styled";

const ModalStyle = styled.section`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 75%;
  background-color: var(--color-bg-3);
  border: 1px solid var(--color-bg-2);
  border-radius: 3px;
  display: none;
  &.active {
    display: block;
  }
  & .options {
    padding: 1rem;
    text-align: center;
    & p {
      font-size: 1rem;
      margin-bottom: 1rem;
    }
    & input {
      margin-bottom: 1rem;
    }
    & button {
      font-size: 0.85rem;
      width: 50px;
      background-color: var(--color-bg-2);
      color: var(--color-bg-3-1);
      border-radius: 3px;
      &:not(:last-child) {
        margin-right: 1rem;
      }
      &:hover,
      &.active {
        color: var(--color-bg-3);
      }
    }
  }
`;

function Modal({ children, ...rest }) {
  return <ModalStyle {...rest}>{children}</ModalStyle>;
}

export default Modal;
