import Factory, {FactoryID} from './factory';
import Material, {IMaterial, MaterialID, MDMCode} from './material';
import NPPCError from './error';
import Operation, {IOperation} from './operation';

export interface IRouteTree {

}
export default class RouteTree {
    private factoryid: FactoryID;
    private materialid: MaterialID;
    private data?: IRouteTree;
    private count: number;
    constructor(factoryid: FactoryID, materialid: MaterialID | MDMCode, count: number){
        this.factoryid = factoryid;
        this.materialid = materialid;
        this.count = count;
    }
    async load(){
        let m_top = new Material(this.factoryid, this.materialid);
        await m_top.load();
        this.data = await m_top.route(this.count);
        console.log(this.data);
    }
    toJson() {
        return this.data;
    }
}