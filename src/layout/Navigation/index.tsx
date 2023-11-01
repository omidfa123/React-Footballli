import { routes } from '@/lib/constants/routes';
import { classNames } from '@/utils/helpers';
import {
  CompassIcon,
  CupIcon,
  SoccerBallIcon,
  SoccerFieldIcon,
  UserIcon,
} from '@/utils/icons';

import { NavLink, Outlet } from 'react-router-dom';

const NAVIGATION_ITEMS = [
  { link: routes.profile, label: 'پروفایل', icon: <UserIcon /> },
  { link: routes.league, label: 'لیگ ها', icon: <CupIcon /> },
  { link: routes.soccer, label: 'فوتبال', icon: <SoccerBallIcon /> },
  { link: routes.discoveries, label: 'اکتشافات', icon: <CompassIcon /> },
  { link: routes.matches, label: 'مسابقات', icon: <SoccerFieldIcon /> },
];

function Navigation() {
  return (
    <>
      <Outlet />
      <footer className="mt-auto  rounded-b-md bg-white px-4 py-2 shadow-inner ">
        <nav>
          <ul className="flex items-center justify-between">
            {NAVIGATION_ITEMS.map((item) => (
              <li key={item.link}>
                <NavLink
                  to={item.link}
                  className={({ isActive }) =>
                    classNames(
                      'flex  h-14 w-14 select-none flex-col items-center justify-center gap-1   text-xs font-semibold',
                      isActive
                        ? 'text-[#569738] [&_span]:text-[#569738]'
                        : 'text-[#AAB0BD]'
                    )
                  }
                >
                  {item.icon}
                  <span className="text-[#7c7c7e]">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </footer>
    </>
  );
}

export default Navigation;
