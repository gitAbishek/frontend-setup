export interface MenuCategoryModalProps {
  visible: boolean;
  isPending: boolean;
  onClose: () => void;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  handleDelete: () => void;
  title: string;
}
