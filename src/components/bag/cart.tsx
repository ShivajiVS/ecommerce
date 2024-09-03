/* 
add cart button:
    toast.success(`Added ${title} to your cart `)
    zustand addCart(product object)

in product page, you need to maintain a seperate quantity state and pass the quantity state to addTocart function.

increment: quantity + 1

decrement: if(quantity > 1){ quantity - 1 }

Note: if the page is ssr rendered, access the data from url using useparams hook. yu need to need to parse the data because by default all are strings.


calculate total price: 
    consr {useCart} = useCartState()
    const totalPrice = useMemo(()=>{
    return cart.reduce((acc, item)=>{
      return acc+item.price! * item.quantity
    }, 0)
    },[cart])

persist cart state across the tabs and even refresh the page: wrap the entire cart logic within persist function.
persist functions accepts two arguments: first argument is entire cart logic and other one is object which contains cart name and storage type.

Example:

    import {persist} from "zustand/middleware"

    export const useCartState = create<CartType>()(
      persist(
        (set) => ({})
      )
    )

Note: after cartType we can also provide empty() to stastify the typescript.



 */
