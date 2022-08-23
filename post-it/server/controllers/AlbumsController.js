import { Auth0Provider } from "@bcwdev/auth0provider";
import { albumsService } from "../services/AlbumsService.js";
import { collabsService } from "../services/CollaboratorsService.js";
import { picturesService } from "../services/PicturesService.js";
import BaseController from "../utils/BaseController.js";


export class AlbumsController extends BaseController{
  constructor(){
    super('api/albums')
    this.router
    .get('', this.getAll)
    .get('/:id', this.getById)
    .get('/:id/pictures', this.getPictures)
    .get('/:id/collaborators', this.getCollaborators)
    .use(Auth0Provider.getAuthorizedUserInfo)
    .post('', this.create)
    .delete('/:id', this.archive)

  }

  async create(req,res,next){
    try {
      req.body.creatorId = req.userInfo.id
      const album = await albumsService.create(req.body)
      return res.send(album)
    } catch (error) {
      next(error)
    }
  }

  async getAll(req, res, next){
    try {
      const albums = await albumsService.getAll()
      return res.send(albums)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next){
    try {
      const album = await albumsService.getById(req.params.id)
      return res.send(album)
    } catch (error) {
      next(error)
    }
  }

  async archive(req,res,next){
    try {
      const message = await albumsService.archive(req.params.id, req.userInfo.id)
      return res.send(message)
    } catch (error) {
      next(error)
    }
  }

  async getPictures(req, res, next){
    try {
      const pictures = await picturesService.getAll({albumId: req.params.id})
      return res.send(pictures)
    } catch (error) {
      next(error)
    }
  }

  async getCollaborators(req, res, next){
    try {
      let collabs = await collabsService.getByAlbumId(req.params.id)
      return res.send(collabs)
    } catch (error) {
      next(error)
    }
  }
}
