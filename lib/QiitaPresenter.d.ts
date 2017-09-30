import { QiitaPresenterConf, QiitaWidgetParam } from "./interface";
import { QiitaItems } from "./QiitaItems";
export declare class QiitaPresenter {
    items: QiitaItems;
    private conf;
    private userTemplate;
    private articleTemplate;
    private userDest;
    private articleDest;
    static defaultConf: QiitaPresenterConf;
    constructor(items: QiitaItems, conf: QiitaWidgetParam, dest?: HTMLElement);
    renderUser(): void;
    renderArticles(): void;
    private createArticleFragment(template, content);
    private renderView(template, dest, callback);
    private fillTemplate(fragment, kv);
    private fillContent(key, content, template);
    private fillContent(key, content, template);
}
