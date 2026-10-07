/* ============================================================
   TRIPJUGAADU — CLIENT-SIDE ROUTER
   Hash-based SPA routing
   ============================================================ */

export class Router {
  constructor() {
    this.routes = {};
    this.currentRoute = null;
    window.addEventListener('hashchange', () => this.handleRoute());
  }

  addRoute(path, handler) {
    this.routes[path] = handler;
    return this;
  }

  navigate(path) {
    window.location.hash = path;
  }

  handleRoute() {
    const hash = window.location.hash.slice(1) || '/';
    const parts = hash.split('/').filter(Boolean);
    let handler = null;
    let params = {};

    // Try exact match first
    if (this.routes[hash]) {
      handler = this.routes[hash];
    }
    // Try parameterized routes
    else {
      for (const [route, fn] of Object.entries(this.routes)) {
        const routeParts = route.split('/').filter(Boolean);
        if (routeParts.length === parts.length) {
          let match = true;
          const tempParams = {};
          for (let i = 0; i < routeParts.length; i++) {
            if (routeParts[i].startsWith(':')) {
              tempParams[routeParts[i].slice(1)] = parts[i];
            } else if (routeParts[i] !== parts[i]) {
              match = false;
              break;
            }
          }
          if (match) {
            handler = fn;
            params = tempParams;
            break;
          }
        }
      }
    }

    if (handler) {
      this.currentRoute = hash;
      handler(params);
    } else if (this.routes['/']) {
      this.currentRoute = '/';
      this.routes['/'](params);
    }
  }

  start() {
    this.handleRoute();
  }
}
