import { post } from "./post";
import { teamMember } from "./teamMember";
import { siteSettings } from "./siteSettings";
import { customer } from "./customer";
import { integration } from "./integration";
import { helpcenter } from "./helpcenter";
import { changelog } from "./changelog";
import { infopage } from "./infopage";

export const schemaTypes = [
  // Content Documents
  post,
  teamMember,
  customer,
  integration,
  helpcenter,
  changelog,
  infopage,
  // Singleton
  siteSettings,
];
