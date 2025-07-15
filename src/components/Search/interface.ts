export default interface FormProps {
  value: string;
  onSearch: (term: string) => void;
  onChange: (value: string) => void;
}
