import { defineStore } from "pinia";
import type {IMeal} from "~/composables/nutrients/nutrients.interface";

export interface INutrientsStore {
    meals:IMeal[]
}

export const useNutrientsStore = defineStore("nutrients", {
    state: ():INutrientsStore=> ({
        meals:[
            {
                mealName: useI18n().t('firstMeal'),
                foods:[
                    {
                        fdc_id:-1,
                        amount:100,
                        nutrientsInPortion:{
                            fiber: -1,
                            portion: -1,
                            sugar: -1,
                            carbohydrate: -1,
                            energy: -1
                        }
                    }
                ]
            }
        ]
    }),
    getters: {},
    actions: {},
});
