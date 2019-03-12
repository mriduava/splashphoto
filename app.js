$(()=>{
    $('#search-form').submit(e =>{
        e.preventDefault();
        let searchTerm = $("#search-input").val();     
        searchMe(searchTerm);  
        $('#show').html('');   
    });

    const searchMe = term => {
        const imageurl = "https://api.unsplash.com/photos/?client_id=71d9b261270c5726f9b1cb89077d9f9b75adb2d2208e99179f3ec881edb2ae2f";
        let imagedata= {
          search: term
        };
   

    $.ajax({
        method:'GET',
        url: imageurl,
        data: imagedata,
        dataType: 'json'
    }).done(function(data){
        console.log(data);
        $.map(data, function(image){
            $('#show').append(
            `<div id="showimage" class="col-md-4">
                <div class="card m-3">
                <img  src="${image.urls.raw}" class="card-img-top">
                <div class="card-body bg-light">
                    <h4 class="card-title text-primary">${image.user.name}</h4>
                    <p class="card-text text-info">Bio: ${image.user.bio}</p>
                    <p class="card-text text-success">Release Date: ${image.release_date}</p>
                    <h5 class="card-text">Price: ${image.user.total_likes} kr</h5>
                    <button id="${image.id}" class="btn btn-primary">BUY</a>
                </div>
              </div>
             </div>`
            );
        });
        let cartArray = [];       
        $('#show #showimage').on('click', 'button', function(e){
            let btnid = $(this).attr('id');
            console.log(btnid);            
            $.map(data, function(cartimage, i){                
                if(btnid === cartimage.id){                    
                   let text =  $('.modal-body').append(
                       `<div class="cart-list">
                          <ul class="cartitmes">                
                             <li><img  src="${cartimage.urls.raw}" style="width:60px; height: 60px;">
                             ${cartimage.id} -  PRICE ${cartimage.user.total_likes} kr </li>
                          </ul>
                       </div>`
                       )  
                cartArray.push(text); 
                $('.itemnum').text(cartArray.length);                           

                }
            });            
        })

    });
  }
});









// $(()=>{
//     $('#search-form').submit(e =>{
//         e.preventDefault();
//         let searchTerm = $("#search-input").val();
//         $('#show').html('');    
//         searchMe(searchTerm);  
//     });

//     const searchMe = term => {
//         const url = "https://api.unsplash.com/photos/?client_id=71d9b261270c5726f9b1cb89077d9f9b75adb2d2208e99179f3ec881edb2ae2f";
//         let params = {
//           search: term
//         };
    

//         $.ajax({
//             url: url,
//             type: "GET",
//             data: params,
//             dataType: "json"
//         })
//         .done(data =>{
//             showResults(data.results);
//         })
//         .fail(fail =>{
//             console.log(fail);
//         })
//     };

//     let searchTerm = $("#search-input").val();
//     const showResults = data => {   
//         $.each(data, (i, image) => {
//             console.log(image.url);
//             $('#show').append(
//                 `<div> ${image.user.name} Gender: ${image.user.bio} </div>`
//             );
//         });
//     };

// });