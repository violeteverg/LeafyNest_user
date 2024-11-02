import { cn } from "@/lib/utils";
import PropTypes from "prop-types";

export default function WidthWrapper({ className, children }) {
  return (
    <div
      className={
        (cn("mx-auto w-full max-w-screen-xl px-2.5 md:px-20"), className)
      }
    >
      {children}
    </div>
  );
}

WidthWrapper.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};
