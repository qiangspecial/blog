# 那些要注意的东西


## 组件名称大写开头
```javascript
var CommentBox = React.createClass({
	render: function() {
		return (
			<div className="commentBox">
				hello, world! I am a CommentBox.
			</div>
		);
	}
});

React.render(<CommentBox />, document.getElementById("content"));
```

## React.render必须在所有使用到的组件定义之后执行

## 特殊的 API `dangerouslySetInnerHTML={{__html: rawMarkup}}`，故意让插入原始的 HTML 变得困难。
```javascript
var converter = new Showdown.converter();
var Comment = React.createClass({
	render: function() {
		var rawMarkup = converter.makeHtml(this.props.children.toString());
		return (
			<div className="comment">
				<h2 className="commentAuthor">{this.props.author}</h2>
				<span dangerouslySetInnerHTML={{__html: rawMarkup}} />
			</div> 
		)
	}
});
```

## state 和 props的区别
* props 是一种从父级向子级传递数据的方式。
* state 仅用于实现交互功能，也就是说，数据随着时间变化。

##### 让我们分析每一项，指出哪一个是 state 。简单地对每一项数据提出三个问题：
1. 是否是从父级通过 props 传入的？如果是，可能不是 state 。
2. 是否会随着时间改变？如果不是，可能不是 state 。
3. 能根据组件中其它 state 数据或者 props 计算出来吗？如果是，就不是 state 。

## 直接在标签上写style
`<th colspan="2" style={{text-align: 'left'}}>{this.props.category}</th>` 
或 
`<th colspan="2" style={{textAlign: 'left'}}>{this.props.category}</th>` 


## label for 使用 htmlFor (待确定??为什么会这样)
```javascript
render: function() {
	return (
		<label htmlFor="isStockOnly">
			<input type="checkbox" id="isStockOnly" 
				checked={this.props.isStockOnly} 
				onChange={this.filterDateChange} ref="isStockOnly"
			/>
			{' '}
			Only show products in stock
		</label>
	);
}
```

## render 注意: 任何数据都要用一个组件包着
__错误的写法__
```javascript
render: function() {
	return (
		<table>
			<tr>
				<th>Name</th>
				<th>Price</th>
			</tr>
			{rows}
		</table>
	)
}
```
__正确的写法__

```javascript
render: function() {
	return (
		<table>
			<tr>
				<th>Name</th>
				<th>Price</th>
			</tr>
			<tbody>{rows}</tbody>
		</table>
	)
}
```



