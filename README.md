
### Linter, Jest and Codeclimate:
[![linter](https://github.com/manylovv/frontend-project-lvl2/actions/workflows/linter.yml/badge.svg)](https://github.com/manylovv/frontend-project-lvl2/actions/workflows/linter.yml)
[![tests](https://github.com/manylovv/frontend-project-lvl2/actions/workflows/tests.yml/badge.svg)](https://github.com/manylovv/frontend-project-lvl2/actions/workflows/tests.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/438489f198be09804ac3/maintainability)](https://codeclimate.com/github/manylovv/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/438489f198be09804ac3/test_coverage)](https://codeclimate.com/github/manylovv/frontend-project-lvl2/test_coverage)

# Hi there! My name is deeffy

```
  __                    ___    ___             
 /\ \                 /'___\ /'___\            
 \_\ \     __     __ /\ \__//\ \__/  __  __    
 / __ \  /'__ \ /'__ \ \ .__\ \ .__\/\ \/\ \   
/\ \L\ \/\  __//\  __/\ \ \_/\ \ \_/\ \ \_\ \  
\ \_____\ \____\ \____\\ \_\  \ \_\  \/`____ \ 
 \/____ /\/____/\/____/ \/_/   \/_/   `/___/> \
                                         /\___/
                                         \/__/ 
```

## Who am i?

I am a cli tool for comparing two **json/yaml** files and show the difference between them.

## How to install me?

```bash
npm i -g deeffy
```
## How to use me?

#### Stylish format (default):

```
deeffy <filepath1> <filepath2>
# or
deeffy -f stylish <filepath1> <filepath2>
```
Example:
```bash
deffy_user $ deeffy file1.json file2.json
# output
{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}
```

#### Plain format:

```
deeffy -f plain <filepath1> <filepath2>
```
Example:
```bash
deffy_user $ deeffy -f plain file1.json file2.json
# output
Property 'follow' was removed
Property 'proxy' was removed
Property 'timeout' was updated. From 50 to 20
Property 'verbose' was added with value: true
```

#### Json format (for developers):

```
deeffy -f json <filepath1> <filepath2>
```
Example: 
```bash
deffy_user $ deeffy -f json file1.json file2.json
# output
[
  {
    "key": "follow",
    "type": "deleted",
    "oldValue": false
  },
  {
    "key": "host",
    "type": "unchanged",
    "oldValue": "hexlet.io"
  },
  {
    "key": "proxy",
    "type": "deleted",
    "oldValue": "123.234.53.22"
  },
  {
    "key": "timeout",
    "type": "changed",
    "oldValue": 50,
    "newValue": 20
  },
  {
    "key": "verbose",
    "type": "added",
    "newValue": true
  }
]
```

**Have a great experience with me :earth_americas:**
