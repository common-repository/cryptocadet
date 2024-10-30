===CryptoCadet===
License: GPLv2 or later
Tested up to: 6.5
Stable tag: 4.0.0
Contributors: ascendantfi
Tags: crypto, ecommerce, blockchain, payments



CryptoCadet is a lightweight, no-code payment processor that permits the user to accept payment in EVM chains and Solana. 

## Features

- Accept payments across multiple EVM networks (Ethereum, Binance, Polygon)
- New! Accept payments on Solana
- Accept any token you want
- Can add multiple buttons to your Wordpress site for multiple products
- Integrates with Web3Modal
- Create affiliate codes for your own referral program
- Receive and send custom emails when payments are made
- Track success with advanced customer analytics


Sign up for a free account on https://app.ascendant.finance to receive your API key. Upon signing in, an API key will be auto-generated for you.

Return to your Wordpress Admin Dashboard and go to Settings. Under CryptoCadet Pay Settings, add the API key.

Inside the body of a post, insert:

[crypto_pay_button 
product_id='YOUR_PROD_ID'
display_name='DISPLAY_NAME'
container_id='SOME_ID_NAME'
label='BUTTON TEXT'
email='required'
shipping_address='required'
lang='en'
eth='true'
sol='true'
shoppingCart='true'
 ]


REQUIRED PROPERTIES:

- The pay portal defaults to 'eth' but you can set this to false. In order to add Solana, sol should be set to 'true'.

- container_id should be a unique id and not be shared with any other element on the page. 

- product_id is the id you create for the particular product linked to this button. You can create your product id in the 'Build' section in https://app.ascendant.finance

- display_name shows the common name of the product the user is buying and appears in the portal beside the quantity.

- label is the button text that will appear.



OPTIONAL PROPERTIES:



- The 'email' and 'shippingAddress' are optional variables can be required in order to request the user's email and shipping address upon payment.

- When shoppingCart is set to 'true,' and additional cart button appears that allows the user to buy multiple products at once.

- The lang property defaults to English and corresponds to the ISO 639-1 Code for the following supported languages:

- ar (Arabic)
- de (German)
- en (English)
- es (Spanish)
- fr (French)
- pt (Portuguese)
- zh (Chinese)


## Styles

Custom styles can be added by including a style property variable to change the button style. 



## License 

GPLv2 or later

## Contributions

We love your input! We want to make contributing to this project as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer



