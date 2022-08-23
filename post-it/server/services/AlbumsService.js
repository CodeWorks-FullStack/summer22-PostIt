import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"



class AlbumsService{
  async create(newAlbum) {
    const album = await dbContext.Albums.create(newAlbum)
    await album.populate('creator', 'name picture')
    return album
  }
  async getAll(){
  // NOTE to not included archived albums add {archived: false} to the find
    const albums = await dbContext.Albums.find().sort({createdAt: -1}).populate('creator', 'name picture')
    return albums
  }
  async getById(id) {
    const album = await dbContext.Albums.findById(id).populate('creator', 'name picture')
    if(!album){
      throw new BadRequest('no album by that id')
    }
    return album
  }

  async archive(albumId, userId){
    const album = await this.getById(albumId)
    if(album.creatorId.toString() != userId){
      throw new Forbidden("You don't have permission to delete that")
    }
    // album.remove()
    // NOTE soft delete
    album.archived = !album.archived
    await album.save()
    return `album ${album.title} was archived`
  }
}

export const albumsService = new AlbumsService()
