M.AutoInit();
var last_choice = 1;

//localStorage
if (localStorage.getItem('liked') == null){
  liked_local1 = [];
  localStorage.setItem('liked', JSON.stringify(liked_local1));
}

//show previews
var liked = [];
liked = JSON.parse(localStorage.getItem('liked'));

if (liked.length == 0) eid('tab3content').innerHTML = '<div class="col s12 m12 l12">Здесь пока что пусто</div>';

Object.keys(wallpapers).forEach((wpid, i) => {
  if (wallpapers[wpid]['platform'] == 'pc'){
    //pc
    eid('tab2content').innerHTML += '<div class="col s12 m6 l4"><div class="card hoverable" onclick="show_detail('+wpid+')" style="cursor:pointer;"><div class="card-image"><img src="img/wallpapers/preview/'+wpid+'.png"><span class="card-title">#'+wpid+'</span></div></div></div>';
    if (liked.indexOf(Number(wpid)) != -1) eid('tab3content').innerHTML += '<div class="col s12 m6 l4"><div class="card hoverable" onclick="show_detail('+wpid+')" style="cursor:pointer;"><div class="card-image"><img src="img/wallpapers/preview/'+wpid+'.png"><span class="card-title">#'+wpid+'</span></div></div></div>';
  } else {
    //mobile
    eid('tab1content').innerHTML += '<div class="col s4 m3 l2"><div class="card hoverable" onclick="show_detail('+wpid+')" style="cursor:pointer;"><div class="card-image"><img src="img/wallpapers/preview/'+wpid+'.png"><span class="card-title">#'+wpid+'</span></div></div></div>';
    if (liked.indexOf(Number(wpid)) != -1) eid('tab3content').innerHTML += '<div class="col s4 m3 l2"><div class="card hoverable" onclick="show_detail('+wpid+')" style="cursor:pointer;"><div class="card-image"><img src="img/wallpapers/preview/'+wpid+'.png"><span class="card-title">#'+wpid+'</span></div></div></div>';
  }
});


//show Details
function show_detail(wpid){
  last_choice = wpid;
  liked_local2 = JSON.parse(localStorage.getItem('liked'));

  //fill with data
  eid('modal_header').innerHTML = '#'+wpid;
  eid('modal_picture').src = "img/wallpapers/preview/" + wpid + ".png";
  eid('modal_platform').innerHTML = wallpapers[wpid]['platform'] == 'mobile' ? 'смартфон' : 'компьютер';
  colors = '';
  wallpapers[wpid]['colors'].forEach((item, i) => {
    colors += item + ', ';
  });
  colors = colors.substring(0, colors.length-2);
  eid('modal_colors').innerHTML = colors;
  eid('modal_grad_type').innerHTML = wallpapers[wpid]['type'];
  eid('modal_date').innerHTML = wallpapers[wpid]['date'];

  eid('download_but').href = "img/wallpapers/" + wpid + ".png";

  if (liked_local2.indexOf(wpid) != -1){
      eid('like_this').innerHTML = '<i class="material-icons left">favorite</i>Убрать из избранного';
  } else {
      eid('like_this').innerHTML = '<i class="material-icons left">favorite_border</i>В избранное';
  }

  $('#modal_details').modal('open');
}


function reparse_liked(){
  eid('tab3content').innerHTML = '';
  liked_local3 = JSON.parse(localStorage.getItem('liked'));
  liked_local3.forEach((wpid, i) => {
    if (wallpapers[wpid]['platform'] == 'pc'){
      //pc
      eid('tab3content').innerHTML += '<div class="col s12 m6 l4"><div class="card hoverable" onclick="show_detail('+wpid+')" style="cursor:pointer;"><div class="card-image"><img src="img/wallpapers/preview/'+wpid+'.png"><span class="card-title">#'+wpid+'</span></div></div></div>';
    } else {
      //mobile
      eid('tab3content').innerHTML += '<div class="col s4 m3 l2"><div class="card hoverable" onclick="show_detail('+wpid+')" style="cursor:pointer;"><div class="card-image"><img src="img/wallpapers/preview/'+wpid+'.png"><span class="card-title">#'+wpid+'</span></div></div></div>';
    }
  });
}

function add_to_fav(){
  liked_local4 = JSON.parse(localStorage.getItem('liked'));

  if (liked_local4.indexOf(last_choice) == -1){
    liked_local4.push(last_choice);
    eid('like_this').innerHTML = '<i class="material-icons left">favorite</i>Убрать из избранного';
  } else {
    liked_local4.splice(liked_local4.indexOf(last_choice), 1);
    eid('like_this').innerHTML = '<i class="material-icons left">favorite_border</i>В избранное';
  }

  localStorage.setItem('liked', JSON.stringify(liked_local4));

  reparse_liked();
}
