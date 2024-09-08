export const findRouteByPath = (path, routeList) => {
  const decodedPath = decodeURIComponent(path);

  for (const route of routeList) {
    if (!route.path || route.path === '*') {
      continue;
    }
    const routePathRegex = new RegExp(
      '^' +
        route.path
          .replace(/\/:\w+(\?)?/g, '/([^/]+)?')
          .replace(/\/\*/g, '(/.*)?') +
        '$',
      'i'
    );

    if (routePathRegex.test(decodedPath)) {
      return route;
    }

    if (route.children) {
      const nestedRoute = findRouteByPath(path, route.children);
      if (nestedRoute) {
        return nestedRoute;
      }
    }
  }

  const notFoundRoute = routeList[routeList.length - 1];
  return notFoundRoute;
};
