import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Wrapper = styled.div`
  filter: drop-shadow(1px 0px 0px #bbc0c5) drop-shadow(-1px 0px 0px #bbc0c5)
    drop-shadow(0px 1px 0px #bbc0c5) drop-shadow(0px -1px 0px #bbc0c5)
    drop-shadow(1px 1px 0px #bbc0c5) drop-shadow(-1px -1px 0px #bbc0c5)
    drop-shadow(-1px 1px 0px #bbc0c5) drop-shadow(1px -1px 0px #bbc0c5);
`;

const IphoneX = (props) => {
  const appBar = useSelector((state) => state.layout.appBar);
  return (
    <>
      <Wrapper>
        <div
          style={{
            position: "absolute",
            width: "436px",
            height: "836px",
            borderRadius: "37px",
            overflow: "hidden",
            padding: "56px 30px 0px 30px",
            backgroundColor: appBar
              ? appBar.data.backgroundColor
              : "rgb(255, 255, 255)",
            clipPath: "url(#maskRect1)",
          }}
        >
          {props.children}
        </div>
      </Wrapper>
      <svg
        width="437"
        height="860"
        viewBox="0 0 437 860"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="16.4998"
          y="9.5"
          width="404"
          height="841"
          rx="46.5"
          stroke="#BBC0C5"
          strokeWidth="3"
        />
        <rect
          x="8.49994"
          y="1.5"
          width="420"
          height="857"
          rx="50.5"
          stroke="#BBC0C5"
          strokeWidth="3"
        />
        <path
          d="M8.5 177V175.5H7C3.96243 175.5 1.5 177.962 1.5 181L1.5 213C1.5 216.038 3.96243 218.5 7 218.5H8.5V217V177Z"
          stroke="#BBC0C5"
          strokeWidth="3"
        />
        <path
          d="M8.5 233V231.5H7C3.96243 231.5 1.5 233.962 1.5 237L1.5 269C1.5 272.038 3.96243 274.5 7 274.5H8.5V273L8.5 233Z"
          stroke="#BBC0C5"
          strokeWidth="3"
        />
        <path
          d="M8.5 289V287.5H7C3.96243 287.5 1.5 289.962 1.5 293L1.5 325C1.5 328.038 3.96243 330.5 7 330.5H8.5V329L8.5 289Z"
          stroke="#BBC0C5"
          strokeWidth="3"
        />
        <path
          d="M428.5 221V219.5H430C433.038 219.5 435.5 221.962 435.5 225V281C435.5 284.038 433.038 286.5 430 286.5H428.5V285V221Z"
          stroke="#BBC0C5"
          strokeWidth="3"
        />
        <mask id="path-7-inside-1_58_22" fill="white">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M70.9998 24C48.9085 24 30.9998 41.9086 30.9998 64L30.9998 796C30.9998 818.091 48.9085 836 70.9999 836H366C388.091 836 406 818.091 406 796V64C406 41.9086 388.091 24 366 24L70.9998 24ZM312.5 32.0001V24.0001L125 24.0001V32.0001C125 45.2549 135.745 56.0001 149 56.0001H288.5C301.755 56.0001 312.5 45.2549 312.5 32.0001Z"
          />
        </mask>
        <clipPath id="maskRect1">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M70.9998 24C48.9085 24 30.9998 41.9086 30.9998 64L30.9998 796C30.9998 818.091 48.9085 836 70.9999 836H366C388.091 836 406 818.091 406 796V64C406 41.9086 388.091 24 366 24L70.9998 24ZM312.5 32.0001V24.0001L125 24.0001V32.0001C125 45.2549 135.745 56.0001 149 56.0001H288.5C301.755 56.0001 312.5 45.2549 312.5 32.0001Z"
          />
        </clipPath>
        <path
          d="M312.5 24.0001H315.5V21.0001H312.5V24.0001ZM125 24.0001V21.0001H122V24.0001H125ZM33.9998 64C33.9998 43.5655 50.5653 27 70.9998 27V21C47.2516 21 27.9998 40.2518 27.9998 64H33.9998ZM33.9998 796L33.9998 64H27.9998L27.9998 796H33.9998ZM70.9999 833C50.5653 833 33.9998 816.434 33.9998 796H27.9998C27.9998 819.748 47.2516 839 70.9999 839V833ZM366 833H70.9999V839H366V833ZM403 796C403 816.434 386.434 833 366 833V839C389.748 839 409 819.748 409 796H403ZM403 64V796H409V64H403ZM366 27C386.434 27 403 43.5655 403 64H409C409 40.2518 389.748 21 366 21V27ZM70.9998 27L366 27V21L70.9998 21V27ZM309.5 24.0001V32.0001H315.5V24.0001H309.5ZM125 27.0001L312.5 27.0001V21.0001L125 21.0001V27.0001ZM128 32.0001V24.0001H122V32.0001H128ZM149 53.0001C137.402 53.0001 128 43.598 128 32.0001H122C122 46.9118 134.088 59.0001 149 59.0001V53.0001ZM288.5 53.0001H149V59.0001H288.5V53.0001ZM309.5 32.0001C309.5 43.598 300.098 53.0001 288.5 53.0001V59.0001C303.411 59.0001 315.5 46.9118 315.5 32.0001H309.5Z"
          fill="#BBC0C5"
          mask="url(#path-7-inside-1_58_22)"
        />
        <rect
          x="188.5"
          y="33.5"
          width="61"
          height="5"
          rx="2.5"
          stroke="#BBC0C5"
          strokeWidth="3"
        />
        <circle cx="271" cy="36" r="2.5" stroke="#BBC0C5" strokeWidth="3" />
      </svg>
    </>
  );
};

export default IphoneX;
