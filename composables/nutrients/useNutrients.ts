import {type IFcdRes} from "~/inteface/fdcRes";
import { useNutrientsStore} from "~/composables/nutrients/nutrients.store";
import type {IFood, IMeal, INutrientsInPortion} from "~/composables/nutrients/nutrients.interface";
import type {MeterItem} from "primevue/metergroup";


export const useNutrients = () => {
    const {t, locale} = useI18n()
    const {meals} = storeToRefs(useNutrientsStore())

    const DEFAULT_FOOD:IFood = {fdc_id:-1, amount:100, nutrientsInPortion:{fiber: -1, portion: -1, sugar: -1, carbohydrate: -1, energy: -1}}
    const DEFAULT_MEAL:IMeal = {mealName: t('meal'), foods:[structuredClone(DEFAULT_FOOD)]}
    // const COLORS = ["#c45161", '#e094a0', '#f2b6c0', '#f2dde1', '#cbc7d8', '#8db7d2','#5e62a9','#434279']
    const COLORS = ['#c7522a', '#e5c185', '#fbf2c4', '#74a892', '#008585', '#003f5c', '#58508d',  '#bc5090', '#ff6361', '#ffa600']


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
        const newMeal = structuredClone(DEFAULT_MEAL)
        newMeal.mealName += " " + (meals.value.length+1)
        meals.value.push(newMeal)
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

    const totalNutrients = computed(():INutrientsInPortion=>{
        const result:INutrientsInPortion = {fiber:-1, portion:-1, sugar:-1, energy:-1, carbohydrate:-1,}
        meals.value.forEach(meal=>{
            const mealNutrients = calculateMaleNutrients(meal.foods, 100)[0]
            Object.keys(mealNutrients).forEach(key=>{
                // @ts-ignore
                if(mealNutrients[key]>=0){
                    // @ts-ignore
                    if(result[key] < 0){
                        // @ts-ignore
                        result[key] = 0
                    }
                    // @ts-ignore
                    result[key] += mealNutrients[key]
                }
            })
        })
        return result
    })


    const energyMeter = computed(():MeterItem[] =>{
        const result:MeterItem[] = []
        const total = totalNutrients.value.energy
        meals.value.forEach((meal,index)=>{
            const mealNutrients = calculateMaleNutrients(meal.foods, 100)[0]
            if(mealNutrients.energy >=0){
                result.push({ label: meal.mealName, color: COLORS[index] ?? COLORS[1], value: (mealNutrients.energy/total)*100, icon:""})
            }
        })
        return result
    })

    const portionMeter = computed(():MeterItem[] =>{
        const result:MeterItem[] = []
        const total = totalNutrients.value.portion
        meals.value.forEach((meal,index)=>{
            const mealNutrients = calculateMaleNutrients(meal.foods, 100)[0]
            if(mealNutrients.portion >=0){
                result.push({ label: meal.mealName, color: COLORS[index] ?? COLORS[1], value: (mealNutrients.portion/total)*100, icon:""})
            }
        })
        return result
    })
    const carbohydrateMeter = computed(():MeterItem[] =>{
        const result:MeterItem[] = []
        const total = totalNutrients.value.carbohydrate
        meals.value.forEach((meal,index)=>{
            const mealNutrients = calculateMaleNutrients(meal.foods, 100)[0]
            if(mealNutrients.carbohydrate >=0){
                result.push({ label: meal.mealName, color: COLORS[index] ?? COLORS[1], value: (mealNutrients.carbohydrate/total)*100, icon:""})
            }
        })
        return result
    })
    const sugarMeter = computed(():MeterItem[] =>{
        const result:MeterItem[] = []
        const total = totalNutrients.value.sugar
        meals.value.forEach((meal,index)=>{
            const mealNutrients = calculateMaleNutrients(meal.foods, 100)[0]
            if(mealNutrients.sugar >=0){
                result.push({ label: meal.mealName, color: COLORS[index] ?? COLORS[1], value: (mealNutrients.sugar/total)*100, icon:""})
            }
        })
        return result
    })
    const fiberMeter = computed(():MeterItem[] =>{
        const result:MeterItem[] = []
        const total = totalNutrients.value.fiber
        meals.value.forEach((meal,index)=>{
            const mealNutrients = calculateMaleNutrients(meal.foods, 100)[0]
            if(mealNutrients.fiber >=0){
                result.push({ label: meal.mealName, color: COLORS[index] ?? COLORS[1], value: (mealNutrients.fiber/total)*100, icon:""})
            }
        })
        return result
    })


    return{
        totalNutrients,
        isLoadingFoodData,
        calculateFoodNutrients,
        onChangeFood,
        onAddFood,
        onRemoveFood,
        onAddMeal,
        onRemoveMeal,
        calculateMaleNutrients,
        units,
        meals,
        energyMeter,
        portionMeter,
        carbohydrateMeter,
        sugarMeter,
        fiberMeter,
    }

}