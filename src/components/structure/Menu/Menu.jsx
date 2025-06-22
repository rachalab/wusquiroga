
import { builder } from "@builder.io/sdk";
import Navigation from "@components/structure/Navigation/Navigation";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY);


export default async function Menu()
{
    const menuData = await  builder.get('menu');

    return menuData?.data && (
            <Navigation menuData={menuData.data} />
    )
}