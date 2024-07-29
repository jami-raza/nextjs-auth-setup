/* eslint-disable */
'use client'
import React from 'react';
import { useCallback } from 'react';
import { usePathname } from 'next/navigation';
import NavLink from '@/components/link/NavLink';
// import DashIcon from '@/components/icons/DashIcon';
import { RoutesType } from '@/types/navigation';
// chakra imports

export const SidebarLinks = (props: { routes: RoutesType[] }): JSX.Element => {
  // Chakra color mode
  const pathname = usePathname();

  const { routes } = props;

  // verifies if routeName is the one active (in browser input)
  const activeRoute = useCallback(
    (routeName: string) => {
      return pathname?.includes(routeName);
    },
    [pathname],
  );

  const createLinks = (routes: RoutesType[]) => {
    return routes.map((route, index) => {
      if (
        route.layout === '/dashboard' ||
        route.layout === '/auth' ||
        route.layout === '/rtl'
      ) {
        return (
          <NavLink key={index} href={route.layout + '/' + route.path}>
            <div className="relative mb-3 flex hover:cursor-pointer">
              <li
                className="my-[3px] flex cursor-pointer items-center px-8"
                key={index}
              >
                <span
                  className={`${
                    activeRoute(route.path) === true
                      ? 'font-bold text-brand-500 dark:text-white'
                      : 'font-medium text-gray-600'
                  }`}
                >
                  {route.icon ? route.icon :  <svg
      width="18"
      height="15"
      viewBox="0 0 20 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.0001 16V11H12.0001V16C12.0001 16.55 12.4501 17 13.0001 17H16.0001C16.5501 17 17.0001 16.55 17.0001 16V8.99997H18.7001C19.1601 8.99997 19.3801 8.42997 19.0301 8.12997L10.6701 0.599971C10.2901 0.259971 9.7101 0.259971 9.3301 0.599971L0.970098 8.12997C0.630098 8.42997 0.840098 8.99997 1.3001 8.99997H3.0001V16C3.0001 16.55 3.4501 17 4.0001 17H7.0001C7.5501 17 8.0001 16.55 8.0001 16Z"
        fill="currentColor"
      />
    </svg>}{' '}
                </span>
                <p
                  className={`leading-1 ml-4 flex ${
                    activeRoute(route.path) === true
                      ? 'font-bold text-navy-700 dark:text-white'
                      : 'font-medium text-gray-600'
                  }`}
                >
                  {route.name}
                </p>
              </li>
              {activeRoute(route.path) ? (
                <div className="absolute right-0 top-px h-9 w-1 rounded-lg bg-brand-500 dark:bg-brand-400" />
              ) : null}
            </div>
          </NavLink>
        );
      }
    });
  };
  // BRAND
  return <>{createLinks(routes)}</>;
};

export default SidebarLinks;