export const SetHighlightsToLocalStorage = (highlights: any) => {
  localStorage.setItem("highlights", JSON.stringify(highlights));
};
