import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /**@type {import('./models/Account.js').Account} */
  account: {},

  albums: [],

  activeAlbum: {},

  pictures: [],

  collaboratorProfiles: [],

  collaboratorAlbums: [],

  // NOTE this would work instead of two separate arrays for collaborators but helps separate which data is on which
  // collaborators: []
})
