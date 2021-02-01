<template>
    <v-app>
      <v-navigation-drawer app>
        <h2 class="todo-list__header">Todo list:</h2>
        <v-divider></v-divider>
        <v-sheet
          class="todo-list_list"
          color="white"
          elevation="5"
          height="750"
          rounded
          width="210"
        >
        <todo-list>
        </todo-list>
        </v-sheet>
      </v-navigation-drawer>
        <v-main>
          <v-toolbar>
            <img class="logo" src="./assets/todo.svg" alt="">
            <span class="app-name">Ultimate</span><br>
            <span class="app-name">TodoApp</span><br>
            <div class="nav">
              <router-link to="/">
                <v-btn
                  class="nav__link"
                  text
                  dark
                >Home
                </v-btn>
              </router-link> 
              <router-link :to="{ name: 'Completed' }">
                <v-btn
                  dark
                  class="nav__link"
                  text
                >Completed Tasks
                </v-btn>
              </router-link> 
            </div>

          </v-toolbar>
          
          <router-view />
        </v-main>
    </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import TodoList from './components/TodoList.vue'
import { TodoItem} from "./store/todos/types";

@Component({
  components: {
    TodoList,
  }
})
export default class App extends Vue {

}
</script>

<style>
.container{
  display: flex;
  flex-direction: column;
  width: 550px;
  margin: 0 auto;
  background-color: #ffffff;
  margin-top: 200px;
}
.todo-title-input{
  margin-top: 50px;
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
  font-weight: bold;
  color:white;
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

.v-application a {
  text-decoration: none;
}

/* 
#3cde97
#08c0dd
#25d9ab */
</style>