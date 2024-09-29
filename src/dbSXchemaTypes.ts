/*
user :
user_id : primary key
email, password, mobile no.

user address: user_id, address_id, is_default.

address: id, unit_number, street_number, address_line1, address_line2, cite, region, postal code, country_id. <-----> country: id, country_name 


process:

create a product on the database and returning that product.
upload the images to storage and get the stored image urls.
add to image urls to image table with productid of the product and returning the image_id 


produt name, description, summary, category:select, original_price, discount price, images.

in the product crosoule, display only if the images.length>1

*/