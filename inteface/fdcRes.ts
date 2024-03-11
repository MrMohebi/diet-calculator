export interface IFcdRes {
    fdcId: number;
    description: string;
    dataType: string;
    publicationDate: string;
    ndbNumber: string;
    foodNutrients: FoodNutrient[];
}

export interface FoodNutrient {
    number: string;
    name: string;
    amount: number;
    unitName: string;
    derivationCode: string;
    derivationDescription: string;
}