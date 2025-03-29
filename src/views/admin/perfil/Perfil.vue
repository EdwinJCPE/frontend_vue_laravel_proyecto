<template>
    <h1>Mi Perfil</h1>
    <h3>NOMBRE: {{ perfil?.name }}</h3>
    <h3>EMAIL: {{ perfil?.email }}</h3>
    
    <button v-on:click="salir()">Salir</button>
    <br>
    {{ perfil }}
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import { useRouter } from "vue-router";
    import authService from '../../../services/auth.service';
    // import authService from '@/services/auth.service';
    import { setAuthToken } from '../../../services/api.service';
    
    const perfil = ref({})
    const router = useRouter()
    
    onMounted(() => {
        console.log('Entrando a perfil');
        
        getPerfil()
    })

    async function getPerfil() {
        // const { data: {user} } = await authService.perfil();
        const { data } = await authService.perfil();
        const { user } = data;
        perfil.value = user;

        console.log('Perfil:', user);
    }

    async function salir() {
        await authService.logout();
        setAuthToken(null);

        console.log('Saliendo...');

        router.push({ name: 'MiLogin' });
    }
</script>