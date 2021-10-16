<template>
  <v-app>
    <v-card flat>
      <Menu :subFolders="subFolders" />
      <v-container>
        <v-row>
          <v-col cols="12">
            <Article v-if="readmeUrl !== null" :articleUrl="readmeUrl" />
          </v-col>
          <v-col v-for="article in articles" :key="article.raw.name" cols="4"> 
            <v-card flat>
              <v-img
                :src="article.img === -1 ? '/thumbnail.jpg' : imgs[article.img].download_url"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="200px"
              >
                <v-card-title v-text="article.raw.name.replaceAll('.md', '').replaceAll('_', ' ')"></v-card-title>
              </v-img>

              <v-card-actions>
                <v-spacer></v-spacer>
                <router-link class="v-btn v-btn--text theme--light" :to="'/' + article.raw.path">
                  <v-icon>mdi-plus</v-icon>
                  Read more...
                </router-link>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-app>
</template>

<script>
import axios from "axios"
import Menu from '@/components/Menu.vue'
import Article from '@/components/Article.vue'

export default {
  name: 'App',
  data(){
    return {
      subFolders:  [],
      articles: [],
      imgs: [],
      readmeUrl: null
    };
  },
  components: {
    Menu,
    Article
  },
  watch: {
    '$route' () {
      this.load()
    }
  },
  mounted: function() {
    this.load()
  },
  methods: {
    load: function(){
      axios.get(`https://api.github.com/repos/${process.env.VUE_APP_REPO_ORG}/${process.env.VUE_APP_REPO_NAME}/contents` + this.$router.currentRoute.fullPath)
      .then(res => {
        this.subFolders = res.data.filter(el => el.type === "dir")
        this.imgs = res.data.filter(el => el.type === "file" && el.name.substring(el.name.length-5, el.name.length).match(/(\.[pP][nN][gG])|(\.[jJ][pP][gG])|(\.[jJ][pP][eE][gG])|(\.[gG][iI][fF])|(\.[bB][mM][pP])/))
        this.articles = res.data.filter(el => el.type === "file" && el.name.substring(el.name.length-3, el.name.length) === ".md").map(el => { 
          return {
            raw: el, 
            img: this.imgs.map(el => el.name.split('.')[0]).indexOf(el.name.substring(0, el.name.length-3))
          }
        })
        this.readmeUrl = res.data.filter(el => el.name === "readme.md").map(el => el.download_url).pop()
      })
      .catch(err => {
        console.error(err)
      })
    }
  }
}
</script>