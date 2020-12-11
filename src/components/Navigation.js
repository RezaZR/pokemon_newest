import styled from "@emotion/styled";

const NavigationStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 2rem;
  & .navigator-arrow {
    position: relative;
    width: 89px;
    height: 89px;
    & button {
      background-color: var(--color-bg-2);
      color: var(--color-bg-3-1);
      position: absolute;
      font-size: 0.85rem;
      padding: 0;
      &:hover,
      &:focus {
        &:not(:disabled) {
          color: var(--color-bg-3);
        }
      }
    }
    & .previous {
      left: 0;
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
    }
    & .next {
      right: 0;
      border-top-right-radius: 3px;
      border-bottom-right-radius: 3px;
    }
    & .previous,
    & .next {
      width: 30px;
      height: 30px;
      top: 50%;
      transform: translateY(-50%);
    }
    & .top {
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      border-top-left-radius: 3px;
      border-top-right-radius: 3px;
    }
    & .bottom {
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      border-bottom-left-radius: 3px;
      border-bottom-right-radius: 3px;
    }
    & .top,
    & .bottom {
      width: 30px;
      height: 30px;
    }
    & .neutral {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 30px;
      height: 30px;
    }
  }
  & .navigator-circle {
    position: relative;
    width: 120px;
    height: 120px;
    & button {
      background-color: var(--color-bg-2);
      color: var(--color-bg-3-1);
      position: absolute;
      font-size: 1.25rem;
      border-radius: 50%;
      padding: 0;
      width: 30px;
      height: 30px;
      &:hover,
      &:focus {
        color: var(--color-bg-3);
      }
    }
    & .back {
      left: 17%;
      bottom: 25%;
      transform: translate(-17%, -25%);
    }
    & .select {
      right: 17%;
      top: 25%;
      transform: translate(-17%, -25%);
    }
  }
`;

function Navigation({
  previous,
  next,
  handleClickNavigation,
  handleClickPagination,
  goBack,
  goToSelectedPokemon,
}) {
  return (
    <NavigationStyle>
      <section className="navigator-arrow">
        <button
          className="previous"
          onClick={(e) => handleClickPagination(e, "previous")}
          disabled={!previous}
          title="Button left"
        >
          ◀
        </button>
        <button
          className="next"
          onClick={(e) => handleClickPagination(e, "next")}
          disabled={!next}
          title="Button right"
        >
          ▶
        </button>
        <button className="neutral" disabled={true}>
          ●
        </button>
        <button
          className="top"
          onClick={(e) => handleClickNavigation(e, "top")}
          title="Button top"
        >
          ▲
        </button>
        <button
          className="bottom"
          onClick={(e) => handleClickNavigation(e, "bottom")}
          title="Button bottom"
        >
          ▼
        </button>
      </section>
      <section className="navigator-circle">
        <button className="back" onClick={goBack} title="Button back">
          ○
        </button>
        <button
          className="select"
          onClick={goToSelectedPokemon}
          title="Button select"
        >
          ✕
        </button>
      </section>
    </NavigationStyle>
  );
}

export default Navigation;
