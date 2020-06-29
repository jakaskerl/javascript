/* 
Query Handler transforms the input query into a SQL statement that is passed 
to the database through app.js
*/

const queryHandler = (street=null, label=null) => {
    let streetQuery;
    let labelQuery;
    if (street) {
        streetQuery = street.toLowerCase().trim();
    } else {
        streetQuery = "s";
    }
    if (label) {
        labelQuery = ` AND LOWER(labela) LIKE '${label.toLowerCase().trim()}%'`;
    } else {
        labelQuery = "";
    }
    return `SELECT ul_ime, labela, na_ime,
    ob_ime, pt_ime, pt_idx, cen_n, cen_e FROM fulldata WHERE LOWER(ul_ime) LIKE '%${streetQuery}%'${labelQuery};`
}

/*
Reponse handler arranges the database response in a more legible 
and usable arrays that is later displayed as a response to initial request

fullAddress variable represents the standardized address
*/
const responseHandler = (dbResponse) => {
    resArray = {}
    for (i = 0; i < dbResponse.length; i++) {
        let rawObj = dbResponse[i];
        let fullAddress = `${rawObj.ul_ime.trim()} ${rawObj.labela.trim()}, ${rawObj.pt_idx} ${rawObj.ob_ime.trim()}, Slovenia`
        let resObj = {
        thoroughfareName : `${rawObj.ul_ime.trim()}`,
        objectLabel : `${rawObj.labela.trim()}`,
        localityName : `${rawObj.na_ime.trim()}`,
        municipalityName : `${rawObj.ob_ime.trim()}`, 
        postalCode : `${rawObj.pt_idx}`,
        coordinates : `${rawObj.cen_e}, ${rawObj.cen_n}`,
        }
        resArray[fullAddress] = resObj;
    }
    return resArray;
}

module.exports.queryHandler = queryHandler;
module.exports.responseHandler = responseHandler;