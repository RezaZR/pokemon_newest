function Pokemon({ title = "", desc = "", ...rest }) {
  return (
    <svg
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 512 512"
      style={{ enableBackground: "new 0 0 512 512" }}
      role="img"
      aria-label={`${title} - ${desc}`}
      {...rest}
    >
      <title>{title}</title>
      <desc>{desc}</desc>
      <path
        style={{ fill: "#303C42" }}
        d="M256,0C114.844,0,0,114.844,0,256s114.844,256,256,256s256-114.844,256-256S397.156,0,256,0z"
      />
      <path
        style={{ fill: "#E53935" }}
        d="M256,21.333c121.508,0,221.715,92.837,233.483,211.299c-17.362,3.845-61.466,11.878-127.904,12.608
	c-5.484-53.704-50.452-95.908-105.579-95.908s-100.095,42.203-105.579,95.908c-66.438-0.73-110.542-8.763-127.904-12.608
	C34.285,114.171,134.492,21.333,256,21.333z"
      />
      <circle style={{ fill: "#455A64" }} cx="256" cy="256" r="85.333" />
      <path
        style={{ fill: "#FFFFFF" }}
        d="M256,490.667C126.604,490.667,21.333,385.396,21.333,256c0-0.596,0.086-1.171,0.09-1.766
	c20.31,4.324,64.224,11.547,128.97,12.251c5.357,53.837,50.385,96.181,105.607,96.181s100.25-42.344,105.607-96.181
	c64.746-0.704,108.66-7.927,128.97-12.251c0.004,0.595,0.09,1.169,0.09,1.766C490.667,385.396,385.396,490.667,256,490.667z"
      />
      <circle style={{ fill: "#303C42" }} cx="256" cy="256" r="64" />
      <circle style={{ fill: "#F2F2F2" }} cx="256" cy="256" r="42.667" />
      <path
        style={{ opacity: "0.2", fill: "#FFFFFF", enableBackground: "new" }}
        d="M221.777,268.888c0-23.531,19.135-42.667,42.667-42.667
	c12.215,0,23.169,5.224,30.954,13.475c-6.418-15.456-21.643-26.363-39.398-26.363c-23.531,0-42.667,19.135-42.667,42.667
	c0,11.316,4.501,21.548,11.712,29.191C222.957,280.163,221.777,274.664,221.777,268.888z"
      />
      <linearGradient
        id="SVGID_1_"
        gradientUnits="userSpaceOnUse"
        x1="-45.5784"
        y1="639.555"
        x2="-23.8278"
        y2="629.4138"
        gradientTransform="matrix(21.3333 0 0 -21.3333 996.3334 13791.667)"
      >
        <stop offset="0" style={{ stopColor: "#FFFFFF", stopOpacity: "0.2" }} />
        <stop offset="1" style={{ stopColor: "#FFFFFF", stopOpacity: "0" }} />
      </linearGradient>
      <path
        style={{ fill: "url(#SVGID_1_)" }}
        d="M256,0C114.844,0,0,114.844,0,256s114.844,256,256,256s256-114.844,256-256S397.156,0,256,0z"
      />
      <path
        style={{ opacity: "0.1", enableBackground: "new" }}
        d="M444.74,239.997c21.049-2.556,36.18-5.467,44.743-7.365
	c-5.801-58.395-33.158-110.496-73.897-148.387C436.051,119.059,448,159.449,448,202.667C448,215.4,446.702,227.809,444.74,239.997z"
      />
      <path
        style={{ opacity: "0.1", enableBackground: "new" }}
        d="M490.577,254.234c-10.544,2.245-27.586,5.257-50.467,7.747
	C413.73,362.698,322.204,437.333,213.333,437.333c-61.789,0-117.908-24.186-159.859-63.361
	C94.217,443.637,169.635,490.667,256,490.667c129.396,0,234.667-105.271,234.667-234.667
	C490.667,255.404,490.581,254.829,490.577,254.234z"
      />
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
    </svg>
  );
}

export default Pokemon;
