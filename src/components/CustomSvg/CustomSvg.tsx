import {useEffect, useState} from "react";
import {getSrcImageSvg} from "services/ApiService";
import {CustomSvgStyled} from "./CustomSvg.styled";

interface ICustomSvg {
  src: string;
  fill: string;
}

const CustomSvg = ({src, fill}: ICustomSvg) => {
  const [svgTemplate, setSvgTemplate] = useState<string>('');
  const [isLoader, setIsLoader] = useState<boolean>(false);

  useEffect(() => {
    getSrcImageSvg(src).then((res) => {
      setSvgTemplate(res.data);
      setIsLoader(true);
    });
  }, [src]);

  if(isLoader && svgTemplate) {
    return (
      <CustomSvgStyled dangerouslySetInnerHTML={{__html: svgTemplate}} fill={fill} />
    );
  }
  return null;
};

export default CustomSvg;
