export interface ITdee{
    bmr:number
    sedentary:number
    lightlyActive:number
    moderatelyActive:number
    veryActive:number
    superActive:number
}

export interface ITdee_req{
    gender: keyof typeof IGender
    age:number
    height:number
    weight:number
}

export enum IGender{
    'male'='male' ,
    'female'='female'
}

