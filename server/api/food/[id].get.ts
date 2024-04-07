
interface IFcdRes {
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

interface FoodNutrient {
    number: string;
    name: string;
    amount: number;
    unitName: string;
    derivationCode: string;
    derivationDescription: string;
}
export default defineEventHandler( async (event):Promise<IFcdRes> => {
    const config = useRuntimeConfig(event)
    const id = getRouterParam(event, 'id') as string

    const neededData = [
        203, // Protein
        208, // Energy
        957, // Energy (Atwater General Factors)
        205, // Carbohydrate, by difference
        269.3, // Sugars, Total
        291, // Fiber, total dietary
    ]


    let data = await useStorage('db').getItem(id) as IFcdRes
    if(!data){
        try {
            data = await  $fetch(
                `https://api.nal.usda.gov/fdc/v1/food/${id}?nutrients=${encodeURIComponent(neededData.join(","))}&api_key=${config.FDC_API_KEY}`,
                {
                    method:"GET",
                    timeout: 10000,
                }
            )
            useStorage('db').setItem(id, data).then()
        }catch (e) {
            console.log(e)
            throw createError({
                statusCode: 404,
                statusMessage: 'ID not founded',
            })
        }

    }

    return data
})


