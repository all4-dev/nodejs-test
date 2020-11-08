# AWS EC2 Instance with NodeJs + Express + MongoDB

>It's necessary to use "Amazon Linux 2" instance to get the latest kernel, packages and systemctl support command \
>Remember to open ports 22, 80 and 443 and 3000 temporarily
------------------------

### Connect instance
```sh
$ chmod 400 youNameKey.pem
$ ssh -i "your-key-name.pem" your-public-dns.compute.amazonaws.com
```

___
## _Install NodeJs_

Update sever package list
```sh
$ sudo yum update -y
```

Download and install
```sh
$ sudo yum install -y gcc-c++ make
$ curl -sL https://rpm.nodesource.com/setup_15.x | sudo -E bash -
$ sudo yum install -y nodejs
```

_Check Version._
```sh
$ node -v 
$ npm -v
```

___
## _Install Mongodb_

Add mongodb to yum repository list, create file:
```sh
$ sudo vim /etc/yum.repos.d/mongodb-org-4.4.repo
```

Add this content to the file
```sh
[mongodb-org-4.4]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/7Server/mongodb-org/4.4/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-4.4.asc
```

Install mongodb with the command _**yum**_
```sh
$ sudo yum install -y mongodb-org
```

Run mongodb
```sh
$ sudo service mongod start
# sudo service mongod status
# sudo service mongod stop
```

_Check the MongoDB version._
```sh
$ mongod --version
```

___
## _Install Git and Node test App_

```sh
$ sudo yum install git
```

Clone this little code to test that NodeJs, Express and MongoDB are working
```sh
$ git clone https://github.com/all4-dev/nodejs-test
```

Initialize npm
```sh
$ cd nodejs-test/
$ npm install
```

Run node
```sh
$ node app.js
```
___

Check on your browser - IP or AWS dns : Port

http://your-public-aws-dns:3000 \
http://0.0.0.0:3000/