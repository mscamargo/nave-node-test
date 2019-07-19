const { PORT } = require('./src/config/env')
const app = require('./src/app')

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
