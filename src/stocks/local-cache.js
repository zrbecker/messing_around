class LocalCache {
  constructor(prefix) {
    this.prefix = prefix;
  }

  set(key, value, ttl) {
    try {
      const cacheObject = {
        expiration: Date.now() + ttl,
        value
      };
      localStorage.setItem(
        `${this.prefix}_${key}`,
        JSON.stringify(cacheObject)
      );
    } catch (error) {
      // do nothing
    }
  }

  get(key) {
    try {
      const cacheObject = JSON.parse(
        localStorage.getItem(`${this.prefix}_${key}`)
      );
      if (cacheObject.expiration > Date.now()) {
        return cacheObject.value;
      }
    } catch (error) {
      // do nothing
    }
    return null;
  }
}

export default new LocalCache("stocks_local_cache");
