export default defineEventHandler( async (event) => {
    const query = getQuery(event)
    const validator =
        query.hasOwnProperty("gender") &&
        query.hasOwnProperty("age") &&
        query.hasOwnProperty("height") &&
        query.hasOwnProperty("weight")

    if(!validator){
        throw createError({
            statusCode: 400,
            statusMessage: 'gender and age and height and weight are required',
        })
    }

    const age = query["age"]
    const height = query["height"]
    const weight = query["weight"]

    let bmr
    if(query["gender"] == 'male'){
        bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age)
    }else{
        bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age)
    }

    return {
        bmr: Math.round(bmr),
        sedentary: Math.round(bmr * 1.2),
        lightlyActive: Math.round(bmr * 1.375),
        moderatelyActive: Math.round(bmr * 1.55),
        veryActive: Math.round(bmr * 1.725),
        superActive: Math.round(bmr * 1.9),
    }
})


