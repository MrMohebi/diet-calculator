export interface IFcdRes {
    fdcId: number;
    description: string;
    dataType: string;
    publicationDate: string;
    ndbNumber: string;
    foodNutrients: FoodNutrient[];
    foodPortions: IFoodPortion[]
}
export interface IFoodPortion {
    id: number;
    gramWeight: number;
    sequenceNumber: number;
    amount: number;
    modifier: string;
    measureUnit: IMeasureUnit;
}
export interface IMeasureUnit {
    id: number;
    name: string;
    abbreviation: string;
}

export interface FoodNutrient {
    number: string;
    name: string;
    amount: number;
    unitName: string;
    derivationCode: string;
    derivationDescription: string;
}