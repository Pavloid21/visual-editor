import {useEffect, useState} from "react";
import {getSrcImageSvg} from "services/ApiService";
import {CustomSvgStyled} from "./CustomSvg.styled";

interface ICustomSvg {
  src: string;
  fill: string;
  sizeSvg?: string;
}

const CustomSvg = ({src, fill, sizeSvg}: ICustomSvg) => {
  const [svgTemplate, setSvgTemplate] = useState<string>('');
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [size, setSize] = useState<string>(sizeSvg || '');

  if(src === undefined) {
    setSize('');
  }

  useEffect(() => {
    getSrcImageSvg(src).then((res) => {
      setSvgTemplate(res.data);
      setIsLoader(true);
    });
  }, [src]);

  if(isLoader && svgTemplate) {
    return (
      <CustomSvgStyled
        dangerouslySetInnerHTML={{__html: svgTemplate}}
        fill={fill}
        width={size}
        height={size}
      />
    );
  }
  return null;
};

export default CustomSvg;
