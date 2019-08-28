# 進階React Redux範例-使用saga達成非同步

![](https://i.imgur.com/RkF4dtE.png)

我們一樣繼續上次的計數器的範例進行修改，這次再加一個功能為延遲1秒後＋1的非同步功能。雖然說saga的主要功能是在非同步讀取伺服器數據的時候可以更方便，但我們可以先用簡單的範例看看saga怎麼用。

首先先安裝套件

`yarn add redux-saga`

## Saga

我們需要建立一個saga來達到非同步的效果，1秒後計數器(state)+1，需要從`redux-saga/effects`引入 `put` , `takeEvery` 和`delay`的方法。

> put: 發起Action
>
> takeEvery: 監聽Action變化
>
> delay: 延遲時間

我們來寫一個可以在一秒後把計數器+1功能的函式，首先需delay 1000 ms也就是1秒，一秒後用put的方法發起計數器+1的action，也就是和你直接按畫面加一會產生的action是一樣的。所以就可以達到+1的功能。

```js
export function* incrementAsync() {
  yield delay(1000)
  yield put({ type: 'INCREMENT' })
}
```

接著將這個函數export出來，並且使用takeEvery來監聽action的變化，當產生`'INCREMENT_ASYNC'`這個action的時候就會觸發我們剛剛寫的延遲一秒+1的函數。

```js
export default function* rootSaga() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}
```

完整檔案如下，檔案路徑: `src/sagas/index.js`

```js
import { put, takeEvery, delay } from 'redux-saga/effects'

export function* incrementAsync() {
  yield delay(1000)
  yield put({ type: 'INCREMENT' })
}

export default function* rootSaga() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}
```

## Actions

既然已經在Saga裡面啟用了監聽非同步功能的`'INCREMENT_ASYNC'`ˋ這個action，那麼我們也需要在action裡面做出相對應的action 。

```js
...
export const INCREMENT_ASYNC = "INCREMENT_ASYNC";
...

export function incrementAsync() {
  return {
    type: INCREMENT_ASYNC
  };
}

...
```

檔案路徑: ``src/actions/index.js``

## Store連結Saga

現在我們需要把寫好的saga和store連結起來，這樣才能啟動非同步功能的action type的時候，讓saga監聽到並啟動delay的函數。我們來看看要把saga和store連結起來吧。

首先需要在redux中引入`applyMiddleware`這個可以讓redux可以使用中間件，可以讓action有額外的功能，並引入saga的中間件並設定它。

```js
...
import { createStore,applyMiddleware} from 'redux'; //引入applyMiddleware中間件
import createSagaMiddleware from 'redux-saga' //引入saga中間件
import rootSaga from '../sagas/index'
...
const sagaMiddleware = createSagaMiddleware() //設定saga中間件
```

接著在store中設定並啟用saga

```js
...
export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(sagaMiddleware)  //使用中間件
  );
  
  sagaMiddleware.run(rootSaga)	//啟用saga
  ...
```

## 畫面新增非同步功能按鈕

有了產生動作後的Action，並設定好了saga與store的連結後，並有了delay一秒後＋1功能後，那我們還需要啟動一個畫面可以啟動這個delay一秒後＋1功能的action。我們需要在元件裡面做一個按鈕，點了以後可以發起  incrementAsync 這個 action。

```js
import React from "react";

class Counter extends React.Component {
  render() {
    const { value, onIncrement, onDecrement, incrementAsync, } = this.props;
    return (
      <div>
        <h2>Counter</h2>
        <div>
          <button type="button" onClick={onIncrement}>
            +
          </button>
          {' '}
          <span>{value}</span>
          {' '}
          <button type="button" onClick={onDecrement}>
            -
          </button>
          <div>
            <button type="button" onClick={incrementAsync}>
              Increment async
            </button>   
          </div>
        </div>
      </div>
    );
  }
}

export default Counter;
```

## 完成

恭喜你，現在查看網頁並測試看看吧。我們完成了一秒後可以+1功能的按鈕了。或是你也可以查看我的範例。下次我們再來研究怎麼使用saga來獲取API的資料吧。

[DEMO](https://codesandbox.io/s/github/Exercise-Example/counter-with-saga)