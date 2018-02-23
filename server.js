var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

// Create an Express App
var app = express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/authors5_db');

var AuthorSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3},
    quotes: [{quote: { type: String, required: true, minlength: 3}, rank: Number}]
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

mongoose.model('Author', AuthorSchema);
var Author = mongoose.model('Author');

mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//app.use(express.static(path.join(__dirname, './static')));
app.use(express.static( __dirname + '/client/dist' ));


// Set our Views Folder Directory
app.set('views', path.join(__dirname, './views'));
// Set our View Engine set to EJS
//app.set('view engine', 'ejs');

// Routes
app.get('/authors', function(req, res) {
    Author.find({}, function(err, authors) {
      if (err) {
        console.log("Returned error", err);
        res.json({message: "Error", error: err});
      } else {
        //res.json({data: names})
        res.json({message: "Success", authors: authors})
      }
    })
    //res.render('index', {errors: req.session.errors});
})

app.get('/authors/:id', function(req, res) {
  console.log(req.params.id);
  let id = req.params.id;
  Author.findOne({_id: id}, function(err, author) {
    if (err) {
        console.log("Returned error", err);
        res.json({message: "Error", error: err});
    } else {
        console.log('successfully retrieved an author!', author);
        res.json({message: "Success", author: author})
    }
  })
})

app.post('/authors/', function(req, res) {
    console.log("REQUEST", req.body.name)
    var author = new Author({name: req.body.name});
    console.log("Created new author", author)
    author.save(function(err) {
      console.log("Saved the author", author)
      if (err) {
        console.log("Returned error", err);
        res.json({message: "Error", error: err});
      } else {
        console.log('successfully added a task!');
        res.json({message: "Success", author: author})
      }
    })
})

app.put('/authors/:id', function(req, res) {
    let id = req.params.id;
    Author.findById(id, function(err, author) {
      if (err) {
        console.log("Returned error", err);
        res.json({message: "Error", error: err});
      } else {
        if (req.body.name.length < 3) {
          console.log("NAME is TOO SHORT!");
          res.json({message: "Error", error: "Length of the name must be at least 3 letters"});
        }
        else {
          author.name = req.body.name;
          author.save(function(err) {
            // if there is an error console.log that something went wrong!
            if (err) {
                console.log("Returned error", err);
                res.json({message: "Error", error: err});
            } else { // else console.log that we did well and then redirect to the root route
                console.log('successfully edited a task!');
                res.json({message: "Success", author: author})
            }
          })
        }
      }
    })
})

app.delete('/authors/:id', function(req, res) {
    console.log("trying to delete");
    let id = req.params.id;
    Author.remove({_id: id}, function(err) {
      if (err){
        console.log("Returned error", err);
        res.json({message: "Error", error: err});
      }else {
        console.log('successfully deleted an author!');
        res.json({message: "Success"})
      }
    })
})

app.put('/quotes/:id', function(req, res) {
    console.log("trying to add a quote on backend", req.body);
    let id = req.params.id;

    if (req.body.quote.length < 3) {
              console.log("QUOTE is TOO SHORT!");
              res.json({message: "Error", error: "Length of the quote must be at least 3 letters"});
    }
    else {
        Author.update({_id: id}, {$push: {quotes: req.body}}, function(err) {
          if (err){
            console.log("Returned error", err);
            res.json({message: "Error", error: err});
          }
          else {
            console.log('successfully added a quote!');
            res.json({message: "Success"})
          }
        })
    }
})

app.delete('/quotes/:id/:quote_id', function(req, res) {
    console.log("trying to delete a quote on backend", req.params);

    let id = req.params.id;
    let quote_id = req.params.quote_id;

    console.log("Trying to delete quote on backend", quote_id)
    Author.update({_id: id}, {$pull: {quotes: {_id: quote_id }}}, function(err) {
    if (err){
            console.log("Returned error", err);
            res.json({message: "Error", error: err});
    }
    else {
            console.log('successfully deleted a quote!');
            res.json({message: "Success"})
    }
    })

})

// app.put('/vote/:id/:quote_id', function(req, res) {
//
//     let id = req.params.id;
//     let quote_id = req.params.quote;
//     console.log("trying to update a quote on backend", quote_id);
    // Author.update({_id: id}, {$set: {quotes: {_id: quote_id}, rank: 5}}, function(err) {
    // if (err){
    //         console.log("Returned error", err);
    //         res.json({message: "Error", error: err});
    // }
    // else {
    //         console.log('successfully updated a quote!');
    //         res.json({message: "Success"})
    // }
    // })
    // Author.findById(id, function(err, author) {
    //   if (err) {
    //     console.log("Returned error", err);
    //     res.json({message: "Error", error: err});
    //   } else {
    //     var quotes = author.quotes
    //     console.log("Quotes by this author:", quotes)
    //     for (var i=0; i<quotes.length; i++){
    //       console.log("QUOTE", quotes[i])
    //       for (x in quotes[i]){
            // if (x._id == quote_id){
            //   //console.log("****",author.quotes[i].rank)
            //   author.quotes[i].rank ++
            //   author.save(function(err) {
            //     // if there is an error console.log that something went wrong!
            //     if (err) {
            //         console.log("Returned error", err);
            //         res.json({message: "Error", error: err});
            //     } else { // else console.log that we did well and then redirect to the root route
            //         console.log('successfully edited a task!');
            //         res.json({message: "Success", author: author})
            //     }
            //   })
//             }
//           }
//         }
//         }
//
//
//     })
//
// })

app.all("*", (req,res,next) => {
  res.sendFile(path.resolve("./client/dist/index.html"))
});

// Set our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})
