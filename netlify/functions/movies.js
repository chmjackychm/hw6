// allows us to read csv files
let csv = require('neat-csv')

// allows us to read files from disk
let fs = require('fs')

// defines a lambda function
exports.handler = async function(event) {
  // write the event object to the back-end console
  console.log(event)

  // read movies CSV file from disk
  let moviesFile = fs.readFileSync(`./movies.csv`)
  
  // turn the movies file into a JavaScript object, wait for that to happen
  let moviesFromCsv = await csv(moviesFile)

  // write the movies to the back-end console, check it out
  console.log(moviesFromCsv)

  // 🔥 hw6: your recipe and code starts here!
  let year = event.queryStringParameters.year
  let genre = event.queryStringParameters.genre
  
  if (year == undefined || genre == undefined) {
    return {
      statusCode: 200, // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
      body: `Nope!` // a string of data
    }
  }
  else {
    let returnValue = {
      numResults: 0,
      movies: []
    }

    for (let i=0; i < moviesFromCsv.length; i++) {
      // Get movie from the list
      let movieID = moviesFromCsv[i]
      // Only pick user-picked year and genre
      // Ignore any results with no genre or movies with no runtime
      if (movieID.startYear.includes(year) && movieID.genres.includes(genre) && !movieID.runtimeMinutes.includes('\\N')) {
        // Get required elements from each movie
        let movieChosed = {
          primaryTitle: movieID.primaryTitle,
          ReleasedYear: movieID.startYear,
          Genres: movieID.genres
        }

        returnValue.movies.push(movieChosed)
        returnValue.numResults = returnValue.numResults + 1
      }
      else {
        continue
      }
    }

    // a lambda function returns a status code and a string of data
    return {
      statusCode: 200, // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
      // body: `Hello from the back-end!` // a string of data
      body: JSON.stringify(returnValue) // Show result on html
    }
  }
}





// // allows us to read csv files
// let csv = require('neat-csv')

// // allows us to read files from disk
// let fs = require('fs')

// // defines a lambda function
// exports.handler = async function(event) {
//   // write the event object to the back-end console
//   console.log(event)

//   // read movies CSV file from disk
//   let moviesFile = fs.readFileSync(`./movies.csv`)
  
//   // turn the movies file into a JavaScript object, wait for that to happen
//   let moviesFromCsv = await csv(moviesFile)

//   // write the movies to the back-end console, check it out
//   // console.log(moviesFromCsv)

//   // 🔥 hw6: your recipe and code starts here!
//   let year = event.queryStringParameters.year
//   let genre = event.queryStringParameters.genre
  
//   if (year == undefined || genre == undefined) {
//     return {
//       statusCode: 200, // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
//       body: `Nope!` // a string of data
//     }
//   }
//   else {
//     let returnValue = {
//       numResults: 0,
//       movies: []
//     }

//     for (let i=0; i < moviesFromCsv.length; i++) {
//       // Get movie from the list
//       let movieID = moviesFromCsv[i]
//       // Get required elements from each movie
//       let movieChosed = {
//         primaryTitle: movieID.primaryTitle,
//         ReleasedYear: movieID.startYear,
//         Genres: movieID.genres
//       }

//       returnValue.movies.push(movieChosed)
//       returnValue.numResults = returnValue.numResults + 1
//     }

//     // a lambda function returns a status code and a string of data
//     return {
//       statusCode: 200, // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
//       // body: `Hello from the back-end!` // a string of data
//       body: JSON.stringify(returnValue) // Show result on html
//     }
//   }
// }
