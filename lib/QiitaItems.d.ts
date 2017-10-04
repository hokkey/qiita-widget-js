import { QiitaItemsConf, QiitaItemsParam, QiitaResponse } from "./interface";
import {QiitaItemsApi} from "./QiitaItemsApi";
export declare class QiitaItems {
    private conf: QiitaItemsParam;
    private api: QiitaItemsApi;
    private articles: QiitaResponse.Article[];
    static defaultConf: QiitaItemsConf;
    constructor(conf: QiitaItemsParam);
    fetch(): Promise<void>;
    private createOrder(): number[];
    getArticlesToShow(): QiitaResponse.Article[];
    getUserToShow(): QiitaResponse.User;
    private countAllLikes();
}
