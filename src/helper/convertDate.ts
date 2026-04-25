export const convertDate = (dateString: string | null): string => {
  if (!dateString) return 'Present';
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short' };
  return date.toLocaleDateString('en-US', options);
};