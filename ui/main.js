console.log('Loaded!');
var element = document.getElementById("main-text");
element.innerHTML = "new value";
var move = document.getElementById("im");
var marginLeft = 0;
function moveRight(){
    marginLeft =marginLeft + 10;
im.style.marginLeft = marginLeft + 'px';
    
}
im.onclick =function(){
    var interval =setInterval(moveRight , 50);
  
};