import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CustomersView from '../views/CustomersView.vue'
import EmployeesView from '../views/EmployeesView.vue'
import CategoriesView from '../views/CategoriesView.vue'
import OrdersView from '../views/OrdersView.vue'
import ProductsView from '../views/ProductsView.vue'

import SuppliersView from '../views/SuppliersView.vue'
import ShippersView from '../views/ShippersView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/customers',
      name: 'customers',
      component: CustomersView
      
    },
    {
      path: '/employees',
      name: 'employees',
      component: EmployeesView
    },
    {
      path: `/categories`,
      name: 'categories',
      component: CategoriesView
    },
    {
      path: `/orders`,
      name: 'orders',
      component: OrdersView
    },
    {
      path: `/products`,
      name: 'products',
      component: ProductsView
    },
    {
      path: `/suppliers`,
      name: 'suppliers',
      component: SuppliersView
    },
    {
      path: `/shippers`,
      name: 'shippers',
      component: ShippersView
    },

  ]
})

export default router
