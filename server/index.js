const express=require('express');
const mysql=require('mysql');
const cors=require('cors');


const app=express();
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors())
const conn=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'bookstore',
    password:'root'
})
conn.connect((err,result)=>{
    if(err){
        console.log(err)
    }else{
        console.log("connected")
    }

})
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
// ****Method for users table
app.get('/user',(req,res)=>{
    const sql="SELECT * FROM users"
    conn.query(sql,(err,result)=>{
        if(err) res.json(err);
        res.json(result)
    })
})
app.get('/user/:email',(req,res)=>{
    const sql=`SELECT * FROM users WHERE email=?`
    conn.query(sql,[req.params.email],(err,result)=>{
        if(err) res.json(err);
        res.json(result)
    })
})
app.post('/user',(req,res)=>{
    const user=req.body
    const sql="INSERT INTO users (name,email,phoneNumber,img) VALUES (?,?,?,?);"
    conn.query(sql,[user.name,user.email,user.phoneNumber,user.img],(err,result)=>{
        if(err) res.json(err);
        res.json("user created")
    })
})

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
// ****Method for books table

app.get('/book',(req,res)=>{
    const sql="SELECT * FROM books"
    conn.query(sql,(err,results)=>{
        if(err) res.json(err);
        res.json(results)
    })
})
app.post('/book',(req,res)=>{
    const sql="INSERT INTO books (iduser,title,author,image,price) VALUES (?,?,?,?,?);"
    conn.query(sql,[req.body.iduser,req.body.title,req.body.author,req.body.image,req.body.price],(err,result)=>{
        console.log(req.body)
        res.json("created")
    })
})


app.put('/book/:title',(req,res)=>{
    const sql="UPDATE books SET iduser=?,title=?,author=?,image=?,price=? WHERE title=?"
    conn.query(sql,[req.body.iduser,req.body.title,req.body.author,req.body.image,req.body.price,req.params.title],(err,result)=>{
        if(err) res.json(err);
        res.json("updated")
    })
});
app.delete('/book/delete/:id',(req,res)=>{
    conn.query("DELETE FROM books WHERE iduser=?;",[req.params.id],(err,result)=>{
        if(err) res.json(err);
        res.json("deleted")
    })
})
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
// ****Method for posts table
app.get('/post/:iduser',(req,res)=>{
    const sql="SELECT * FROM posts WHERE iduser=?"
    conn.query(sql,[req.params.iduser],(err,results)=>{
        if(err) res.json(err);
        res.json(results)
    })
})
app.get('/post',(req,res)=>{
    const sql="SELECT * FROM posts"
    conn.query(sql,(err,results)=>{
        if(err) res.json(err);
        res.json(results)
    })
})
app.post('/post',(req,res)=>{
    const sql="INSERT INTO posts (title,description,iduser) VALUES (?,?,?)";
    conn.query(sql,[req.body.title,req.body.description,req.body.iduser],(err,result)=>{
        if(err) console.log(err)
        res.json("created")
    })
})
app.delete('/post/delete/:title',(req,res)=>{
    conn.query("DELETE FROM posts WHERE title=?;",[req.params.title],(err,result)=>{
        if(err) res.json(err);
        res.json("deleted")
    })
});

app.put('/post/:title',(req,res)=>{
    const sql="UPDATE posts SET iduser=?,title=?,description=? WHERE title=?"
    conn.query(sql,[req.body.iduser,req.params.title,req.body.description,req.params.title],(err,result)=>{
        if(err) res.json(err);
        res.json("updated")
    })
});
app.listen(5000,()=>{
    console.log("running on port 5000")
})

module.exports =conn;