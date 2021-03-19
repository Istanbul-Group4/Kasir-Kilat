<template>
  <div class="login d-flex">
    <div class="form-login w-50 ml-4 mr-4">
        <h1 class="mb-4" style="text-align: center; font-size: 3em;">Let's Play!</h1>
        <form>
            <div class="form-group">
                <label for="username">Username</label>
                <input type="email" class="form-control" aria-describedby="emailHelp" placeholder="username here">
            </div>
            <button type="submit" class="btn btn-primary w-100">Login</button>
        </form>
    </div>

    <div>
        <img class="img" src="https://cdn.dribbble.com/users/3286807/screenshots/10836944/media/0eb9d73a63758d2b1a250f336a385149.jpg?compress=1&resize=800x600">
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
    .login {
        text-align: start;
        width: 100%;
        align-items: center;
        justify-content: space-between;
    }
    .img {
        width: 56em;
        height: 52em;
        max-height: 65em;
    }
</style>
