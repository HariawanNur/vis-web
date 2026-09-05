import id from "./locales/id.json";

const title = (page: string) => `${id.app.brand} | ${page}`;

export const marketingMetadata = {
  home: {
    title: title(id.nav.home),
    description: id.app.description,
  },
  features: {
    title: title(id.nav.features),
    description: id.marketing.features.description,
  },
  benefits: {
    title: title(id.nav.benefits),
    description: id.marketing.benefits.description,
  },
  pricing: {
    title: title(id.nav.pricing),
    description: id.marketing.pricing.description,
  },
  about: {
    title: title(id.nav.about),
    description: id.marketing.about.description,
  },
  contact: {
    title: title(id.nav.contact),
    description: id.marketing.contact.description,
  },
} as const;
