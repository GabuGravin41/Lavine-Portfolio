import {type SchemaTypeDefinition} from 'sanity'
import blogPost from './schemas/blogPost'
import service from './schemas/service'
import caseStudy from './schemas/caseStudy'

export const schema: {types: SchemaTypeDefinition[]} = {
  types: [blogPost, service, caseStudy],
}
