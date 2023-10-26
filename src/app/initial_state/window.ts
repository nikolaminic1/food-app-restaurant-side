import { Layout } from "../models/Window";
import { NavbarType } from "../models/NavbarType";

let openside = false;

export const initialStateWindow: Layout = {
  width: 0,
  height: 0,
  isSidebarOpen: openside,
  scrollPosition: 0,
  navbarWidth: 0,
  navbarOpened: false,
  typeOfNavbar: NavbarType.PRODUCTS,
  footerHeight: 0,
  layoutHeight: 500,
  navbarAffected: true,
  serachBoxOffsetX: 0,
  serachBoxOffsetY: 0,
  searchBoxOpen: false,
  projectPageModalOpened: false,
  cookiesModal: false,
  loginModal: false,
  signUpModal: false,
};
