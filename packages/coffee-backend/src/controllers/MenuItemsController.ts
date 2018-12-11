import HttpStatusCodes from "http-status-codes";

import { injectable, provides } from "microinject";

import Controller, { param, get, HttpError } from "../contracts/Controller";

import MenuItem from "../models/MenuItem";

@injectable()
@provides(Controller)
export default class MenuItemsController {
  @get("/items")
  async getMenuItems() {
    const items = await MenuItem.getAll();
    return items;
  }

  @get("/items/:itemId")
  async getMenuItem(@param("itemId") itemIdParam: string) {
    const itemId = Number(itemIdParam);
    if (isNaN(itemId)) {
      throw new HttpError(HttpStatusCodes.NOT_FOUND, "Item Not Found.");
    }

    const item = MenuItem.getById(itemId);
    if (!item) {
      throw new HttpError(HttpStatusCodes.NOT_FOUND, "Item Not Found.");
    }

    return item;
  }
}
