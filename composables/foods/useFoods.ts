import {useFoodsStore} from "~/composables/foods/foods.store";
import type {IFoodBase} from "~/composables/foods/foods.interface";

export const useFoods = () => {
    const config = useRuntimeConfig()

    const {foods} = storeToRefs(useFoodsStore())

    const getFoods = async () =>{
        const res = await $fetch<string>(config.public.FOODS_LIST_URL)
        foods.value = JSON.parse(res) as IFoodBase[]
    }

    return{
        getFoods,
        foods
    }
}