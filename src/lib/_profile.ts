import { NextApiResponse } from 'next';
import { myProfilePath } from './apiPaths';


export async function getMyprofile() {
    let res : Response;
    try {
        res = await fetch(`${myProfilePath}`, {
            method: 'GET',
            cache: 'no-cache',
        });
    } catch (error) {
        console.log("error happend !",error)
    }
    const data = await res.json();
    console.log("data in action:",data)
    // return await res.json();
}