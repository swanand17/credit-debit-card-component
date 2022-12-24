function keyupFn(event) {
  const input = event.target;
  const inputIndex = parseInt(input.dataset.index);

  // Show input values on card START
  if(input.id === "cardHolderName"){
    let showCardHolderName = document.querySelector('.card--name');
    showCardHolderName.textContent = "";
    showCardHolderName.textContent = input.value.toUpperCase();

    if(!input.value){
      showCardHolderName.textContent = input.placeholder.slice(3).toUpperCase();
    }
  }

  if(input.id === "cardNumber"){
    let showCardNumber = document.querySelector('.card--number');
    if(input.value.length === 4 || input.value.length === 9 || input.value.length === 14){
      input.value += " ";
    }
    showCardNumber.textContent = "";
    showCardNumber.textContent = input.value;

    if(!input.value){
      showCardNumber.textContent = input.placeholder.slice(3);
    }
  }

  if(input.id === "cardMonth"){
    let showCardDate = document.querySelector('.card--date');
    showCardDate.textContent = "";
  
    showCardDate.textContent = input.value.toString() + "/";
    if(!input.value){
      showCardDate.textContent = "00/" 
                                + input.form[3].value
                                ? input.form[3].value.toString()
                                : "00";
    } 
  }

  if(input.id === "cardYear"){
    let showCardDate = document.querySelector('.card--date');
    showCardDate.textContent = input.form[2].value.toString() + "/" + input.value.toString();

    if(!input.value){
      showCardDate.textContent = input.form[2].value
                                 ? input.form[2].value.toString()
                                 : "00" + "/00";
    } 
  }

  if(input.id === "cardCVC"){
    let showCardCVC = document.querySelector('.card--cvc');
    showCardCVC.textContent = input.value.toString();

    if(!input.value){
      showCardCVC.textContent = input.placeholder.slice(3);
    }
  }
  // Show input values on card END

  // Auto tab into next input
  if (input.value.length == input.maxLength) {
    let nextInput = input.form[inputIndex + 1];
    if (nextInput)
      nextInput.focus();
    else
      input.blur();
  }
};

function validateForm(){
  var alphabetOnlyRegex = /^[A-Za-z]+$/;
  var numberOnlyRegex = /^\d+$/;

  // Getting all inputs
  const inputs = document.getElementsByTagName('input');

  for(let [key, input] of Object.entries(inputs)){

    // Getting <p class='blank-field'><p>
    let nextElement = input.nextElementSibling;
    nextElement.style.display = "none";

    // Empty value check
    if(input.value.trim().length === 0){
      if (nextElement && nextElement.classList.contains('blank-field')) {
        nextElement.style.display = "block";
      }
      // Getting <p class='wrong-format'><p>
      nextElement = nextElement.nextElementSibling;
      if(nextElement){
        nextElement.style.display = "none";
      }
      
    } else {
      // Getting <p class='wrong-format'><p>
      nextElement = nextElement.nextElementSibling;
      nextElement.style.display = "none";

      // Format check
      if(input.id === "cardHolderName" && alphabetOnlyRegex.test(input.value) && nextElement.classList.contains('wrong-format')){
        nextElement.style.display = "block";
      }else if(numberOnlyRegex.test(input.value) && nextElement.classList.contains('wrong-format')){
        nextElement.style.display = "block";
      } else {
        nextElement.style.display = "none";
      }
    }
    nextElement = "";
  }

}