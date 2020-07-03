import {IPaginateResponse} from "../dto/IPaginateResponse";

export interface ICrudServices<Titem, Tinput, Tupdate> {
    getAll(skip: number, limit: number): Promise<IPaginateResponse<Titem>>;
    getOne(id: String): Promise<Titem>;
    create(input: Tinput): Promise<Titem>;
    update(id: String, input: Tupdate): Promise<Titem>;
    delete(id: String): Promise<Titem>; 
}
