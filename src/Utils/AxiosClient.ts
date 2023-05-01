import axios, {Axios, AxiosResponse, AxiosRequestConfig} from 'axios';
import {getToken} from './AuthStorage';

export class AxiosClient {
  private axiosClient: Axios;

  constructor(config?: AxiosRequestConfig) {
    this.axiosClient = axios.create({
      ...config,
      baseURL: 'https://api.otchi.ovh',
      headers: {platform: 'MOBILE'},
    });
  }

  async get<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>,
  ) {
    return this.axiosClient.get<T, R, D>(
      url,
      await this.setAuthHeaders(config),
    );
  }

  async delete<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> {
    return this.axiosClient.delete<T, R, D>(
      url,
      await this.setAuthHeaders(config),
    );
  }

  async post<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> {
    return this.axiosClient.post<T, R, D>(
      url,
      data,
      await this.setAuthHeaders(config),
    );
  }

  async patch<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> {
    return this.axiosClient.patch<T, R, D>(
      url,
      data,
      await this.setAuthHeaders(config),
    );
  }

  private async setAuthHeaders(config: AxiosRequestConfig | undefined) {
    const token = await getToken();

    if (typeof token === 'string') {
      if (config) {
        config.headers = {...config.headers, Authorization: `Bearer ${token}`};
      } else {
        config = {headers: {Authorization: `Bearer ${token}`}};
      }
    }

    return config;
  }
}
