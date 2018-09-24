// import * as fetch from 'isomorphic-fetch';
import { push } from 'connected-react-router';
import { isObject, merge } from 'lodash';
import { clientConfig } from './config';
import { store } from './store';

const apiConfig = {
  baseUrl: clientConfig.apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
};

export function getBaseUrl() {
  return apiConfig.baseUrl;
}

interface FetchOptions {
  method?: string;
  headers?: {
    [key: string]: string;
  };
  body?: object;
  isFormData?: boolean;
  signal?: any;
}

export default class API {
  public static async fetch(url: string, options: FetchOptions = {}) {
    let fetchOptions: any = options;

    // Merge headers
    fetchOptions.headers = merge(apiConfig.headers, options.headers);

    // Stringify body
    if (isObject(options.body) && !options.isFormData) {
      fetchOptions.body = JSON.stringify(options.body);
    }

    // Include cookies in AJAX requests/responses
    fetchOptions.credentials = 'include';

    if (options.isFormData) {
      delete fetchOptions.headers['Content-Type'];
    }

    const result = await fetch(apiConfig.baseUrl + url, fetchOptions);
    if (!result.ok) {
      switch (result.status) {
        case 401:
          store.dispatch(push('/login'));
      }
    }
    return result;
  }
}
