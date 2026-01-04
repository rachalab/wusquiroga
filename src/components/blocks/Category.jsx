import {
    StoryblokServerComponent,
} from '@storyblok/react/rsc';

export default function Category({ blok, story_uuid, story_type }) {
    console.log("story ID", story_uuid);
    return (
        <main>
            {blok.body?.map((nestedBlok) => (
                <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} story_uuid={story_uuid} story_type={story_type} />
            ))}
        </main>
    );
}