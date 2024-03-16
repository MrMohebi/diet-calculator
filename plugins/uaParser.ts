import {userAgentParser} from "~/utils/userAgentParser";

export default defineNuxtPlugin((nuxtApp) => {
    let userAgent
    if(!!nuxtApp.ssrContext){
        userAgent = nuxtApp.ssrContext.event.headers.get('user-agent')
    }else{
        userAgent = navigator.userAgent
    }
    return {
        provide: {
            isMobile: userAgentParser(userAgent).isMobile as boolean
        }
    }
})