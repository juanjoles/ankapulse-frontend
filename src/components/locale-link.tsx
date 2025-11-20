'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

export function LocaleLink({ 
  href, 
  children, 
  ...props 
}: React.ComponentProps<typeof Link>) {
  const params = useParams();
  const locale = params?.locale || 'es';
  
  // Agregar locale al href si no lo tiene
  const localizedHref = href.toString().startsWith('/') && !href.toString().startsWith(`/${locale}`)
    ? `/${locale}${href}`
    : href;
  
  return <Link href={localizedHref} {...props}>{children}</Link>;
}