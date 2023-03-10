const admin=require("../connection/AdminConn")

async function deleteMany(){
    await admin.deleteMany({})
}

deleteMany()