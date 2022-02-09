export default function getRawTextFromRichText(content, overflow) {
  //Map the Blocks
  const newBlocks = [];
  for (let i = 0; i < content.blocks.length; i++) {
    if (i < overflow) {
      const block = content.blocks[i];

      //Get Text
      const text = block.text;

      //Get Styles
      const style = "none";

      for (let j = 0; j < block.inlineStyleRanges.length; j++) {
        const new_style = block.inlineStyleRanges[j].style;
        if (new_style === "BOLD" && style === "none") {
          style = "bold";
        }
        if (new_style === "BOLD" && style === "underline") {
          style = "bold underline";
        }
        if (new_style === "UNDERLINE" && style === "none") {
          style = "underline";
        }
        if (new_style === "UNDERLINE" && style === "bold") {
          style = "bold underline";
        }
      }

      //Create newBlock
      const newBlock = {
        style: style,
        text: text,
      };

      newBlocks.push(newBlock);
    }
  }

  console.log(newBlocks);
  return newBlocks;
}
