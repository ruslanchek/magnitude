import axios, { Method } from 'axios';
import { cookieStorage } from '../common/cookie';

interface IApiFieldError<TInputModel> {
  property: keyof TInputModel;
  errors: string[];
}

interface IApiAuthHeaders {
  Authorization: string;
}

interface IApiResult<TInputModel, TOutputModel> {
  error: boolean;
  fieldsErrors?: IApiFieldError<TInputModel>[];
  generalError?: string;
  data?: TOutputModel;
}

export abstract class Api {
  public static getToken(): string | null {
    return cookieStorage.getItem('token');
  }

  protected static setToken(token: string) {
    cookieStorage.setItem('token', token);
  }

  protected static clearToken() {
    cookieStorage.removeItem('token');
  }

  private static getAuthHeaders(token: string): IApiAuthHeaders {
    return {
      Authorization: `Bearer ${token}`,
    };
  }

  public static logout() {
    this.clearToken();
    console.log('Logout!');
  }

  public static async fetch<TInputModel = any, TOutputModel = any>(
    url: string,
    method: Method,
    data?: TInputModel,
    needAuth?: boolean,
  ): Promise<IApiResult<TInputModel, TOutputModel>> {
    try {
      let headers = {};

      if (needAuth) {
        const token = this.getToken();

        if (!token) {
          return {
            error: true,
            generalError: 'NO_TOKEN',
          };
        }

        headers = {
          ...headers,
          ...this.getAuthHeaders(token),
        };
      }

      const result = await axios.request({
        url,
        method,
        data,
        headers,
      });

      return {
        error: false,
        data: result.data.data,
      };
    } catch (e) {
      const result = e.response;
      const generalError = this.parseGeneralError(result.data.message);
      const fieldsErrors = this.parseFieldsErrors<TInputModel>(result.data.message);

      if (e.response.status < 200 || e.response.status >= 400) {
        this.clearToken();
      }

      return {
        error: true,
        fieldsErrors,
        generalError,
      };
    }
  }

  protected static parseGeneralError(message: any): string | undefined {
    if (message && typeof message === 'string') {
      return message;
    } else {
      return undefined;
    }
  }

  protected static parseFieldsErrors<TInputModel>(messages: any): Array<IApiFieldError<TInputModel>> | undefined {
    if (messages && typeof messages === 'object') {
      return messages.map((message: any) => {
        const { property, constraints } = message;
        const errors = [];

        if (constraints) {
          for (let key in constraints) {
            if (constraints.hasOwnProperty(key)) {
              errors.push(constraints[key]);
            }
          }
        }

        return {
          property,
          errors,
        };
      });
    } else {
      return undefined;
    }
  }
}
