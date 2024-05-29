import type { Access } from "payload/config";

export const authOrPublished: Access = ({ req: { user } }) => {
  if (user) {
    return true;
  }

  return {
    publishedAt: {
      less_than: new Date(),
    },
  };
};
