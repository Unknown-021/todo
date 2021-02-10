<template>
  <div class="app-container">
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>

      <v-text-field
        v-model="password"
        :rules="passRules"
        :type="show1 ? 'text' : 'password'"

        label="Password"
        required
      ></v-text-field>

      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="this.login"
      >
        Login
      </v-btn>
      <v-btn
        :disabled="!valid"
        color="warning"
        class="mr-4"
        @click="this.register"
      >
        Register
      </v-btn>
    </v-form>
     <div class="text-center">

      <v-snackbar
            v-model="snackbar.status"
            :timeout="2000"
      >  
      {{ snackbar.text }}

        <v-btn
          color="blue"
          text
          @click="snackbar = false"
        >
          Close
        </v-btn>
    </v-snackbar>
  </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import firebase from 'firebase/app'


@Component
export default class Login extends Vue {
  public snackbar = {
    status: false,
    text: 'asdas',
    timeout: 1000,
  };

  public valid = true;
  public password = '';
  public passRules = [
    (    v: any) => !!v || 'Password is required',
    (    v: string|any[]) => (v && v.length > 5) || 'Password must be more than 6 characters',

  ];
  public email = '';
  public emailRules= [
    (    v: any) => !!v || 'E-mail is required',
    (    v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
  ]
  get form(): Vue & { validate: () => boolean } {
    return this.$refs.form as Vue & { validate: () => boolean }
  }
  get snackBarStatus(): any {
    return this.snackbar;
  }
  public login() {
    firebase.auth().signInWithEmailAndPassword(this.email, this.password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      this.$router.push({name:"Home"});
      this.$store.dispatch("setUser", user?.uid)
      this.$store.dispatch('setTodo', user?.uid);

    })
    .catch((error) => {
      this.snackbar.status = true;
      this.snackbar.text = "Invalid email or password"
    });

  }

  public register() {
    firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
    .then((userCredential) => {
      // Signed in 
      this.$router.push({name:"Home"});
      this.$store.dispatch("setUser")
      // ...
    })
    .catch((error) => {
      // ..
    });


  }

}
</script>

<style>

</style>