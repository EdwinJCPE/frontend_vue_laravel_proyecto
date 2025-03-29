import { createRouter, createWebHistory } from 'vue-router'
import Inicio from '../views/web/Inicio.vue'
import Nosotros from '../views/web/Nosotros.vue'
import Servicios from '../views/web/Servicios.vue'
import Login from '../views/auth/Login.vue'
import Blog from '../views/web/Blog.vue'
import Perfil from '../views/admin/perfil/Perfil.vue'
import Usuario from '../views/admin/user/Usuario.vue'

const routes = [
  { path: '/', component: Inicio },
  { path: '/nosotros', component: Nosotros },
  { path: '/servicios', component: Servicios },
  { path: '/blog', component: Blog },
  { 
    path: '/auth/login', 
    component: Login,
    name: 'MiLogin',
    meta: { redirectIfAuth: true } // Ruta pública, redirige si ya está autenticado
  },
  {
    path: '/admin/perfil', 
    component: Perfil,
    name: 'MiPerfil',
    meta: { requiresAuth: true } // Ruta protegida
  },
  {
    path: '/admin/usuario', 
    component: Usuario,
    name: 'Usuario',
    meta: { requiresAuth: true } // Ruta protegida
  }
]

const router = createRouter({
  history: createWebHistory(),
//   routes: routes
  routes
})

// Guards
// to: Información de la ruta a la que se quiere ir.
// from: Información de la ruta de la que se está saliendo.
// next: Función que se llama para continuar o bloquear la navegación.
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('access_token') ? true : false;

  if (to.meta.requiresAuth && !isAuthenticated) {
    // Si la ruta requiere autenticación y el usuario no está autenticado, redirigir al login
    return next({ name: 'MiLogin' })
  }

  if (to.meta.redirectIfAuth && isAuthenticated) {
    // Si la ruta es pública pero el usuario ya está autenticado, redirige a su perfil
    return next({ name: 'MiPerfil' })
  } 
  // Si todo está bien, continúa con la navegación
  next()
})

export default router;
