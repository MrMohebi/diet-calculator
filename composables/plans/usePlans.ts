import {useDBStore} from "~/composables/db/db.store";
import {useNutrients} from "~/composables/nutrients/useNutrients";
import { useToast } from "primevue/usetoast";
import type {IPlan} from "~/composables/plans/plans.interface";
export const usePlans = () => {
  const {supabase, dBName} = storeToRefs(useDBStore())
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
    if(!supabase.value || title.value.length < 3 || author.value.length < 3 || meals.value.length < 2){
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


  return{
    planInfoDialog,
    sharePlan,
    title,
    author,
    details,
    sharePlanLoading,
    copyLinkDialog,
    savedPlanId
  }
}