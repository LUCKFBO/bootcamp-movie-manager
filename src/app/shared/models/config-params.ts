import { GenericField } from "./generic-field";

export interface ConfigParams {
  page?: number;
  limitPage?: number;
  search?: string;
  field?: GenericField;
}
