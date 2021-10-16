<template>
  <Article v-if="readmeUrl !== null" :articleUrl="readmeUrl" />
</template>

<script>
import axios from 'axios'
import Article from '@/components/Article.vue'



export default {
  name: 'App',
  data(){
    return {
      readmeUrl:  null,
    };
  },
  components: {
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
      const path = this.$router.currentRoute.fullPath
      axios.get(`https://api.github.com/repos/${process.env.VUE_APP_REPO_ORG}/${process.env.VUE_APP_REPO_NAME}/contents` + path)
      .then(res => {
        if(path.substring(path.length-3, path.length) === ".md")
          this.readmeUrl = res.data.download_url
      })
      .catch(err => {
        console.error(err)
      })
    }
  }
}
</script>