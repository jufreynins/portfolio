import type { Metadata } from 'next';
import ToolPageChrome from '@/components/tools/ToolPageChrome';
import LaunchChecklist from '@/components/tools/LaunchChecklist';
import { siteConfig } from '@/config/site';
import { getToolById } from '@/data/tools';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: `Website Launch Checklist | ${siteConfig.name}`,
  description: 'Build a project-specific checklist for website launches, migrations, redesigns, and staging-to-production releases.',
  canonical: `${siteConfig.url}/tools/website-launch-checklist`,
});

const tool = getToolById('website-launch-checklist')!;

const guideTips = [
  "Switching project type changes which items are shown by default — anything you've already checked stays checked.",
  'Add custom items to any category for launch requirements specific to this project.',
  'Progress is saved in this browser only, so it will still be here if you close the tab and come back.',
  'Print or export the checklist to share it with a client or teammate as a launch record.',
];

export default function WebsiteLaunchChecklistPage() {
  return (
    <ToolPageChrome
      tool={tool}
      subtitle="Build a project-specific checklist for website launches, migrations, redesigns, and staging-to-production releases."
      guideTips={guideTips}
      cta={{
        eyebrow: 'Want someone else running this checklist?',
        title: 'Need hands-on help with your launch?',
        description: 'I handle launches, migrations, and staging-to-production releases end to end.',
      }}
    >
      <LaunchChecklist />
    </ToolPageChrome>
  );
}
