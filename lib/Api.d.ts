import { RequestConf } from "./interface";
export declare class Api {
    api: Function;
    constructor(conf: RequestConf);
    fetch<T>(conf: RequestConf): Promise<T>;
}
