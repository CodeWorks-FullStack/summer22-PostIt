import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class PicturesService{

  async create(newPicture){
    const res = await api.post('api/pictures', newPicture)
    logger.log('CREATED PICTURE', res.data)
    AppState.pictures.push(res.data)
  }

  async getPicturesByAlbumId(albumId){
    const res = await api.get(`api/albums/${albumId}/pictures`)
    logger.log('PICTURES', res.data)
    AppState.pictures = res.data
  }
}

export const picturesService = new PicturesService()
