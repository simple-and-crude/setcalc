# |简·陋| - 并列计算器

网址：[http://sc.seventop.top/setcalc/](http://sc.seventop.top/setcalc/)

本计算器名为“并列计算器”。顾名思义，本计算器用于解决多组数之间的运算问题。

一般计算常是多个数进行运算，例如解 $1 + 2$。这是操作数确定的情况。

但有时候操作数不确定。例如解 $a + b$ 。这里 $a$ 是什么数， $b$ 又是什么数呢？

若 $a,b\in R$，我们只能够求出一个区间。
但若其取值是有限多个，比如 $a,b \in \\\{0, 1\\\}$，那结果也是有限多个，我们就可全部将其算出来。

不过 $a,b \in \\\{0, 1\\\}$ 告诉我们 $a$ 有两种可能， $b$ 也有两种可能，所以我们一共要求四种可能的结果。
可以发现计算的复杂度是平方上升的。既然如此，有没有计算器可以一下子算一整组数，解决这种麻烦呢

没错，那就是 **|简·陋| - 并列计算器**。

## 引用

如果你以 npm 包的形式使用：

```js
const setcalc = require('@simple-and-crude/setcalc');
// 或
import * as setcalc from '@simple-and-crude/setcalc';
```

如果你直接在 HTML 里编写代码：

```html
<script src="@simple-and-crude/setcalc/index.js"></script>
<script>
  /// <reference path="@simple-and-crude/setcalc/global.d.ts" />
  console.log(setcalc);
</script>
```
