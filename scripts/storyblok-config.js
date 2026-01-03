const COMPONENT_MAPPING = {
    'Audio': 'audio',
    'Video': 'video',
    'Buttons': 'buttons',
    'Accordions': 'accordions',
    'SideA': 'side_a',
    'SideB': 'side_b',
    'TwoColText': 'two_col_text',
    'Quote': 'quote',
    'Sheet': 'sheet',
    'LinksList': 'links_list',
    'FilesList': 'files_list',
    'PhotoGallery': 'photo_gallery',
    'PDF': 'pdf',
    'EmbedPDF': 'embed_pdf',
    'Image': 'image',
};

const COMPONENT_SCHEMAS = {
    'audio': {
        name: 'audio',
        display_name: 'Audio',
        schema: {
            title: { type: 'text' },
            line1: { type: 'text' },
            line2: { type: 'text' },
            mp3: { type: 'asset', filetypes: ['audio'] },
            ogg: { type: 'asset', filetypes: ['audio'] },
            colorschema: { type: 'option', source: 'internal', options: [{ value: 'primary', name: 'Primary' }, { value: 'secondary', name: 'Secondary' }, { value: 'tertiary', name: 'Tertiary' }] }
        },
        is_root: false,
        is_nestable: true
    },
    'video': {
        name: 'video',
        display_name: 'Video',
        schema: {
            title: { type: 'text' },
            video_url: { type: 'text' },
            video_mp4: { type: 'asset', filetypes: ['video'] },
            video_webm: { type: 'asset', filetypes: ['video'] },
            video_cover: { type: 'asset', filetypes: ['image'] },
            orientation: { type: 'option', source: 'internal', options: [{ value: 'horizontal', name: 'Horizontal' }, { value: 'vertical', name: 'Vertical' }] },
            colorschema: { type: 'option', source: 'internal', options: [{ value: 'primary', name: 'Primary' }, { value: 'secondary', name: 'Secondary' }, { value: 'tertiary', name: 'Tertiary' }] }
        },
        is_nestable: true
    },
    'two_col_text': {
        name: 'two_col_text',
        display_name: 'Two Column Text',
        schema: {
            column1: { type: 'richtext' },
            column2: { type: 'richtext' }
        },
        is_nestable: true
    },
    'quote': {
        name: 'quote',
        display_name: 'Quote',
        schema: {
            text: { type: 'richtext' }
        },
        is_nestable: true
    },
    'side_a': {
        name: 'side_a',
        display_name: 'Side A',
        schema: {
            blocks: { type: 'bloks' }
        },
        is_nestable: true
    },
    'side_b': {
        name: 'side_b',
        display_name: 'Side B',
        schema: {
            blocks: { type: 'bloks' }
        },
        is_nestable: true
    },
    'image': {
        name: 'image',
        display_name: 'Image',
        schema: {
            image: { type: 'asset', filetypes: ['image'] },
        },
        is_nestable: true
    },
    'photo_gallery': {
        name: 'photo_gallery',
        display_name: 'Photo Gallery',
        schema: {
            title: { type: 'text' },
            format: {
                type: 'option', source: 'internal', options: [
                    { value: 'carrousel', name: 'Carrousel' },
                    { value: 'masonry', name: 'Masonry' },
                    { value: 'slideshow', name: 'Slideshow' }
                ]
            },
            images: { type: 'multiasset', filetypes: ['image'] },
            colorschema: {
                type: 'option', source: 'internal', options: [
                    { value: 'primary', name: 'Primary' },
                    { value: 'secondary', name: 'Secondary' },
                    { value: 'tertiary', name: 'Tertiary' }
                ]
            }
        },
        is_nestable: true
    },
    'buttons': {
        name: 'buttons',
        display_name: 'Buttons',
        schema: {
            buttons: { type: 'bloks', restrict_components: true, component_whitelist: ['button_item'] }
        },
        is_nestable: true
    },
    'button_item': {
        name: 'button_item',
        display_name: 'Button Item',
        schema: {
            title: { type: 'text' },
            url: { type: 'text' },
            hierarchy: { type: 'option', source: 'internal', options: [{ value: 'primary', name: 'Primary' }, { value: 'secondary', name: 'Secondary' }, { value: 'tertiary', name: 'Tertiary' }] }
        },
        is_nestable: true
    },
    'accordions': {
        name: 'accordions',
        display_name: 'Accordions',
        schema: {
            first_open: { type: 'boolean' },
            accordion: { type: 'bloks', restrict_components: true, component_whitelist: ['accordion_item'] }
        },
        is_nestable: true
    },
    'accordion_item': {
        name: 'accordion_item',
        display_name: 'Accordion Item',
        schema: {
            title: { type: 'text' },
            text: { type: 'richtext' }
        },
        is_nestable: true
    },
    'sheet': {
        name: 'sheet',
        display_name: 'Sheet',
        schema: {
            title: { type: 'text' },
            cta: { type: 'text' },
            viewmore: { type: 'boolean' },
            item: { type: 'bloks', restrict_components: true, component_whitelist: ['sheet_item'] },
            colorschema: { type: 'option', source: 'internal', options: [{ value: 'primary', name: 'Primary' }, { value: 'secondary', name: 'Secondary' }, { value: 'tertiary', name: 'Tertiary' }], default_value: 'tertiary' }
        },
        is_nestable: true
    },
    'sheet_item': {
        name: 'sheet_item',
        display_name: 'Sheet Item',
        schema: {
            title: { type: 'text' },
            text: { type: 'richtext' }
        },
        is_nestable: true
    },
    'links_list': {
        name: 'links_list',
        display_name: 'Links List',
        schema: {
            title: { type: 'text' },
            line1: { type: 'text' },
            line2: { type: 'text' },
            links: { type: 'bloks', restrict_components: true, component_whitelist: ['link_item'] },
            colorschema: { type: 'option', source: 'internal', options: [{ value: 'primary', name: 'Primary' }, { value: 'secondary', name: 'Secondary' }, { value: 'tertiary', name: 'Tertiary' }], default_value: 'tertiary' }
        },
        is_nestable: true
    },
    'link_item': {
        name: 'link_item',
        display_name: 'Link Item',
        schema: {
            title: { type: 'text' },
            url: { type: 'text' },
            file: { type: 'asset' },
            image: { type: 'asset' }
        },
        is_nestable: true
    },
    'files_list': {
        name: 'files_list',
        display_name: 'Files List',
        schema: {
            title: { type: 'text' },
            line1: { type: 'text' },
            line2: { type: 'text' },
            type: { type: 'option', source: 'internal', options: [{ value: 'text', name: 'Sólo texto' }, { value: 'image', name: 'Imágenes' }] },
            files: { type: 'multiasset', filetypes: ['any'] },
            colorschema: { type: 'option', source: 'internal', options: [{ value: 'primary', name: 'Primary' }, { value: 'secondary', name: 'Secondary' }, { value: 'tertiary', name: 'Tertiary' }], default_value: 'tertiary' }
        },
        is_nestable: true
    },
    'pdf': {
        name: 'pdf',
        display_name: 'PDF',
        schema: {
            title: { type: 'text' },
            pdf: { type: 'asset', filetypes: ['text'] },
            cta: { type: 'text' },
            max: { type: 'number' },
            colorschema: { type: 'option', source: 'internal', options: [{ value: 'primary', name: 'Primary' }, { value: 'secondary', name: 'Secondary' }, { value: 'tertiary', name: 'Tertiary' }], default_value: 'tertiary' }
        },
        is_nestable: true
    },
    'embed_pdf': {
        name: 'embed_pdf',
        display_name: 'Embed PDF',
        schema: {
            title: { type: 'text' },
            file: { type: 'asset' },
            embed: { type: 'textarea' },
            cta: { type: 'text' },
            colorschema: { type: 'option', source: 'internal', options: [{ value: 'primary', name: 'Primary' }, { value: 'secondary', name: 'Secondary' }, { value: 'tertiary', name: 'Tertiary' }], default_value: 'tertiary' }
        },
        is_nestable: true
    },
    'project': {
        name: 'project',
        display_name: 'Project Page',
        schema: {
            thumbnail: { type: 'asset', filetypes: ['image'] },
            body: { type: 'bloks' }
        },
        is_root: true,
        is_nestable: false
    }
};

module.exports = {
    COMPONENT_MAPPING,
    COMPONENT_SCHEMAS
};
