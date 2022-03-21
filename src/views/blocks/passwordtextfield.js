import passwordtextfield from "../../assets/passwordtextfield.svg";
import styled from "styled-components";
import Wrapper from "../../utils/wrapper";

const Container = styled.div`
  width: 100%;
  & > input {
    pointer-events: none;
    color: ${(props) => props.textColor};
    background-color: ${(props) => props.backgroundColor};
    box-sizing: border-box;
    text-align: ${(props) => props.textAlignment};
    & ::placeholder {
      color: ${(props) => props.placeholderColor};
    }
  }
`;

const Component = (props) => {
  const { placeholder, text } = props.settingsUI;
  return (
    <Wrapper id={props.id}>
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
  defaultData: {
    placeholder: "Логин",
    placeholderColor: "#7F7F7F",
    text: "neo",
    textColor: "#000000",
    backgroundColor: "#FFFFFF",
    textAlignment: "LEFT",
  },
  config: {
    placeholder: { type: "string", name: "Placeholder" },
    placeholderColor: { type: "color", name: "Placeholder color" },
    text: { type: "string", name: "Text" },
    textAlignment: { type: "string", name: "Text alignment" },
    textColor: { type: "color", name: "Text color" },
    backgroundColor: { type: "color", name: "Background color" },
  },
};

export default block;
