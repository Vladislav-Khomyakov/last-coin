export default class LastcoinService {
    _localApiBase = 'http://localhost:3033/';

    getResources = async (url) => {
        return await new Promise((resolve) => {
            fetch(`${this._localApiBase}${url}`)
                .then((response) => response.json())
                .then((body) => {
                    //console.log('1', body);
                    resolve(body)
                });
        })
    };

    getPersonCashAccount = async (id) => {
        const res = await this.getResources(`profile/${id}`);
        //console.log('2', res);
        return await res;
    };

    // _transformPersonCashAccount = (cashAccount) => {
    //     return {
    //         id: cashAccount.id,
    //         firstName: cashAccount.firstName,
    //         lastName: cashAccount.lastName,
    //         email: cashAccount.email,
    //         cardCash: cashAccount.cardCash,
    //         walletCash: cashAccount.walletCash
    //     };
    // };
};
