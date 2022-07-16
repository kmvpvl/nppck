export type RoleName = "superuser"
    | "factory:read" | "factory:modify";
export interface IRole {
    name: RoleName;
    context?: string;
}
export default class Role implements IRole{
    public name: RoleName;
    public context?: string;
    constructor(r: IRole){
        this.name = r.name;
        this.context = r.context;
    }
    toString(): string{
        return this.name+"@"+(this.context?this.context:"");
    }
}