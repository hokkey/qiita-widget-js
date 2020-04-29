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
    private setSubject;
    private renderUser;
    private renderArticles;
    private createArticleFragment;
    private renderView;
    private fillTemplate;
    private fillContent;
    private claimNoTransition;
    private claimLoaded;
}
