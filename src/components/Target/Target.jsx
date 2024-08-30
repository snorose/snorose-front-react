import { forwardRef } from 'react';

const Target = forwardRef((props, ref) => {
  return <div ref={ref} style={{ height: `${props.height}` }}></div>;
});

export default Target;
