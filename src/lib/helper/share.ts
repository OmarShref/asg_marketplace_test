export function share(content: string) {
  if (navigator.share) {
    navigator
      .share({
        // text: "Please read this great article: ",
        url: content,
      })
      .then(() => {
        // console.log("Thanks for sharing!");
      })
      .catch((err) => console.error(err));
  } else {
    // Fallback
    alert(
      "The current browser does not support the share function. Please, manually share the link",
    );
  }
}
