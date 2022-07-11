
export default class MLString extends String {
    values: Map<string, string>
    constructor(def: string, others?: any) {
        super(def);
        this.values = new Map<string, string>(others);
    }
    public toString(lang?: string): string {
        return (lang?(this.values.has(lang)?this.values.get(lang):super.toString()):super.toString()) as string;
    }
}
