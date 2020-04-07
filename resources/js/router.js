import Vue from 'vue'
import Router from 'vue-router'

import Index from './views/Index'
import Register from './views/Register'
import Login from './views/Login'


import CoursesIndex from './views/courses/Index'
import CoursesEdit from './views/courses/Edit'
import CoursesCreate from './views/courses/Create'
import CoursesShow from './views/courses/Show'

import LecturersIndex from './views/lecturers/Index'
import LecturersEdit from './views/lecturers/Edit'
import LecturersCreate from './views/lecturers/Create'
import LecturersShow from './views/lecturers/Show'


import EnrolmentsIndex from './views/enrolments/Index'
import EnrolmentsEdit from './views/enrolments/Edit'
import EnrolmentsCreate from './views/enrolments/Create'
import EnrolmentsShow from './views/enrolments/Show'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/courses',
      name: 'coursesIndex',
      component: CoursesIndex
    },
    {
      path: '/courses/edit/:id',
      name: 'coursesEdit',
      component: CoursesEdit
    },
    {
      path: '/courses/create',
      name: 'coursesCreate',
      component: CoursesCreate
    },
    {
      path: '/courses/show/:id',
      name: 'coursesShow',
      component: CoursesShow
    },
    {
      path: '/lecturers',
      name: 'lecturersIndex',
      component: LecturersIndex
    },
    {
      path: '/lecturers/edit/:id',
      name: 'lecturersEdit',
      component: LecturersEdit
    },
    {
      path: '/lecturers/create',
      name: 'lecturersCreate',
      component: LecturersCreate
    },
    {
      path: '/lecturers/show/:id',
      name: 'lecturersShow',
      component: LecturersShow
    },
    {
      path: '/enrolments',
      name: 'enrolmentsIndex',
      component: EnrolmentsIndex
    },
    {
      path: '/enrolments/edit/:id',
      name: 'enrolmentsEdit',
      component: EnrolmentsEdit
    },
    {
      path: '/enrolments/create',
      name: 'enrolmentsCreate',
      component: EnrolmentsCreate
    },
    {
      path: '/enrolments/show/:id',
      name: 'enrolmentsShow',
      component: EnrolmentsShow
    }
  ]
})
