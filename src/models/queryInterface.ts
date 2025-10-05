
export type Primitive = string | number | boolean | Date;

export type QueryWhere = Record<string, Primitive | Primitive[] | null | undefined>

export interface QueryInterface {
  limit?: number;
  offset?: number;
  orderBy?: string; 
  where?: QueryWhere;
  [key: string]: unknown; // more filters
}

export function adaptQueryInterface(raw: any): QueryInterface {
  return {
    limit: raw.limit,
    offset: raw.offset,
    orderBy: raw.orderBy,
    where: raw.where,
  };
}