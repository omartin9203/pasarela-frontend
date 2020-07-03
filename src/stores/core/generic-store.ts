import { ReduxRepository } from 'redux-scaffolding-ts';
import {ICrudServices} from "../../interface/services/ICrudServices";
import {IPaginateResponse} from "../../interface/dto/IPaginateResponse";

export interface DataState<T> {
  isBusy: boolean;
  data?: CommandResult<T>
}

export interface CommandResult<T> {
  success: boolean;
  message?: string;
  result?: T | IPaginateResponse<T>;
}

export abstract class DataStore<T extends any, Tinput, Tupdate> extends ReduxRepository<DataState<T>> {
  public ENTITY_GET_ALL?: string;
  public ENTITY_DELETED?: string;
  public ENTITY_UPDATED?: string;
  public ENTITY_CREATED?: string;
  public ENTITY_GET_BY_ID?: string;


  protected constructor(entityName: string, initialState: DataState<T>, readonly service: ICrudServices<T, Tinput, Tupdate>) {
    super(initialState);
    this.ENTITY_GET_ALL = `${entityName}_GET_ALL`;
    this.ENTITY_DELETED = `${entityName}_DELETED`;
    this.ENTITY_CREATED = `${entityName}_CREATED`;
    this.ENTITY_UPDATED = `${entityName}_UPDATED`;
    this.ENTITY_GET_BY_ID = `${entityName}_ENTITY_GET_BY_ID`;

    this.addReducer(this.ENTITY_GET_ALL, (): any => {
      return {
        onStart: () => ({ ...this.state, isBusy: true } as DataState<T>),
        onSuccess: (value: IPaginateResponse<T>) => {
          return {
            ...this.state,
            data: {
              success: true,
              result: value,
            },
            isBusy: false
          } as DataState<T>;
        },
        onError: (error: any) => ({
          ...this.state,
          data: {
            success: false,
            message: error.toString(),
          },
          isBusy: false
        } as DataState<T>)
      };
    }, 'AsyncAction');
    this.addReducer(this.ENTITY_CREATED, (): any => {
      return {
        onStart: () => ({ ...this.state, isBusy: true }),
        onSuccess: (value: T) => {
          return {
            ...this.state,
            isBusy: false,
            data: {
              success: true,
              result: value
            }
          } as DataState<T>;
        },
        onError: (error: any) => ({
          ...this.state,
          isBusy: false,
          data: {
            success: false,
            message: error.toString()
          }
        } as DataState<T>)
      };
    }, 'AsyncAction');
    this.addReducer(this.ENTITY_UPDATED as string, (): any => {
      return {
        onStart: () => ({ ...this.state, isBusy: true }),
        onSuccess: (value: T) => {
          return {
            ...this.state,
            isBusy: false,
            data: {
              success: true,
              result: value
            }
          } as DataState<T>;
        },
        onError: (error: any) => ({
          ...this.state,
          isBusy: false,
          data: {
            success: false,
            message: error.toString()
          }
        } as DataState<T>)
      };
    }, 'AsyncAction');
    this.addReducer(this.ENTITY_DELETED, (): any => {
      return {
        onStart: () => ({ ...this.state, isBusy: true }),
        onSuccess: (value: T) => {
          return {
            ...this.state,
            isBusy: false,
            data: {
              success: true,
              result: value
            }
          } as DataState<T>;
        },
        onError: (error: any) => ({
          ...this.state,
          isBusy: false,
          data: {
            success: false,
            message: error.toString()
          }
        } as DataState<T>)
      };
    }, 'AsyncAction');
    this.addReducer(this.ENTITY_GET_BY_ID, (): any => {
      return {
        onStart: () => ({ ...this.state, isBusy: true }),
        onSuccess: (value: T) => {
          return {
            ...this.state,
            isBusy: false,
            data: {
              success: true,
              result: value
            }
          } as DataState<T>;
        },
        onError: (error: any) => ({
          ...this.state,
          isBusy: false,
          data: {
            success: false,
            message: error.toString()
          }
        } as DataState<T>)
      };
    }, 'AsyncAction');
  }

  public async getAllAsync(skip = 0, limit: 10): Promise<IPaginateResponse<T>> {
    const result = await this.dispatchAsync(this.ENTITY_GET_ALL as string, this.service.getAll(skip, limit));
    return result;
  }

  public async deleteAsync(id: string): Promise<T> {
    const result = await this.dispatchAsync(this.ENTITY_DELETED as string, this.service.delete(id));
    return result;
  }

  public async getByIdAsync(id: string): Promise<T> {
    const result = await this.dispatchAsync(this.ENTITY_GET_BY_ID as string, this.service.getOne(id));
    return result;
  }

  public createAsync(input: Tinput): Promise<T> {
    return this.dispatchAsync(this.ENTITY_CREATED as string, this.service.create(input));
  }

  public updateAsync(id: string, input: Tupdate): Promise<T> {
    return this.dispatchAsync(this.ENTITY_UPDATED as string, this.service.update(id, input));
  }
}
