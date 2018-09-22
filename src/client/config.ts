const { protocol, hostname } = window.location;

export const trunkConfig = {
  apiBaseUrl: `${protocol}//${hostname}`,
};
