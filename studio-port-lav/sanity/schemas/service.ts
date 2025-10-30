import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tasks',
      title: 'Key Tasks',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'tools',
      title: 'Tools',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'skills',
      title: 'Key Skills',
      type: 'array',
      of: [{type: 'string'}],
    }),
     defineField({
      name: 'order',
      title: 'Order',
      description: 'A number to sort the services by (e.g., 1, 2, 3). Lower numbers appear first.',
      type: 'number',
    }),
  ],
   preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
  },
})
