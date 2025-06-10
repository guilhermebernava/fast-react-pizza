import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

function Menu() {
  //esse HOOK serve para devolver os dados da function
  //LOADER que traz os dados da API.
  const menu = useLoaderData();

  return (
    <ul className="divide-y divide-stone-200 px-4">
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
