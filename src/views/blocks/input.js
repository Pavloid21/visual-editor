import text from "../../assets/text.svg";
import styled from "styled-components";
import Wrapper from "../../utils/wrapper";

const Input = styled.div`
  color: ${(props) => props.textColor};
  background-color: ${(props) => props.backgroundColor};
  display: flex;
  align-items: center;
  border: 1px solid var(--neo-gray);
  padding: 4px 12px;
  text-align: ${(props) => props.textAlignment};
  width: ${(props) => (props.size?.width ? props.size?.width + "px" : "100%")};
  height: ${(props) =>
    props.size?.height ? props.size?.height + "px" : "auto"};
  & > span {
    font-size: ${(props) => props.fontSize}px;
  }
  & > .placeholder {
    color: ${(props) => props.placeholderColor};
  }
`;

const Component = ({ data, ...props }) => {
  return (
    <Wrapper id={props.id}>
      <Input {...props} {...data}>
        {!data.text && data.placeholder && (
          <span className="placeholder">{data.placeholder}</span>
        )}
        {data.text && <span>{data.text}</span>}
      </Input>
    </Wrapper>
  );
};

const block = {
  Component,
  name: "BASICTEXTFIELD",
  title: "Text",
  description:
    "Filled text fields have more visual emphasis than outlined text fields, making them stand out when surrounded by other content and components.",
  previewImageUrl: text,
  category: "Controls",
  defaultData: {
    placeholder: "Логин",
    placeholderColor: "#7F7F7F",
    text: "neo",
    textAlignment: "LEFT",
    textColor: "#000000",
    backgroundColor: "#FFFFFF",
    fontSize: 16,
    size: {
      width: "",
      height: 48,
    },
  },
  config: {
    placeholder: { type: "string", name: "Placeholder" },
    placeholderColor: { type: "color", name: "Placeholder color" },
    text: { type: "string", name: "Text" },
    textAlignment: { type: "string", name: "Text alignment" },
    textColor: { type: "color", name: "Text color" },
    backgroundColor: { type: "color", name: "Background color" },
    fontSize: { type: "number", name: "Font size" },
    size: {
      width: { type: "number", name: "Width" },
      height: { type: "number", name: "Height" },
    },
  },
};

export default block;
