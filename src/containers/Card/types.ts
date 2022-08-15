export type TCardProps = {
  id: string;
  name: string;
  description: string;
  icon: string;
  platform?: Record<string, boolean> & {
    ios: boolean;
    android: boolean;
    aurora: boolean;
  };
  onClick?: (event: React.MouseEvent) => void;
  onDelete: (id: string) => void;
  onChangeState: () => void;
};
