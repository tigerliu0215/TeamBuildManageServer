## Team Build Management Web Server Development Doc


### Environment Setup 
#### Pre-Require Environment
```
Node.js
Gulp
Bower
```

Install Gulp,Bower as Global Command:

```bash
npm isntall gulp bower -g
```

Install MongoDB

#### Install Dependencies
Run Command 
```bash
npm install
```


### Local Development 
Update Your mongodb connection url in 
`config/env/development.js`


```
db: 
{
  uri: 'mongodb://cuija-2-w7:27017/tb-mnt', //replace with this if you use your local db
  options: {
    user: '',
    pass: ''
  },
  // Enable mongoose debug mode
  debug: process.env.MONGODB_DEBUG || false
}
```

Run Command
```bash
gulp 
```


### Production 
```bash
gulp prod
```


### ChangeLog
What I change from meanjs@0.5.0?
