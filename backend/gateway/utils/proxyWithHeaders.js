//function to pass user id in header to resume service with proxy
import { proxy } from "express-http-proxy";

export const proxyWithHeaders = (serviceUrl) => {
  return proxy(serviceUrl, {
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
      if (srcReq.user) {
        proxyReqOpts.headers["x-user-id"] = srcReq.user.userId;
      }
      return proxyReqOpts;
    },
  });
};
