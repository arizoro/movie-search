async function getMovies(){
  $('#movieList').html('')

await $.ajax({
    url : "http://www.omdbapi.com",
    type : "GET" ,
    dataType : "json",
    data : {
        'apikey' : '9a42b47a',
        's' : $('#inputSearch').val()
    },
    timeout: 30000,
    success : function(result){  
        let movies = result.Search
        if( result.Response == "True"){
            $.each(movies, async function(i,data) {
                await $('#movieList').append(`
                <div class="col-md-4">
                <div class="card mb-3" >
                <img src="`+data.Poster+`" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">`+data.Title+`</h5>
                  <p class="card-subtitle mb-2 text-body-secondary">`+data.Year+`</p>
                  <a href="#" class="card-link text-decoration-none seeDetail" data-bs-toggle="modal" data-bs-target="#info" data-id="`+data.imdbID+`" >See Detail</a>
                  </div>
              </div>
              </div>
            `)            
          $('#inputSearch').val('')
        })
          }else{
              $('#movieList').html('<h1 class="text-center mt-3" > '+result.Error+'</h1>')
            }
        },
      error: function (error){
        $('#movieList').html(error.message)
      }
    }
)}

$('#btnSearch').on('click', function(){
    getMovies()
})

$('#inputSearch').on('keyup', function(e){
  if(e.key == "Enter"){
    getMovies();
  }
})

$('#movieList').on('click','.seeDetail', async function(){
  await $.ajax({
    url : "http://www.omdbapi.com",
    type : "GET" ,
    dataType : "json",
    data : {
        'apikey' : '9a42b47a',
        'i' : $(this).data('id')
    },
    success : function(movie) {
      let rating = movie.Ratings[0]
      if( movie.Response == "True"){
        $('.modal-body').html(`
        <div class="container-fluid" >
          <div class="row" >
            <div class="col-md-4">
            <img src="`+movie.Poster+`" class="img-fluid" />
            </div>

            <div class="col-md-8" >
              <ul class="list-group">
                <li class="list-group-item"><h3> `+movie.Title +`</h3></li>
                <li class="list-group-item">Release : `+movie.Released +`</li>
                <li class="list-group-item">Genre : `+movie.Genre +`</li>
                <li class="list-group-item">Director : `+movie.Director +`</li>
                <li class="list-group-item">Writer : `+movie.Writer +`</li>
                <li class="list-group-item">Rating : `+rating.Value+`</li>
              </ul>
            </div>
          </div>
        </div>
        `)
      }

    }
  })
})