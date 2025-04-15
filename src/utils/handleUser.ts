import {User} from 'firebase/auth';
import {doc, setDoc} from 'firebase/firestore';
import {db} from '../../firebaseConfig';

export class HandleUser {
  static SaveToDatabase = async (user: User) => {
    const data = {
      email: user.email ?? '',
      displayName: user.displayName ?? user.email?.split('@')[0] ?? '',
    };

    try {
      await setDoc(doc(db, `users`, user.uid), data)
        .then(() => {
          console.log('New task added!!!', user);
        })
        .catch((error: any) => console.log(`Add task error: ${error.message}`));
    } catch (error) {}
  };
}
