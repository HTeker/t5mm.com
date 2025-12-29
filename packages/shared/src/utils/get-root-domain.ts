const getRootDomain = (origin: string) => {
	const hostname = new URL(origin).hostname;
	return hostname === 'localhost' ? hostname : hostname.split('.').slice(-2).join('.');
}

export default getRootDomain