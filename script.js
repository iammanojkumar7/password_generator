
// show the length of input
const lengthSlider = document.querySelector(".pass-length input");
options = document.querySelectorAll(".option input"),
copyIcon = document.querySelector(".input-box span")
passwordInput = document.querySelector(".input-box input"),
passIndicator = document.querySelector(".pass-indicator"),
generateBtn = document.querySelector(".generate-btn");

const characters = { //OBJECT OF LETTERS,NUMBER & SYMBOLS
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    number: "0123456789",
    symbols: "^!$%&|[](){}:;.,*+-#@<>~",
    space:" ",
}

const generatePassword = () => {
    let staticPassword = "",
    randomPassword = "",
    excludeDuplicate = false,
    passLength = lengthSlider.value;
    
    options.forEach(option => {// LOOPING THROUGH EACH OPTION'S CHECKED
        if(option.checked){// IF CHECKED IS CHECKED
            if(option.id !== "exc-duplicate" && option.id !== "space" ){
                staticPassword += characters[option.id]
            }else if (option.id === "space"){
                staticPassword += `  ${staticPassword}  `;
            }else {
                excludeDuplicate = true;
            }
        }
    });

    for (let i = 0; i < passLength; i++){
       let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)];
        if(excludeDuplicate){
            !randomPassword.includes(randomChar) || randomChar == " " ? randomPassword += randomChar : i--;
        }else{
            randomPassword += randomChar;
        }
    }
   passwordInput.value = randomPassword;
}
 const updatePassIndicator = () =>{
    passIndicator.id = lengthSlider.value <= 8 ? "waek" : lengthSlider.value <= 16 ? "medium" : "strong";
 }

const updateSlider = () =>{
    document.querySelector(".pass-length span").innerText = lengthSlider.value; ///span number
    generatePassword();
    updatePassIndicator();
}
updateSlider();

const copyPassword = () => {
    navigator.clipboard.writeText(passwordInput.value);
    copyIcon.innerText.style.color = "blue";
    setTimeout(() => {
        copyIcon.innerText =""
    })
}

copyIcon.addEventListener("click",copyPassword);
lengthSlider.addEventListener("input",updateSlider);
generateBtn.addEventListener("click",generatePassword);