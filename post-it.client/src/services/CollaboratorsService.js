import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"



class CollaboratorsService{
  async create(newCollab){
    const res = await api.post('api/collaborators', newCollab)
    logger.log('CREATE COLLAB', res.data)
    AppState.collaboratorProfiles.push(res.data)
  }

  async getCollabProfilesByAlbum(albumId){
    const res = await api.get(`api/albums/${albumId}/collaborators`)
    logger.log('GET COLLAB PROFILES', res.data)
    AppState.collaboratorProfiles = res.data
  }

  async getCollabAlbumsByAccount(){
    const res = await api.get('account/collaborators')
    logger.log('GET COLLAB ALBUMS', res.data)
    AppState.collaboratorAlbums = res.data
  }

  async removeCollab(collabId){
    const res = await api.delete('api/collaborators/'+collabId)
    logger.log('REMOVE COLLAB', res.data)
    // NOTE you only have to filter these both if you have multiple deletes for collab
    AppState.collaboratorProfiles = AppState.collaboratorProfiles.filter(c => c.id != collabId)
    AppState.collaboratorAlbums = AppState.collaboratorAlbums.filter(c => c.id != collabId)
  }

}

export const collabsService = new CollaboratorsService()
