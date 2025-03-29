<template>
    <h1>Ingresar</h1>
    <label for="">Ingrese Correo</label>
    <input type="email" v-model="credenciales.email" required />
    <span v-if="errors?.email">{{ errors?.email[0] }}</span>
    
    <br>
    <label for="">Ingrese Contraseña</label>
    <input type="password" v-model="credenciales.password" required />
    <span v-if="errors?.password">{{ errors?.password[0] }}</span>
    <!-- Mostrar errores si existen -->
    <ul v-if="errors && Object.keys(errors).length">
        <li v-for="(error, index) in errors" :key="index">
            {{ error[0] }}
        </li>
    </ul>
    <br>
    <button @click="funIngresar()">Ingresar</button>
    <br>
    {{ credenciales }}
    <br>
    {{ respuesta }}
    <br>
    {{ errors }}

</template>

<script setup>
    import { ref } from 'vue';
    import authService from '@/services/auth.service';
    import { useRouter } from 'vue-router';
    // import authService from '../../services/auth.service';
    import { setAuthToken } from '@/services/api.service';

    // const credenciales = ref({ email: '', password: ''})
    const credenciales = ref({ 
        email: 'edwin@gmail.com', 
        password: 'password123'
    })
    const respuesta = ref({})
    const errors = ref({})
    const router = useRouter()

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
            respuesta.value = {}
            errors.value = {}

            // const response = await authService.login(credenciales.value);
            // respuesta.value = response.data;
            // console.log(response.data);

            const { data } = await authService.login(credenciales.value);
            respuesta.value = data;

            if (data.access_token) {
                // localStorage.setItem('access_token', data.access_token);
                
                setAuthToken(data.access_token);

                console.log("Se guardó y actualizó el token de acceso.");
            }

            console.log("Inicio de sesión exitosa: ", data);

            // Limpiar los campos
            credenciales.value = { email: '', password: '' };
            
            //redireccionar
            router.push({ name: 'MiPerfil' });


        } catch (error) {
            console.error(error.response?.data?.errors);
            // console.error("Error al iniciar sesión:", error.response?.data || error.message);
            errors.value = error.response?.data?.errors;
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