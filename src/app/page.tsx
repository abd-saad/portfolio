import { HeroSection, SkillsSection, ContactSection, ExperienceSection, ProjectSection, CertificationSection } from '@/sections';
import { getHomepage } from '@/services/homepage'
import { THomepage } from '@/types/homepage'

export default async function Home() {
  const homepage = await getHomepage();
  return (
    <>
      {homepage.map((homepageItem) => renderHomepage(homepageItem))}
    </>
  )
}

const renderHomepage = (homepage: THomepage) => {
  console.log('Rendering homepage section:', homepage.section_type);
  switch (homepage.section_type) {
    case 'hero':
      return <HeroSection key={homepage.id} content={homepage} />;
    case 'skills':
      return <SkillsSection key={homepage.id} content={homepage} />;
    case 'experience':
      return <ExperienceSection key={homepage.id} content={homepage} />;
    case 'projects':
      return <ProjectSection key={homepage.id} content={homepage} />;
    case 'certifications':
      return <CertificationSection key={homepage.id} content={homepage} />;
    case 'contact':
      return <ContactSection key={homepage.id} content={homepage} />;
    default:
      return null;
  }
};