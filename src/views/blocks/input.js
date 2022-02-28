import { makeid } from "../../utils/prepareModel";
import "./common.css";

const Component = (props) => {
  const { placeholder, placeholderColor, text, textColor, backgroundColor } =
    props.data;
  let id = makeid(5);
  return (
    <>
      <input
        {...props}
        type="text"
        className="form-control draggable"
        placeholder={placeholder}
        value={text}
        style={{
          color: textColor,
          backgroundColor,
        }}
      />
      <style>
        {`#${id}::placeholder {
      color: ${placeholderColor}
    };`}
      </style>
    </>
  );
};

const block = {
  Component,
  name: "BASICTEXTFIELD",
  previewImageUrl: "",
  category: "Controls",
  defaultData: {
    placeholder: "Логин",
    placeholderColor: "#7F7F7F",
    text: "neo",
    textColor: "#000000",
    backgroundColor: "#FFFFFF",
  },
  config: {
    placeholder: { type: "string", name: "Placeholder" },
    placeholderColor: { type: "color", name: "Placeholder color" },
    text: { type: "string", name: "Text" },
    textColor: { type: "color", name: "Text color" },
    backgroundColor: { type: "color", name: "Background color" },
  },
};

export default block;
