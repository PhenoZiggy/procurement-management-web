import { FirebaseApp } from '../utils/firebase';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
const Storage = getStorage(FirebaseApp);

let urlArray = [];

const firebaseUpload = async (file, setPercentage, setURL, path) => {
  file.forEach(async (images) => {
    const storageRef = ref(Storage, `/${path}/${images.name}`);
    // progress can be paused and resumed. It also exposes progress updates.
    // Receives the storage reference and the file to upload.
    const uploadTask = uploadBytesResumable(storageRef, images);

    await uploadTask.on(
      'state_changed',
      (snapshot) => {
        const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

        // update progress
        setPercentage(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
          urlArray.push(url);
          if (file?.length === urlArray.length) {
            setURL(urlArray);
          }
        });
      }
    );
  });
};

export default firebaseUpload;
