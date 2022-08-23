import { Auth0Provider } from "@bcwdev/auth0provider";
import { collabsService } from "../services/CollaboratorsService.js";
import BaseController from "../utils/BaseController.js";


export class CollaboratorsController extends BaseController{
  constructor(){
    super('api/collaborators')
    this.router
    .use(Auth0Provider.getAuthorizedUserInfo)
    .post('', this.create)
    .delete('/:id', this.remove)
  }

  async create(req, res, next){
    try {
      req.body.accountId = req.userInfo.id
      let collab = await collabsService.create(req.body)
      return res.send(collab)
    } catch (error) {
      next(error)
    }
  }

  async remove(req, res, next){
    try {
      const message = await collabsService.remove(req.params.id, req.userInfo.id)
      return res.send(message)
    } catch (error) {
      next(error)
    }
  }
}
