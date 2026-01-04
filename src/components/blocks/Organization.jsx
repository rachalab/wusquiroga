import {
    StoryblokServerComponent,
} from '@storyblok/react/rsc';

export default function Organization({ blok, story_uuid, story_type }) {
    return (
        <main>
            {blok.body?.map((nestedBlok) => (
                <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} story={blok} story_type={story_type} story_uuid={story_uuid} />
            ))}
        </main>
    );
}