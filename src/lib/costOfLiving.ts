require('dotenv').config()

export async function getCostOfLiving(city : string) {
    const encodedParams = new URLSearchParams();
    encodedParams.set('cities', `[{"name":"${city}","country":"Poland"}]`);
    encodedParams.set('currencies', '["EUR"]');

    const url = 'https://cities-cost-of-living1.p.rapidapi.com/get_cities_details_by_name';
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': process.env.RAPID_API_KEY, 
            'X-RapidAPI-Host': 'cities-cost-of-living1.p.rapidapi.com'
        },
        body: encodedParams
    };


    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}