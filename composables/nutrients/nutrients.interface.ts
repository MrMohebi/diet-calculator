export interface IFood{
    fdc_id:number
    amount:number
    nutrientsInPortion:INutrientsInPortion
}

export interface INutrientsInPortion{
    fiber: number;
    portion: number;
    sugar: number;
    carbohydrate: number;
    energy:number;
}

export interface IMeal{
    mealName: string
    foods:IFood[]
}