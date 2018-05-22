export const config = {
  appName: 'CEVI-Web',
  defaults: {
    language: {
      default: 'de',
      availableLanguages: ['de', 'en', 'fr', 'it'],
    },
    url: {
      base: 'https://test.api.cevi-web.com/',
      apiVersion: 'v2',
    },
    routes: {
      excluded_in_redirect_to: ['login', 'logout']
    },
    token: {
      expiration: 10,
    },
    snackbar: {
      duration: {
        error: 3000,
        message: 5000,
        long: 10000,
      }
    },
    routeTracing: false,
  },
  keys: {
    credentials: 'credentials',
    user: 'user',
    articles: 'articles',
  },
};
