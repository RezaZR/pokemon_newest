function Loading({ title = "", desc = "", ...rest }) {
  return (
    <svg
      width="338"
      height="50"
      viewBox="0 0 338 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={`${title} - ${desc}`}
      {...rest}
    >
      <title>{title}</title>
      <desc>{desc}</desc>
      <path
        d="M0.25 43.75V0H12.75V37.5H37.75V43.75H0.25ZM50.25 43.75V37.5H44V18.75H50.25V12.5H81.5V18.75H87.75V37.5H81.5V43.75H50.25ZM56.5 37.5H75.25V18.75H56.5V37.5ZM100.25 43.75V37.5H94V31.25H100.25V25H125.25V18.75H100.25V12.5H131.5V18.75H137.75V43.75H100.25ZM106.5 37.5H125.25V31.25H106.5V37.5ZM150.25 43.75V37.5H144V18.75H150.25V12.5H175.25V0H187.75V43.75H150.25ZM156.5 37.5H175.25V18.75H156.5V37.5ZM212.75 6.25V0H225.25V6.25H212.75ZM200.25 43.75V37.5H212.75V18.75H206.5V12.5H225.25V37.5H237.75V43.75H200.25ZM244 43.75V12.5H281.5V18.75H287.75V43.75H275.25V18.75H256.5V43.75H244ZM300.25 50V43.75H325.25V37.5H300.25V31.25H294V18.75H300.25V12.5H337.75V43.75H331.5V50H300.25ZM306.5 31.25H325.25V18.75H306.5V31.25Z"
        fill="black"
      />
    </svg>
  );
}

export default Loading;
