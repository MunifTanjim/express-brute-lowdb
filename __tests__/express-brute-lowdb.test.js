const AbstractClientStore = require('express-brute/lib/AbstractClientStore')

const LowdbStore = require.requireActual('../index')

describe('lowdb adapter [express-brute store]', () => {
  let prefix = 'test-'
  let lowdbAdapter = null

  describe('[constructor]', () => {
    beforeAll(() => {
      lowdbAdapter = new LowdbStore({ prefix })
    })

    afterAll(() => {
      lowdbAdapter = null
    })

    it('is an instance of AbstractClientStore', () => {
      expect(lowdbAdapter).toBeInstanceOf(AbstractClientStore)
    })
  })

  describe('[get]', () => {
    let id

    beforeAll(() => {
      lowdbAdapter = new LowdbStore({ prefix })
      id = 'Two-Zero-Two-Seven'
    })

    afterAll(() => {
      lowdbAdapter = null
    })

    it('is invoking callback', () => {
      callback = jest.fn()
      lowdbAdapter.get(id, callback)
      expect(callback).toHaveBeenCalled()
    })
  })

  describe('[set]', () => {
    let id, count, lifetime, callback

    beforeAll(() => {
      lowdbAdapter = new LowdbStore({ prefix })

      id = 'Two-Zero-Two-Seven'
      count = 0
      lifetime = 2027
      callback = jest.fn()
    })

    afterAll(() => {
      lowdbAdapter = null
    })

    it('is invoking callback', () => {
      lowdbAdapter.set(id, { count }, lifetime, callback)

      expect(callback).toHaveBeenCalled()
    })
  })

  describe('[reset]', () => {
    let id

    beforeAll(() => {
      lowdbAdapter = new LowdbStore({ prefix })
      id = 'Two-Zero-Two-Seven'
    })

    afterAll(() => {
      lowdbAdapter = null
    })

    it('is invoking callback', () => {
      callback = jest.fn()
      lowdbAdapter.reset(id, callback)
      expect(callback).toHaveBeenCalled()
    })
  })
})
