import {NativeModules} from 'react-native';
import {getToken} from './AuthStorage';

type HttpRequestOption = {
  headers: any;
};

export type HttpErrorCause = 'TIMEDOUT' | 'UNAUTHORIZED';

export default class HttpClient<T> {
  HttpRequestModule: any;
  defaultOptions = {
    headers: {
      platform: 'MOBILE',
      Authorization: 'Bearer ',
    },
  };
  baseUrl = 'https://api.otchi.ovh';

  constructor() {
    this.HttpRequestModule = NativeModules.HttpRequestModule;
  }

  async get(uri: string, options?: HttpRequestOption): Promise<T> {
    return new Promise<T>(async (resolve, reject) => {
      this.HttpRequestModule.get(
        this.baseUrl + uri,
        await this.getRequestHeader(options),
        (result: string) => resolve(JSON.parse(result) as T),
        (error: HttpErrorCause) => reject(error),
      );
    });
  }

  async post(
    uri: string,
    body: object,
    options?: HttpRequestOption,
  ): Promise<T> {
    return new Promise<T>(async (resolve, reject) => {
      this.HttpRequestModule.post(
        this.baseUrl + uri,
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
