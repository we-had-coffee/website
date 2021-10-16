<template>
    <v-navigation
      v-if="subFolders.length > 0"
      floating
      fixed
    >
      <v-list nav
        dense >
        <v-list-item 
          v-for="subFolder in subFolders" 
          :key="subFolder.name"
          link
          :to="'/' + subFolder.path"
        >
          <v-list-item-icon>
            <v-icon>mdi-folder</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ subFolder.name }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation>
</template>

<script>
  export default {
    props: {
      subFolders: Array
    }
  }
</script>