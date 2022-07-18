import Factory, {FactoryID} from './factory';
import Material, {MaterialID, MDMCode} from './material';
import NPPCError from './error';

export interface IRouteTree {

}
export default class RouteTree {
    private factoryid: FactoryID;
    private materialid: MaterialID;
    private data?: IRouteTree;
    constructor(factoryid: FactoryID, materialid: MaterialID | MDMCode){
        this.factoryid = factoryid;
        this.materialid = materialid;
    }
    async load(){
        let m_top = new Material(this.factoryid, this.materialid);
        
    }
    toJson():IRouteTree {
        return {};
    }
}