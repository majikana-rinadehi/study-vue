<template>
  <div>
    counter: {{ counter }}
  </div>
  <div v-bind:title="message">
    dynamic message
  </div>
  <div v-on:click="reverseMessage">
    reverse message: {{ rMessage }}
  </div>
  <div>
    <div>
       {{ inputMessage }}
    </div>
    <div>
      <input v-model="inputMessage">
    </div>
  </div>
  <div>
    <ul>
      <li 
          v-for="todo, i in filterTodos"
          v-bind:key="i">
        {{ i + ":" + todo.text }}
      </li>
    </ul>
  </div>
  <ul>
    <todo-item 
      v-for="todo, i in todos"
      v-bind:todo="todo"
      v-bind:index="i"
      v-bind:key="i">
    </todo-item>
  </ul>
  <div>
    <span>{{ rowHtml }}</span>
    <br>
    <span v-html="rowHtml"></span>
  </div>
  <div>
    <div>{{ incrementCounter }}</div>
    <button v-on:[eventName]="incrementCounter++">
      increment
    </button>
  </div>
  <div>
    fullName: {{ fullName }}
    <div>
      <input v-model="inputName">
      <button v-on:click="fullName=inputName">
        名前を登録
      </button>
    </div>
  </div>
  <div>
    <div>
      yes/no question 
      <input v-model="question">
    </div>
    <div>{{ answer }}</div>
  </div>
  <div>
    <p :class="{active : isActive, recomended : isRecomended}">Musou-fuuin!</p>
    <p :class="classObject">Master-Spark!</p>
    <p :class="computedClass">The-World!</p>
  </div>
  <div></div>
</template>

<script>
import TodoItem from './TodoItem.vue'
import axios from 'axios';

export default {
  name: 'HelloWorld',
  data() {
    return {
      counter: 0,
      message: "You loaded this page at: " + new Date().toLocaleString(),
      rMessage: "aiueo",
      inputMessage: "please input some text",
      todos: [
        {text: "buy food", done: false},
        {text: "clean room", done: true},
        {text: "study something", done: false},
      ],
      rowHtml: '<span style="color : red ;">This should be red.</span>',
      eventName: 'click',
      incrementCounter: 0,
      firstName: "Reimu",
      lastName: "Hakurei",
      inputName: "",
      question: "",
      answer: "Questions always contain a question mark. ;-)",
      isActive: true,
      isRecomended: true,
      classObject: {
        active: true,
        recomended: true
      },
    }
  },
  mounted(){
    setInterval(() => {
      this.counter ++;
    },1000)
  },
  computed: {
    filterTodos(){
      return this.todos.filter(todo => todo.done === false);
    },
    fullName: {
      get(){
        return this.firstName + ' ' + this.lastName;
      },
      set(newValue){
        const names = newValue.split(' ');
        this.firstName = names[0] ? names[0] : '';
        this.lastName = names[1] ? names[1] : '';
      }
    },
    computedClass(){
      return {
        active: this.isActive && this.counter % 2 === 0,
        recomended: this.isRecomended && this.counter % 2 !== 0,
      }
    },
  },
  methods: {
    reverseMessage(){
      this.rMessage = this.rMessage
        .split('')
        .reverse()
        .join('');
    },
    getAnswer(){
      this.answer = 'Thinking...';
      axios
        .get('https://yesno.wtf/api')
        .then(response => {
          this.answer = response.data.answer;
        })
        .catch(error => {
          this.answer = 'Error: Could not reach the API.' + error;
        });
    }
  },
  watch:{
    question(newQuestion, oldQuestion){
      if(newQuestion.indexOf('?') > -1){
        console.log(oldQuestion);
        this.getAnswer();
      }
    }
  },
  components: {
    TodoItem,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  //display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.active {
  color: #000000;
  font-weight: bold;
}
.recomended {
  text-decoration: underline;
}
</style>
