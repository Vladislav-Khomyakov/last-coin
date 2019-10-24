export default class LastcoinService {
    _localApiBase = 'http://localhost:3033/';
    _globalApiCbr = 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml';
    _proxyCors = 'https://cors-anywhere.herokuapp.com/';

    getProfileResources = async (url) => {
        return await new Promise((resolve) => {
            fetch(`${this._localApiBase}${url}`)
                .then((response) => response.json())
                .then((body) => resolve(body))
                .catch((() => console.log("getProfileResources error")));
        });
    };

    getPersonCashAccount = async (id) => {
        const res = await this.getProfileResources(`profile/${id}`);
        //console.log('2', res);
        return await res;
    };

    getExchangeRates = async () => {
        const xmlString = await fetch(this._proxyCors + this._globalApiCbr)
            .then((response) => response.text())
            .then((body) => body)
            .catch((() => console.log("getExchangeRates error")));
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, "text/xml");
        const rateRegExp = /"([0-9]*\.[0-9]*)"\/>$/;
        //console.log("xmlDoc", xmlDoc);
        //console.log('getExchangeRates - XML', typeof(xmlDoc));
        const eurRates = xmlDoc.getElementsByTagName('Cube')[16].outerHTML.match(rateRegExp)[1];
        const usdRates = xmlDoc.getElementsByTagName('Cube')[2].outerHTML.match(rateRegExp)[1];
        //console.log("Pars res", usdRates);
        return {
            eurRates: eurRates,
            usdRates: usdRates
        };
    };

    // getRequiredExchangeRates = async () => {
    //     const xmlString = await this.getExchangeRates();
    //     console.log('ER res', xmlString);
    //     const parser = new DOMParser();
    //     const xmlDoc = parser.parseFromString(xmlString, "text/xml");
    //     console.log("XML", xmlDoc);
    // };

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
