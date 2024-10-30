// Function to check for mobile devices
function isMobileDevice() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
}

// Function to add item to localStorage array
function addItemToLocalStorageArray(key, item) {
  let existingItems = localStorage.getItem(key);
  let itemsArray = existingItems ? JSON.parse(existingItems) : [];
  itemsArray.push(item);
  localStorage.setItem(key, JSON.stringify(itemsArray));
}


// Main function to setup button and modal
function setupButtonAndModal(apiKey, productId, label, displayName, style, cartStyle, email, shippingAddress, lang, eth, sol, shoppingCart, noQuantity, containerId) {
    //const container = document.getElementById('buttonSpot') || document.body;
    const container = document.getElementById(containerId) || document.body;

    const translation = {
      "en": "Open",
      "fr": "Ouvrir",
      "ar": "افتح",
      "es": "Abrir",
      "pt": "Abrir",
      "de": "Öffnen",
      "zh": "打开"
    }

    
 
    
      
     
    
    
   
    // Generate unique IDs for the modal and button to avoid conflicts
    const uniqueModalId = `modalContainer`;
    const uniqueButtonId = `showModalButton`;
    const uniqueModalContent = `modalContent`;
    const logo = `logo`;
    const metamaskLink = `metamaskLink`;
    const coinbaseLink = `coinbaseLink`;
    const phantomLink = `phantomLink`;

    // Check if the modal and button already exist to avoid duplicates
    
        // Inject the modal HTML with unique ID
        const modalHTML = `
        <div id="${uniqueModalId}" style="display:none;">
            <div id="${uniqueModalContent}">
                <span><img id="${logo}" src="/cryptocadetlogo_white.png"/>cryptoCadet&trade;</span>
                <a href="#" id="${metamaskLink}"><button><img src="/MetaMask_Fox.png"/> ${translation[lang]} Metamask</button></a>
                <a href="#" id="${coinbaseLink}"><button><img src="/coinbase_icon.png"/>${translation[lang]} Coinbase</button></a>
                <a href="#" id="${phantomLink}"><button><img src="/phantom-logo.png"/>${translation[lang]} Phantom</button></a>
            </div>
        </div>`;
        document.body.insertAdjacentHTML("beforeend", modalHTML);

        

         // Create the button with unique ID
         const button = document.createElement('button');
         button.id = uniqueButtonId;
         button.textContent = label; // Set button text
         button.style = style;
         container.appendChild(button); // Append the button to the container

         if (shoppingCart) {
          const buttonWrapper = document.createElement('div');
          buttonWrapper.style.display = 'flex';
          buttonWrapper.style.flexDirection = 'column';
  
          const buttonSpan = document.createElement('span');
          buttonSpan.appendChild(button);
  
         
            const cartId = "cartButton";
            const cartButton = document.createElement('button');
            cartButton.innerHTML = '&#128722;';
            cartButton.className = 'cartButton';
            cartButton.id = cartId;
            cartButton.style = cartStyle;
            cartButton.addEventListener('click', () => {
              addItemToLocalStorageArray(`${apiKey}-cart`, { displayName: displayName, productId: productId });
            });
            buttonSpan.appendChild(cartButton);
        
          buttonWrapper.appendChild(buttonSpan);
          container.appendChild(buttonWrapper);
        } 


          // Function to handle click outside the modal to close it
    function handleClickOutside(event) {
        
        const modalContainer = document.getElementById(uniqueModalId);
        if (modalContainer && !modalContainer.contains(event.target)) {

          
            modalContainer.style.display = "none";
        }
      }
    
  
      // Add click event listener to the document for closing modal on click outside
      document.addEventListener('mousedown', handleClickOutside);
  
 

        button.addEventListener('click', function() {
            let refCode = "";
  
          if (typeof window !== "undefined") {
            const q = new URLSearchParams(window.location.search);
            if (q.get("referrer")) {
              refCode = q.get("referrer");
            }
          }

          if (!localStorage.getItem(`${apiKey}-cart`)) {
            addItemToLocalStorageArray(`${apiKey}-cart`, { displayName: displayName, productId: productId });
          }

          const queryParams = new URLSearchParams({
            pubKey: apiKey,
            prod: productId,
            displayName: displayName,
            referrer: refCode,
            email: email,
            shippingAddress: shippingAddress,
            lang: lang,
            eth: eth,
            sol: sol,
            shoppingCart: localStorage.getItem(`${apiKey}-cart`) ? true : false,
            noQuantity: noQuantity
          });
          
         
          const encodedUrl = encodeURIComponent(`https://portal.cryptocadet.app?${queryParams.toString()}`);
        
         
          const modalContainer = document.getElementById(uniqueModalId);

            if (isMobileDevice()) {
                // Construct the URLs
                const metamaskURL = `https://metamask.app.link/dapp/portal.cryptocadet.app?pubKey=${apiKey}&prod=${localStorage.getItem(`${apiKey}-cart`) ? localStorage.getItem(`${apiKey}-cart`) : productId}&referrer=${refCode}&email=${email}&shippingAddress=${shippingAddress}&lang=${lang}&shoppingCart=${localStorage.getItem(`${apiKey}-cart`) ? true : false}&noQuantity=${noQuantity}`;
                const coinbaseURL = `https://go.cb-w.com/dapp?cb_url=https%3A%2F%2Fportal.cryptocadet.app%3FpubKey%3D${apiKey}%26prod%3D${localStorage.getItem(`${apiKey}-cart`) ? localStorage.getItem(`${apiKey}-cart`) : productId}%26referrer%3D${refCode}%26email%3D${email}%26shippingAddress%3D${shippingAddress}%26lang%3D${lang}%26shoppingCart%3D${localStorage.getItem(`${apiKey}-cart`) ? true : false}%26noQuantity%3D${noQuantity}`;
                const phantomURL = `https://phantom.app/ul/browse/${encodedUrl}`

                // Set the href attributes
                document.getElementById(metamaskLink).setAttribute("href", metamaskURL);
                document.getElementById(coinbaseLink).setAttribute("href", coinbaseURL);
                document.getElementById(phantomLink).setAttribute("href", phantomURL)

                localStorage.removeItem(`${apiKey}-cart`);
                // Show the modal
                modalContainer.style.display = "block";
                modalContainer.style.width = "90%";
            } else {
             
              let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
    width=400,height=500,left=${window.screen.width},top=0`;
              const newWindow = window.open("", "_blank", params);
    
              // Define your API URL and the data you want to send
              const apiUrl = `https://api.cryptocadet.app/api/user/get-user`;
              const data = {
                apiKey,
              };
    
              fetch(apiUrl, {
                method: "POST", // Specify the method
                headers: {
                  "Content-Type": "application/json",
                  // Additional headers if required
                },
                body: JSON.stringify(data), // Convert data to JSON string
              })
                .then((response) => response.json()) // Parse the JSON response
                .then((data) => {
                  console.log("Success:", data);
    
                  // Check if the response meets your criteria for opening a new window
                  if (data) {
                    const newUrl = `https://portal.cryptocadet.app?pubKey=${apiKey}&prod=${localStorage.getItem(`${apiKey}-cart`) ? localStorage.getItem(`${apiKey}-cart`) : JSON.stringify({ productId: productId })}&referrer=${refCode}&email=${email}&shippingAddress=${shippingAddress}&lang=${lang}&eth=${eth}&sol=${sol}&shoppingCart=${localStorage.getItem(`${apiKey}-cart`) ? true : false}&noQuantity=${noQuantity}`;
                    console.log("Navigating to:", newUrl);
                    localStorage.removeItem(`${apiKey}-cart`);
                    newWindow.location = newUrl;
                  } else {
                    console.log("Closing window due to unsuccessful response");
                    newWindow.close();
                  }
                })
    
                .catch((error) => {
                  console.error("Error:", error);
                  console.log("Closing window due to error");
                  newWindow.close();
                });
            }
        })
    }

document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded and parsed");
   
    // Assuming cryptocadetSettings is populated via wp_localize_script in your WordPress PHP
    const apiKey = cryptocadetSettings.apiKey;

    // Find all containers intended for the CryptoCadet Pay buttons
    const containers = document.querySelectorAll('[id^="crypto-button-"]');
    containers.forEach(container => {
        const productId = container.getAttribute('data-product-id'); // Get product ID from data attribute
        const label = container.getAttribute('label');
        const displayName = container.getAttribute('display-name')
        const style = container.getAttribute('style');
        const cartStyle = container.getAttribute('cart-style')
        const email = container.getAttribute('email');
        const shippingAddress = container.getAttribute('shipping-address')
        const lang = container.getAttribute('lang')
        const eth = container.getAttribute('eth')
        const sol = container.getAttribute('sol')
        const shoppingCart = container.getAttribute('shopping-cart')
        const noQuantity = container.getAttribute('no-quantity')
        setupButtonAndModal(apiKey, productId, label, displayName, style, cartStyle, email, shippingAddress, lang, eth, sol, shoppingCart, noQuantity, container.id); // Setup button and modal for each container
    });
});
  
  
  
  
  
  