export function GET() {
  return Response.json({
    name: "vyshnavi",
  });
}

/*

- route handlers can be nested inside the app directory, similar to page and layout.

- but there cannot be a route file at the same route segment level as page because nextjs doesn't know the request is coming from which one. 

- the following htpp methods are supported: GET, POST, PUT, PATCH, DELETE, HEAD AND OPTIONS.

- if an unsupported methods are called, nextjs will return a 405 method not allowed response.

- nextjs extends the native Request and response with NextRequest and NextResponse to provide convenient helpers for advanced usecases.

- previously, api routes were used for handling form subbmissions. route handlers are likely not solution for these use cases. we will be recommending the use of mutations(with server actions) for this when ready.

- by default all Get route handlers are static(during build time).

- you can read the request body using standard web api method.

- route handlers supports both edge and nodejs runtime seamlessly, including support for streaming. yu can use the runtime segment config option to specify the run time.
export const runtime = "edge" // nodejs is the default 


  - app
      - api
          - user
            - route.ts
          - post
            - route.ts
          - posts
            - route.ts

Note: you must export the functions

  GET: 
    export function GET() {
      return Response.json({
        name: "vyshnavi",
      });
    }

POST: export function POST(){}

PUT:  export function PUT(){}

export function GET() {
      // extract the body and search params.

      // process the data.

      // retrun the response, it can be either success or failur,
}


import {NextRequest, NextResponse} from "next/server"

export function GET(req:NextRequest) {

  const body = req.json()

  console.log(req.headers.get("authorizations"))

  console.log(req.nextUrl.searchParams.get("offset"))

  return NextResponse.json({data}, {status:200})

}

dynamic routes or catch all routes
export function GET(req:NextRequest, {params}:{params:{yourDynamicRoute:string[] }}){}

export function GET(req:NextRequest, arr:any){
  console.log(arr.params.yourDynamicRoute)
}



Why not local storage?

Cookies and LocalStorage both provide ways to store data on the client-side, but they serve different purposes and have different characteristics.

- Cookies are send with every request to the website (by the browser) (you don’t have to explicitly add a header to the fetch call)

- Cookies can have an expiry attached to them

- Cookies can be be restricted to only https and to certain domains.

- You don’t need to explicitly set the cookie header in the browser. It’s automatically set by the browser in every request

- don't use local storage: initial request(www.shivaji.dev), you can't pass local storage data to server. it won't works in server side rendered applications so you can't use local storage and authorization headers in ssr applications, you have to use cookies because cookies, browser sends by default.
 

samesite: 

  none: it allows from all websites

  strict: suppose your website link is placed on the shivaji.dev website, that time request is coming from shivaji.dev website not your website so the initial request,the browser doesn't sends any cookies to server and hence the server will show me login page even you already logedin.

  lax: only get requests and on top level navigation. dont allow from anywhere but different website doing top level navigation then send cookies. 
  - different websites pointing to your website, add a button to reach website, you should allow cookies to be sent on those requests.



event driven architecture: something happens whatever the things happens its duty of other third party or other servers to notify about that event whenever that happens.


getServerSession not returing database user id: when you're calling getServerSession() in a server components or in any server environment, make sure to pass your authOptions as its argument. 
extract out next-auth config into a seperate file.
  export const NEXT_AUTH={
    provider:[],
    secret:"",
    callbacks:{}
  }

getServerSession(NEXT_AUTH)

google auth: create a api keys in the gcp cloud
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID || "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
  })
own signIn page: you need to tell to next-auth, hey don't redirect inbuilt next-auth signIn because i have my own signIn page.
  export const NEXT_AUTH={
      provider:[],
      secret:"",
      callbacks:{},
      pages:{
        signIn:"/signIn"
      }
  }


app/api/auth/[...nextauth]/route.ts : this contains all your global configuration. all auth related requests will be hanlded by this route.

  import {NextAuth } from "next-auth"

  const handler= NextAuth(authOptions)

  export {handler as GET, handler as POST}

config options:
  provider: 
    - an array of authentication providers for signing in.
    - three auth providers:
        Oauth - social providers like google, github, facebook.
        email - password less.
        credentials - traditional email and password.

  session:
    - object with properties handling the user session.
    - properties:
      - strategy: 
          - how to save the user session.
          - possible values:
            - jwt(default)
            - database: store the session in your database(requires an adapter)
      - maxAge: how long until an idle session expires.
      - updateAge: how frequently extend the session.
      - generateSessionToken: function returing session token string.

  pages: specify paths to custom sign in, sign out, error pages override the built-in page.
    pages:{
      signIn:"/signIn",
      signOut:"/signOut",
      error:"/auth/error",
      verfifyRequest:"/auth/verfiy-request"
      newUser:"/auth/new-user"
    }

  callback: callback are asynchronous functios executed when an action is performed.
    - there are four callbacks: sigin callback, redirect, jwt, session callback.

  adapters:
    - if you would like to persist user or account data in your own database.
    - install one of the many available database adapters.
    - pass the client promise here.


on the client side: 
  - session context provider: to access the session on the client, you'll need to provide the session context, sessionProvider at the top level of the your application.
   - useSession hook will have access to the session data on the client.   
   - signIn hook: 
    - using signIn function ensures the user ends back on the page they started on after completing a signIn flow.
    - without any arguments: ()=> signIn()
        - redirect the user to the signIn page.
        - sets a callback to ensure the user ends back on the page they started.
    - with provider:  ()=> signIn("google")
    - when used with the email provider(passwordless), you need to pass the user email.
           ()=> signIn("email", {email:"email@gmail.com"})

   - signOut hook:
      - use the signOut fuction to sign the user out.
      - it redirects the user back on the page they started.
      - use the redirect:false option to avoid the redirecting and reloading the page after signing the user out.
      
on the server:
  getServerSession requires the same authOption you pass to NextAuth when initializing


middleware: 
  export {default} from "next-auth/middleware"

  export const config={macther:["/protected/:path*"]}

  generate a key through your git terminal or cmd : openssl rand -base64 33
  
  adapter:DrizzleAdapter(your db schema),
  secret:process.env.NEXT_AUTH_SECRET!,
  session:{
    strategy:"jwt"
  }, 


version 5:
get session in  server components:
  import {auth } from "@/lib/auth"  
  const session = await auth()

  users table schema: id, name, email, password, image, isEmailVerified, isTwoFactorEnabled, role.
  const RoleEnum = pgEnum("role", ["user", admin])
  role:RoleEnum("role").default("user") 


  signIn flow :
    await signIn("credentials", {email:email, password:password})

  access the email and password in the authorize function.
    authorize(credentials){
      //validate the credientiels with zod schema. if it is not validate, return null

      // make a db call to get the user information.

      // if email not exist, return null.

      // verfify user entered email with database user email, if the email is not valid, return null

      // if the email is valid and then verify the password. if it is not valid, return null.

      // if the email & password is valid, return user object.

    } 

google :
GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    authorization:{
      params:{
        prompt:"consent",
        access_type:"offline",
        response_type:"code"
      }
    }
  }),

authorized redirect url's: http://localhost:3000/api/auth/callback/google

return the response from logIn server action to client login components, based on the response, render accordly either success or error. if success response, redirect to dashboad page.
  server action:
    const response = await signIn()
    return response 
  client:
    const response = await signInWithEmail(formdata)
    if(!!response.error){}
    if(response.success) router.push("/dashboard") 


un-controlled component:
  function Test(){
    const inputRef = useRef()
    const handle=()=>{
      console.log(inputRef.target.value)
    }
    return(
      <form onSubmit={handle}>
        <input type="text" ref={ref} />
        <button type="submit">submit</button>
      </form>
    )
  }

controlled component:
  function Test(){
    const [input, setInput] = useState("")
    const handle=()=>{
      console.log(input)
    }
    return(
      <form onSubmit={handle}>
        <input type="text" value={input} onChange={e=>setInput(e.target,value)} />
        <button type="submit">submit</button>
      </form>
    )
  }  

FormData:
  function Test(){
    const handle=(e)=>{
    const formData = new FormData(e.currentTarget)
      console.log(formData.get("email"))
    }
    return(
      <form onSubmit={handle}>
        <input type="text" name="email" />
        <button type="submit">submit</button>
      </form>
    )
  }

console.log(formData) // it will not print plain object.

Object.fromEntries() : you can avoid the getters and unpack the values into a more plain object  
  console.log(Object.fromEntries(formData))
Note: however, doing so with typescript does not give you the types you would have wanted.

 <form action={handle}>
    <button type="submit" value="google" name="action" >google</button>
    <button type="submit" value="github" name="action" >girhub</button>
 </form>
 async function handle(formData){
  const action = formData.get("action")
 }

 formStatus hook: 
  - useFormStatus hook must be called from a component that is inside the form. submit button should be the child of form element.
  - useFormStatus hook will only return the status information of parent form, it will never neturn the status information of any other form that is rendered in the same component(submit button).
  - it gives pending state and it is also gives the form data.

  <form action={handle}>
    <Submit />
  </form>
  function Submit(){
    const {pending, data} = useFormStatus()
    const handle=(e)=>{
    const formData = new FormData(e.currentTarget)
      console.log(formData.get("email"))
    }
    return(
        <div>
          <input type="text" name="query" />
          <button type="submit" disabled={pending}>submit</button>
          <p>{data?.get("query")}</p>
        </div>
    )
  }

https://github.com/code100x/cms/blob/main/src/app/signin/page.tsx



https://nextjsstarter.com/blog/nextauth-protected-routes-best-practices/



*/
