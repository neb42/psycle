// @flow

import sleep from 'sleep-promise';

import * as Methods from './Methods';
import ResponseError from './ResponseError';

type UrlParameters = {
  [key: string]: {
    value: string | number,
    type: string,
  },
};

type QueryParameters = {
  [key: string]: {
    value: string | number | Array<string> | Array<number>,
    type: string,
  },
};

type Headers = {
  [key: string]: string,
};

type Retry = {
  attempts: number,
  timeout: number,
}

class ParameterValidationError extends Error {}

// WARNING: obj must be json serialisable
const deepCopy = (obj: Object | null) => JSON.parse(JSON.stringify(obj));

export const uri = 'uri';
export const uuid = 'uuid';
export const alphabetic = 'alphabetic';
export const alphabeticAndHyphen = 'alphabeticAndHyphen';
export const alphabeticAndUnderscore = 'alphabeticAndUnderscore';
export const numeric = 'numeric';
export const email = 'email';
export const pass = 'pass';

export default class Request {
  urlPattern: string;
  method: Methods.MethodsType;
  urlParameters: UrlParameters;
  relativeUrl: string;
  body: Object | null;
  queryParameters: QueryParameters;
  headers: Headers;
  retry: Retry

  constructor(
    urlPattern: string,
    method: Methods.MethodsType,
    urlParameters: UrlParameters = {},
    body: Object | null = null,
    queryParameters: QueryParameters = {},
    headers: Headers = {},
    retry: Retry = { attempts: 1, timeout: 1000 },
  ) {
    this.urlPattern = urlPattern;
    this.urlParameters = urlParameters;
    this.relativeUrl = this.buildRelativeUrl(
      urlPattern,
      urlParameters,
      queryParameters
    );
    this.body = body;
    this.method = method;
    this.queryParameters = queryParameters;
    this.headers = headers;
    this.retry = retry;
  }

  static get = (urlPattern: string, token: string) => {
    return new Request(urlPattern, Methods.GET);
  };

  static post = (urlPattern: string, token: string) => {
    return new Request(urlPattern, Methods.POST);
  };

  static put = (urlPattern: string, token: string) => {
    return new Request(urlPattern, Methods.PUT);
  };

  static patch = (urlPattern: string, token: string) => {
    return new Request(urlPattern, Methods.PATCH);
  };

  static delete = (urlPattern: string, token: string) => {
    return new Request(urlPattern, Methods.DELETE);
  };

  send = async () => {
    let error;
    for (let i = 0; i < this.retry.attempts; i++) {
      try {
        const response = await fetch(`${this.url}`, this.requestConfig);
        const successfulResponse = await this.checkStatus(response);
        const responseBody = await this.parseJSON(successfulResponse);
        return responseBody;
      } catch (e) {
        error = e;
        await sleep(0);
      }
    }
    throw error;
  }

  get url(): string {
    return `${this.host}${this.relativeUrl}`;
  }

  get host(): string {
    return '';
  }

  setRetry = (attempts: number = 2, timeout: number = 1000) => {
    return new Request(
      this.urlPattern,
      this.method,
      this.urlParameters,
      deepCopy(this.body),
      this.queryParameters,
      this.headers,
      { attempts , timeout },
    );
  }

  setUrlParameters = (urlParameters: UrlParameters) => {
    return new Request(
      this.urlPattern,
      this.method,
      urlParameters,
      deepCopy(this.body),
      this.queryParameters,
      this.headers,
      this.retry,
    );
  };

  setQueryParameters = (queryParameters: QueryParameters) => {
    return new Request(
      this.urlPattern,
      this.method,
      this.urlParameters,
      deepCopy(this.body),
      queryParameters,
      this.headers,
      this.retry,
    );
  };

  setBody = (body: Object) => {
    return new Request(
      this.urlPattern,
      this.method,
      deepCopy(this.urlParameters),
      body,
      this.queryParameters,
      this.headers,
      this.retry,
    );
  };

  setHeader = (key: string, value: string) => {
    return new Request(
      this.urlPattern,
      this.method,
      deepCopy(this.urlParameters),
      deepCopy(this.body),
      this.queryParameters,
      { ...this.headers, [key]: value },
      this.retry,
    );
  }

  buildRelativeUrl = (
    urlPattern: string,
    urlParameters: UrlParameters,
    queryParameters: QueryParameters
  ) => {
    let relativeUrl = urlPattern;
    Object.entries(urlParameters).forEach(([ key, value ]) => {
      if (relativeUrl.includes(`:${key}`)) {
        // $FlowFixMe
        if (this.validateParameter(value.value, value.type)) {
          // $FlowFixMe
          relativeUrl = relativeUrl.replace(`:${key}`, value.value);
        }
      }
    });
    Object.entries(queryParameters).forEach(([ key, value ], index) => {
      // $FlowFixMe
      if (this.validateParameter(value.value, value.type)) {
        // $FlowFixMe
        if (Array.isArray(value.value)) {
          value.value.forEach((v, i) =>
            relativeUrl += `${index === 0 && i === 0 ? '?' : '&'}${key}=${v}`
          );
        } else {
          // $FlowFixMe
          relativeUrl += `${index === 0 ? '?' : '&'}${key}=${value.value}`;
        }
      }
    });
    return relativeUrl;
  };

  validateParameter = (value: string | Array<string>, type: string) => {
    if (Array.isArray(value)) {
      value.forEach(v => this.validateParameter(v, type));
      return true;
    }
    switch (type) {
    case uri:
      if (/\w+:(\/?\/?)[^\s]+/.test(value)) {
        return true;
      }
      break;
    case uuid:
      if (
        /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
          value
        )
      ) {
        return true;
      }
      break;
    case alphabetic:
      if (/^[a-zA-Z()]+$/.test(value)) {
        return true;
      }
      break;
    case alphabeticAndHyphen:
      if (/^[a-zA-Z-()]+$/.test(value)) {
        return true;
      }
      break;
    case alphabeticAndUnderscore:
      if (/^[a-zA-Z_()]+$/.test(value)) {
        return true;
      }
      break;
    case 'numeric':
      if (/^[0-9()]+$/.test(value)) {
        return true;
      }
      break;
    case 'alphanumeric':
      if (/^[a-zA-Z0-9()]+$/.test(value)) {
        return true;
      }
      break;
    case 'pass':
      return true;
    default:
      break;
    }
    throw new ParameterValidationError(
      `Parameter ${value} failed validation as ${type}.`
    );
  };

  get requestConfig() {
    const config = {
      method: this.method,
      credentials: 'include', // send cookies
      headers: {
        'UserAPI-Key': 'qaZ6fkpjjwRgDl77PS4s8bd26IQ3EuZzCgyuAMdxO8SPpllbKo',
        ...this.headers,
      },
    };
    if (this.body) {
      return {
        ...config,
        headers: {
          ...config.headers,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.body),
      };
    }
    return config;
  }

  parseJSON = async (response: Response): Promise<any> => {
    try {
      const body = await response.json();
      return body;
    } catch (e) {
      return Promise.resolve();
    }
  };

  checkStatus = (response: Response) => {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
    throw new ResponseError(response);
  };
}
