export interface IComponent {
  styles?: string;
}

export interface ISelect {
  name: string;
  labelText: string;
  selectChangeHandler: (name: string, value: string) => void;
}
