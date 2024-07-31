import { defineStore } from "pinia";
import type {IPlan} from "~/composables/plans/plans.interface";

export interface IPlansStore {
    selectedPlan:IPlan,
}

export const usePlansStore = defineStore("plans", {
    state: ():IPlansStore=> ({
        selectedPlan:{
            id: -1,
            title:"",
            lang:"",
            author:"",
            createdAt:"",
            details:"",
            meals:[],
        }
    }),
    getters: {},
    actions: {},
});
