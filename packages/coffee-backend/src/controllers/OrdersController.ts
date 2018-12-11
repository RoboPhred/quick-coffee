import { injectable, provides, singleton, inject } from "microinject";

import HttpStatusCodes from "http-status-codes";

import {
  PostOrderRequest,
  PostOrderResponse,
  postOrderRequestSchema
} from "coffee-types";

import Controller, {
  get,
  user,
  authorize,
  post,
  body,
  HttpError
} from "../contracts/Controller";
import Validator from "../services/Validator";

import User from "../models/User";
import Order from "../models/Order";

@injectable()
@provides(Controller)
@singleton()
export default class OrdersController {
  constructor(@inject(Validator) private _validator: Validator) {}

  @get("/orders")
  @authorize()
  async getOrders(@user() user: User) {
    const orders = await Order.getByUserId(user.id);
    return { orders };
  }

  @post("/orders")
  @authorize()
  async createOrder(
    @user() user: User,
    @body() body: PostOrderRequest
  ): Promise<PostOrderResponse> {
    if (!this._validator.validate(body, postOrderRequestSchema)) {
      throw new HttpError(HttpStatusCodes.BAD_REQUEST, "Bad Request.");
    }

    const { itemId, options } = body.order;
    const order = await Order.create(user.id, itemId, options);
    if (order == null) {
      throw new HttpError(
        HttpStatusCodes.INTERNAL_SERVER_ERROR,
        "Interal Server Error."
      );
    }

    return { order };
  }
}
