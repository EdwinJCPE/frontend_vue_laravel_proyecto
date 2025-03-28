
<template>
    <button v-on:click="obtenerPublicaciones">Obtener Datos</button>
    <br>
  
    <table border="1">
      <thead>
        <tr>
          <th>ID</th>
          <th>TITULO</th>
          <th>DESCRIPCION</th>
          <th>IMAGEN</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="publicacion in publicaciones" :key="publicacion.id">
          <td>{{ publicacion.id }}</td>
          <td>{{ publicacion.title }}</td>
          <td>{{ publicacion.description }}</td>
          <td>
            <!-- <img v-bind:src="publicacion.cover_image" alt="imagen" width="150px"> -->
            <img :src="publicacion.cover_image" alt="imagen" width="150px">
          </td>
        </tr>
      </tbody>
    </table>
    {{ publicaciones }}
  
  
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  
    const publicaciones = ref([]);
  
    onMounted(() => {
      obtenerPublicaciones()
    })
  
    function obtenerPublicaciones() {
      fetch('https://dev.to/api/articles')
        .then(response => response.json())
        .then(json => {
          console.log(json);
          
          publicaciones.value = json
        })
    }
  
  
  
  </script>
  
  <style scoped>
  
  </style>
  