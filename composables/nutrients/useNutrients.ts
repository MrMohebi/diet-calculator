import {type IFcdRes} from "~/inteface/fdcRes";
import { useNutrientsStore} from "~/composables/nutrients/nutrients.store";
import type {IFood, IMeal, INutrientsInPortion} from "~/composables/nutrients/nutrients.interface";


export const useNutrients = () => {
    const {t, locale} = useI18n()
    const {meals} = storeToRefs(useNutrientsStore())

    const DEFAULT_FOOD:IFood = {fdc_id:-1, amount:100, nutrientsInPortion:{fiber: -1, portion: -1, sugar: -1, carbohydrate: -1, energy: -1}}
    const DEFAULT_MEAL:IMeal = {mealName: t('toEdit'), foods:[structuredClone(DEFAULT_FOOD)]}


    const units = reactive([
        [
            {
                unit:"g",
                name_fa:"گرم",
                name_en:"gram",
                gram:100,
            }
        ]
    ])

    const isLoadingFoodData = reactive({})

    const onAddFood = (mealIndex:number)=>{
        meals.value[mealIndex].foods.push(structuredClone(DEFAULT_FOOD))
    }

    const onRemoveFood =(mealIndex:number, foodIndex:number) => {
        if(meals.value[mealIndex].foods.length > 1)
            meals.value[mealIndex].foods.splice(foodIndex,1)
    }
    const onAddMeal = () => {
        meals.value.push(DEFAULT_MEAL)
    }

    const onRemoveMeal = (index:number) =>{
        if(meals.value.length > 1)
            meals.value.splice(index,1)
    }

    const fcdAdaptor = (fcdRes:IFcdRes):INutrientsInPortion =>{
        let energy =
            fcdRes.foodNutrients.find(i=>i.number==(208).toString())?.amount ??
            fcdRes.foodNutrients.find(i=>i.number==(957).toString())?.amount ??
            -1

        return {
            portion:fcdRes.foodNutrients.find(i=>i.number==(203).toString())?.amount??-1,
            energy: energy,
            carbohydrate:fcdRes.foodNutrients.find(i=>i.number==(205).toString())?.amount??-1,
            sugar:fcdRes.foodNutrients.find(i=>i.number==(269.3).toString())?.amount??-1,
            fiber:fcdRes.foodNutrients.find(i=>i.number==(291).toString())?.amount??-1,
        }
    }

    const onChangeFood = async (fcd_id:number, indexMeal:number, indexFood:number) => {
        // @ts-ignore
        isLoadingFoodData[indexMeal.toString()+indexFood.toString()] = true

        const res = await $fetch<IFcdRes>(`/api/food/${fcd_id}`)
        meals.value[indexMeal].foods[indexFood].nutrientsInPortion = fcdAdaptor(res)

        // @ts-ignore
        isLoadingFoodData[indexMeal.toString()+indexFood.toString()] = false
    }

    const calculateFoodNutrients = (food:IFood, unitGram:number)=>{
        return [
            {
                fiber:Math.round((food.amount/unitGram)*food.nutrientsInPortion.fiber),
                portion:Math.round((food.amount/unitGram)*food.nutrientsInPortion.portion),
                sugar:Math.round((food.amount/unitGram)*food.nutrientsInPortion.sugar),
                energy:Math.round((food.amount/unitGram)*food.nutrientsInPortion.energy),
                carbohydrate:Math.round((food.amount/unitGram)*food.nutrientsInPortion.carbohydrate),
            }
        ]
    }

    const calculateMaleNutrients = (mealFoods:IFood[],unitGram:number) =>{
        const result = {
            fiber:-1,
            portion:-1,
            sugar:-1,
            energy:-1,
            carbohydrate:-1,
        }
        mealFoods.forEach(item=>{
            const calculatedFood = calculateFoodNutrients(item, unitGram)[0]
            Object.keys(calculatedFood).forEach(key=>{
                // @ts-ignore
                if(calculatedFood[key]>=0){
                    // @ts-ignore
                    if(result[key] < 0){
                        // @ts-ignore
                        result[key] = 0
                    }
                    // @ts-ignore
                    result[key] += calculatedFood[key]
                }
            })

        })
        return [result]
    }


    return{
        isLoadingFoodData,
        calculateFoodNutrients,
        onChangeFood,
        onAddFood,
        onRemoveFood,
        onAddMeal,
        onRemoveMeal,
        calculateMaleNutrients,
        units,
        meals
    }

}