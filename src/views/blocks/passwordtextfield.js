import passwordtextfield from "../../assets/passwordtextfield.svg";
import styled from "styled-components";
import Wrapper from "../../utils/wrapper";

const Container = styled.div`
  width: ${(props) => (props.size?.width ? props.size?.width + "px" : "100%")};
  height: ${(props) =>
    props.size?.height ? props.size?.height + "px" : "auto"};
  & > input {
    pointer-events: none;
    color: ${(props) => props.textColor};
    background-color: ${(props) => props.backgroundColor};
    box-sizing: border-box;
    text-align: ${(props) => props.textAlignment};
    font-size: ${(props) => props.fontSize}px;
    & ::placeholder {
      color: ${(props) => props.placeholderColor};
    }
  }
`;

const Component = (props) => {
  const { placeholder, text, alignment } = props.settingsUI;
  return (
    <Wrapper id={props.id} style={{ alignItems: alignment }}>
      <Container className="draggable" {...props} {...props.settingsUI}>
        <input
          {...props}
          type="password"
          className="form-control"
          placeholder={placeholder}
          value={text}
        />
      </Container>
    </Wrapper>
  );
};

const block = {
  Component,
  name: "PASSWORDTEXTFIELD",
  title: "PasswordField",
  description: "A control into which the user securely enters private text.",
  previewImageUrl: passwordtextfield,
  category: "Controls",
  defaultInteractiveOptions: {
    field: "field_name",
  },
  defaultData: {
    placeholder: "Логин",
    placeholderColor: "#7F7F7F",
    text: "neo",
    textColor: "#000000",
    backgroundColor: "#FFFFFF",
    textAlignment: "LEFT",
    fontSize: 16,
    alignment: "LEFT",
    size: {
      width: "",
      height: "",
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
    alignment: { type: "string", name: "Alignment" },
    size: {
      width: { type: "number", name: "Width" },
      height: { type: "number", name: "Height" },
    },
  },
  interactive: {
    field: { type: "string", name: "Field name" },
  },
};

export default block;
