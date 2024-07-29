import { IRoute } from '@/types/navigation';
import Router from 'next/router';

// NextJS Requirement
export const isWindowAvailable = () => typeof window !== 'undefined';

export const findCurrentRoute = (
  routes: IRoute[],
  pathname: string,
): IRoute | undefined => {
  if (!isWindowAvailable()) return undefined;

  for (let route of routes) {
    if (!!route.items) {
      const found = findCurrentRoute(route.items, pathname);
      if (!!found) return found;
    }
    if (pathname?.match(route.path) && route) return route;
  }
};

export const getActiveRoute = (routes: IRoute[], pathname: string): string => {
  const route = findCurrentRoute(routes, pathname);
  return route?.name || 'Main Dashboard';
};

export const getActiveNavbar = (
  routes: IRoute[],
  pathname: string,
): boolean | undefined => {
  const route = findCurrentRoute(routes, pathname);
  if(route){
      return route?.secondary;

  } 
  return false;
};

export const getActiveNavbarText = (
  routes: IRoute[],
  pathname: string,
): string | boolean => {
  return getActiveRoute(routes, pathname) || false;
};