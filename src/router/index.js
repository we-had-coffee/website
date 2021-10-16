import Vue from 'vue'
import VueRouter from 'vue-router'
import Page from '../views/Page.vue'
import Error404 from '../views/Error404.vue'
import Maintenance from '../views/Maintenance.vue'
import Folder from '../views/Folder.vue'
import axios from 'axios'
const baseUrl = `https://api.github.com/repos/${process.env.VUE_APP_REPO_ORG}/${process.env.VUE_APP_REPO_NAME}/git/trees/${process.env.VUE_APP_REPO_BRANCH}?recursive=1`
Vue.use(VueRouter)


const loadArbo = async () => {
  try{
    const res = await axios.get(baseUrl)
    return await res.data.tree.map(el => getElement(el))
  } catch(e) {
    console.error(e)
  }
}

const getElement = (el) => {
  try{
    if(el.type === 'tree')
      return {
        type: "folder",
        url: el.url,
        name: el.path.split('/').pop(),
        path: '/' + el.path,
        component: Folder,
      }
    else
      return {
        type: "file",
        url: `https://raw.githubusercontent.com/${process.env.VUE_APP_REPO_ORG}/${process.env.VUE_APP_REPO_NAME}/${process.env.VUE_APP_REPO_BRANCH}/` + el.path,
        path: '/' + el.path,
        component: Page
      }
  } catch(err){
    console.error(err)
  }
}

const getRouter = async () => {
  try{
    const routes = await loadArbo()
    routes.push({
      path: '/',
      redirect: '/readme.md'
    })
    routes.push({
      path: '*',
      component: Error404
    })

    const router = new VueRouter({
      mode: 'history',
      base: process.env.BASE_URL,
      routes
    })
    return router
  } catch(e) {
    const routes = [{
      path: '*',
      component: Maintenance
    }]
    const router = new VueRouter({
      mode: 'history',
      base: process.env.BASE_URL,
      routes
    })
    console.error(e)
    return router
  }
  
}


export default getRouter
