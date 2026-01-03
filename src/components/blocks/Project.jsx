import {
    storyblokEditable,
    StoryblokServerComponent,
} from '@storyblok/react/rsc';

import styles from './Project.module.scss';

export default function Project({ blok }) {
    return (
        <main className={styles.project}>
            {blok.body?.map((nestedBlok) => (
                <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
            ))}
        </main>
    );
}