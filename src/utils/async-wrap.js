module.exports = fn => (request, response, next) => {
  Promise.resolve(fn(request, response, next)).catch(error => {
    next(error)
  })
}
