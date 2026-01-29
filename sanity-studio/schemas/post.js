export default {
  name: 'post',
  title: 'Artigo',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      description: 'Identificador único para o URL (ex: golden-visa). Gera a partir do título.',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'mainImage',
      title: 'Imagem principal',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'excerpt',
      title: 'Resumo',
      type: 'text',
      description: 'Texto curto que aparece nos cards e na pré-visualização.',
      rows: 3,
      validation: (Rule) => Rule.max(300),
    },
    {
      name: 'publishedAt',
      title: 'Data de publicação',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
    {
      name: 'featured',
      title: 'Destacado',
      type: 'boolean',
      description: 'Se ativo, o artigo aparece primeiro na lista e com uma estrela no card.',
      initialValue: false,
    },
    {
      name: 'body',
      title: 'Corpo do artigo',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
        },
      ],
    },
  ],
  orderings: [
    {
      title: 'Data de publicação (mais recente)',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
      subtitle: 'publishedAt',
    },
    prepare({ title, media, subtitle }) {
      const date = subtitle ? new Date(subtitle).toLocaleDateString('pt-PT') : '';
      return {
        title: title || 'Sem título',
        media,
        subtitle: date,
      };
    },
  },
};
