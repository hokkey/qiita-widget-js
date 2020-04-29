import { QiitaWidgetParam } from "./interface";
export default class QiitaWidget {
    private readonly presenter;
    private readonly conf;
    private readonly items;
    static defaultConf: QiitaWidgetParam;
    constructor(container: HTMLElement, conf: QiitaWidgetParam);
    init(): Promise<void>;
}
