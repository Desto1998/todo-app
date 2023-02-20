import Vue from "vue";
import VueRouter from "vue-router";
import AddStudent from './components/AddStudent';
import ListStudent from './components/ListStudent';
import EditStudent from './components/EditStudent';

Vue.use(VueRouter);

export default new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      // alias: "/students",
      name: "Students",
      component: ListStudent
    },
    {
      path: "/students/details/:id",
      name: "studentDetail",
      component: EditStudent
    },
    {
      path: "/add",
      name: "Add",
      component: AddStudent
    }
  ]
});