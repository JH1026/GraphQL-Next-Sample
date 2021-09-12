## Overview

This App shares website links.<br>
I created this App as sample due to study GraphQL.<br>

## Techniques

* __Frontend__
  * __typescript 4.3.5__
  * __next.js 11.0.1__
  * __React.js 17.0.2__
  * __apollo/client 3.4.7__
  * __material-ui/core 4.12.3__
  * __eslint 7.32.0__

* __Infrastructure__
  * __Docker 20.10.7 / docker-compose 1.29.2__
  * __nginx 1.20.1__
  * __mongoDB 5.0.2__

### Local Deploy

1.  git clone
```terminal
git clone git@github.com:JuneOrg2020/GraphQL-Next-Sample.git
```

2.  Move directory
```terminal
cd GraphQL-Next-Sample
```

3. Activate Docker
```terminal
docker-compose up
```

4. Initial Data Input
```terminal
docker compose exec mongo bash -c "mongorestore -d test --dir /tmp/dump/test"
```

5. Access to http://localhost

## Image
 Top <br>
<img src="https://user-images.githubusercontent.com/64642177/131006036-abece885-b393-444d-a439-5045a5206834.png" width=600><br>
 Register <br>
<img src="https://user-images.githubusercontent.com/64642177/131006095-a99a33f4-5704-4cbe-aa3e-01c88e0aba04.png" width=600><br>
 Search <br>
<img src="https://user-images.githubusercontent.com/64642177/131006127-17d0c0b0-d2c7-4457-8859-1a8049aa674a.png" width=600><br>


