import { QiitaItemsConf, QiitaItemsParam, QiitaResponse } from "./interface";
export declare class QiitaItems {
    private conf;
    private api;
    private articles;
    static defaultConf: QiitaItemsConf;
    constructor(conf: QiitaItemsParam);
    fetch(): Promise<void>;
    private createOrder();
    getArticlesToShow(): any[];
    getUserToShow(): QiitaResponse.User;
    private countAllLikes();
}
