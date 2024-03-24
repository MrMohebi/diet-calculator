import qs from "qs"

export const useQs = () => {
    const paramStringify = (params:object) =>{
        return qs.stringify(params, { arrayFormat: 'brackets' })
    }

    return{
        paramStringify
    }
}