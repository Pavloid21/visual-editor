import vstack from "./vstack";
import hstack from "./hstack";
import basictextfield from "./input";
import passwordtextfield from "./passwordtextfield";
import label from "./label";
import button from "./button";
import card from "./card";
import image from "./image";
import bottombar from "./bottombar";
import box from "./box";
import searchbar from "./searchbar";
import switch_block from "./switch";
import topappbar from "./topappbar";
import lazyvstack from "./lazyvstack";
import divider from "./divider";

const blocks = {
  hstack,
  card,
  vstack,
  basictextfield,
  passwordtextfield,
  label,
  button,
  image,
  bottombar,
  box,
  searchbar,
  switch: switch_block,
  topappbar,
  lazyvstack,
  divider,
};

export default blocks;
