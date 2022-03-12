import { Mvvm } from "./mvvm";

let vue = new Mvvm({
  el: "#app",
  template: `<div>My name: {{name}}</div>
              <div>{{sentence}}</div>
             <input v-model="name"/>
             <input :value="age" v-show="show" />
            <button @click="handle">按钮</button>`,
  data: {
    name: "gypsophlia",
    age: 21,
    show: false,
  },
  methods: {
    handle() {
      console.log("handle");
      this.show = !this.show;
    },
  },
  computed: {
    sentence() {
      return "My age:" + this.age;
    },
  },
  watch: {
    name(newval: string, oldval: string) {
      console.log("name value change: ", newval, oldval);
    },
  },
});

window["v"] = () => vue;
