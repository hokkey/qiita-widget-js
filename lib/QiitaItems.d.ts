import { QiitaItemsConf, QiitaItemsParam, QiitaResponse } from "./interface";
export declare class QiitaItems {
    private conf;
    private api;
    private articles;
    static defaultConf: QiitaItemsConf;
    static validateConf(conf: QiitaItemsConf): QiitaItemsConf;
    constructor(conf: QiitaItemsParam);
    fetch(): Promise<void>;
    private createOrder;
    private filterOrigin;
    getArticlesToShow(): QiitaResponse.Article[];
    getUserToShow(): QiitaResponse.User;
    private countAllLikes;
}
