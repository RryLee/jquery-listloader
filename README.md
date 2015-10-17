# jQuery-listLoader

Click to get database records, using some scene that no pagination.

## Getting Started

### Getting the repository

1. [Downloading](https://github.com/RryLee/jquery-listloader/archive/master.zip)
2. run `npm install jquery-listloader`

### Guide

**Your backend need to return json data like this.**

```json
{
    "items": [
        {
            "id": "1",
            "title": "title1",
            "description": "body1"
        },
        {
            "id": "2",
            "title": "title2",
            "description": "body2"
        },
        {
            "id": "3",
            "title": "title3",
            "description": "body3"
        }
    ],
    "last": false,
    "count": 3
}
```

`items` => your most important data.
`last` => weather the data has been gotten.
`count` => the record total count.

**Your frontend maybe like this.**

```html
<div class="container">
    <div class="items">
        <div class="item">
            <h3 data-field="title"></h3>
            <p data-field="description"></p>
        </div>
    </div>
    <button class="items-loader"></button>
</div>
```
```js
(function($) {
    $('.container').listLoader({
        source: 'articles.php',
        step: 2
    });
})(jQuery)
```

### Some Options

* `source` required -- the backend uri to get data.

* `step` optional default(2) -- each count to get

* `itemsElement` optional default(.items) -- The items css selector

* `itemElement` optional default(.item) -- The item css selector

* `loaderElement` optional default(.items-loader) -- The loader button css selector

* `hideLoader` optional default(true) -- After get all data, the loaderElement hide.

* `finishedFunction` optional -- your own callback function after get all data.

## License

MIT
