declare module 'react-easy-panzoom' {
    interface PanZoom extends React.ReactElement {
      zoomIn(zoomSpeed?: number): void;
      zoomOut(zoomSpeed?: number): void;
      autoCenter(zoom: number, animate?: boolean = true): void;
      reset(): void;
      moveByRatio(x: number, y: number, moveSpeedRatio?: number): void;
      rotate(angle: number | ((prevAngle: number) => number)): void;
    }
  
    export interface OnStateChangeData {
      x: number;
      y: number;
      scale: number;
      angle: number;
    }
  
    function PanZoom(props: {
      autoCenter?: boolean;
      autoCenterZoomLevel?: number;
      zoomSpeed?: number;
      doubleZoomSpeed?: number;
      disabled?: boolean;
      disableKeyInteraction?: boolean;
      disableDoubleClickZoom?: boolean;
      disableScrollZoom?: boolean;
      realPinch?: boolean;
      minZoom?: number;
      keyMapping?: { [key: string]: { x: number; y: number; z: number } };
      maxZoom?: number;
      enableBoundingBox?: boolean;
      boundaryRatioVertical?: number;
      boundaryRatioHorizontal?: number;
      noStateUpdate?: boolean;
      onPanStart?: (event: React.MouseEvent) => void;
      onPan?: (event: React.MouseEvent) => void;
      onPanEnd?: (event: React.MouseEvent) => void;
      preventPan?: (event: React.MouseEvent, x: number, y: number) => boolean;
      style?: React.StyleHTMLAttributes;
      onStateChange?: (data: OnStateChangeData) => void;
      children: React.ReactNode;
    } & React.ReactElementProps): React.ReactElement;
  }