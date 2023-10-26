import { NavbarType } from "./NavbarType";

export interface Layout {
  width: number;
  height: number;
  isSidebarOpen: boolean;
  scrollPosition: number;
  navbarWidth: number;
  navbarOpened: boolean;
  projectPageModalOpened: boolean;
  typeOfNavbar: NavbarType.PRODUCTS;
  footerHeight: number;
  layoutHeight: number;
  navbarAffected: boolean;
  serachBoxOffsetX: number;
  serachBoxOffsetY: number;
  searchBoxOpen: boolean;
  cookiesModal: boolean;
  loginModal: boolean;
  signUpModal: boolean;
}
