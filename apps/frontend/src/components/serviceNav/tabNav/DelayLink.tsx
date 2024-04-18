import React, { useEffect } from "react";
import PropTypes from "prop-types";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { Link, useHistory, useLocation } from "react-router-dom";

// Functional link component which delays page navigation
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const DelayLink = (props) => {
  const { delay, onDelayStart, onDelayEnd, replace, to, ...rest } = props;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  let timeout = null;
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    return () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [timeout]);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const handleClick = (e) => {
    // if trying to navigate to current page stop everything
    if (location?.pathname === to) return;

    onDelayStart(e, to);
    if (e.defaultPrevented) {
      return;
    }

    e.preventDefault();

    timeout = setTimeout(() => {
      if (replace) {
        history.replace(to);
      } else {
        history.push(to);
      }
      onDelayEnd(e, to);
    }, delay);
  };

  return <Link {...rest} to={to} onClick={handleClick} />;
};

DelayLink.propTypes = {
  // Milliseconds to wait before registering the click.
  delay: PropTypes.number,
  // Called after the link is clicked and before the delay timer starts.
  onDelayStart: PropTypes.func,
  // Called after the delay timer ends.
  onDelayEnd: PropTypes.func,
  // Replace history or not
  replace: PropTypes.bool,
  // Link to go to
  to: PropTypes.string,
};

DelayLink.defaultProps = {
  replace: false,
  delay: 0,
  // eslint-disable-next-line no-empty-function
  onDelayStart: () => {},
  // eslint-disable-next-line no-empty-function
  onDelayEnd: () => {},
};

export default DelayLink;
