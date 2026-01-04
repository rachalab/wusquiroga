import {
    StoryblokServerComponent,
} from '@storyblok/react/rsc';
import styles from './Section.module.scss';

export default function Category({ blok, story_uuid, story_type }) {

    return (
        <main>
            {blok.body?.map((nestedBlok) => (
                <div key={nestedBlok._uid} className={nestedBlok.component != 'projects' ? styles.container : ''}>
                    <StoryblokServerComponent blok={nestedBlok} story_uuid={story_uuid} story_type={story_type} />
                </div>
            ))}
        </main>
    );
}