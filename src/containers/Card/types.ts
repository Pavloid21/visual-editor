export type TCardProps = {
  id: string;
  name: string;
  description: string;
  icon: string;
  onClick?: (event: React.MouseEvent) => void;
  onDelete: (id: string) => void;
};
