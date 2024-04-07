export interface IFood{
    fdc_id:number
    amount:number
    nutrientsInProtein:INutrientsInProtein
}

export interface INutrientsInProtein{
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