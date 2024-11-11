/*

import { config } from "dotenv";
 import {type Config } from "drizzle-kit";
 config({ path: ".env" });
 export default{
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  driver:"pg"
  verbose: true,
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  } satisfies Config 

  Note: use pg driver because the postgresql driver makes some problems sometimes so may be you use pg driver.


import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env" });

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  dialect: "postgresql",
  verbose: true,
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});




import { Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless"

const pool = new Pool({connectionString:process.env.DRIZZLE_DATABASE_URL!})

export const db =  drizzle(pool)




create schema:
  import {pgTable, serial, text, varchar} from "drizzle/pg-core"

    syntax : const users = pgTable("name of the table", {list of columns})
            serial(table column name)
  example :
      export const users = pgTable("users", {
          id:serial(id).primaryKey(),
          name:text("name")
          mobile: varchar("mobile", {length:10})
      })
  
migrations: 

  "migration:generate" : "drizzle-kit generate:pg --schema=./src/db/userSchema.ts"

  npm run migration:generate

push migrations to database:
db/migrate.ts file: 

import {Pool} from "pg"
import {drizzel} "drizzle-orm/nodejs-postgres"
import "dotenv/config"

const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL?
})
// create db client:
const db = drizzel(pool)

async function main(){
  console.log("migrations started..")
  await migrate(db, {migrationsFolder:"your migration generated folder path"})
  // note: if your migration generated folder is in root directory:
    await migrate(db, {migrationsFolder:"drizzel"})
  // migration generated folder is on the other directory:
    await migrate(db, {migrationsFolder:"./src/db/drizzel"})

  console.log("migrations ended..")
  process.exit(0)
} 

main().catch(errors => {
  console.log(errors) 
  process.exit(0)
})

Note: you need to install dotenv package

add migration push command: 
  "migration:push" :"node -r esbuild-register /src/db/migrate.ts"


combine generate migrations and push migration into single command:

"migrate": "drizzle-kit generate:pg --schema=./src/db/userSchema.ts && node -r esbuild-register /src/db/migrate.ts"

Note: if you get any errors, you need to set the target to "ES6" instead of Es5 in the typescript config file.



neon : 
  const connector = neon(process.env.connectionstring)
  // @ts-expect-error

export const db= drizzle(connector) // typescript throw an error, to happy typescript then you nned to add // @ts-expect-error

sql: it allows us to write your raw sql queries to interactive with database directly.
to_tsvector: it allows us to full text search.
@@ to-tsquery : it allows us to insert your input query.

let products= await db.select().from('productTable').where( 
    
    sql` to-tsvector('simple', lower(${productTable.name} || ' ' || ${productTable.description})) 
    @@ to-tsquery('simple', lower(${inputQuery.trim().split(' ').join(' & ')}))`

).limit(10)

cricket bat --invaild
cricket&bat -- valid 

either cricket or bat : |
both cricket and bat : &


data type categories in postgress: import data type functions from "drizzel-orm/pg-core" package
  numeric: interger and decimal.
    integer: 
      - signed 4 bytes.
      - 1 bit is set for sign.
      - ranges from -21(31) to 21(31)
      - -2,147,483,648 to 2,147,483,648
    smallInt: 
      - signed 2 bytes.
      - 1 bit is set for sign.
      - ranges from -2(7) to 2(7)
      - -32,768 to 32,768
    bigInt: 
      - signed 8 bytes.
      - 1 bit is set for sign.
      - ranges from -2(63) to 2(63)
    serial: it is auto increment
      - serial/serial4
      - smallserial/ serial2
      - bigserial/serial8
    
    decimal:
      - decimal
        - selectable precision
        - very large number of digits.
        - 131072 digits before the decimal point.
        - upto 16383 digits before the decimal point.
        - example : decimal("price", {precision:7, scale:3}) // 2123223.430
      - real
      - double

  boolean : true or false.

  text:
    - text
    - varchar: 
      - variable length character string, can store strings up to n characters(not bytes).
      -  varchar("name", {length:20}) // name should be upto 20 characters.
    - char:
      -fixed length.
      - blank padded character strings.
      - can store strings upto n characters(not bytes)
      - always n characters length even the string is less characters.  

  json: json and jsonb

  dataTime:
    - time : precision represents milleseconds.
      - time("startAt", {precision:0, withTimezone:false}).defaultNow()
      - time("startAt", {precision:4, withTimezone:true}).defaultNow() 

    - date: 
      -  date("date", {mode:"date or string"}).defaultNow()

    - timestamp: data and time.
      -  timestamp("timestamp", {mode:"date or string"}).defaultNow()
    
    - interval

  enum:
    - pgEnum("colors", ["red", "yellow","blue"])

  uuid:

  binary:

  default : default value for the column.
  notNull : by default all field have null values, you can avoid by using notNull()
  primaryKey: the field should be unique
  references
  array
  defaultRandom


create a global db client:
    src/db/index.ts:
      import {Client} from "pg"

      const client = new Client({
        connectionString: process.env.DATABASE_URL
      })
      client.connect()

      export const db = drizzel(client, {schema: yourSchema}) 

create types from your drizzle schema:
  export type User = typeof userSchema.$inferSelect;
  
drizzel.config.ts:
  import {defineConfig} from "drizzle-kit"
  export default defineConfig({
    schema: "./db/schema.ts",
    out: "./db/migrations",
    driver:"pg",  
    dbCredentials:{
      connectionString:process.env.DATABASE_URL!
    },
    verbose:true,
    strict:true,
  })
  
 
data Retrivel:
  const data = await db.select().from(your schema)


api end point:
  import {db} from "@/db"
  import {users} from "@/db/schema"
  import {eq} from "drizzel-orm"

  export async function Get(){
    const result = await db.select().from(users).where(eq(users.id, 2))
    return new Response(JSON.stringfy(result))
  }
  
filtering:  
    importing filetring function from "drizzel-orm" package

    const result = await db.select().from(users).where(eq(users.id, 2))
    eq: equal to
    ne: not equal to
    gt: greater than
    gte: greater than equal to
    lt: less than
    lte less than than equal to
    isNull: it will return all the users which have null value: isNull(users.address)
    isNotNull: it is opossite to notNull. it will return all the users which have no null value.
    inArray: where(inArray(user.id, [1,2,3,4])) : it will return the four users.
    notInArray: it is opossite to inArray.
    between : where(between(users.score, 60, 100))
    notBetween: it is opossite to between.
    like: where(like(users.name, "%shna%")). % is reqular expression. before, not between
        starts with:  where(like(users.name, "vysh%"))
        ends with:  where(like(users.name, "%navi"))
        Note: like function is case-sensitive.
    ilike: it is same as like function but it is not case sensitive. 
    notLike: it is opossite to like function.
    not:
    and: more than one conditions, all conditions must be true
      - syntax: where(and(condition1, condtion2, condition3...))
    or: unlike and function, any one condition should be true.


Relations:
  one to one relation:  
      import {relations} from "drizzle-orm"
      export const users= pgTable("users",{
        id:serial("id").primaryKey()
      })
      
      export const relationsObject = relations(users, ({one})=>({
          profile: one(profiles,{
            fields:[users.id],
            refreneces:[profiles.userId]
          })
      }))

      export const profiles= pgTable("profile",{
        id:serial("id").primaryKey(),
        userId:integer("user_id").notNull().refreneces(()=> user.id)
      })  

    const data = db.query.users.findFirst({
      with:{
        profile:true
      }
    })
    data?.profile : it is a object.

  one to many relation: one table connected with more than one tables..
    users table -> posts table
      - each user can have 0 or multiple post
      - each post always has a author but it can have multiple authors. just one user is the auther.
          post table: id, post information, authorId->reference to userid
      export const userRelationsObject = relations(users, ({one, many})=>({
            profile: one(profiles,{
              fields:[users.id],
              refreneces:[profiles.userId]
            }),
            posts:many(posts)
        }))
      export const postRelationsObject = relations(posts, ({one})=>({
            profile: one(users,{
              fields:[posts.id],
              refreneces:[users.id]
            }),
        }))
      const data = db.query.users.findFirst({
        with:{
          profile:true,
          posts:true
        }
      })

      const data = db.query.posts.findFirst({
        with:{
          author:true,
        }
      })
      
      
  many to many relation: join tables



  insertion:
    simple insertion: const newUser = wait db.insert(usersSchema).values({values}).returing()
    one to one relation: 
      const newUser = wait db.insert(usersSchema).values({values}).returing({userId: users.id})
      await db.insert(profiles).values({
        userId:newUser[0].userId
      }).execute()

seeding:
    for(let i=0; i<10; i++){
      const user = await db.insert(users).values({values}).returing()
      const userId = user[0].userId;
      const profile = await db.insert(profile).values({userId, values})
    }  
    const cats = db.insert(categories).values([
    {},
    {}
    ]).returing()    

*/
