import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {sign, verify} from 'hono/jwt'
import { signinInput, signupInput } from "@prathameshmahekar87/medium-common";

export const userRouter=new Hono<{
    Bindings:{
        DATABASE_URL:string,
        JWT_SECRET:string
    }
}>();

userRouter.post('/signup',async(c)=>{
    const body=await c.req.json();
    const {success}=signupInput.safeParse(body);
    if(!success){
      c.status(411);
      return c.json({
        message:"Inputs are not correct"
      })
    }
    
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  
    
    try{
      const user=await prisma.user.create({
        data:{
          email:body.email,
          password:body.password,
          name:body.name,
        },
      })
      const jwt=await sign({id:user.id},c.env.JWT_SECRET)
      return c.text(jwt)
  
    }catch(e){
  
      c.status(411);
      return c.text('User already exists with this email')
  
    }
  })
  
userRouter.post('/signin',async(c)=>{
  const body=await c.req.json();
  const {success}=signinInput.safeParse(body);
    if(!success){
      c.status(411);
      return c.json({
        message:"Inputs are not correct"
      })
    }

  const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  
    
    try{
      const user=await prisma.user.findFirst({
        where:{
          email:body.email,
          password:body.password
        }
      });
    
      if(!user){
        c.status(403);
        return c.json({error:"user not found"});
      }
    
      const jwt=await sign({id:user.id},c.env.JWT_SECRET);
    
      return c.text(jwt)
    }catch(e){
      c.status(411);
      return c.text('invalid')
    }
  })

userRouter.get('/me', async (c) => {
  const authHeader = c.req.header("authorization") || "";
  const userData = await verify(authHeader, c.env.JWT_SECRET) as { id: string };

  if (!userData?.id) {
    c.status(401);
    return c.json({ message: "Unauthorized" });
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const user = await prisma.user.findUnique({
    where: {
      id: userData.id,
    },
    select: {
      name: true,
      email: true,
      id: true,
    },
  });

  if (!user) {
    c.status(404);
    return c.json({ message: "User not found" });
  }

  return c.json({ user });
});