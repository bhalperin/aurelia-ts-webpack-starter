export class UpperValueConverter {
	public toView(value: string): string {
		return value && value.toUpperCase();
	}
}
