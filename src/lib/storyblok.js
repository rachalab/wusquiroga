import { apiPlugin, storyblokInit } from '@storyblok/react/rsc';
import Page from "../components/blocks/Page";
import Project from "../components/blocks/Project";
import Audio from "../components/blocks/Audio/Audio";
import Video from "../components/blocks/Video/Video";
import PhotoGallery from "../components/blocks/PhotoGallery/PhotoGallery";
import TwoColText from "../components/blocks/TwoColText/TwoColText";
import Quote from "../components/blocks/Quote/Quote";
import Sheet from "../components/blocks/Sheet/Sheet";
import LinksList from "../components/blocks/LinksList/LinksList";
import FilesList from "../components/blocks/FilesList/FilesList";
import Buttons from "../components/blocks/Buttons/Buttons";
import PDF from "../components/blocks/PDF/PDF";
import EmbedPDF from "../components/blocks/EmbedPDF/EmbedPDF";
import Accordions from "../components/blocks/Accordions/Accordions";
import SideA from "../components/blocks/SideA/SideA";
import SideB from "../components/blocks/SideB/SideB";
import Image from "../components/blocks/Image/Image";

// Configured later with all components
export const storyblokComponents = {
    page: Page,
    project: Project,
    audio: Audio,
    video: Video,
    photo_gallery: PhotoGallery,
    two_col_text: TwoColText,
    quote: Quote,
    sheet: Sheet,
    links_list: LinksList,
    buttons: Buttons,
    pdf: PDF,
    embed_pdf: EmbedPDF,
    accordions: Accordions,
    side_a: SideA,
    side_b: SideB,
    image: Image,
};



export const getStoryblokApi = storyblokInit({
    accessToken: process.env.NEXT_PUBLIC_STORYBLOK_TOKEN,
    use: [apiPlugin],
    components: storyblokComponents,
    apiOptions: {
        region: 'eu',
    },
});