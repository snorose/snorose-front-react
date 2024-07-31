import { useLocation } from 'react-router-dom';
import Search from '../../components/Search/Search.jsx';
import { PLACEHOLDER } from '../../constants';

export default function SearchPage() {
  const { pathname } = useLocation();
  const current = pathname.split('/')[2];

  return <Search placeholder={PLACEHOLDER[current]} />;
}
