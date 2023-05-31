let cont=1
let tet=1
function mudarCor(){
    if (cont==1){
    document.documentElement.style.setProperty("--branco", "black");
    document.documentElement.style.setProperty("--preto", "white");
    cont+=1
    }
    else {
    document.documentElement.style.setProperty("--branco", "white");
    document.documentElement.style.setProperty("--preto", "black");
    cont-=1

    }
}
function hambuTroca(){
    if (tet==1){
        document.documentElement.style.setProperty("--hamb","flex")
        tet+=1
    }
    else{
        document.documentElement.style.setProperty("--hamb","none")
        tet-=1
    }
}

