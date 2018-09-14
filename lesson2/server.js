const jsonServer = require('json-server')

const defaultData = () => ({
  'lesson': [
    { 'id': 1, 'title': 'how to add', 'teacher': 'Miss Wang' },
    { 'id': 2, 'title': 'how to multiply', 'teacher': 'Mr Liu' },
  ],
  'homework': [
    { 'id': 1, 'works': ['add','multiply'], 'student': 'Jim Green' },
    { 'id': 2, 'title': ['add','subtract'], 'student': 'lily' },
    { 'id': 3, 'title': ['add','subtract'], 'student': 'lucy' },
  ],
  'exam': { 'name': 'primary school final exam' }
})

const createJSONServer = (data = defaultData()) =>{
  const server = jsonServer.create()
  const router = jsonServer.router(data)
  const middlewares = jsonServer.defaults()

  server.use(middlewares)
  server.use(router)
  return server
}

createJSONServer().listen(3000)
console.log('3000端口已联通')