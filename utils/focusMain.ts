/**
 * Enfoca en el elemento principal (main)
 */
export const focusMainElement = () => {
  const mainElement = document.querySelector('main') as HTMLDivElement;
  if (!mainElement) return;
  mainElement.focus();
};
