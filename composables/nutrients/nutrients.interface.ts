export interface IFood{
    fdc_id:number
    amount:number
    customName?:string
    nutrientsIn100g:INutrientsIn100g
    portions:IPortion[]
    selectedPortionId:number
}

export interface IPortion{
    id:number
    gramWeight: number;
    amount: number;
    modifier: string;
    label: string;
    measureUnit?: IMeasureUnit;
}
export interface IMeasureUnit {
    id: number;
    name: string;
    abbreviation: string;
}
export interface INutrientsIn100g{
    fiber: number;
    protein: number;
    sugar: number;
    carbohydrate: number;
    energy:number;
}

export interface IMeal{
    mealName: string
    foods:IFood[]
}