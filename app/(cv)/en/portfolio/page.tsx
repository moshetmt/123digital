import type { Metadata } from 'next'
import { CvPage } from '@/components/cv/CvPage'

// Recruiter-only page: noindex, absent from the sitemap, not linked from the
// site. Do not remove `robots`, do not add it to the sitemap or the footer.
export const metadata: Metadata = {
  title: 'Maurice Timsit · Resume and portfolio',
  robots: { index: false, follow: false },
}

export default function Page() {
  return <CvPage locale="en" />
}
