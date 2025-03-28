<template>
    <h1>Ingresar</h1>

    <label for="">Ingrese Correo</label>
    <input type="email" v-model="credenciales.email" required />
    <br>
    <label for="">Ingrese Contraseña</label>
    <input type="password" v-model="credenciales.password" required />
    <br>
    <button @click="funIngresar()">Ingresar</button>
    <br>
    {{ credenciales }}
    <br>
    {{ respuesta }}
</template>

<script setup>
    import { ref } from 'vue';
    import authService from '@/services/auth.service';
    // import authService from '../../services/auth.service';

    const credenciales = ref({ email: '', password: ''})
    const respuesta = ref({})

    // function funIngresar() {
    //     authService.login(credenciales.value)
    //         .then(response => {
    //             console.log(response.data);
    //             respuesta.value = response.data;
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         });
    // }
    
    async function funIngresar() {
        try {
            // const response = await authService.login(credenciales.value);
            // respuesta.value = response.data;
            // console.log(response.data);

            const { data } = await authService.login(credenciales.value);
            respuesta.value = data;
            console.log(data);
        } catch (error) {
            console.error("Error al iniciar sesión:", error.response?.data || error.message);
        }
    }

    const login = async () => {
        try {
            const response = await authService.login(credenciales.value);
            respuesta.value = response.data;
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }
</script>