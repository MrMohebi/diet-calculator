import { defineStore } from "pinia";
import {createClient, SupabaseClient} from '@supabase/supabase-js'

export const useDBStore = defineStore("db", {
    state: ()=> ({
        supabase:null as  SupabaseClient|null,
    }),
    getters: {
        dBName(){
            const config = useRuntimeConfig()
            return config.public.SUPABASE_DB
        }
    },
    actions: {
        initSupabase()
        {
            if(this.supabase == null){
                const config = useRuntimeConfig()
                this.supabase = createClient(config.public.SUPABASE_URL, config.public.SUPABASE_KEY)
            }
        },
    },
});
