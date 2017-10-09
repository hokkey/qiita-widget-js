import { QiitaPresenterConf, QiitaWidgetParam } from "./interface";
import { QiitaItems } from "./QiitaItems";
export declare class QiitaPresenter {
    items: QiitaItems;
    private dest;
    private conf;
    private userTemplate;
    private articleTemplate;
    private userDest;
    private articleDest;
    static defaultConf: QiitaPresenterConf;
    constructor(dest: HTMLElement, items: QiitaItems, conf: QiitaWidgetParam);
    render(): void;
    private setSubject();
    private renderUser();
    private renderArticles();
    private createArticleFragment(template, content);
    private renderView(template, dest, callback);
    private fillTemplate(fragment, kv);
    private fillContent(key, content, template);
    private fillContent(key, content, template);
    private claimNoTransition();
    private claimLoaded();
}
