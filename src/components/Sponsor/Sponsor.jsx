import sponsor from '@/assets/images/sponsor.svg';

export default function Sponsor(props) {
  return (
    <img src={sponsor} alt='sponsor' style={{ height: '74px' }} {...props} />
  );
}
