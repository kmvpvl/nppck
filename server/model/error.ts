export type ErrorCode = 
      "mongo:connect" /* Couldn'n connect to MongoDB*/ 
    | "mongo:any" /* */
    | "factory:notfound" /* Factory not found */
    | "material:notfound" /* Material not found*/
    | "material:notloaded" /* Material not loaded from DB. Try to use 'load' method before*/
    | "material:anotherfactory" /*Material not belongs the factory*/;

export default class NPPCError extends Error {
    public code: ErrorCode;
    public description: string;
    constructor(code: ErrorCode, description?: string){
        const descs = new Map<ErrorCode, string>([
            ["mongo:connect",  "Couldn'n connect to MongoDB"],
            ["factory:notfound", "Factory not found"],
            ["material:notfound", "Material not found"],
            ["material:notloaded", "Material not loaded from DB. Try to use 'load' method before"],
            ["material:anotherfactory", "Material not belongs the factory"]
        ]);
        super(`${code}: ${descs.get(code)} - ${description}`);
        this.code = code;
        this.description = this.message;
    }
    toString(){return this.message}
}