function getNameList() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = async function (){
        if (this.readyState === 4 && this.status === 200){
            const responseArray = JSON.parse(this.response);
            const nameList = document.querySelector('#pokemon-names-list');
            for (let i = 0; i < responseArray.length; i++){
                let node = document.createElement('option');
                node.setAttribute('value', responseArray[i]);
                nameList.appendChild(node);
            }
        }
    };
    xhttp.open("GET", "/pokemon/namesList" , true);
    xhttp.send();
}
