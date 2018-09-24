const { protocol, hostname } = window.location;

let config = {
  apiBaseUrl: `${protocol}//${hostname}`,
};

if (process.env.NODE_ENV === 'development') {
  config.apiBaseUrl += ':3000';
}

export const clientConfig = config;
