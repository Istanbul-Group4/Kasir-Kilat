<template>
  <div>
    <div id="card">
      <div id="card-content">
        <div id="card-title">
          <h2>Input your name</h2><br>
          <form method="post" class="form">
          <label for="user-name" style="padding-top:13px">
            &nbsp;Who are you?</label>
            <input
             id="user-name"
             v-model="name"
             class="form-content"
             type="text"
             name="name"
             required />
             <div class="form-border"></div>
            <input
            id="submit-btn"
            type="submit"
            name="submit"
            value="LOGIN"
            @click.prevent="login"/>
           </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormLogin',
  data () {
    return {
      name: ''
    }
  },
  sockets: {
    updateDataPlayer (dataPlayer) {
      console.log('ini dari client :', dataPlayer)
      this.$store.commit('login', dataPlayer)
    },
    setToken (user) {
      console.log('ini dari client :', user)
    }
  },
  methods: {
    login () {
      if (this.name === '') {
        alert('please insert name')
      } else {
        this.$router.push('/playgame')
        const id = Math.ceil(Math.random() * 1000000)
        const newUser = {
          name: this.name,
          id: this.name + id
        }
        localStorage.setItem('name', newUser.name)
        localStorage.setItem('id', newUser.id)
        this.$socket.emit('clientLogin', newUser)
        this.name = ''
      }
    }
  }
}
</script>

<style scoped>

#card {
  background: #fbfbfb;
  border-radius: 8px;
  box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.65);
  height: 410px;
  margin: 6rem auto 8.1rem auto;
  margin-left: 400px;
  width: 329px;
}
#card-content {
      padding: 12px 44px;
}
#card-title {
      letter-spacing: 4px;
      padding-bottom: 23px;
      padding-top: 13px;
      text-align: center;
}
a {
    text-decoration: none;
}
label {
    font-family: "Raleway", sans-serif;
    font-size: 11pt;
}
.form {
    align-items: left;
    display: flex;
    flex-direction: column;
}
.form-border {
    background: -webkit-linear-gradient(right, black, black);
    height: 1px;
    width: 100%;
}
.form-content {
    background: #fbfbfb;
    border: none;
    outline: none;
    padding-top: 14px;
}
#submit-btn {
    background: -webkit-linear-gradient(right, #a6f77b, #2dbd6e);
    border: none;
    border-radius: 21px;
    box-shadow: 0px 1px 8px #24c64f;
    cursor: pointer;
    color: white;
    font-family: "Raleway SemiBold", sans-serif;
    height: 42.3px;
    margin: 0 auto;
    margin-top: 50px;
    transition: 0.25s;
    width: 153px;
}
#submit-btn:hover {
    box-shadow: 0px 1px 18px #24c64f;
}
</style>
