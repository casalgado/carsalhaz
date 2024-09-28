<script setup>
async function logMovies() {
  const response = await fetch(
    "https://collectionapi.metmuseum.org/public/collection/v1/objects"
  );
  const movies = await response.json();
  console.log(movies);
}
logMovies();
</script>

<template>
  <section>
    <h1>API</h1>
    <p>API page</p>
  </section>
</template>

<style lang="scss" scoped></style>
