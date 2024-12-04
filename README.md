## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```


https://jordbrown.medium.com/how-i-learn-technical-things-fast-a5b3f253d915

https://medium.com/@mateogalic112/building-saas-product-with-next-js-14-architecture-overview-947371e78d46

https://jordbrown.medium.com/how-i-learn-technical-things-fast-a5b3f253d915

https://clerk.com/docs/custom-flows/oauth-connections#create-the-sign-up-and-sign-in-flow

https://clerk.com/docs/authentication/social-connections/oauth#enable-a-social-connection

https://clerk.com/docs/authentication/social-connections/google




Fix: sanity error in client side because in client side, we use sanity image build to generate image urls for image showcase but sanity client is not exposed in client side(server side env.)

https://www.marksandspencer.infeather-and-down-quilted-packaway-puffer-jacket/p/000000060683424006.html?srsltid=AfmBOortBmNFMyIXV3kUocq_rUO2OoscZ7o206-KxAvJYH2tXUz5cf0mtmQ

https://www.sanity.io/learn/course/day-one-with-sanity-studio/bringing-content-to-a-next-js-front-end

https://www.sanity.io/docs/sanity-typegen#1a6a147d6737?utm_source=github&utm_medium=readme&utm_campaign=next-sanity

https://github.com/sanity-io/next-sanity?tab=readme-ov-file#generate-typescript-types

latest products - 8 -- see more products link

recommended or featured products - 8 -- see more products link -> navigate to more products page. it contains list products and search box with filter options and also contains pagination or infinite scroll.

product page,

https://haru-fashion.vercel.app/

https://brewingsoul.com/products/not-always-right-never-wrong?_pos=2&_fid=15d4e418e&_ss=c

https://www.marksandspencer.in/crew-neck-zip-up-sweatshirt/p/P60678826.html?dwvar_P60678826_color=XH&dwvar_P60678826_size=S&pid=P60678826&quantity=1

sanity typeGen lib
install sanity cli: npm install -global sanity@latest

ctrl + p : typescript -> select version -> version 5.6.3

"typegen": "npx sanity@latest schema extract && npx sanity@latest typegen generate"

//or

"typegen": "sanity schema extract && sanity typegen generate"

create types:

- sanity

  - schemaTypes

    - productType.ts
    - categories.ts
    - index.ts : this file used to add your types(sanity schems).
      export const schema :{types:SchemaTypeDefination[]}={
      types:[catogories,productType]
      }
    -

    "db:migrate": "tsx ./src/db/migrate.ts" - drizzle orm

https://github.com/anushujan/next-auth-nextjs15/blob/main/src/components/LoginForm.tsx

https://github.com/DevAntonioRogers/drizzle-neon-next-multistep-form/blob/main/server/auth.ts

https://github.com/tobiasmeyhoefer/next-auth-v5/blob/main/schemas/index.ts

https://github.com/HuXn-WebDev/Auth.js-v5-Complete-Course/blob/main/lib/getSession.ts

https://github.com/code100x/cms/blob/main/src/app/signin/page.tsx

https://nextjsstarter.com/blog/nextauth-protected-routes-best-practices/

how did i do 

https://github.com/DevAntonioRogers/drizzle-neon-next-multistep-form/blob/main/app/(auth)/login/page.tsx

https://preview.themeforest.net/item/flatsome-multipurpose-responsive-woocommerce-theme/full_screen_preview/5484319?_ga=2.158718458.1710574276.1727961171-898020830.1727350514

https://www.youtube.com/watch?v=-IXkPn1WV00

https://www.portotheme.com/wordpress/porto/shop3/

https://lilsimsie-merch.creator-spring.com/

git remote add origin https://github.com/ShivajiKS/ecommerce.git
git branch -M main
git push -u origin main

https://www.youtube.com/feed/downloads

dynamic route:it should be some name related(seperated by - symbol) to product name and add search params to it like productId and other information.
in the dynamic route, fetch the product data using productId searchparam and not by dynamic slug id.

packages :
zustund
react hook form
zod
framer motion
shadcn
next-themes

supabase
drizzel

cloudflare for images:
https://st4ng.medium.com/how-to-use-next-js-image-optimization-with-cloudflare-569da7b3ddc6
https://logsnag.com/blog/deploying-nextjs-13-app-dir-to-cloudflare-pages

stripe payments:
https://medium.com/@rakeshdhariwal61/integrating-stripe-payment-gateway-in-next-js-14-a-step-by-step-guide-1bd17d164c2c


https://www.annscottage.com/


https://g2vape.com/


https://www.rallyenergy.co/


https://www.josiefairbijoux.com/


https://www.peregrineclothing.co.uk/


https://orm.drizzle.team/learn/tutorials/drizzle-with-supabase#setup-supabase-and-drizzle-orm


https://orm.drizzle.team/docs/get-started-postgresql#supabase

https://medium.com/@hiro08gh/next-js-naming-conventions-are-checked-with-eslint-rules-946371d67882#:~:text=js%20file%20naming%20conventions%20are%20checked%20with%20ESLint%20rules,-Hiroki%20Ueda&text=The%20current%20front%2Dend%20environment,beginning%20of%20the%20file%20name.

https://stackoverflow.com/questions/53132068/naming-best-practices-for-react-components-and-functions-including-filenames

card : small
details page : bigger
cart : thembnail

fonts :

products page: Lora - 700 - 400 : available on google fonts..

product page

SourceSansPro - 400 
