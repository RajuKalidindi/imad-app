//counter code
var button = document.getElementById("counter");
button.onclick = function() {
    //create request
    var request = new XMLHttpRequest();
    //capture response and store it in a var
    request.onreadystatechange = function(){
      if(request.readyState === XMLHttpRequest.DONE){
          if(request.status === 200){
              var counter = request.responseText;
              var span = document.getElementById("count");
              span.innerHTML = counter.toString();
          }
      }  
    };
    //make request
    request.open('GET', 'http://krkraju997.imad.hasura-app.io/counter', true);
    request.send(null);
};
//submit name
var nameInput = document.getElementById("name");
var name = nameInput.value;
var submit = document.getElementById("submit_btn");
submit.onclick = function(){
    var names = ['name1','name2','name3'];
    var lists = '';
    for(var i=0;i<names.length;i++){
        lists += '<li>'+ names[i] +'</li>';
    }
    var ul = document.getElementById("nameList");
    ul.innerHTML = lists;
};