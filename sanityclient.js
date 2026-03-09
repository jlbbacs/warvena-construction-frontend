import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: 'pykxlxp8',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
  perspective: 'published',
})

const builder = imageUrlBuilder(client)
export const urlFor = (source) => builder.image(source)