import type {IMeal} from "~/composables/nutrients/nutrients.interface";

export interface IPlan{
  id: number,
  title:string,
  lang:string,
  author:string,
  createdAt:string,
  details?:string,
  updatedAt?:string,
  meals:IMeal[],
}
