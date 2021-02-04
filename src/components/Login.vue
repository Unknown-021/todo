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
        label="Password"
        required
      ></v-text-field>

      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="this.validate"
      >
        Validate
      </v-btn>
    </v-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { signUpWithEmailPassword, signInWithEmailPassword } from '../auth/email'


@Component
export default class Login extends Vue {
  public valid = true;
  public password = '';
  public passRules = [
    (    v: any) => !!v || 'Password is required',
  ];
  public email = '';
  public emailRules= [
    (    v: any) => !!v || 'E-mail is required',
    (    v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
  ]
  get form(): Vue & { validate: () => boolean } {
    return this.$refs.form as Vue & { validate: () => boolean }
  }

  public validate() {
    signInWithEmailPassword(this.email, this.password)
    // this.email = '';
    // this.password = '';
    this.$router.push({name:"Home"});

  }

}
</script>

<style>

</style>