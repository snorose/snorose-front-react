export const findRouteByPath = (path, routeList) => {
  for (const route of routeList) {
    const routePathRegex = new RegExp(
      '^' + route.path?.replace(/:\w+/g, '\\w+') + '$'
    );

    if (routePathRegex.test(path)) {
      return route;
    }

    if (route.children) {
      const nestedRoute = findRouteByPath(path, route.children);
      if (nestedRoute) {
        return nestedRoute;
      }
    }
  }
};
