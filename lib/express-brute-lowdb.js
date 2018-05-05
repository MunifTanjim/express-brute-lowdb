const lowdb = require('lowdb')
const Memory = require('lowdb/adapters/Memory')
const AbstractClientStore = require('express-brute/lib/AbstractClientStore')

const ensureFunction = callback => {
  return typeof callback === 'function' ? callback : () => {}
}

class lowdbStore extends AbstractClientStore {
  constructor(options) {
    super(arguments)

    this.options = { ...lowdbStore.defaults, ...options }

    this.adapter = ['Memory', 'FileSync'].includes(this.options.adapter.name)
      ? new this.options.adapter(...this.options.adapterArgs)
      : new lowdbStore.defaults.adapter()

    this.store = lowdb(this.adapter)
      .defaults({ [`${this.options.rootKey}`]: {} })
      .get(this.options.rootKey)
  }

  _addPrefix(key) {
    return `${this.options.prefix}${key}`
  }

  set(key, value, lifetime = null, callback) {
    try {
      let id = this._addPrefix(key)
      let expirationTime = Date.now() + lifetime * 1000

      this._setSync(id, value, expirationTime, callback)
    } catch (err) {
      ensureFunction(callback)(err)
    }
  }

  get(key, callback) {
    try {
      let id = this._addPrefix(key)

      this._getSync(id, callback)
    } catch (err) {
      ensureFunction(callback)(err)
    }
  }

  reset(key, callback) {
    try {
      let id = this._addPrefix(key)

      this._resetSync(id, callback)
    } catch (err) {
      ensureFunction(callback)(err)
    }
  }

  _setSync(id, value, expirationTime, callback) {
    if (this.store.has(id).value()) {
      this.store
        .get(id)
        .extend({
          data: value,
          expires: expirationTime
        })
        .write()
    } else {
      this.store
        .set(id, {
          id,
          data: value,
          expires: expirationTime
        })
        .write()
    }

    ensureFunction(callback)(null)
  }

  _getSync(id, callback) {
    let data = null

    if (this.store.has(id).value()) {
      let entry = this.store.get(id).value()
      let expirationTime = new Date(entry.expires).getTime()

      if (expirationTime < Date.now()) this.store.unset(id).write()
      else {
        data = entry.data
        data.lastRequest = new Date(data.lastRequest)
        data.firstRequest = new Date(data.firstRequest)
      }
    }

    ensureFunction(callback)(null, data)
  }

  _resetSync(id, callback) {
    this.store.unset(id).write()

    ensureFunction(callback)(null)
  }
}

lowdbStore.defaults = {
  prefix: '',
  adapter: Memory,
  adapterArgs: ['express-brute.json'],
  rootKey: 'express-brute'
}

module.exports = lowdbStore
