import { NextApiRequest, NextApiResponse } from 'next';
import { Endpoint } from '../../src/config/apiEndpoint';
import { buildAuthorization } from '../../src/lib/apiAuthHelpers';
import { get } from '../../src/lib/apiCall';
// import { createRequestParams } from "../../src/lib/urllib";
import { withSessionRoute } from '../../src/lib/withSession';

export default withSessionRoute(handler);

interface Menu {
  id: number;
  name: string;
  url: string;
  icon: string;
  sub_menus?: Menu[];
}

interface MenuGroup {
  id: number;
  name: string;
  menus: Menu[];
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowerd' });
  }

  const user = req.session.user;

  // const params = createRequestParams(req.query);

  const apiResponse = await get(req, `${Endpoint.MenuMe}`, {
    ...buildAuthorization(user!.token),
  });

  if (!apiResponse.ok) {
    return res.status(apiResponse.status).json(await apiResponse.json());
  }

  let payload = await apiResponse.json();

  // const menuGroups: {
  //   [key: number]: {
  //     id: number;
  //     name: string;
  //     menus: [
  //       {
  //         id: number;
  //         name: string;
  //         icon: string;
  //         url: string;

  //       }
  //     ];
  //   };
  // } = {};

  const menuGroups: {
    [key: number]: MenuGroup;
  } = {};

  payload.menus.forEach((item: any) => {
    const menuItem = Object.assign({}, item);
    delete menuItem.menu_group;

    const { id, name } = item.menu_group;

    if (Object.hasOwn(menuGroups, id)) {
      menuGroups[id].menus.push(menuItem);
      return;
    }

    menuGroups[id] = {
      id,
      name,
      menus: [menuItem],
    };

    // menuGroups[item.menu_group.id] = {
    //   id: item.menu_group.id,
    //   name: item.menu_group.name,
    //   menus: [
    //     {
    //       id: item.id,
    //       name: item.name,
    //       icon: item.icon,
    //       url: item.url,
    //     },
    //   ],
    // };
  });

  payload.items = Object.values(menuGroups);

  return res.status(apiResponse.status).json(payload);
}
