import sponser from '../../assets/images/sponser.svg';

export default function Sponser(props) {
  return (
    <img src={sponser} alt='sponser' style={{ height: '74px' }} {...props} />
  );
}
