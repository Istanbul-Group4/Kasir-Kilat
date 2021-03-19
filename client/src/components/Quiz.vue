<template>
  <div>
      <div class="question">
        <div class="card">
          <div class="card-body">
            {{ quiz }}
          </div>
        </div>
      </div>

      <div class="resultText">
        <h1> {{ result }} </h1>
        <h2>Point : {{ answerResult }} </h2>
      </div>

      <div class="answer">
        <form @submit.prevent="resultQuiz">
          <input class="form-control" type="number" v-model="jawab">
        </form>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Quiz',
  data () {
    return {
      jawab: '',
      result: '',
      answerResult: '0'
    }
  },
  methods: {
    resultQuiz () {
      const jawaban = this.$store.state.quiz.value
      if (this.jawab === jawaban) {
        this.result = 'Benar'
        this.$store.commit('pointPlus', 10)
      } else {
        this.result = 'Salah'
      }
      this.answerResult = this.$store.state.currentPoint
    }
  },
  computed: {
    quiz () {
      return this.$store.state.quiz.text
    }
  }
}
</script>

<style>

</style>
