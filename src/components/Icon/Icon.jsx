import PropTypes from 'prop-types';

import iconSvg from '@/assets/icon.svg';

export default function Icon({ id, fill, ...props }) {
  return (
    <svg {...props}>
      <use href={`${iconSvg}#${id}`} fill={fill} />
    </svg>
  );
}

Icon.propTypes = {
  id: PropTypes.string.isRequired,
};
