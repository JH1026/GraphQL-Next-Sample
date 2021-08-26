## Overview

This is sample app using next.js, GraphQL.<br>
I created this App due to study GraphQL.<br>

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

2. Activate Docker
```terminal
docker up
```

3. Initial Data Input
```terminal
docker compose exec mongo bash -c "mongorestore -d test --dir /tmp/dump/test"
```

4. Access to http://localhost
```terminal
docker compose exec mongo bash -c "mongorestore -d test --dir /tmp/dump/test"
```

## Image
 Search <br>
<img src="https://user-images.githubusercontent.com/64642177/127508184-f72c9b82-f1fa-4408-9426-77201ab062aa.png" width=600><br>
 Review <br>
<img src="https://user-images.githubusercontent.com/64642177/127508205-2ba1684f-8e99-4654-b4e6-a903f6762ff9.png" width=600><br>
 BookGroup <br>
<img src="https://user-images.githubusercontent.com/64642177/127508210-367d3b25-8c71-41e5-ae96-104a98223180.png" width=600><br>


