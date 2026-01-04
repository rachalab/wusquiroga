import { apiPlugin, storyblokInit } from '@storyblok/react/rsc';
import Page from "../components/blocks/Page";
import Category from "../components/blocks/Category";
import Organization from "../components/blocks/Organization";
import Project from "../components/blocks/Project";
import Audio from "../components/blocks/Audio/Audio";
import Video from "../components/blocks/Video/Video";
import PhotoGallery from "../components/blocks/PhotoGallery/PhotoGallery";
import TwoColText from "../components/blocks/TwoColText/TwoColText";
import Quote from "../components/blocks/Quote/Quote";
import Sheet from "../components/blocks/Sheet/Sheet";
import LinksList from "../components/blocks/LinksList/LinksList";
import Projects from "../components/blocks/Projects/Projects";
import Marquee from "../components/blocks/Marquee/Marquee";
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
    category: Category,
    organization: Organization,
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
    projects: Projects,
    marquee: Marquee,
};



export const getStoryblokApi = storyblokInit({
    accessToken: process.env.NEXT_PUBLIC_STORYBLOK_TOKEN,
    use: [apiPlugin],
    components: storyblokComponents,
    apiOptions: {
        region: 'eu',
    },
});