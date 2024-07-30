import { defineStore } from "pinia";
import {createClient, SupabaseClient} from '@supabase/supabase-js'

export const useDBStore = defineStore("db", {
    state: ()=> ({
        supabase:null as  SupabaseClient|null
    }),
    getters: {},
    actions: {
        async initSupabase(){
            this.supabase = createClient('https://szngqinxtvfgvdyttuot.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6bmdxaW54dHZmZ3ZkeXR0dW90Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIyNDE5MTMsImV4cCI6MjAzNzgxNzkxM30.1iw2otAnmvkdDDYhW8TbJ3Zcga7N5UWpBWjcz201TGc')
        },
    },
});
