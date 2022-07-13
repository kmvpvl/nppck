import { NPPCSettings } from "../settings";

export interface IMLString {
    default: string;
    values?: Map<string, string>
}

export default class MLString extends String {
    values: Map<string, string>
    constructor(def: IMLString | string) {
        super(typeof(def)!=="string"? def.default:def);
        this.values = typeof(def)!=="string"? new Map<string, string>(def.values) : new Map<string, string>();
    }
    public toString(lang?: string): string {
        if (!lang) lang = NPPCSettings.lang;
        return (lang?(this.values.has(lang)?this.values.get(lang):super.toString()):super.toString()) as string;
    }
}
