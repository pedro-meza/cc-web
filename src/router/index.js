import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Welcome from '@/components/welcome/Welcome'
import Summary from '@/components/summary/Summary'
import Category from '@/components/category/Category'
import Upload from '@/components/upload/Upload'
import Rules from '@/components/rules/Rules'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/welcome',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '/expense-summary',
      name: 'Expense-Summary',
      component: Summary
    },
    {
      path: '/category',
      name: 'Category',
      component: Category
    },
    {
      path: '/upload',
      name: 'Upload',
      component: Upload
    },
    {
      path: '/rules',
      name: 'Rules',
      component: Rules
    }
  ]
})
