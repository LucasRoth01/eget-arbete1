const express = require("express");
const tingo = require("tingodb")().Db;

const db =new tingo("./database",{});
const col=db.collection("mat");
const app =express();
app.use(express.urlencoded({extended:false}));
app.use(express.static(__dirname));
//col.insert({titel:"pizza",recept:"sadasdasda"});

app.get("/",function(req,res){
  res.send("hem");
});


app.get("/mat",function(req,res){
    col.find().toArray(function(err,data){
      let html =data.map(function(item){
         return `
         <div class="mat">
         <h2>mat: ${item.mat}<h2>
         recept: ${item.recept}
         <a href="/mat/delete/${item._id}">
         </div>
         `
         
      });
      res.send(html.join(""));

    });
});


app.get("/mat/create",function(req,res){
  const html =`    
  <form action="/mat/create" method="post">  
      <input type="text" name="mat" placeholder="mat"><br>
      <input type="text" name="recept" placeholder="recept"><br>
      <input type="submit" value="save mat">
  </form>
  `;

  res.send(html);
});
app.post("/mat/create",function(req,res){
  col.insert(req.body,function(err){
    if(err) res.send("error")
    else res.redirect("/mat");
  });
});

/*  app.get("/mat/:id",function(req,res){
  res.send("");
}); */
 app.get("/mat/delete",function(req,res){
  res.send("delete");
});









app.listen(3500,function(){console.log("lyssnar 3500")});

