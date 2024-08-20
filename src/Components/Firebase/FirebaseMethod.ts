import { onValue, ref, set, remove } from "firebase/database";
import { database } from "./firebaseConfig";

import { ref as storageRef, uploadBytes, getDownloadURL, StorageReference } from "firebase/storage";
import { storage } from "./firebaseConfig";


export const sendData = (name: any, data: any, id?: any, nam?: any) => {
    const reference = ref(database, nam ? `${name}/${id}/${nam}` : `${name}/${id}`);
    return set(reference, data)
        .then(() => {
            console.log('Data written successfully');
        })
        .catch((error) => {
            console.error('Error writing data:', error);
            throw error;
        });
};


export const getData = (name: string, id?: any) => {
    const reference = ref(database, id ? `${name}/${id}` : name);
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


export const removeData = (name: string, id: any, nm?: any) => {
    const reference = ref(database, `${name}/${id}/${nm}`);
    return remove(reference)
        .then(() => {
            console.log('Data removed successfully');
        })
        .catch((error) => {
            console.error('Error removing data:', error);
            throw error;
        });
}





export const uploadImage = (file: File, path: string): Promise<string> => {

    const storageReference: StorageReference = storageRef(storage, path);

    return uploadBytes(storageReference, file)
        .then(() => getDownloadURL(storageReference))
        .then((downloadURL: string) => {
            console.log('File available at', downloadURL);
            return downloadURL;
        })
        .catch((error: Error) => {
            console.error('Error uploading file:', error);
            throw error;
        });
};


export const getImageURL = (path: string): Promise<string> => {

    const storageReference: StorageReference = storageRef(storage, path);

    return getDownloadURL(storageReference)
        .then((downloadURL: string) => {
            console.log('File available at', downloadURL);
            return downloadURL;
        })
        .catch((error: Error) => {
            console.error('Error getting file URL:', error);
            throw error;
        });
};



