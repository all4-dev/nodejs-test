# AWS EC2 Instance with NodeJs + Express + MongoDB
------------------------
It's necessary to use "Amazon Linux 2" instance to get the latest kernel, packages and systemctl support command
 remember to open ports 22, 80 and 443 and 3000 temporarily
------------------------

### Connect instance
```
chmod 400 youNameKey.pem
ssh -i "youNameKey.pem" youPublicDns.compute.amazonaws.com
```

___
## _Install nvm and NodeJs_

Update sever package list
```
sudo yum update -y
```

Download and install nvm (node version manager)\
Check latest version here 👇 \
https://github.com/nvm-sh/nvm
```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.36.0/install.sh | bash
```

Activate nvm by typing the following at the command line.
```
. ~/.nvm/nvm.sh
```

Execute command $ nvm install 
the help will be shown because a parameter is missing, 
however when executing the command we will be able to 
see the latest version available
```
nvm install 8.0.0
```

_Test is Node.js is installed and running correctly by typing the following at the command line._
```
node -e "console.log('Running Node.js ' + process.version)"
```

___
## _Install Mongodb on ec2 instance_

Add mongodb to yum repository list, create file:
```
sudo vim /etc/yum.repos.d/mongodb-org-4.4.repo
```

Add this content to the file
```
[mongodb-org-4.4]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/7Server/mongodb-org/4.4/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-4.4.asc
```

Install mongodb with the command _**yum**_
```
sudo yum install -y mongodb-org
```

Run mongodb
```
sudo service mongod start
# sudo service mongod status
# sudo service mongod stop
```

_Check the MongoDB version._
```
mongod --version
```

___
## _Install Git and Node test App_

```
sudo yum install git
```

Clone this little code to test that NodeJs, Express and MongoDB are working
```
git clone https://github.com/all4-dev/nodejs-test
```

Initialize npm
```
cd nodejs-test/
npm install
```

Run node
```
node app.js
```
___

Check on your browser - IP or AWS dns : Port

http://your-public-aws-dns:3000 \
http://0.0.0.0:3000/