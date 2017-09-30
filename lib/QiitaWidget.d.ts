import { QiitaWidgetParam } from "./interface";
export default class QiitaWidget {
    private conf;
    private presenter;
    private items;
    private dest;
    static defaultConf: QiitaWidgetParam;
    constructor(conf: QiitaWidgetParam);
    init(): Promise<void>;
    private render();
    private claimLoaded();
}
