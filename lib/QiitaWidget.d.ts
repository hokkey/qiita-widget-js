import { QiitaWidgetParam } from "./interface";
export default class QiitaWidget {
    private conf;
    private presenter;
    private items;
    static defaultConf: QiitaWidgetParam;
    constructor(container: HTMLElement, conf: QiitaWidgetParam);
    init(): Promise<void>;
}
