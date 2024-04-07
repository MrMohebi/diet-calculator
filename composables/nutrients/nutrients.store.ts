import { defineStore } from "pinia";
import type {IMeal} from "~/composables/nutrients/nutrients.interface";
import {MEALS_LS} from "~/consts/keys";

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
                        nutrientsInProtein:{
                            fiber: -1,
                            protein: -1,
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
    actions: {
        loadFromLS(){
            if(typeof localStorage != "undefined"){
                const savedData = localStorage.getItem(MEALS_LS)
                if(!savedData || savedData.length <= 0){
                    return
                }
                const savedDataParsed:INutrientsStore = JSON.parse(savedData)
                if(!(savedDataParsed?.meals.length > 0)){
                    return
                }

                this.meals = structuredClone(savedDataParsed.meals)
            }
        }
    },
});
