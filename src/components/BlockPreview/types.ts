export type TBlockPreview = {
  mode: string;
  key: string;
  title: string;
  description: string;
  blockId: string;
  type: string;
  image: string;
  onPushBlock: (arg: string) => void;
  onPushBlockInside: (blockId: string, uuid: string) => void;
  name?: string;
};
