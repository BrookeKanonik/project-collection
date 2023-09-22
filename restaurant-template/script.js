//Tabbed Menu

function openMenu (event, menuName){
    let menuArray = document.getElementsByClassName("menu") //get ELEMENTS so will be an array
    for (let i=0; i <menuArray.length; i++){
        menuArray[i].style.display = 'none' //will show nothing to figure out which ones we want to make visible
    }
    //passing an index into function could shorten the code, but this is more readable
    let tabLinks = document.getElementsByClassName("tablink")
    for (let i=0; i < tabLinks.length; i++){
        tabLinks[i].classList.remove('active-tab') //currently no tab will be active
    }

    document.getElementById(menuName).style.display = 'block' 
    event.currentTarget.classList.add('active-tab') //know what was clicked on and gives that tab the class active-tab
}

//onLoad() can be used, but we will use another way where whatever element has the id of main link. that will show at a page refresh
document.getElementById("mainLink").click()


function submitForm() {
    let name = document.getElementById("Name").value;
    let people = document.getElementById("People").value;
    let date = document.getElementById("Date").value;
    let request = document.getElementById("Message").value;
    window.open("mailto:email@email.com?subject=Restaurant%20Message&body=Name:%20"+name+ "%0D%0AParty%20Size%20:%20"+people+"%0D%0ADate%20Request:%20"+date+"%0D%0AMessage:%20"+request);
}