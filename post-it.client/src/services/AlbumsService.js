import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class AlbumsService{
  async getAll(){
    const res = await api.get('api/albums')
    logger.log('GOT ALBUMS',res.data)
    AppState.albums = res.data
  }

  async getById(id){
    const res = await api.get('api/albums/'+id)
    logger.log('GET ALBUM BY ID',res.data)
    AppState.activeAlbum = res.data
  }

  async createAlbum(newAlbum){
    const res =await api.post('api/albums', newAlbum)
    logger.log('CREATE ALBUM', res.data)
    AppState.albums.unshift(res.data)
  }
}

export const albumsService = new AlbumsService()
