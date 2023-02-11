import db from '$db/mongo'

export const todoo = db.collection('todolist')