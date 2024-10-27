/* 

internals of next-auth.
internals of jwts and how it works under the hood.
what is auth flow when loginto the application and when you click signout button.
internals of sql.
how to optimize the queries.


I truly understand that you are busy with your work but i'm really interested to continue our previous discussion.

cracking the interview is about knowing more than the interviewer.

I was looking for a job as a junior developer and for anyone to reach out if they were looking to hire a junior developer.

how do you learn quickly and effectively in just the stuff you need.

many companies still have openings because a lot of skilled people do not apply and many unskilled people apply but are not crack the interviews. as a result, opening remain. there is still a gap and this gap can be filled which will significantly increase your chance of getting job.


work upon the things which is our control.
keep a check on your mental health.
step by step approach.


taking actions is the best step to learn 
taking action you can learn stuff much faster than reading books. 



creating and composing together functions can directly apply to creating and composing components however instead of composing functions together to get some value, you can compose components together to get some ui.



clean architecture and domain driven design.



benefits of nextjs:
  - control over rendering strategies.
  - nextj simplifies some things like server actions, code splitting, font, image, scrpt optimzation.
  - better technology under the hood.
  - in-buit seo.
  - file based routing.
  - good docs.

what you still need to consider:
  - more functionality = more complexity.
  - new problems(eg: ssr)
    - hydration errors because of ssr.
    - window not exists
  - can't ignore all features like cacching, you need to learn a lot of new stuff otherwise it may work against for you.
  - falling into traps with use client or use server.
  - some nextjs specific things are abstracted from you which can lead good or bad.
  - but you are not drilled to use. ex: the link component, you can still stick with normal a tag.
  
- wear normal cloths.
- get rid of your phone.
- listen to concentrating music 
- use techniques lile pomodoro. flow tool.
- solve problems wisely.
- don't overthink every problem.
- before you start coding think about what do i wanna do today.
- make regular pauses where you can sort your mind.

add prettier and prettier-plugins-tailndcss to your project as a dev dependency.

ctrl + k + s : search format document to change the shortcut key. shift + f

.prettierrc file: 
    {
      "printWidth":"80",
      "semi":true,
      "singleQuote":true,
      "tabwidth":2,
      "jsxSingleQuote":false,
      "plugins":["prettier-plugin-tailwindcss"],

    }

tailwindcss best practices:
  1. instead of adding same styles for different elements, you can just add classes once
    - inside globals.css:
        h1{
          @apply font-bold text-2xl text-zinc-800
        }
        p{
          @apply font-bold text-medium text-zinc-800 
        }     
  2. extract into components:
    const H1= ({children}:{ children: React.ReactNode})=> {
      return (
        <h1 className="font-bold text-2xl text-zinc-800">{children}</h1>
    )}



CSR, SSR, SSG, ISR, Dynamic SSR: these are Different techniques for rendering the user interface.
rebdering is process of converting your code into user interface and depending upon how you have writen your code and few other conditions, this rendering could either take place in the client side or server side. 
when and where the rendering is going to be happening.


CSR: browser make a request to server, server then sends a some html along with javascript and then this javascript executed in the browser and then builds out the entire page so this is called client side rendering.
    client  ----> edge network or server to get initial page(empty html page).
    client  ----> make a API call and then that server hits your data source(DB) and then it goes back to client. 
    client  ----> server  ----> client.
    
    index.html file : client request and server response. few millseconds complete blank white page is displayed until client executes the bundle.js file.
    bundle.js : client request and server response
    other api calls : client request and server response
    
    - when we navigate between routes in client side rendered applications, there is no Full page refresh because all your code is being rendered in your browser.
    - CSR is a modern technique used in web development where the rendering of a web page is performed in the browser using javascript. instead of server sending a fully rendered Html page to the client.
    when you run npm run build command, it will create a dist file which all your files.
         npm run build : this command will create an optimized build for your project.
         cd dist -----> serve
         npm install -g serve & serve
         serve command serves the dist folder via http port 
    - problems with CSR:
        - poor seo.
        - slower initial page load.
      note: we do not have these problems in case of server side rendering.
  
SSR: the content is full rendered on the server before being sent to the client and bacause of that we get faster initial load times and very good seo.
all of this code is first going to be executed on the server side, so whenever i get a request to this particular route, i will first fecth data from database then render out the entire content and then send back a complete html response to client. 
    - client make a http call  ---->  server make a call  ----> data source(DB) ---->  it goes back to server to server with data  ----> server generate a html page and return to client ----> client render the html.
    - client <---->  server <---->  data source
    - it happended for the initial render but then for subsuquent naviagtions, it is de-opted back to client side rendering.
    - it is great for Seo because google bots can read all your information.
    - seo optimized, gets rid of the waterfalling problem, no white flash before you see content.
    - downsides of ssr: 
      - expensive since every request needs to render on the server.
      - harder to scale, you can't cache to cdn's
    - dynamic means every users wants its own page.
    - static means you created it once, everyone is going to fetch the same page 
    - probelms with SSR : it can be slower for dynamic content because server needs to render the page on each request and since because server is rendering the page on each request, there would be higher server load in case of SSR.

SSG: to fix the issues of both CSR abd SSR, SSG was introduced. SSG pages are pre-rendered at build time and we get very good seo and also get faster initial load times and since html is pre-rendered at build time, these can be served as static content files which basically improve the performance but SSG is still not suitable for highly dynamic content that cahnge frequently because content is fixed at build time the if you want to update the content of your website, you basicaly have to rebuild enrire application again.
    - client  ---->  Edge or CDN.
    - at build time: fetch the data from server and generate a html page during build time and cache it on the CDN  
    - it request comes from client and then CDN serves the cached html page.
    - SSG is great for but static data(no change).
    - if you update data then you need to re-build your whole application.

ISR: 
    - ISR is a improved version of SSG. basically it will generate the pages at build time but it also enables updates at run time. IsR combines the both benefits of SSG which is basicallyfater intial load times and very good seo and with the ability to update content without a full rebuild the application 
    - if you wanted to update you data then you need a ISR pattern.
    - you don't have to Re-build your whole application, you could just Re-build specific routes either timed interval or after an event on month. 
    - between two requests: the time gap between the last request and current request.
    - not ideal for real time content or personalized content.
  
    
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


Request memoization: 
  - if you make a same request in multiple times in the same page(route) then your request is cached and use it for other requests also by avoiding making multiple ruquests.
  - cleared request memoization cache when you refresh the page(route).
  - if you want to opt out from request memoization you can use abort controller.
      ex: 
        const controller = new AbortController()
        fetch("api.com"{signal:controller.signal})
  - request memoization is only for fetch not for direct database data fetching but you can tell react to do samething for database request instead. 
    ex: 
      import {cache} from "react"
      export const database = cache(()=>{
        make database call and get the data.
        return data
      })
    
data cache: data is cached across the all routes and all users.
revalidate : 60 - even after 60 seconds, first user(request) get stale data and remaining requests gets the fresh data(make a new request, cache it and serve it).
   single fetch : fetch("api.com", {next: revalidate: 60 })
   entire page : export const revalidate = 60
   revalidate the entire page: revalidatePath("test")
   revalidate the specific fetch(single) : revalidateTag("todo")
         fetch("api.com", {next: tags: ["todo", "1"] })
         fetch("api.com", {next: tags: ["todo"] })
   Note: if the tag is revalidated then data cache is cleared and if you make a new request then server get the new data, store it in the data cache and serve it until the tag is revalidated.

   - with time based revalidation we get steal data for first request. 
   - with ondemand revalidation we never get stale data, as soon as you revalidate something, its always give you the most update data, next time you fetch it.
   - you can opt out of it in two ways: 
        1. fetch("api.com", {cache:"no-store"})
        2. export const dynamic= "force-dynamic"
  
   - data cache for database data fetching:
      ex: 
        import {unstable-cache} from "next/cache"
        export const database = unstable-cache(()=>{
          make database call and get the data.
          return data
        },["todo"],{tags:["db"] or revalidate:60})

full route cache: 
  - full route is generated during build time and cached on the server. routr can be static, ssg or isr. you can revalidate the path.
  - at reuest      e.

SSG: using SSG, we can generate a pages during build time(head of time). the page is generated and cached during buid age is not generated during build time, by default the server build that page at request time and cached. next time when the user request the page then the server serve it from cache.
Note: you can opt out from this default behaviour by exporting a dynamicParams variable with false value. 
    export const dynamicParams = false - opt out from default behaviour.
    export const dynamicParams = true -  default behaviour. 

     

client components: client components are run only on the server for very first time that we goto the website and every single page you goto, after that it is going rendered exclusely on the client and server components are still going to be run on the server. 

server actions:
functions cannot be passed directly to server components unless you explicitly mark it into "use server" or 
 <form action={()=> console.log("-----")}
server action must be asynv functions.

formData.get("name") as string

parallel + route intercepting:
  @model : render this parallel route in the layout file.
    (.)sign-in
      page.tsx
    default.tsx: return null
  sign-in:
    page.tsx

 

react-select lib.
server-only, client-only lib.


SSG:
export async function generateStaticParams(){
  make api call and get the all products
  const products = await db.query.products.findMany()
  if(products){
    const slugs = products.map(item =>({slug:item.id.toString()})) 
    return slugs;
  }
    return [] // you need to add a check because sometimes you might get fail, if something wrong with api, and it is heard to debug. that's why you need to return an empty array. 
}

Page: 
export async function Page({params}:{params:{slug:string}}){
  const product = db.query.products.findFirst({where:eq(product.id, Number(params.slug) )})
  return(
  <main>
    <section className="flex flex-col lg:flex-row gap-4 lg:gap-12>
      <div className="flex-1">
    
        varients.map( item => item.type === selectedColor && item.varientImages.map(img => (
          <CarouselItem key={img.id}>
               {img.url ? <Image priority className="rounded-md" width="1280" height="720" src={product.img.irl} alt={product.title} /> : null }
          </CarouselItem>
        )))
        small images:
        <div className="flex overflow-clip py-2 gap-4 ">
          {images.map(item => 
            <Image priority className="rounded-md transition-all duration-300 ease-in-out cussor-pointer hover:opacity-75" width="72 ${selectedImage? "opacity-100 ": "opacity-75"}" height="48" src={product.img.irl} alt={product.title} />
          )}
        </div>

      </div>
      <div className="flex flex-1 flex-col gap-2">
        <h2>{product.title}</h2>
        <p>{product.price}</p>
        <div dangerouslySetInnerHtml={{__html: product.description}}></div>
        description
      </div>
    </section>
  </main>
  )
}

modify searchParams:
router.push(`/products?$id={id}&title=${title}`,{scroll:false})
scroll:false: don't scroll to top of the page, stay where you present  

api call:
try{
  const res= fetch("api.com")
  const json = await res.json()
  return {
    success:true,
    data: json
  } 
}
catch(error){
  return {
    success:false,
    data: error.message
  }
} 

services:
    user.service.ts


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
data fetching, caching, deduping, stale data, data update, performance optimization, managing memory, memozing queries, less code and less bugs.
deduping: prevent unnecessary api call when you make multiple duplicate api calls.

caching, background refetching, invalidate the cache.

let's say that you do have the data in the cache, and you're showing that to the user ideally, what you will want to do, at the same time, trigger a request in the background  the user doesn't see that. to just refresh the data, in case that there's new new data to be found.

don't write the code that's already written, use something that's tested and that works and that does the work for you.


stealTime
gcTime: grabage collection

example:
  let data= useQuery({
    queryKey:["products"],
    queryFn:yourDataFetchingFunction
  })

you get the data, loading state, error state:
const {data, loading,error }=data;

Mutation:
  let newPost= useMutation({
    mutationFn:(title)=>{
      return post.push({id:211, title})  
    }
  })
<Button onclick={()=>newPost.mutate("post 3")}>Post</Button>


  let {mutate, isLoading, error, isError, isPending, reset}= useMutation({
    mutationFn:(title)=>{
      return post.push({id:211, title})  
    }
  })
<Button onclick={()=>mutate("post 3")}>Post</Button>


function handleSubmit(event){
  const formData = new formData(event.target)
  const title = formData.get("title")
  const tags = Array.from(formData.keys()).filter(key=>formData.get(key)==="on")

  if(!title || !tags ) return

  mutate({title, tags})

  event.target.reset() //clear the form
}

const tags =["dcdfd","dererer"]
<form onSubmit={handleSubmit}>
    <input type="text" />
    <div>
    {
      tags.map(tag => (
          <div key={tag}>
            <input name={tag} id={tag} type="checkbox" />
            <label htmlfor={tag}>{tag}</label>
          </div>
        ))
    }
    </div>
</form>


Invalidate the data in every success mutation:
  example:
    import {useQueryClient} from "@tanstack/react-query"

    const queryClient = useQueryClient()
    let newPostMutation= useMutation({
        mutationFn:(title)=>{
          return post.push({id:211, title})  
        },
        onSuccess:()=>queryClient.invalidateQueries(["post"])
      })


disable the button while mutating the data:
  example :
     <Button disabled={newPostMutation.isLoading} onclick={()=>newPostMutation.mutate("post 3")}>Post</Button>



frontend:
    form data
    local storage
    third party api
    url
    Api request

Backend:
  Api route handlers.
  Server components.
  Server actions.

    third party api
    Webhooks.
    env variables.
    file system.
    url.
    database(orm).


API: to validate the api data by using typescript, it will won't work because typescript work during build time not run time. apis is executed in run time. 
over time backend team might be change the structure of data(different property names) and data type of the data.

in order to fix this issues, you need to use an validators like zod or yup schema validator to validate the Api data.
  steps to be followed:  
    - create a zode schema.
    - make api call and get the data. type would be unknown. 
        ex: const data:unknown = fetch("www.google.com")
    - validate the api data with zode safeParse and zod schema.
    - safeParse methods gives three properties: Data, success and error message.
    - based on the success message, you can handle the execution. 
        ex: if(!validateData.success)return  
        
extract type from zod schema: single source of truth.
  type Product = z.infer<typeof yourSchema>

validate search params:  
    const SearchParamsSchema=z.Object({
      id:z.coerce.number(),
      color:z.enum(["red","green","blue"]), 
    })
    const searchParams= useSearchParams()
    const searchParamsObject = Object.fromEntries(searchParams)
    const validatedSearchParams = SearchParamsSchema.safeParse(searchParamsObject)

  z.coerce.number(): if its already a number, it will stay number but if it is a string zod will convert this into number.


 Api route handlers:
  export async function Post(request:Request, response:NextResponse){

    const body:unknown = await reuest.json();
    const validatedData = YourZodSchema.safeParse(body)
    if(!validatedData.success){
      return NextResponse.json(validatedData.error, {status: 422})
    }
  }

 env variables:
    const EnvSchema=z.Object({
       DATABASE_URL:string(),
    }) 
    export const parsedEnv = EnvZodSchema.parse(process.env) 
  
file system:
import path from "path"
import {Promise as fs} from "fs"

  export async function Post(request:Request, response:NextResponse){
    const fileDirectory = path.join(process.cwd(), "../../pathoFYourFile")
    const  fileContains = await fs.readFile(fileDirectory + "/data.json")

    const parsedData =  YourZodSchema.safePare(fileContains)

    return NextResponse.json(parsedData.data)
  }

search params:
const searchParamsSchema = z.Object({
  id:z.coerce.number(),
  color:z.enum(["red", "blue"])
})
 export function Page({searchParams}:{searchParams:{[key:string]: string | string[] | indefined}}){

  const parsedSearchParams = searchParamsSchema.safeParse(searchParams)

 
 }





server actions:  server action are asynchronous functions that are executed on the server and the main purpose is that you can use them in a form while handling form submissions and performin data mutations so whenever you want to update, create, delete data.

.next -> server -> app -> page.js file :
    format the file : search 1031, within the function list all id for server actions.

.next -> static -> chunks -> app -> page file : client side code

.next -> cache -> webpack -> .rscinfo : encryption key for server actions.
Note: you can add custome encryption key by adding an environment variable.
NEXT_SERVER_ACTIONS_ENCRYPTION_KEY = YOUR KEY

next/dynamic : lazy load imports.


FormData: if you dirctly bind the server action using form action prop then you can receive an formData object(not event) as a parameter to the server action.
  <form action={handleServerAction}></form>
  export async function handleServerAction(formData:FormData){}


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


example:
export const config = {
matcher: ['/courses/:path*']
} 
const token = req.nextauth.token;
if(!token){
 return NextResponse.redirect(new URL("/invalidsession", req.url))
} 
const user = getUser();
if(!user){
 return NextResponse.redirect(new URL("/invalidsession", req.url))
} 

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


const sleep = (ms:number)=> new Promise((resolve)=>setTimeout(resolve, ms))
await sleep(10000)







references:
  a deep dive into Airbnb's server driven ui system.
  judo - what is server driven ui  
  appllo grapgql - ship products faster with sdui



if i encounter a tag that i have to use i just google it.


i want to work with people, who are much more relatable and approachable to me, eventually because then i get to learn a lot from them.   

hey can you guide me to build a better eccomm website. it should be user interface & user experience and best practices and industry standards.

https://dev.to/anmolbaranwal/15-amazing-things-you-can-do-with-simple-javascript-g88?ref=dailydev

airbn
uber
flipkart
amazon
meshow
snitch

*/
