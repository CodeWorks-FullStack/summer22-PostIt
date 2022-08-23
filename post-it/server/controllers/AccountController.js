import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import { collabsService } from '../services/CollaboratorsService.js'
import BaseController from '../utils/BaseController'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get('/collaborators', this.getCollaborators)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async getCollaborators(req, res, next){
    try {
      const collabs = await collabsService.getByAccountId(req.userInfo.id)
      return res.send(collabs)
    } catch (error) {
      next(error)
    }
  }
}
