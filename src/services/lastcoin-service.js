export default class LastcoinService {
    _localApiBase = 'http://localhost:3033/';
    _globalApiCbr = 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml';
    _proxyCors = 'https://cors-anywhere.herokuapp.com/';

    getProfileResources = async (url) => {
        return await new Promise((resolve) => {
            fetch(`${this._localApiBase}${url}`)
                .then((response) => response.json())
                .then((body) => {
                    //console.log('1', body);
                    resolve(body)
                })
                .catch((() => console.log("getProfileResources error")));
        });
    };

    getPersonCashAccount = async (id) => {
        const res = await this.getProfileResources(`profile/${id}`);
        //console.log('2', res);
        return await res;
    };

    getExchangeRates = async () => {
        const res = await Promise((resolve) => {
            fetch(this._proxyCors + this._globalApiCbr)
                .then((response) => response.text())
                .then((data) => console.log(data))
                .catch((() => console.log("getExchangeRates error")))
        }
        console.log(res);

    };

    getRequiredExchangeRates = async () => {
        const res = await this.getExchangeRates();
        console.log('ER res', res);
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(res, "text/xml");
        return console.log("XML", xmlDoc);
    }

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
