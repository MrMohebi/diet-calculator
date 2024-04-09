export interface IFcdRes {
    fdcId: number;
    description: string;
    dataType: string;
    publicationDate: string;
    ndbNumber: string;
    foodNutrients: IFoodNutrient[];
    foodPortions: IFoodPortion[]
}
export interface IFoodPortion {
    id: number;
    gramWeight: number;
    sequenceNumber: number;
    portionDescription: string;
    amount: number;
    modifier: string;
    measureUnit: IMeasureUnit;
}
export interface IMeasureUnit {
    id: number;
    name: string;
    abbreviation: string;
}

export interface IFoodNutrient {
    type: string;
    nutrient: INutrient;
    id: number;
    amount: number;
    max?: number;
    min?: number;
    median?: number;
    dataPoints?: number;
    minYearAcquired?: number;
    loq?: number;
}

export interface INutrient {
    id: number;
    number: string;
    name: string;
    rank: number;
    unitName: string;
}