import { Mvvm } from "./mvvm";

let vue = new Mvvm({
  el: "#app",
  template: "<div>{{name}}</div><div>{{sentence}}</div>",
  data: {
    name: "gypsophlia",
    age: 21,
  },
  methods: {
    handle() {
      console.log("handle");
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
