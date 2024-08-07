type ScrollToType = {
  id: string;
  behavior?: ScrollBehavior;
  block?: ScrollLogicalPosition;
  inline?: ScrollLogicalPosition;
};
export function scrollToId({ id, behavior, block, inline }: ScrollToType) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({
      behavior: behavior ?? "smooth",
      block: block ?? "center",
      inline: inline ?? "nearest",
    });
  }
}
