import { RequestConf } from "./interface";
export declare class Api {
    private api;
    constructor(conf: RequestConf);
    fetch<T>(conf: RequestConf): Promise<T>;
}
