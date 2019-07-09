import FontFaceObserver from "fontfaceobserver";

const Fonts = () => {
  const montserrat = new FontFaceObserver("montserrat");

  montserrat.load().then(() => {
    document.documentElement.classList.add("montserrat-loaded");
  });
}

export default Fonts;