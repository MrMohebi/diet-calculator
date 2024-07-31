import clonedeep from 'lodash.clonedeep'
import {useDBStore} from "~/composables/db/db.store";
import {useNutrients} from "~/composables/nutrients/useNutrients";
import { useToast } from "primevue/usetoast";
import type {IPlan} from "~/composables/plans/plans.interface";
import {usePlansStore} from "~/composables/plans/plans.store";
import {useNutrientsStore} from "~/composables/nutrients/nutrients.store";
export const usePlans = () => {
  const {supabase, dBName} = storeToRefs(useDBStore())
  const {selectedPlan} = storeToRefs(usePlansStore())
  const nutrientsStore = useNutrientsStore()
  const { locale,t } = useI18n()
  const {meals,} = useNutrients()
  const toast = useToast();

  const title = ref('')
  const details = ref('')
  const author = ref('')

  const savedPlanId = ref(-1)

  const planInfoDialog = ref(false)
  const copyLinkDialog = ref(false)

  const sharePlanLoading = ref(false)

  const sharePlan = async () =>{
    if( supabase.value == null) {
      await useDBStore().initSupabase()
      await sharePlan()
      return;
    }

    if(title.value.length < 3 || author.value.length < 3 || meals.value.length < 2){
      toast.add({ severity: 'error', summary: t('pleasFillRequiredFields'),  life: 3000 });
      return false
    }

    sharePlanLoading.value = true
    const { error,data } = await supabase.value.from(dBName.value).insert({
        title:title.value,
        lang:locale.value,
        author:author.value,
        details:details.value,
        meals:meals.value
      } as IPlan).select<IPlan>()
    sharePlanLoading.value = false


    if(error == null && !!data){
      toast.add({ severity: 'success', summary: t('savedSuccessfully') ,  life: 3000 });
      savedPlanId.value = data[0]['id']
      planInfoDialog.value = false
      copyLinkDialog.value = true
    }else {
      console.log(error)
      toast.add({ severity: 'error', summary: error?.message ,  life: 3000 });
    }
  }

  const getPlan = async (id:number): Promise<void> => {
    if( supabase.value == null) {
      await useDBStore().initSupabase()
      await getPlan(id)
      return;
    }

    const {data, error} = await supabase.value.from(dBName.value).select().eq('id',id)
    if(data !== null && error == null && data.length > 0){
      selectedPlan.value = clonedeep(data[0])
      nutrientsStore.loadFromPlan(selectedPlan.value.meals)
    }
  }


  return{
    planInfoDialog,
    sharePlan,
    title,
    author,
    details,
    sharePlanLoading,
    copyLinkDialog,
    savedPlanId,
    getPlan,
    selectedPlan
  }
}