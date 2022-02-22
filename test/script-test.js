var button = document.querySelector('.button');
var inputValue = document.querySelector('.inputValue');
var name = document.querySelector('name');
var name = document.querySelector('desc');
var name = document.querySelector('temp');

button.addEventListener('click', function(){
    fetch('http://api.openweathermap.org/data/2.5/weather?q='+inputValue.value+'&appid=b639d479640601578fbf359e38c5ee04')
    .then(response => response.json())
    .then(data => {
        var nameValue = data['name'];
        var tempValue = data['main']['temp'];
        var descValue = data['weather'][0]['description'];

        name.innerHTML = nameValue;
        temp.innerHTML = tempValue;
        desc.innerHTML = descValue;
    })

})
