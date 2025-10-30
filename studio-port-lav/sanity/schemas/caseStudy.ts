import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'caseStudy',
  title: 'Case Study',
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
      name: 'outcome',
      title: 'Outcome',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
     defineField({
      name: 'services',
      title: 'Services',
      description: 'List the services involved in this case study.',
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
      name: 'order',
      title: 'Order',
      description: 'A number to sort the case studies by (e.g., 1, 2, 3). Lower numbers appear first.',
      type: 'number',
    }),
  ],
   preview: {
    select: {
      title: 'title',
      subtitle: 'outcome',
    },
  },
})
