import {NativeModules} from 'react-native';
import {getToken} from './AuthStorage';

type HttpRequestOption = {
  headers: any;
};

enum HttpMethod {
  GET = 0,
  POST = 1,
  PUT = 2,
  DELETE = 3,
  HEAD = 4,
  OPTIONS = 5,
  TRACE = 6,
  PATCH = 7,
}

export type HttpErrorCause = 'TIMEDOUT' | 'UNAUTHORIZED';

export default class HttpClient<T> {
  HttpRequestModule: any;
  defaultOptions = {
    headers: {
      platform: 'MOBILE',
      Authorization: 'Bearer ',
    },
  };
  baseUrl = 'https://api.otchi.ovh/';

  constructor() {
    this.HttpRequestModule = NativeModules.HttpRequestModule;
  }

  async get(uri: string, options?: HttpRequestOption): Promise<T> {
    return this.makeRequest(uri, HttpMethod.GET, null, options);
  }

  async post(
    uri: string,
    body: object,
    options?: HttpRequestOption,
  ): Promise<T> {
    return this.makeRequest(uri, HttpMethod.POST, body, options);
  }

  async delete(uri: string, options?: HttpRequestOption): Promise<T> {
    return this.makeRequest(uri, HttpMethod.DELETE, null, options);
  }

  async put(
    uri: string,
    body: object,
    options?: HttpRequestOption,
  ): Promise<T> {
    return this.makeRequest(uri, HttpMethod.PUT, body, options);
  }

  private async makeRequest(
    uri: string,
    method: HttpMethod,
    body: object | null,
    options?: HttpRequestOption,
  ) {
    return new Promise<T>(async (resolve, reject) => {
      this.HttpRequestModule.request(
        this.baseUrl + uri,
        method,
        await this.getRequestHeader(options),
        body,
        (result: string) => {
          resolve(JSON.parse(result) as T);
        },
        (error: HttpErrorCause) => {
          reject(error);
        },
      );
    });
  }

  private async getRequestHeader(options?: object) {
    const requestOptions = {
      ...this.defaultOptions,
      ...options,
    };

    Object.assign(this.defaultOptions.headers, {
      Authorization: `Bearer ${await getToken()}`,
    });

    return requestOptions;
  }
}
