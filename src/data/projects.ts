import type { StaticImageData } from 'next/image';
import medicMediaCard from '../assets/images/projects/medic-media-card.png';
import medicMediaHero from '../assets/images/projects/medic-media-hero.png';
import neighborhoodPlumbingCard from '../assets/images/projects/neighborhood-plumbing-drain-card.png';
import neighborhoodPlumbingHero from '../assets/images/projects/neighborhood-plumbing-drain-hero.png';
import martinCountyHumaneCard from '../assets/images/projects/martin-county-humane-society-card.png';
import martinCountyHumaneHero from '../assets/images/projects/martin-county-humane-society-hero.png';
import pedalShackCard from '../assets/images/projects/the-pedal-shack-card.png';
import pedalShackHero from '../assets/images/projects/the-pedal-shack-hero.png';
import daviessCountyRuralWaterCard from '../assets/images/projects/daviess-county-rural-water-card.png';
import daviessCountyRuralWaterHero from '../assets/images/projects/daviess-county-rural-water-hero.png';
import heritageLuxCabinetryCard from '../assets/images/projects/heritage-lux-cabinetry-card.png';
import heritageLuxCabinetryHero from '../assets/images/projects/heritage-lux-cabinetry-hero.png';

export type ProjectStatus = 'Live';

export interface Project {
  slug: string;
  name: string;
  category: string;
  status: ProjectStatus;
  role: string;
  business: string;
  goal: string;
  contribution: string;
  results: string;
  description: string;
  technologies: string[];
  url: string;
  image: StaticImageData;
  /** Desktop + mobile device mockup for the case-study page hero — built from a real
   *  screenshot of the live site. Falls back to `image` on the case-study page when
   *  absent; project cards always use `image`. */
  mockupImage?: StaticImageData;
  /** Homepage "Selected Work" picks — curated for breadth, not just insertion order. */
  featured?: boolean;
}

export const projects: Project[] = [
  {
    slug: 'medic-media',
    name: 'Medic Media',
    category: 'Marketing Agency',
    status: 'Live',
    role: 'WordPress Developer',
    results:
      'A polished, conversion-focused site that gives the agency a professional online presence to support client acquisition.',
    business: 'A med spa marketing agency serving aesthetic and wellness clinics.',
    goal: 'Communicate services, expertise, and value clearly enough to support client growth in a competitive industry.',
    contribution:
      'Built a conversion-focused WordPress site combining high-end visual design with strategic marketing messaging, using Elementor Pro and JetEngine for dynamic content.',
    description:
      'A conversion-focused website built for a med spa marketing agency, combining high-end visual design with strategic marketing messaging. Designed to clearly communicate services, expertise, and value while supporting client growth in a competitive industry.',
    technologies: ['WordPress', 'Elementor Pro', 'JetEngine'],
    url: 'https://www.medic-media.com/',
    image: medicMediaCard,
    mockupImage: medicMediaHero,
    featured: true,
  },
  {
    slug: 'neighborhood-plumbing-drain',
    name: 'Neighborhood Plumbing & Drain',
    category: 'Local Service Business',
    status: 'Live',
    role: 'WordPress Developer',
    results:
      'A fast, trustworthy local site that makes it easy for homeowners to find services and get in touch.',
    business: 'A trusted local plumbing and drain service company.',
    goal: 'Highlight reliability, transparent pricing, and 24/7 customer support with easy scheduling for homeowners.',
    contribution:
      'Developed a service-focused WordPress site emphasizing clear service information and strong trust signals, built for fast local lead generation.',
    description:
      'A service-focused website built for a trusted local plumbing company, designed to highlight reliability, transparent pricing, and 24/7 customer support. The project emphasizes clear service information, strong trust signals, and easy scheduling for homeowners.',
    technologies: ['WordPress', 'Elementor Pro'],
    url: 'https://neighborhoodplumbinganddrain.com/',
    image: neighborhoodPlumbingCard,
    mockupImage: neighborhoodPlumbingHero,
  },
  {
    slug: 'martin-county-humane-society',
    name: 'Martin County Humane Society',
    category: 'Nonprofit / Animal Welfare',
    status: 'Live',
    role: 'WordPress Developer',
    results:
      'An approachable, easy-to-browse site that puts adoptable pets front and center for the community.',
    business: 'A nonprofit animal shelter connecting adoptable pets with new homes.',
    goal: 'Encourage adoption and community engagement through clear storytelling and intuitive navigation.',
    contribution:
      'Built a compassionate, user-friendly WordPress site highlighting adoptable pets with warm visuals and simple, accessible browsing.',
    description:
      'A compassionate, user-friendly website designed to highlight adoptable pets and inspire meaningful connections. The project focuses on clear storytelling, warm visuals, and intuitive navigation to encourage adoption and community engagement.',
    technologies: ['WordPress', 'Elementor Pro', 'Custom Post Types'],
    url: 'https://martincountyhumane.org/',
    image: martinCountyHumaneCard,
    mockupImage: martinCountyHumaneHero,
    featured: true,
  },
  {
    slug: 'the-pedal-shack',
    name: 'The Pedal Shack',
    category: 'Retail / Bike Shop',
    status: 'Live',
    role: 'WordPress Developer',
    results:
      'A clear, browsable showcase of bikes and services that makes it easy for riders to find what they need.',
    business: 'A community-driven bike shop offering sales, service, and repairs.',
    goal: 'Simplify browsing and connect riders with trusted brands, bikes, and repair services.',
    contribution:
      'Developed a dynamic WordPress site showcasing bikes, e-bikes, accessories, and repair services with an emphasis on clear, browsable product presentation.',
    description:
      'A dynamic website built for a community-driven bike shop, showcasing bikes, e-bikes, accessories, and repair services. Designed to highlight trusted brands, simplify browsing, and connect riders with everything they need to get rolling.',
    technologies: ['WordPress', 'Elementor Pro', 'WooCommerce'],
    url: 'https://thepedalshackodon.com/',
    image: pedalShackCard,
    mockupImage: pedalShackHero,
    featured: true,
  },
  {
    slug: 'daviess-county-rural-water',
    name: 'Daviess County Rural Water',
    category: 'Utility / Public Service',
    status: 'Live',
    role: 'WordPress Developer',
    results:
      'A reliable, easy-to-navigate resource for residents to find service and water quality information.',
    business: 'A rural water utility provider serving the local community.',
    goal: 'Clearly present essential services, infrastructure updates, and customer resources with a strong sense of trust.',
    contribution:
      'Built a reliable, information-focused WordPress site communicating service coverage and water quality standards for residents.',
    description:
      'A reliable, information-focused website built to communicate trust, service coverage, and water quality standards. Designed to clearly present essential services, infrastructure updates, and customer resources for the community.',
    technologies: ['WordPress', 'Elementor Pro'],
    url: 'https://dcrws.com/',
    image: daviessCountyRuralWaterCard,
    mockupImage: daviessCountyRuralWaterHero,
  },
  {
    slug: 'heritage-lux-cabinetry',
    name: 'Heritage Lux Cabinetry',
    category: 'Custom Furniture / Craftsmanship',
    status: 'Live',
    role: 'WordPress Developer',
    results:
      "A refined showcase that reflects the brand's craftsmanship and quality from first impression onward.",
    business: 'A custom cabinetry and furniture maker specializing in handcrafted work.',
    goal: "Showcase the brand's process, partnerships, and commitment to quality from concept to completion.",
    contribution:
      'Built a refined WordPress site blending timeless craftsmanship with modern aesthetics to showcase custom cabinetry and handcrafted furniture.',
    description:
      'A refined website designed to showcase custom cabinetry and handcrafted furniture, blending timeless craftsmanship with modern aesthetics. Built to highlight the brand’s process, partnerships, and commitment to quality from concept to completion.',
    technologies: ['WordPress', 'Elementor Pro'],
    url: 'https://heritageluxcabinetry.com/',
    image: heritageLuxCabinetryCard,
    mockupImage: heritageLuxCabinetryHero,
    featured: true,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
