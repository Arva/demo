import { Controller }                 from 'arva-js/core/Controller.js'
import { RootView }                   from '../views/RootView.js'

export class HomeController extends Controller {
  async Index () {

    if (!this.rootView) {
      this.rootView = new RootView()
    }
    return this.rootView
  }
}