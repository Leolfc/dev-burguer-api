/*
store -> Cria dado
index -> Lista todos os dados
show -> Mostra um dado
update -> Atualiza um dado
destroy -> Deleta um dado
 */
import { v4 } from "uuid"
import User from "../models/User.js"
import * as Yup from "yup"
import bcrypt from "bcrypt"

class UserController{
async store(request, response){
  console.log("REQUEST ",request.body)
  const schema = Yup.object({
    name:Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().min(6).required(),
    admin: Yup.boolean()
  })
  try {
     schema.validateSync(request.body, {abortEarly:false, strict: true})
  } catch (err) {

    return response.status(400).json({error: err.erros})
  }
 

const {name,email, password, admin} = request.body;
const existinUser = await User.findOne({
  where:{
    email
  }
})
if(existinUser){
return response.status(409).json({message: "Este e-mail ja está cadastrado!"})
}

const password_hash = await bcrypt.hash(password, 10)

const user = await User.create({
  id: v4(),
  name,
  email,
  password_hash,
  admin
})
return response.status(201).json({
  id: user.id,
  name: user.name,
  email: user.email,
  admin: user.admin
})

}}


export default new UserController()