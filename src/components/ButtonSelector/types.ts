export interface IButtonSelector {
    label?: string;
    buttons: IButton[];
    onChange: (button: string) => void;
    value: string;
}

export interface IButton {
    title: string;
    key: string;
    uuid: string;
}