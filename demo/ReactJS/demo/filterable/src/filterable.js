var products = [{
		category: "Sporting Goods",
		price: "$49.99",
		stocked: true,
		name: "Football"
	}, {
		category: "Sporting Goods",
		price: "$9.99",
		stocked: true,
		name: "Baseball"
	}, {
		category: "Sporting Goods",
		price: "$29.99",
		stocked: false,
		name: "Basketball"
	}, {
		category: "Electronics",
		price: "$99.99",
		stocked: true,
		name: "iPod Touch"
	}, {
		category: "Electronics",
		price: "$399.99",
		stocked: false,
		name: "iPhone 5"
	}, {
		category: "Electronics",
		price: "$199.99",
		stocked: true,
		name: "Nexus 7"
	}];

/**
	component 

	FilterableProduct
		* SearchBar
		* ProductTable
			* ProductCategoryRow
			* ProductRow
 */

// 搜索框
var SearchBar = React.createClass({
	// filter text 变化后执行
	filterDateChange: function() {
		console.log("send filterData to Parent");
		this.props.onFilterTextChange({
			"filterText": this.refs.filterText.getDOMNode().value.trim(),
			"isStockOnly": this.refs.isStockOnly.getDOMNode().checked
		});
	},
	render: function() {
		console.log("search");
		return (
			<form>
				<input type="text" placeholder="Search..." 
					value={this.props.filterText} 
					onChange={this.filterDateChange}
					ref="filterText"
				/>
				<p>
					<label htmlFor="isStockOnly">
						<input type="checkbox" id="isStockOnly" 
							checked={this.props.isStockOnly} 
							onChange={this.filterDateChange} ref="isStockOnly"
						/>
						{' '}
						Only show products in stock
					</label>
				</p>
			</form>
		);
	}
});

// productRow
var ProductRow = React.createClass({
	render: function() {
		var name = this.props.product.stocked ?
			this.props.product.name : <span style={{color: 'red'}}>{this.props.product.name}</span>;

		return (
			<tr>
				<td>{name}</td>
				<td>{this.props.product.price}</td>
			</tr>
		);
	}
});

// ProductCategoryRow
var ProductCategoryRow = React.createClass({
	render: function() {
		return (
			<tr>
				<th colspan="2">{this.props.category}</th>
			</tr>
		);
	}
});

// ProductTable
var ProductTable = React.createClass({
	render: function() {
		var rows = [];
		var lastCategory = null;
		console.log("props");
		console.log(this.props);
		this.props.products.forEach(function(product) {
			// 过滤掉不符合条件的
			if (product.name.indexOf(this.props.filterText) === -1 || (!product.stocked && this.props.isStockOnly)) {
            	return;
            }
			if (product.category !== lastCategory) {
				rows.push(<ProductCategoryRow category={product.category} />);
			}
			rows.push(<ProductRow product={product} />);
			lastCategory = product.category;
		}.bind(this));
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
});

// 
var FilterableProduct = React.createClass({
	getInitialState: function() {
		return {filterText: "", isStockOnly: false}
	},

	// filter文字变动
	filterTextChange: function(filterData) {
		this.setState({
			filterText: filterData.filterText,
			isStockOnly: filterData.isStockOnly
		});
		console.log(this.state);
	},
	render: function() {
		return (
			<div>
				<SearchBar 
					filterText={this.state.filterText}
					isStockOnly={this.state.isStockOnly}
					onFilterTextChange={this.filterTextChange}
				/>
				<ProductTable
					products={this.props.products}
					filterText={this.state.filterText}
					isStockOnly={this.state.isStockOnly}
				/>
			</div>
		);
	}
});

React.render(<FilterableProduct products={products} /> ,document.getElementById("filterable"));
