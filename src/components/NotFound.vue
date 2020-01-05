<template>
    <div class="container">
        <header class="section-header">
            <small>Oops</small>
            <h2>Page Not Found!</h2>
            <hr>
            <p class="lead">Seems you're looking for something that doesn't exist.</p>
        </header>

        <br>
        <p class="text-center">
            <router-link to="/">

                <a style="color: white;" class="btn btn-primary">Return home</a>

            </router-link>
        </p>

    </div>
</template>

<script>
    export default {
        name: "404"
    }
</script>

<style scoped>

</style>