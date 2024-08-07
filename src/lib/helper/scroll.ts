import useUtilityStore from "../data/stores/UtilityStore";

export function hideShowOnScroll({
  elementId,
  topBefore = "0",
  topAfter = "-100%",
}: {
  elementId: string;
  topBefore?: string;
  topAfter?: string;
}) {
  const element = document.getElementById(elementId);
  if (element && window) {
    let prevScrollpos = window.scrollY;
    window.addEventListener("scroll", function () {
      let currentScrollPos = window.scrollY;
      if (prevScrollpos >= currentScrollPos) {
        element.style.top = topBefore;
      } else {
        element.style.top = topAfter;
      }
      prevScrollpos = currentScrollPos;
    });
  }
}

export function handleExpandedSearch() {
  if (typeof window !== "undefined") {
    window.onscroll = () => {
      if (window.scrollY >= 254) {
        useUtilityStore.setState({
          headerOptions: {
            showHeader: true,
            withBackButton: true,
            withLogo: false,
            withSearch: true,
            searchExpanded: true,
            withBurgerButton: true,
            withWishlist: true,
          },
        });
      } else {
        useUtilityStore.setState({
          headerOptions: {
            showHeader: true,
            withBackButton: true,
            withLogo: true,
            withSearch: true,
            searchExpanded: false,
            withBurgerButton: true,
            withWishlist: true,
          },
        });
      }
    };
  }
}
