<template>
  <div>
      <div class="col-mid-12" v-show="todos.length > 0">
          <h3>Todo Items</h3>
          <div class="row mrb-10" v-for="todo in todos">
              <div class="input-group m-b-5">
                  <span class="input-group-addon addon-right">
                      <input type="checkbox" v-model="todo.done" :checked="todo.done" :value="todo.done" v-on:change="updateTodo(todo)" title="Mark as done?"/>
                  </span>
                  <input type="text" class="form-control" :class="todo.done ? 'todo__done' : ''" v-model="todo.name" @keypress="todo.editing=true" @keyup.enter="updateTodo(todo)">
                  <span class="input-group-addon addon-left" title="Delete todo?" v-on:click="deleteTodo(todo._id)">X</span>
              </div>
              <span class="help-block small" v-show="todo.editing">Hit enter to update</span>
          </div>
      </div>
      <div class="row alert alert-info text-center" v-show="todos.length == 0">
          <p class="alert alert-info">
              <strong>All Caught Up</strong>
              <br/>
              You do not have any todo items
          </p>
      </div>
  </div>
</template>
