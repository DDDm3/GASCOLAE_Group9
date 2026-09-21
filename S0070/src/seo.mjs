import { content } from './content.mjs';

// Keep the schema limited to statements already present in the approved public copy.
export const serviceSchema = Object.freeze({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: content.meta.title,
  serviceType: 'Khảo sát và giám sát quang phổ bằng UAV và AI',
  description: content.meta.description
});

export const serviceSchemaJson = JSON.stringify(serviceSchema).replaceAll('<', '\\u003c');
