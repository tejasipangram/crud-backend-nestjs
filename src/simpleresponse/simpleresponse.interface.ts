import { Crud } from 'src/schema/crud.schema';

export interface Simpleresponse {
  success: boolean;
  message?: string;
  data?: any;
  totalPages?: number;
  page?: number;
}
