declare module "axios-cache-adapter" {
  import {AxiosPromise, AxiosRequestConfig} from "axios";
  import * as LocalForage from "localforage";

  export interface AxiosCacheAdapterRequestConfig extends AxiosRequestConfig {
    cache: {
      maxAge: number,
      store: LocalForage,
      debug: boolean
    };
  }

  export interface AxiosCacheAdapterSetupCallback {
    (options: AxiosRequestConfig): AxiosPromise;
  }

  interface AxiosCacheAdapterSetup {
    (options: AxiosCacheAdapterRequestConfig): AxiosCacheAdapterSetupCallback;
  }

  export const setup: AxiosCacheAdapterSetup;
}
