import {type IFcdRes} from "~/inteface/fdcRes";
import { useNutrientsStore} from "~/composables/nutrients/nutrients.store";
import type {
    IFood,
    IMeal,
    IMeasureUnit,
    INutrientsIn100g,
    IPortion,
} from "~/composables/nutrients/nutrients.interface";
import type {MeterItem} from "primevue/metergroup";


export const useNutrients = () => {
    const {t, locale} = useI18n()
    const {meals} = storeToRefs(useNutrientsStore())

    const DEFAULT_FOOD:IFood = {
        fdc_id:-1,
        amount:100,
        portions:[
            {
                id: 0,
                gramWeight: 1,
                amount: 100,
                modifier: 'gram',
                label: 'gram',
            }
        ],
        nutrientsIn100g:{fiber: -1, protein: -1, sugar: -1, carbohydrate: -1, energy: -1},
        selectedPortionId:0
    }
    const DEFAULT_MEAL:IMeal = {mealName: t('meal'), foods:[structuredClone(DEFAULT_FOOD)]}
    const COLORS = ['#c7522a', '#e5c185', '#fbf2c4', '#74a892', '#008585', '#003f5c', '#58508d',  '#bc5090', '#ff6361', '#ffa600']


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

    const fcdAdaptor = (fcdRes:IFcdRes): { nutrientsIn100g: INutrientsIn100g; portions:IPortion[] } =>{
        let energy =
            fcdRes.foodNutrients.find(i=>i.nutrient.number==(208).toString())?.amount ??
            fcdRes.foodNutrients.find(i=>i.nutrient.number==(957).toString())?.amount ??
            -1

        const nutrientsIn100g = {
            protein:fcdRes.foodNutrients.find(i=>i.nutrient.number==(203).toString())?.amount??-1,
            energy: energy,
            carbohydrate:fcdRes.foodNutrients.find(i=>i.nutrient.number==(205).toString())?.amount??-1,
            sugar:fcdRes.foodNutrients.find(i=>i.nutrient.number==(269.3).toString())?.amount??-1,
            fiber:fcdRes.foodNutrients.find(i=>i.nutrient.number==(291).toString())?.amount??-1,
        }
        let portions:IPortion[] = [
            {
                id: 0,
                gramWeight: 1,
                amount: 100,
                modifier: 'gram',
                label: 'gram',
            }
        ]
        if(!!fcdRes.foodPortions && fcdRes.foodPortions.length > 0){
            for (const portion of fcdRes.foodPortions) {
                let label = portion.modifier
                if(!!portion?.portionDescription){
                    label = portion.portionDescription
                }
                if(portion?.measureUnit?.id !== 9999){
                    label = portion.measureUnit.abbreviation
                }

                portions.push({
                    id: portion.id,
                    gramWeight:portion.gramWeight,
                    amount:portion.amount,
                    modifier:portion.modifier,
                    label,
                    measureUnit:portion.measureUnit.id !== 9999 ? portion.measureUnit : {} as IMeasureUnit
                })
            }
        }

        return {
            nutrientsIn100g,
            portions
        }
    }

    const foodLabelGenerator = (portion:IPortion) =>{
        const label = t(portion.label,{}, {default:portion.label, fallbackWarn:false, missingWarn:false})
        const gramGuide = `(${portion.gramWeight} ${t('gram')})`
        if(portion.id > 0){
            return label + gramGuide
        }
        return label
    }

    const onChangeFood = async (fcd_id:number, indexMeal:number, indexFood:number) => {
        // @ts-ignore
        isLoadingFoodData[indexMeal.toString()+indexFood.toString()] = true

        const res = await $fetch<IFcdRes>(`/api/food/${fcd_id}`)
        const data = fcdAdaptor(res)

        meals.value[indexMeal].foods[indexFood].nutrientsIn100g = data.nutrientsIn100g
        meals.value[indexMeal].foods[indexFood].portions = data.portions
        meals.value[indexMeal].foods[indexFood].selectedPortionId = 0

        // @ts-ignore
        isLoadingFoodData[indexMeal.toString()+indexFood.toString()] = false
    }

    const onChangePortion = (indexMeal:number, indexFood:number) =>{
        const selectedPortion = meals.value[indexMeal].foods[indexFood].portions.find(i=>i.id == meals.value[indexMeal].foods[indexFood].selectedPortionId)
        if(!!selectedPortion){
            meals.value[indexMeal].foods[indexFood].amount = selectedPortion?.amount ?? 1
        }
    }

    const howMuchAsGram = (food:IFood) =>{
        const selectedPortion = food.portions.find(i=>i.id == food.selectedPortionId)
        if(selectedPortion == undefined){
            return -1
        }
        return selectedPortion.gramWeight * food.amount
    }

    const calcNutrient = (amountGram:number, nutrientIn100g:number|null|undefined) =>{
        if(!nutrientIn100g || nutrientIn100g < 0){
            return -1
        }
        return Math.round((amountGram * nutrientIn100g) / 100)
    }


    const calculateFoodNutrients = (food:IFood)=>{
        const asGram = howMuchAsGram(food)
        return [
            {
                fiber:calcNutrient(asGram, food.nutrientsIn100g.fiber),
                protein:calcNutrient(asGram, food.nutrientsIn100g.protein),
                sugar:calcNutrient(asGram, food.nutrientsIn100g.sugar),
                energy:calcNutrient(asGram, food.nutrientsIn100g.energy),
                carbohydrate:calcNutrient(asGram, food.nutrientsIn100g.carbohydrate),
            }
        ]
    }

    const calculateMaleNutrients = (mealFoods:IFood[]) =>{
        const result = {
            fiber:-1,
            protein:-1,
            sugar:-1,
            energy:-1,
            carbohydrate:-1,
        }
        mealFoods.forEach(item=>{
            const calculatedFood = calculateFoodNutrients(item)[0]
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

    const totalNutrients = computed(():INutrientsIn100g=>{
        const result:INutrientsIn100g = {fiber:-1, protein:-1, sugar:-1, energy:-1, carbohydrate:-1,}
        meals.value.forEach(meal=>{
            const mealNutrients = calculateMaleNutrients(meal.foods)[0]
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
            const mealNutrients = calculateMaleNutrients(meal.foods)[0]
            if(mealNutrients.energy >=0){
                result.push({ label: meal.mealName, color: COLORS[index] ?? COLORS[1], value: (mealNutrients.energy/total)*100, icon:""})
            }
        })
        return result
    })

    const proteinMeter = computed(():MeterItem[] =>{
        const result:MeterItem[] = []
        const total = totalNutrients.value.protein
        meals.value.forEach((meal,index)=>{
            const mealNutrients = calculateMaleNutrients(meal.foods)[0]
            if(mealNutrients.protein >=0){
                result.push({ label: meal.mealName, color: COLORS[index] ?? COLORS[1], value: (mealNutrients.protein/total)*100, icon:""})
            }
        })
        return result
    })
    const carbohydrateMeter = computed(():MeterItem[] =>{
        const result:MeterItem[] = []
        const total = totalNutrients.value.carbohydrate
        meals.value.forEach((meal,index)=>{
            const mealNutrients = calculateMaleNutrients(meal.foods)[0]
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
            const mealNutrients = calculateMaleNutrients(meal.foods)[0]
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
            const mealNutrients = calculateMaleNutrients(meal.foods)[0]
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
        meals,
        energyMeter,
        proteinMeter,
        carbohydrateMeter,
        sugarMeter,
        fiberMeter,
        onChangePortion,
        foodLabelGenerator,
    }

}