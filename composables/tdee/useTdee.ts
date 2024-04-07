import type {ITdee, ITdee_req} from "~/composables/tdee/tdee.interface";
import {useTdeeStore} from "~/composables/tdee/tdee.store";
import { useToast } from "primevue/usetoast";

export const useTdee = () => {
    const {paramStringify} = useQs()
    const toast = useToast();
    const {t} = useI18n()


    const {
        gender,
        height,
        weight,
        age,
        tdee,
        gymKC
    } = storeToRefs(useTdeeStore())

    const requiredProtein = computed(():[number,number]=>{
        if(!!weight.value && weight.value > 0){
            return [weight.value*1.2, weight.value*2.2]
        }
        return [-1, -1]
    })


    const getTdee = async () =>{
        if(
            gender.value == undefined ||
            weight.value == undefined ||
            age.value == undefined ||
            height.value == undefined
        ){
            toast.add({ severity: 'error', summary: t('error'), detail: t('wrongInput'), life: 3000 });
            return
        }

        const params:ITdee_req ={
            gender:gender.value!,
            height:height.value!,
            weight:weight.value!,
            age:age.value!,
        }
        tdee.value = await $fetch<ITdee>(`/api/tdee?${paramStringify(params)}`)
    }

    const requiredCalories = computed(()=>tdee.value.bmr + (gymKC.value ?? 0))

    const resetTdee = () =>{
        useTdeeStore().$reset()
    }



    return{
        resetTdee,
        requiredCalories,
        getTdee,
        gender,
        height,
        weight,
        age,
        gymKC,
        tdee,
        requiredProtein
    }
}