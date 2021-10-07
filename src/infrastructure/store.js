import engine from "store/src/store-engine";
import localStorage from "store/storages/localStorage";
import cookieStorage from "store/storages/cookieStorage";

const storages = [localStorage, cookieStorage];

export default engine.createStore(storages);

export const StoreKey = {
  USER_CHOICES: "user_choices",
};
