## Sass Sourcemap Size Ratio

### Requirements

- Node
- Yarn

### Setup

`yarn && yarn run build && yarn run parse`

Try and write some dreadfull sass in the `scss` folder and observe the ratios in the output.

#### Example Output
```json
/* 
    sass-map-ratio.json

    Arrays truncated for example
*/

{
    "../scss/app.scss": {
        "sourceLines": [
            1,
            2,
            3
        ],
        "generatedLines": [
            1,
            2
        ],
        "ratio": 0.6666666666666666
    },
    "../scss/_typography.scss": {
        "sourceLines": [
            1,
            2,
            3
            // ...
        ],
        "generatedLines": [
            4,
            5,
            // ...
        ],
        "ratio": 0.75
    },
    "../scss/_looper.scss": {
        "sourceLines": [
            2,
            3
            // ...
        ],
        "generatedLines": [
            8, 
            9
            // ...
        ],
        "ratio": 53.333333333333336
    }
}
```

### Why

Trying some ideas how to identify scss partials that are generating way too much output.
