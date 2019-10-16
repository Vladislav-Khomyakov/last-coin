export default class lastcoinService {
    _localApiBase = 'http://localhost:3033/posts/';

    getResources = async (url) => {
        const res = await fetch(`${this._localApiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}` +
                `, received ${res.status}`)
        }

        return await res.json();
    };

}
