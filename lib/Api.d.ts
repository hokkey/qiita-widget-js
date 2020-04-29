import { RequestConf } from './interface';
export declare class Api {
    private cache;
    constructor();
    fetch<T>(conf: RequestConf): Promise<T>;
    private getCache;
    private saveCache;
}
