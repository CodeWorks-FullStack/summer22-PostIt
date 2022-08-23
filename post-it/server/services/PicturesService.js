import { dbContext } from "../db/DbContext.js"

class PicturesService {
  async getAll(query = {}) {
    const pictures = await dbContext.Pictures.find(query).populate('creator', 'name picture')
    return pictures
  }

  async create(newPicture){
    const picture = await dbContext.Pictures.create(newPicture)
    await picture.populate('creator', 'name picture')
    return picture
  }

}

export const picturesService = new PicturesService()
