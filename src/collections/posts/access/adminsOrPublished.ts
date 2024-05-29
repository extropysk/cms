import type { Access } from "payload/config";
import { checkRole } from "../../../access/checkRole";

export const adminsOrPublished: Access = ({ req: { user } }) => {
  if (user && checkRole(["admin"], user)) {
    return true;
  }

  return {
    publishedAt: {
      less_than: new Date(),
    },
  };
};
