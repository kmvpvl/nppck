import Factory from './factory';
import Material, {IMaterial} from './material';
import NPPCError from './error';
import Operation, {IOperation} from './operation';
import { Types } from 'mongoose';

export interface IRouteTree {

}
export default class RouteTree {
    private materialid: Types.ObjectId;
    private data?: IRouteTree;
    private count: number;
    constructor(materialid: Types.ObjectId, count: number){
        this.materialid = materialid;
        this.count = count;
    }
    async load(){
        let m_top = new Material(this.materialid);
        await m_top.load();
        this.data = await m_top.route(this.count);
        console.log(this.data);
    }
    toJson() {
        return this.data;
    }
}