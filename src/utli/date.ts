import differenceInMinutes from "date-fns/differenceInMinutes";

export default function dateConverter(date: Date): string {
	const currentDate = new Date();

	const diffMinutes = Math.abs(differenceInMinutes(currentDate, date));
	if (diffMinutes >= 525600) {
		const years = Math.floor(diffMinutes / 525600);
		if (years === 1) {
			return `${years} year ago`;
		}
		return `${years} years ago`;
	}
	if (diffMinutes >= 1440 * 30) {
		const months = Math.floor(diffMinutes / (1440 * 30));
		if (months === 1) {
			return `${months} month ago`;
		}
		return `${months} months ago`;
	}
	if (diffMinutes >= 1440) {
		const days = Math.floor(diffMinutes / 1440);
		if (days === 1) {
			return `${days} day ago`;
		}
		return `${days} days ago`;
	}
	if (diffMinutes >= 60) {
		const hours = Math.floor(diffMinutes / 60);
		if (hours === 1) {
			return `${hours} hour ago`;
		}
		return `${hours} hours ago`;
	}
	if (diffMinutes === 1) {
		return `${diffMinutes} minute ago`;
	}
	if (diffMinutes > 1) {
		return `${diffMinutes} minutes ago`;
	}
	return "Now";
}
