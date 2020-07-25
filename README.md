 
 [<img align="right" src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/instagram.svg" width="50" height="50" />](http://www.instagram.com/gajjartejas)
 [<img align="right" src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/twitter.svg" width="50" height="50" />](http://www.twitter.com/gajjartejas)
 [<img align="right" src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/reddit.svg" width="50" height="50" />](http://www.reddit.com/u/gajjartejas)

# React-Native-Flatlist-Pagination-Example
Pagination and Pull to refresh example with rn-placeholder. API response is fast so I have added delay for visualization purposes.

See: 
```
_getUsersApi = async () => {
    //API is too fast, adding timeout to visualize loader
    await new Promise((resolve) => setTimeout(resolve, 2000));
    ...
};
```

## Demo (React Native v0.63.2)
![](demo.gif)

## Thirdparty library used
1. rn-placeholder
