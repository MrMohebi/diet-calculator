import type {IFcdRes} from "~/inteface/fdcRes";

export default defineEventHandler( async (event) => {
    const config = useRuntimeConfig(event)
    const id = getRouterParam(event, 'id') as string

    const neededData = [
        203, // Protein
        208, // Energy
        205, // Carbohydrate, by difference
        269.3, // Sugars, Total
        291, // Fiber, total dietary
    ]


    let data = await useStorage('db').getItem(id) as null | IFcdRes
    if(!data){
        try {
            data = await  $fetch(
                `https://api.nal.usda.gov/fdc/v1/food/${id}?format=abridged&nutrients=${encodeURIComponent(neededData.join(","))}&api_key=${config.FDC_API_KEY}`,
                {
                    method:"GET",
                    timeout: 10000,
                }
            )
            useStorage('db').setItem(id, data).then()
        }catch (e) {
            throw createError({
                statusCode: 404,
                statusMessage: 'ID not founded',
            })
        }

    }

    return data
})


