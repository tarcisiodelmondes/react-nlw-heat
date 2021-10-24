type ToMarkerPerson = {
  text: string;
};

export function ToMarkerPerson({ text }: ToMarkerPerson) {
  function markerPerson(text: string) {
    const textCut = text.split(" ");
    const textWithMarked = textCut.map((txt) => {
      if (txt.match(/['@']/)) {
        const textStyled = `<span class="markedPerson">${txt}</span>`;

        return textStyled;
      }

      return txt;
    });

    return textWithMarked.join(" ");
  }

  const newText = markerPerson(text);
  console.log(text);

  return <p dangerouslySetInnerHTML={{ __html: newText }}></p>;
}
