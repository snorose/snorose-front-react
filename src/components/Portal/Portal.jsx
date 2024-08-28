import { createPortal } from 'react-dom';

const Portal = ({ children, portalKey }) => {
  return createPortal(children, document.getElementById(portalKey));
};

export default Portal;
