(function(){
  var incrementer = document.getElementById('incrementer');
  var count = document.getElementById('count');
  var countUrl = '/counter';

  incrementer.addEventListener('click', function(){
    incrementCount();
  });

  function onSuccess(req, cb){
    return function(){
      if (req.readyState === 4 && req.status === 200) {
        cb(req.responseText);
      }
    }
  }

  function incrementCount(){
    var req = new XMLHttpRequest();

    req.onreadystatechange = onSuccess(req, function(){
      updateCount();
    });

    req.open('POST', countUrl);
    req.send();
  }


  function setCount(text) {
    var obj;
    try {
      obj = JSON.parse(text);
      count.innerHTML = parseInt(obj.counter, 10);
    } catch (e) {
    }
  }

  function updateCount(hitCache){
    var req = new XMLHttpRequest();

    req.onreadystatechange = onSuccess(req, setCount);

    req.open('GET', countUrl);
    if (!hitCache){
      req.setRequestHeader('Cache-Control', 'no-cache');
    }
    req.send();
  }

  updateCount(true);
}());
