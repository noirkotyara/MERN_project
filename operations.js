module.exports.multiplyAsync = (a, b, callback) => {
    setTimeout(() => {
        callback(a * b)
    }, 1000);
}