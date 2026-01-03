
import Navigation from "@components/structure/Navigation/Navigation";



export default async function Menu() {
    const menuData = {
        data: {
            bio: "Wustavo Quiroga es un investigador y curador especializado en diseño y arte latinoamericano. Fundador de Fundación IDA y director de diversos proyectos de rescate patrimonial.",
            photo: "https://cdn.builder.io/api/v1/image/assets%2F2790c3a6ae0449e5aacbaee710c2b6d0%2Faee7b3df0796403ea3d5350e2abc8dbc",
            links: [
                {
                    link: {
                        value: {
                            data: {
                                url: "/proyectos",
                                title: "Proyectos"
                            }
                        }
                    }
                },
                {
                    link: {
                        value: {
                            data: {
                                url: "/archivo",
                                title: "Archivo"
                            }
                        }
                    }
                },
                {
                    link: {
                        value: {
                            data: {
                                url: "/biografia",
                                title: "Biografía"
                            }
                        }
                    }
                }
            ],
            ctas: [
                {
                    cta: "Contacto",
                    url: "mailto:info@rachalab.com"
                }
            ]
        }
    };

    return menuData?.data && (
        <Navigation menuData={menuData.data} />
    )
}