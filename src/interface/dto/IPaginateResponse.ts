export interface IPaginateResponse<T> {
    items: T[];
    total: number;
    hasMore: boolean;
}
