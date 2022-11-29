import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/",
        name: "Home",
        component: () => import("./views/Home.vue"),
        meta: {
            requiresAuth: true
        }
        
    },
    {
        path: "/login",
        name: "Login",
        component: () => import("./views/Login.vue")
    },
    {
        path: "/register",
        name: "Register",
        component: () => import("./views/Register.vue")
    }

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach(async (to, from, next) =>{
       if (to.matched.some(record => record.meta.requiresAuth)) {
        // authentication check
           const token = localStorage.getItem('token')
           
           if (token) {
               // if token is present, check if it is valid
                return next()
           } 

        //    if token is not present, redirect to login page
        return next('/login')
        
    }

    next()
}) 

export default router