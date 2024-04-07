export const useHint = () => {
  const hintModel = ref(true);

  const startFade = (time: number = 5) => {
    setTimeout(()=>{
        hintModel.value = false
    },time*1000)
  }

  return{
      hintModel,
      startFade
  }
}