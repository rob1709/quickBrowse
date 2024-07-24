export class BookmarkDynamicPlaceholder {
    public readonly placeholder: string;
    public readonly value: string;

    public constructor(placeholder: string, value: string) {
        this.placeholder = placeholder;
        this.value = value;
    }
}