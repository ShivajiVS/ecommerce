// I was looking for a job as a web developer and for anyone to reach out if they were looking to hire a junior developer

/* 

CSR: 
    client  ----> edge network or server to get initial page.
    client  ----> make a API call and then that server hits your data source(DB) and then it goes back to client. 
    client  ----> server  ----> client.
    
    - when we navigate between routesin client side rendered applications, there is no Full page refresh becaue all your code is being rendered in your browser 

SSR: 
    - client make a http call  ---->  server make a call  ----> data source(DB) ---->  it goes back to server to server with data  ----> server generate a html page and return to client ----> client render the html.
    - client <---->  server <---->  data source
    - it happended for the initial render but then for subsuquent naviagtions, it is de-opted back to client side rendering.
    - it is great for Seo because google bots can read all your information.

SSG:
    - client  ---->  Edge or CDN.
    - at build time: fetch the data from server and generate a html page during build time and cache it on the CDN  
    - it request comes from client and then CDN serves the cached html page.
    - SSG is great for but static data(no change).
    - if you update data then you need to re-build your whole application.

ISR: 
    - if you wanted to update you data then you need a ISR pattern.
    - you don't have to Re-build your whole application, you could just Re-build specific routes either timed interval or after an event on month. 
 
    
caching:
    - all the different environments your application code can live in. if you're doing most things on the client then it is perfect but as soon as you cross over a network boundary so either client to server or from server to data source(DB) then there is going to be a some cost either it can be resource cost ro time cost. reduce those potential latency caused by crossing these boundaries we need a caching.
    caching : persistent cache and in memory or temporary cache.
    
    client cache: 
    - the reason why we have it is because to cross the network boundary to the server we need to make a request so to make sure that our application are as fast as possibe. 
    - cache helps to reduce the number of requests that go through the boundary.
    - for example, Layouts don't re-render on navigation and reason why they don't re-render because we don't have to refetch everything on the server in every single time.

    - server to data source(DB) for persistent cache comes in: data cache for rendering server not to have to fetch the data over and over again may be even over multiple request which is persistent.
    - temporary cache: which is per request than can be fect method. it temporary in memory for the lofe cycle of that request on the server so we not re-running those functions again.
    - full route cache: temporary cache and Render cache are going to store the result of RSC payload and html we geneated that become Full route cache. which we can use to not have to render this again.



    - dynamic functions like cookies, headers and even fetch itself, it will de-opt your application from static rendering to dynamic rendering.
    if you use dynamic functions in root layout then it is opted your whole application into dynamic rendering.

    before next 15: out of the box optimized, you don't have to do anything unless you want to just render some parts dynamically.   
    
    next 15: by default there is no cache, manually opt your pages into static.


    ppr: 
        - mark something as static and dynamic in ppr.
        - A route can combine some static parts and dynamic parts.
                

beat root, carrot, tommato, apple,phine apple is very good for skin, heart, blood 

small towl for head and another towl for body.
maintain proper hyzen, inner hyzen and inner cleaning.
when you use a washroom, wash your hands properly,
don't touch your face.







parallel routes: 
  - parallel routes allows you to simultanously or conditionally render one or more pages within the same layout. 
  - maintain loading states and error states for every individual page.
secase:
 - multiple pages parallel into one layout.
 - conditionally show and hide particulat page one a layout.


dashboard segment route
    @balance
    @expenses
    @customers -- navigation between customers and Primecustomers without affecting the remaining routes
        page.tsx 
        Primecustomers
    layout.tsx
    page.tsx

layout.tsx: 
      {children, balance,expenses}
       <div>
          {children}
          {balance}
          {expenses}
          {isTrue && (<div>{customers}</div>)}  //conditionaly rendering
        </div>

it is working fine but if you refresh the page, it will break because nextjs don't know the page. you need to tell to nextjs manually.
create a default.js for every slot and include dashboard page also:
    @balance
        default.tsx : copy and paste the balance page code 
    @expenses
        default.tsx
    @customers
        page.tsx
        default.tsx 
        Primecustomers
    layout.tsx
    page.tsx
    default.tsx :  copy and paste the dashboard page code


code splitting: 
    server components are by default code splitted.
     
     import dynamic from "next/dynamic"
     import {useState} from "react"

     const LazyLoadClientComponent= dynamic(()=> import("/.componentPath"),{loading:()=><h2>loading...</h2>})
     const [state,setState]=useState(false)
     {state && <LazyLoadClientComponent />}

    named export: 
         const LazyLoadClientComponent= dynamic(()=> import("/.componentPath").then((mod)=>mod.yourComponentName), {loading:()=><h2>loading...</h2>})

   Mote: 
   - dont use dynamic components all time and load components lazyly when it is required and necessary.
    for example, if the component is too heavey then load the component lazely. 
  - take the decision based on your need and don't use dynamic components all time. don't try to over optimize your application. 





react query : asynchronous state managment lib.

we are seen react query as a data fetcing lib but react query is beyond data fething lib.
data fetching, caching, deduping, stale data, data update, performane optimization,managing memory, memozing queries, less code and less bugs.
deduping: prevent unnessary api call when you make multiple duplicate api calls.

example:
  let data= useQuery({
    queryKey:["products"],
    queryFn:yourDataFetchingFunction
  })

you get data, loading state, error state:
const {data, loading,error }=data;



server actions:  server action are asynchronous functions that are executed on the server and the main purpose is that you can use them in a form while handling form submissions and performin data mutations so whenever you want to update, create, delete data.


"use server"
async function signInServerAction(formData){
  const email:formData.get["email"]
  const password:formData.get["password"]

}


client form submission:
async function onSubmit(values){
   await signInServerAction(values)
} 



if(email) return "email already exits"

db.insert({data})

          or

if(!email) {
    db.insert({data})  
}
else{
  return "email already exits"
}


import {Resend} from "resend"
const resend= new Resend("your resend api key")

const message=`${fullname}, Thank you for subscribing to shivaji newsletter...`

await resend.emails.send({
    from:"sivaji@gmail.com",
    to:fromData.email,
    subject"congratulations, you have subscribed to shivaji's newsletter.",
    react: EmailTemplate({`${fullname}, Thank you for subscribing to shivaji newsletter...`}), 
          or
     react: EmailTemplate({message})   // it is a react component
})
  
function EmailTemplate({message}){
  return <div>{message}</div>
}

React email package: structure your email message.







Error handling: 
    -> app
          layout.tsx
          page.tsx
          error.tsx ---- within the app level.
          -> users
              layout.tsx
              page.tsx
              error.tsx ----> this files handled the errors. those are generated by within page.tsx and below segement layout file.
          -> courses
              layout.tsx
              page.tsx
              error.tsx   -----> within the course level.

Note: error.tsx file is handles only page.tsx errors only because error.tsx boundary is only within page. if you have any runtime errors in layout.tsx file, then those error are hanled by parent(one level up) error.tsx file but if any have runtime errors in app level layout.tsx file then those errors are handle by global-error.tsx file.
global-error.tsx file doesn't any impact in development mode. it will impact only production  
 


middleware: 
 - it is a pice of code, executed before your request is goes to server and executed before server response to goes to client.
 - middleware aloows you to run code before a request is completed. Then, based on the incoming request, you can modify the response by rewriting, redirecting, modifying the request or response headers, or responding directly.
 - Middleware runs before cached content and routes are matched.
 - everything that you put inside of middleware will not be used to check whether its public or private. its simply going to be used to invoke a middleware. for example, "/sign-in", this is not going to be protected or public. this is simply going to invoke function.

- the entire application to be protected and need to be authorized to access it and then we're going to sepearte just couple of routes like landing page, documentations to be able to be accessed for non authorized users.

Note: middleware works on the edge 

 it can be useful for things like:
      authentication.
      Redirect and Rewrite based on the users geolocation.
      add or modify reuqest/response headers.
      read, write and manage cookies.
      render and return a page or component.
      respond with some json like an api endpoint.
      enforce a block or ip allow list.
      a/b testing with different content.



  return NextResponse.json({
      name: 'welcome..',
  });       

 import {NextResponse} from "next/server"
 export async function middleware(request){
    return NextResponse.redirect( new url("/sign-in"))
 }

 Note: if you don't write any matcher, then middleware function executed infinitly and break your application. you can avoid this by writting the matcher object and based on the matcher object middleware executed. 

 export const config{
  matcher:"checkout",
                or
  matcher:["/checkout", "/account"]

 } 

  MUST start with /
  Can include named parameters: /about/:path matches /about/a and /about/b but not /about/a/c
  Can have modifiers on named parameters (starting with :): /about/:path* matches /about/a/b/c because * is zero or more. ? is zero or one and + one or more
  Can use regular expression enclosed in parenthesis: /about/(.*) is the same as /about/:path*



protected routes: 
1. client side:
"use client"
export default function(){
    useLayoutEffect(()=>{
        const session=getSession()
        if(!session) redirect("/")  
    })
    return(
        <div>profile page</div>
    )    
}

client side with hoc:
export default withHoc(Component){
    return function withAuth(props){
      const session =getSession()
      useLayoutEffect(()=>{
        if(!session) redirect("/")  
      })

      if(!session) return null

     return <Component {...props} />
    }
}

function Page(){
    return(
        <div>profile page</div>
    )
}
export default WithHoc(Page)


3. server side:
  export default function Page(){
    const session =getSession()
    if(!session) redirect("/")  

    return(
        <div>profile page</div>
    )
}


session.user.id



client url path:

const {nextUrl}=request

const pathName =nextUrl.pathname

const public_routes=["/sign-in", "/sign-up","/products","/productDetails"]

const const protectedSubRoutes=["/checkout"]

const isPublicRoute= (publicRoutes.find((route)=> nextUrl.pathname.startsWith(route)) || nextUrl.pathname==="/") 

const isPublicRoute= ((publicRoutes.find((route)=> nextUrl.pathname.startsWith(route)) || nextUrl.pathname==="/") && !protectedSubRoutes.find((route)=> nextUrl.pathname.includes(route))) 


if(!isAuthenticated || !isPublicRoute){
  rerurn NextResponse.redirect( new url("/sign-in")) 
}

Note: you can mark some routes as a private routes and those private routes are accessable only if your are authenticated. remaining public routes are accessable for without authentication.

matcher: middlware is executed for all routes and including api routes but except the below.
 export const config{
    matcher:["/((?!.+\\.[\\w]+$|_next).*)", "/", "//(api|trpc) (.*)"]
 }


Server driven Ui:
what is it?
 - it is a frontend design pattern where the backend control what to show and where in the UI.
 - it has only one objective, to shift as much bussiness logic to backend as possible.
 - it's a long term development decision.
 - it's not a new way to write.


  - gets you out of release cycle dependency. you iterate faster, you ship faster. you don't have to release cycle for every new feature that you build. 
  - rollout release cycle: dev testing, testing approval, QA, etc... and then only goes to playstore or app store. atleast it takes 2 weeks to rollout the feature for all users.
  - to build and ship faster you need to have a server driven ui.


- developer decide how much of the bussiness logic they want on server.

- bring you close to a full-fledged design system.

granular components: ask your designers what to split. split things that are used by serval different components.

design philosophy:
  - atomic design.
  - an existing design system and a component library.
  - demand driven schema design approach.

develpment workflow:
  - synchronization between the backend and frontend on component.
  - a sliding scale of how much business logic is moved to the server.
  - two phase rendering.


searchParams : 

  route handler:
    if(error) redirectTo.pathname= "/sign-in?meassage=could not verify Otp"

    NextResponse.redirect(`${origin}/login?message=could not login with provider`)

  server action: 
    if(error) redirect("/sign-in?meassage=could not verify Otp")

    {searchparams.message && (
        <div className="text-sm font-semibold text-destructive">
             {searchparams.message}
        </div>
    )}

 - if there is no pramas then you add a default value: 
        let currentTab= props.searchParams.tab ?? "gallery"

 - avoids the random tab value other than specified values:
      if(currentTab !== "messages" && currentTab !== "setting) currentTab="gallery"

 - add default value for shadCn tabs:
      <Tabs defaultValue={currentTab}> /<Tabs>

 - update the params by clicking the tabs(navigation): must add asChild prop to TabsTrigger component.
      <Link href={{query:{tab:"gallery"}}}>gallery</Link>
      <Link href={{query:{tab:"messages"}}}>messages</Link>
      <Link href={{query:{tab:"settings"}}}>settings</Link>


const router = useRouter()
const pathName= usePathname()   
const searchParams= useSearchParams()

function onChange(event){
  const sp = new URLSearchParams(searchParams)
  sp.set("title", event.target.value)
  router.push(`${pathname}?${sp.toString()}`)
}


if you have existing searchParams:
      <Link href={{query:{...props.serachParms, tab:"gallery"}}}>gallery</Link>
      <Link href={{query:{...props.serachParms, tab:"messages"}}}>messages</Link>
      <Link href={{query:{...props.serachParms, tab:"settings"}}}>settings</Link>


debounce input: use usehooks-ts library:
import {useDebounceCallback} from "usehooks-ts"
const debounce=useDebounceCallback(yourFunction, time duration)


filtering process in client components:
  - capture the user filter input and make a api call with user filter input and get the data.
  - based on the data, you render the page on the client side.


filtering process in server components:
  - client component which contains user filter and filter button. when the user click filter button then filter server action should be trigger with user filter.
  - server action takes user filter input and validate it
  - redirect to page with user input filter and within the page, read the search params and make a db call and render the ui and sent back to client.
  
 
you implicitly tells to typescript, hey this is string type not undefined:

  formData.get(email) as string

  (process.env.DBCONNECTION_STRING as string)
              (or)
  (process.env.DBCONNECTION_STRING!)




export async function addUserAction(formData:FormData){


  const validatedData = userZodSchema.safeParse({
      email:formData.get("email"),
      password:formData.get("password")
  })
  
  parse methods doesn't throw any error but if the data is not correct then it will ignore the additional properties.

  if(!validatedData.success) return validatedData.error

  //write database logic..

  return "user registered successfully..."

}


z.string().trim()

clear the form:
  <form ref={formRef} ></form>

  formRef?.current?.reset() // clear the form after form submission.
    or
  use hook form reset()



export interface userFormState<T>{
    errors? : StringMap;
    successMessage? : StringToBooleanMap;
    data? : T;
    blur? : StringToBooleanMap
}

export interface StringMap{
  [key:string] : string
}

export interface StringToBooleanMap{
  [key:string] : boolean
}

async function action(formdata:FormData or unknown):Promise<userFormState<undefined>>{
}


export function convertZodError(error:ZodError):StringMap{
  return error.issues.reduce((acc:{[key:string] : string }, issue)=>{
      acc[issue.path[0]]=issue.message;
      return acc
}, {})
}

if(!validatedData.success){
    const errors=convertZodError(validatedData.error)
    return {errors}
}


const sleep =(ms:number)=> new Promise((resolve)=>setTimeout(resolve, ms))
await sleep(10000)


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





references:
  a deep dive into Airbnb's server driven ui system.
  judo - what is server driven ui  
  appllo grapgql - ship products faster with sdui



if  i encounter a tag that i have to use i just google it.


i want to work with people, who ar much more relatable and approachable to me, eventually because then i get to learn a lot from them.   

hey can you guide me to build a better eccomm website. it should be user interface & user experience and best practices and industry standards.

https://dev.to/anmolbaranwal/15-amazing-things-you-can-do-with-simple-javascript-g88?ref=dailydev

airbn
uber
flipkart
amazon
meshow
snitch

*/
