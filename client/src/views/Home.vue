<template>
  <div class="home d-flex">
    <Quiz />
  </div>
</template>

<script>
// @ is an alias to /src
import Quiz from '../components/Quiz'
export default {
  name: 'Home',
  components: {
    Quiz
  }
}
</script>

<style>
  .home {
    justify-content: center;
  }
  .bounce-enter-active {
    animation: bounce-in .5s;
  }
  .bounce-leave-active {
    animation: bounce-in .5s reverse;
  }
  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }
</style>
