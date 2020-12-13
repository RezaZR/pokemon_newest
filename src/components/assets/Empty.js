function Empty({ title = "", desc = "", ...rest }) {
  return (
    <svg
      width="282"
      height="50"
      viewBox="0 0 282 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={`${title} - ${desc}`}
      {...rest}
    >
      <title>{title}</title>
      <desc>{desc}</desc>
      <path
        d="M0 43.75V0H43.75V6.25H12.5V18.75H37.5V25H12.5V37.5H43.75V43.75H0ZM50 43.75V12.5H87.5V18.75H93.75V43.75H81.25V18.75H75V43.75H62.5V18.75H56.25V43.75H50ZM100 50V12.5H137.5V18.75H143.75V31.25H137.5V37.5H112.5V50H100ZM112.5 31.25H131.25V18.75H112.5V31.25ZM168.75 43.75V18.75H156.25V12.5H168.75V0H181.25V12.5H193.75V18.75H181.25V43.75H168.75ZM206.25 50V43.75H231.25V37.5H206.25V31.25H200V12.5H212.5V31.25H231.25V12.5H243.75V43.75H237.5V50H206.25ZM262.5 31.25V0H281.25V18.75H275V31.25H262.5ZM262.5 43.75V37.5H275V43.75H262.5Z"
        fill="black"
      />
    </svg>
  );
}

export default Empty;
