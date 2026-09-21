import { getSelf } from "./auth-service";
import { db } from "./db";

export const getRecommended = async()=>{

  let userId;

  try {
    const self = await getSelf()
   if (self instanceof Error) {
        throw new Error("Could not retrieve user information."); 
    }
    userId = self.id
  } catch{
    userId = null
  }

  let users = [];

  if (userId) {
    users = await db.user.findMany({
      where:{
        AND:[{
          NOT:{
          id:userId
        }  
        },{
          NOT:{
            followBy:{
              some:{
                followerId:userId
              }
            }
          }
        },
        {
          NOT:{
            blocking:{
              some:{
                blockedId:userId
              }
            }
          }
        }
      ]
      },
      include:{
        stream:{
          select:{
            isLive:true
          }
        }
      },
      orderBy:{
        createdAt:"desc"
      }
    })
  }else{
    users = await db.user.findMany({
      include:{
        stream:{
          select:{
            isLive:true
          }
        }
      },
    orderBy:{
      createdAt:'desc'
    }
  }) 
  }

  return users
} 