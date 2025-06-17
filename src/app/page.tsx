import { ContactSection } from '@/sections/ContactSection';
import { HeroSection } from '@/sections/HeroSection'
import { getHomepage } from '@/services/homepage'
import { THomepage } from '@/types/homepage'

export default async function Home() {
  const homepage = await getHomepage();
  return (
    <>
      {homepage.map((homepage) => renderHomepage(homepage))}
      <ContactSection/>
    </>
  )
}

const renderHomepage = (homepage: THomepage) => {
  switch (homepage.section_type) {
    case 'hero':
      return <HeroSection key={homepage.id} content={homepage}/>;
    default:
      return null;
  }
};