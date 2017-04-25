export class UpperValueConverter {
	toView(value: string): string {
		return value && value.toUpperCase();
	}
}
