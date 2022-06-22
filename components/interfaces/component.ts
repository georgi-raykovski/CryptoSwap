export interface IComponent {
  styles?: string;
}

export interface ISelect {
  name: string;
  labelText: string;
  id: string;
  selectChangeHandler: (name: string, value: string) => void;
}
