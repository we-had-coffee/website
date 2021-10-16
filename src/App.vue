<template>
  <v-app>
    <v-app-bar
      app
      color="black"
      dark
    >
      <div class="d-flex align-center">
        <router-link class="v-btn v-btn--text theme--dark v-size--default" :to="'/'"><Icon width="40" height="40" /> We had coffee</router-link>
      </div>

      <v-spacer></v-spacer>
      <div class="d-flex align-center" v-for="item in menu" :key="item.name">
        <router-link class="v-btn v-btn--text theme--dark v-size--default" :to="'/' + item.path">{{ item.name }}</router-link> |
      </div>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios'
import Icon from '@/components/Icon.vue'
export default {
  name: 'App',
  data(){
    return {
      menu:  []
    };
  },
  components: {
    Icon
  },
  mounted: function() {
    axios.get(`https://api.github.com/repos/${process.env.VUE_APP_REPO_ORG}/${process.env.VUE_APP_REPO_NAME}/contents`)
      .then(res => {
        this.menu = res.data.filter(el => el.type === "dir").map(el => {return { name: el.name, path: el.path}})
      })
      .catch(err => {
        console.error(err)
      })
  },
};
</script>
