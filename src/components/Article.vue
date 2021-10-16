<template>
  <v-card>
    <div v-html="markdownToHtml"></div>
  </v-card>
</template>

<script>
import marked from 'marked'
import axios from 'axios'

export default {
  props: {
    articleUrl: String
  },
  data(){
    return {
      markdown:  "Loading...",
    };
  },
    watch: {
    'articleUrl' () {
      this.load()
    }
  },
  mounted: function() {
    this.load()
  },
  methods: {
    load: function() {
      if(this.articleUrl)
      {
        axios.get(this.articleUrl)
          .then(res => {
            this.markdown = res.data
          })
          .catch(err => {
            console.error(err)
          })
      }
    },
  },
  computed: {
    markdownToHtml(){
      return marked(this.markdown);
    }
  }
}
</script>