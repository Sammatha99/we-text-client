import { constants } from ".";

const initStorage = {
  [constants.storageType.rfToken]: { token: null, expires: null },
  [constants.storageType.acToken]: { token: null, expires: null },
  [constants.storageType.userId]: null,
};

const TODOS_STOREAGE_KEY = "WE-TEXT-2021";

const storage = {
  get(type) {
    const value = JSON.parse(
      localStorage.getItem(`${TODOS_STOREAGE_KEY}_${type}`)
    );
    return value != null ? value : initStorage[type];
  },
  set(type, object) {
    localStorage.setItem(
      `${TODOS_STOREAGE_KEY}_${type}`,
      JSON.stringify(object)
    );
  },
  remove(type) {
    localStorage.removeItem(`${TODOS_STOREAGE_KEY}_${type}`);
  },
  removeAll() {
    Object.values(constants.storageType).forEach((type) => {
      this.remove(type);
    });
  },
};

const rfTokenStorage = {
  get() {
    return storage.get(constants.storageType.rfToken);
  },
  set(rfToken) {
    storage.set(constants.storageType.rfToken, rfToken);
  },
  remove() {
    storage.remove(constants.storageType.rfToken);
  },
};

const acTokenStorage = {
  get() {
    return storage.get(constants.storageType.acToken);
  },
  set(acToken) {
    storage.set(constants.storageType.acToken, acToken);
  },
  remove() {
    storage.remove(constants.storageType.acToken);
  },
};

const userIdStorage = {
  get() {
    return storage.get(constants.storageType.userId);
  },
  set(userId) {
    storage.set(constants.storageType.userId, userId);
  },
  remove() {
    storage.remove(constants.storageType.userId);
  },
};

export { rfTokenStorage, acTokenStorage, userIdStorage, storage };
