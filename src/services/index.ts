import 'server-only';
import { getHomepage } from './homepage';
import { getProfileImage } from './hero';
import { getExperiences } from './experience';
import { getProjects } from './experience';
import { getSkillCategoriesWithSkills } from './skills';
import { fetchSocialLinks } from './socialLinks';
import { getCertifications } from './certifications';
import { getFeaturedSolutions, getSolutions, getSolutionBySlug } from './solutions';
import { getLatestBlogPosts, getBlogPosts, getBlogPostBySlug } from './blog';

export {
  getHomepage,
  getExperiences,
  getProjects,
  getSkillCategoriesWithSkills,
  fetchSocialLinks,
  getCertifications,
  getProfileImage,
  getFeaturedSolutions,
  getSolutions,
  getSolutionBySlug,
  getLatestBlogPosts,
  getBlogPosts,
  getBlogPostBySlug,
};
