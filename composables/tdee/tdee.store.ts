import { defineStore } from "pinia";
import type {ITdee} from "~/composables/tdee/tdee.interface";
import {IGender} from "~/composables/tdee/tdee.interface";
import {TDEE_LS} from "~/consts/keys";

export interface ITdeeStore {
    tdee:ITdee,
    gender:keyof typeof IGender | undefined,
    height:number | undefined,
    weight:number | undefined,
    age:number | undefined,
    gymKC:number | undefined,
}

export const useTdeeStore = defineStore("tdee", {
    state: ():ITdeeStore=> ({
        tdee:{
            bmr: -1,
            sedentary: -1,
            lightlyActive: -1,
            moderatelyActive: -1,
            veryActive: -1,
            superActive: -1,
        },
        gender:undefined,
        height:undefined,
        weight:undefined,
        age:undefined,
        gymKC:undefined
    }),
    getters: {},
    actions: {
        loadFromLS(){
            if(typeof localStorage != "undefined"){
                const savedData = localStorage.getItem(TDEE_LS)
                if(!savedData || savedData.length <= 0){
                    return
                }
                const savedDataParsed:ITdeeStore = JSON.parse(savedData)


                this.tdee = structuredClone(savedDataParsed.tdee)
                this.gender = structuredClone(savedDataParsed.gender)
                this.height = structuredClone(savedDataParsed.height)
                this.weight = structuredClone(savedDataParsed.weight)
                this.age = structuredClone(savedDataParsed.age)
                this.gymKC = structuredClone(savedDataParsed.gymKC)
            }
        }
    },
});
