import { NextApiRequest, NextApiResponse } from "next";
import { Endpoint } from "../../src/config/apiEndpoint";
import { methodNotAlowed, unauthorized } from "../../src/lib/apiAuthHelpers";
import { get } from "../../src/lib/apiCall";
import { withSessionRoute } from "../../src/lib/withSession";

export default withSessionRoute((req, res) => {
  if (!req.session.user) {
    return unauthorized(res);
  }

  if (req.method === "GET") return useGetHandler(req, res);
  if (req.method === "POST") return usePostHandler(req, res);

  return methodNotAlowed(res);
});

async function useGetHandler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;

  if (!req.query["id"]) {
    return res.json(user?.profile);
  }

  //   create api call to backend
  const apiResponse = await get(req, Endpoint.Profile);
  return res.status(apiResponse.status).json(await apiResponse.json());
}

function usePostHandler(_: NextApiRequest, res: NextApiResponse) {
  return res.json({ message: "ok" });
}
