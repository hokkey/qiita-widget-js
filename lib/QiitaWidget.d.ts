import { QiitaWidgetParam } from "./interface";
import {QiitaPresenter} from "./QiitaPresenter";
import {QiitaItems} from "./QiitaItems";
export default class QiitaWidget {
    private conf: QiitaWidgetParam;
    private presenter: QiitaPresenter;
    private items: QiitaItems;
    private dest: HTMLElement;
    static defaultConf: QiitaWidgetParam;
    constructor(container: HTMLElement, conf: QiitaWidgetParam);
    init(): Promise<void>;
    private render(): void;
    private claimLoaded(): void;
}
