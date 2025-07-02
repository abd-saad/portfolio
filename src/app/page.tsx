import { HeroSection, SkillsSection, ContactSection, ExperienceSection, ProjectSection, CertificationSection } from '@/sections';
import { getHomepage } from '@/services/homepage'
import { THomepage } from '@/types/homepage'

export default async function Home() {
  const homepage = await getHomepage();
  return (
    <>
      {homepage.map((homepageItem) => renderHomepage(homepageItem))}
      <ContactSection content={homepage.find((item) => item.section_type === 'contact') ?? {}} />
    </>
  )
}

const renderHomepage = (homepage: THomepage) => {
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
    default:
      return null;
  }
};