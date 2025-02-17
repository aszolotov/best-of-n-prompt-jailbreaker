import { SVGProps } from "react";
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <title>{"Refresh"}</title>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 12a9 9 0 0 1-15 6.708L3 16m0-4a9 9 0 0 1 15-6.708L21 8M3 21v-5m0 0h5M21 3v5m0 0h-5"
    />
  </svg>
);
export { SvgComponent as Refresh };
