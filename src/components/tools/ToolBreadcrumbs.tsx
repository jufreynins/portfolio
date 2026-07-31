interface ToolBreadcrumbsProps {
  category: string;
  title: string;
}

export default function ToolBreadcrumbs({ category, title }: ToolBreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs" style={{ color: 'var(--text-muted)' }}>
      <a href="/tools" className="hover:underline" style={{ color: 'var(--text-secondary)' }}>
        Tools
      </a>
      <span aria-hidden="true">/</span>
      <span>{category}</span>
      <span aria-hidden="true">/</span>
      <span aria-current="page" style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
        {title}
      </span>
    </nav>
  );
}
