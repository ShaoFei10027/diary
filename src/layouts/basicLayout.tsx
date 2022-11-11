import { Outlet } from 'react-router-dom';
import Header from './components/header';

export default function BasicLayout(props: any) {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}
