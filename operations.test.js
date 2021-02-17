const operations = require('./operations');

it('async with callback', (done) => {
    operations.multiplyAsync(4,3, (result) => {
        if (result !== 12) throw new Error('tgfbvtgr')
    })
done()
})