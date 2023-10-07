import { ForwardRefRenderFunction, forwardRef } from "react";

const Rotate: ForwardRefRenderFunction<SVGSVGElement, { id?: string }> = (
  props,
  ref
) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 24 24"
      {...props}
      ref={ref}
    >
      <path d="M12 7C6.5 7 2 9.2 2 12c0 2.2 2.9 4.1 7 4.8V20l4-4-4-4v2.7c-3.2-.6-5-1.9-5-2.7 0-1.1 3-3 8-3s8 1.9 8 3c0 .7-1.5 1.9-4 2.5v2.1c3.5-.8 6-2.5 6-4.6 0-2.8-4.5-5-10-5z"></path>
    </svg>
  );
};

export default forwardRef(Rotate);