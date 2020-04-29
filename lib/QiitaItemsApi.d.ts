import { QiitaItemsApiConf, QiitaItemsApiParam, QiitaResponse } from "./interface";
export declare class QiitaItemsApi {
    private api;
    private readonly requestConf;
    static defaultConf: QiitaItemsApiConf;
    static validateConf(conf: QiitaItemsApiConf): QiitaItemsApiConf;
    constructor(conf: QiitaItemsApiParam);
    fetch(): Promise<QiitaResponse.Article[]>;
    private fetchItems;
    private createNextRequest;
    private isThereNextPage;
}
