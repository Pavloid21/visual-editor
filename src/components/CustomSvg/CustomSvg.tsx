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
  const [sizeSvg, setSizeSvg] = useState<string>(`${40 * 1.25}px`);

  if(src === undefined) {
    setSizeSvg('');
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
        width={sizeSvg}
        height={sizeSvg}
      />
    );
  }
  return null;
};

export default CustomSvg;
