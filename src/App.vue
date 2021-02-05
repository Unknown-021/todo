<template>
    <v-app>
      <v-navigation-drawer 
        app 
        class="side-bar"
        v-if="$route.name !== 'Login'"
      >
        <v-dialog
          v-model="dialog"
          
          max-width="600px"
          keydown
        >
          <template v-slot:activator="{ on, attrs }">
          <v-btn
          class="mx-2 add-todo-btn elevation-0"
          fab
          color="indigo"
          depressed
          v-bind="attrs"
          v-on="on"
          >
        <v-icon dark>
          mdi-plus
        </v-icon>
        </v-btn>
         </template>
<v-card>
        <v-card-title>
          <span class="headline">New Todo</span>
        </v-card-title>
        <v-card-text>
          <v-container class="v-container-class">
            <v-form 
              @submit.prevent="addTodo(newTodo.todoTitle)"
            >
                <div class="todo-title-input__modal">
                  <v-text-field
                    v-model="newTodo.todoTitle"
                    placeholder="What needs to be done?"
                    solo
                  ></v-text-field>
                </div>
              </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="addTodo(newTodo.todoTitle)"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
        </v-dialog>

        <router-link to="/">
        <div class="link-home link-block">
          <v-btn
            class="nav__link link"
            text
            dark
            depressed
          >
          <img
            class="home-img"
            :src="require('@/assets/home.svg')" 
            alt=""
          >
          Home
          </v-btn>
        </div>
        </router-link>
        <v-divider></v-divider>
        <router-link :to="{ name: 'Todo-list' }">
          <div class="link link-block">
            <v-btn
              class="nav__link link"
              text
              dark
              depressed
            >
            <img
              class="home-img"
              :src="require('@/assets/todo-list.svg')" 
              alt=""
            >
            Todo List
            </v-btn>
        </div>
        </router-link>
        <router-link :to="{ name: 'Completed' }">
          <div class="link">
            <v-btn
              class="nav__link link"
              text
              dark
              depressed
            >
            <img
              class="home-img"
              :src="require('@/assets/completed.svg')" 
              alt=""
            >
            Completed Todos
            </v-btn>
        </div>
        </router-link>
        <router-link :to="{ name: 'Important' }">
          <div class="link">
            <v-btn
              class="nav__link link"
              text
              dark
              depressed
            >
            <img
              class="home-img"
              :src="require('@/assets/favorite.svg')" 
              alt=""
            >
            Important Todos
            </v-btn>
        </div>
        </router-link>
      </v-navigation-drawer>
        <v-main>
          <v-toolbar 
            outlined
            class="header elevation-0"
            v-if="$route.name !== 'Login'"
          >
            <img class="logo" src="./assets/logo.svg" alt="">
            <span class="app-name">Ultimate</span><br>
            <span class="app-name">TodoApp</span><br>
            <v-btn
              @click="logOut()"
            
            >Logout</v-btn>
          </v-toolbar>
          <router-view />
      <v-snackbar
            v-model="snackbar.status"
            :timeout="2000"
          >  
            <span>{{snackbar.text}}</span>
            <v-btn
              class="snack-close-button"
              text
              @click="snackbar.status = false"
            >
            Close</v-btn>
          </v-snackbar>
        </v-main>
    </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import TodoList from './components/TodoList.vue'
import { TodoItem} from "./store/todos/types";
import 'vue-class-component/hooks'
import { db } from '../../auth/email';
import firebase from 'firebase/app'


@Component({
  components: {
    TodoList,
  }
})

export default class App extends Vue {
  public logged = false;
  public dialog = false;
  public snackbar = {
    status: false,
    text: 'asdas',
    timeout: 1000,
  };
  get userStaus() {
    return true
  }
  public userID(): string{
    return this.$store.state.user.getUserID
  }
  beforeCreate(){
    this.$store.dispatch('setTodo', this.userID() );
    const user = firebase.auth().currentUser;
    console.log(user);
    // if(this.$store.state.user){
    //   this.$router.push({name: 'Login'})
    // }
  }
  mounted() {
    if(firebase.auth()){
      this.showUserStatus();
    }
    console.log(this.$store.state.user.logged)
  }

  private newTodo: TodoItem = {
    todoTitle: '',
    done: false,
    attachments: []
  };
  public resetTodo(): void {
    this.newTodo = {
      todoTitle: '',
      done: false,
      attachments: []
      }
  }
  public showUserStatus(): boolean{
    return this.$store.getters.showUserStatus
  }
  public async addTodo() {
    this.snackbar.status = true;
    this.snackbar.text = this.newTodo.todoTitle;

    await this.$store.dispatch("addTodo", this.newTodo);
    this.resetTodo();
    this.dialog = false;
  }
  public logOut(): void {
    this.$store.dispatch("logOut");
    this.$router.push({name: 'Login'})
  }

}
</script>

<style scoped>
.app-container{
  display: flex;
  flex-direction: column;
  width: 650px;
  margin: 0 auto;
  margin-top: 200px;
  background-color: #f8f8fa;
  padding: 45px;
  border-radius: 20px;
}
.header{
  background: rgb(232,242,255);
  background: linear-gradient(82deg, rgba(232,242,255,1) 0%, rgba(233,243,255,1) 2%, rgba(255,255,255,1) 16%);
}


.todo-title-input{
  margin-top: 38px;
}
.todo-add-btn{
  margin-top: 15px;
}
.todo-card{
  margin-top: 10px;
}
.v-card{
  /* display: flex; */
  margin-top: 15px;
}
.task-title{
  padding-top: 20px;
}
li{
  list-style: none;
}
.attached-img{
  width: 100px;
}
.logo{
  height: 50px;
}
.app-name:first-of-type{
  padding-left: 5px;
  
}
.app-name{
  padding-right: 5px;
  font-size: 1.3rem;
  font-weight: bold;
  color: #3844d6;;
}

.theme--light.v-toolbar.v-sheet {
    background-color: #08c0dd!important;
}

.theme--light.v-navigation-drawer {
    background-color: #25d9ab !important;
}
.todo-list__header{
  color: #fff;
  text-align: center;
  padding-top: 20px;
}
.v-navigation-drawer__content {
    display: flex;
    flex-direction: column;
}
.todo-list_list{
  margin-top: 10px;
  align-self: center;
  }

.todo-list_item{
  display: flex;
  margin: 15px;
}
.todo-list_item-title{
  margin-top: 19px;
  margin-bottom: 19px;
}
.nav{
  margin-left: 30%; 
}
.nav__link{
  margin-right: 15px;
}
.link-home{
  margin: 0 auto;
  margin-top: 25vh;
}
.link{
  margin: 0 auto;
  font-weight: 900!important;
  font-size: 1.2rem!important;
  text-transform: none !important;
  letter-spacing: 0.01cm!important;
  width: 235px!important;
  justify-content: flex-start!important;
}
.link-block{
  display: flex;
}

.home-img{
  padding-bottom: 3px;
  padding-right: 5px;
}
.v-application a {
  text-decoration: none;
}
.v-application .indigo {
    background-color: #fff !important;
    border-color: #3f51b5 !important;
}
.side-bar{
  height: 100vh;
  background: rgb(112,99,223);
  background: linear-gradient(45deg, rgba(112,99,223,1) 0%, rgba(72,155,244,1) 100%);
}

.add-todo-btn{
  color: #3c93f3!important;
  position: absolute;
  top: 12vh;
  left: 90px;;
}

.theme--light.v-btn:focus::before {
    opacity: 0.08;
}

.v-divider{
  border-width: 2px 0 0 0!important;
}
.todo-title-input__modal{
  width: 340px;
}
.headline{
  color: #4d4e58;
}
.v-card__title{
  justify-content: center!important;
}
.v-container-class{
  display: flex;
  justify-content: center;
}

.v-input__slot{
      width: 310px;
}
.v-card__text{
  padding-bottom: 0!important;
}
.v-card__actions{
  display: flex;
    justify-content: center;
}
.v-card__actions .v-btn .v-btn__content{
  color:#3844d6!important;
}

.v-snackbar{
  margin: 0 auto;
}
.v-bnt .snack-close-button{
  float: right!important;
}
</style>