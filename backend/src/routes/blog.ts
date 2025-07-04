import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {sign, verify} from 'hono/jwt'
import { createBlogInput, updateBlogInput } from "@prathameshmahekar87/medium-common";

export const blogRouter=new Hono<{
    Bindings:{
        DATABASE_URL:string,
        JWT_SECRET:string
    }
    Variables:{
        userId:string;
    }
}>();

blogRouter.use("/*",async(c,next)=>{
    const authHeader=c.req.header("authorization")||"";
    const user=await verify(authHeader,c.env.JWT_SECRET)as { id: string };
    if(user){
        c.set("userId",user.id);
        await next();
    }else{
        c.status(403);
        return c.json({
            message:"You are not logged in"
        })
    }
})

blogRouter.post('/',async(c)=>{
    const body=await c.req.json();
    const {success}=createBlogInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
            message:"Inputs are not correct"
        })
    }
    const authorId=c.get("userId");

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blog=await prisma.blog.create({
        data:{
            title:body.title,
            content:body.content,
            authorId:authorId 
        }
    })
    return c.json({
        id:blog.id
    })
})
  
blogRouter.put('/',async(c)=>{
    const body=await c.req.json();
    const {success}=updateBlogInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
            message:"Inputs are not correct"
        })
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    const blog=await prisma.blog.update({
        where:{
            id:body.id
        }, 
        data:{
            title:body.title,
            content:body.content,
        }
    })
    return c.json({
        id:blog.id
    })
})

blogRouter.get('/bulk',async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const blogs=await prisma.blog.findMany({
        select:{
            content:true,
            title:true,
            id:true,
            createdAt: true,
            author:{
                select:{
                    name:true
                }
            }
        }
    });

    return c.json({
        blogs
    })
}) 

blogRouter.get('/:id', async(c) => {
    const id=c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    try{
        const blog=await prisma.blog.findFirst({
            where:{
                id:id
            }, 
            select:{
                id:true,
                title:true,
                content:true,
                createdAt: true,
                author:{
                    select:{
                        name:true
                    }
                }
            }
        })
        return c.json({
            blog
        });
    }catch(e){
        c.status(411);
        return c.json({
            message:"error while fetching blog post"
        });
    }
})

blogRouter.delete('/:id', async(c) => {
    const id=c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    try{
        const blog=await prisma.blog.delete({
            where:{
                id:id
            }, 
            select:{
                id:true,
                title:true,
                content:true,
                author:{
                    select:{
                        name:true
                    }
                }
            }
        })
        return c.json({
            blog
        });
    }catch(e){
        c.status(411);
        return c.json({
            message:"error while deleting"
        });
    }
})

blogRouter.get('/userBlogs', async (c) => {
  const userId = c.get("userId"); // Already injected by auth middleware

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blogs = await prisma.blog.findMany({
    where: {
      authorId: userId,
    },
    select: {
      id: true,
      title: true,
      content: true,
      published: true,
      createdAt: true,
      author: {
        select: {
          name: true,
        },
      },
      // Include timestamp if available (e.g., createdAt)
    },
  });

  return c.json({ blogs });
});
