import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"


class CollaboratorsService{
  // NOTE getting collaborators for a single ALBUM by the albumId
  async getByAlbumId(albumId) {
    let collabs = await dbContext.Collaborators.find({albumId: albumId}).populate('profile', 'name picture')
    return collabs
  }
  // NOTE getting collabs for a single ACCOUNT by the accountId
  async getByAccountId(accountId) {
    let collabs = await dbContext.Collaborators.find({accountId: accountId}).populate('album')
    return collabs
  }
  async create(newCollab) {
    const collab = await dbContext.Collaborators.create(newCollab)
    await collab.populate('album')
    await collab.populate('profile', 'name picture')
    return collab
  }
  async remove(collabId, userId) {
    const collab = await dbContext.Collaborators.findById(collabId)
    if(!collab){
      throw new BadRequest('no collab at that id')
    }
    if(collab.accountId.toString() != userId){
      throw new Forbidden('You can not remove that')
    }
    await collab.remove()
    return 'collab ended'
  }

}

export const collabsService = new CollaboratorsService()
