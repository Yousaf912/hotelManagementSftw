import { onValue, ref, set, remove } from "firebase/database";
import { database } from "./firebaseConfig";


export const sendData = (name: any, data: any, id?: any,nam?:any) => {
    const reference = ref(database, nam ? `${name}/${id}/${nam}` :`${name}/${id}` );
    return set(reference, data)
        .then(() => {
            console.log('Data written successfully');
        })
        .catch((error) => {
            console.error('Error writing data:', error);
            throw error; 
        });
};


export const getData = (name: string) => {
    const reference = ref(database, name);
    return new Promise((resolve, reject) => {
        onValue(reference, (snapshot) => {
            const data = snapshot.val();
            resolve(data);
        }, (error) => {
            console.error('Error reading data:', error);
            reject(error); 
        });
    });
};


export const removeData = (name: string, id: any,nm?:any) => {
    const reference = ref(database, `${name}/${id}/${nm}`);
    return remove(reference)
        .then(() => {
            console.log('Data removed successfully');
        })
        .catch((error) => {
            console.error('Error removing data:', error);
            throw error; 
        });
};
