// import api from "./api.service";
import api from "@/services/api.service";

// export default {
//     login(credenciales) {
//         return api.post("v1/auth/login", credenciales);
//     },
//     register(datos) {
//         return api.post("v1/auth/register", datos);
//     },
//     perfil() {
//         return api.get("v1/auth/profile");
//     },
//     logout() {
//         return api.post("v1/auth/logout");
//     }
// }

const AutService = {
    login(credenciales) {
        return api.post("v1/auth/login", credenciales);
    },
    register(datos) {
        return api.post("v1/auth/register", datos);
    },
    perfil() {
        return api.get("v1/auth/profile");
    },
    logout() {
        return api.post("v1/auth/logout");
    }
}

export default AutService;