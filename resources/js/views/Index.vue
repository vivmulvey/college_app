<template>
<div class="card text-center">
    <div class="card-header">
        <ul class="nav nav-tabs card-header-tabs">
            <li class="nav-item">
                <a class="nav-link active" href="#">Home</a>
            </li>
            <li class="nav-item">
                <a class="nav-link active" href="/register">Register</a>
            </li>
            <li class="nav-item">
                <a class="nav-link active" href="/login">Login</a>
            </li>
        </ul>
    </div>
    <div class="card-body">
        <h1 class="card-title">Welcome to EduCo</h1>
      </br>
        <h5 class="card-text">You will need an account to continue.</h5>
      </br>
      <p> Please login or register.</p>

    </div>
</div>
</template>

<script>
export default {
    name: 'index',

}
</script>

<style>
.myDiv {
    text-align: center;
}
</style>
