import { onSnapshot } from "@firebase/firestore";
import { Observable } from "rxjs";

export default {
  /** firestoreのqueryからObservableを生成する。 */
  buildFromQuery(query) {
    return new Observable((subscriber) => {
      const unsubscribe = onSnapshot(
        query,
        (snapshot) => {
          const data = snapshot.docs.map((s) => s.data());
          subscriber.next(data);
        },
        (error) => {
          subscriber.error(error);
        }
      );

      return {
        unsubscribe() {
          unsubscribe();
        },
      };
    });
  },
};
