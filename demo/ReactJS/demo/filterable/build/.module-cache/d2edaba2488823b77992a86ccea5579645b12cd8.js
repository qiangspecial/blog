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
var SearchBar = React.createClass({displayName: "SearchBar",
	render: function() {
		return (
			React.createElement("form", null, 
				React.createElement("input", {type: "text", placeholder: "Search..."}), 
				React.createElement("p", null, 
					React.createElement("label", {htmlFor: "search"}, 
						React.createElement("input", {type: "checkbox", id: "search"}), 
						' ', 
						"Only show products in stock"
					)
				)
			)
		);
	}
});

// productRow
var ProductRow = React.createClass({displayName: "ProductRow",
	render: function() {
		var name = this.props.product.stocked ?
			this.props.product.name : React.createElement("span", {style: {color: 'red'}}, this.props.product.name);

		return (
			React.createElement("tr", null, 
				React.createElement("td", null, name), 
				React.createElement("td", null, this.props.product.price)
			)
		);
	}
});

// ProductCategoryRow
var ProductCategoryRow = React.createClass({displayName: "ProductCategoryRow",
	render: function() {
		return (
			React.createElement("tr", null, 
				React.createElement("th", {colspan: "2"}, this.props.category)
			)
		);
	}
});

// ProductTable
var ProductTable = React.createClass({displayName: "ProductTable",
	render: function() {
		var rows = [];
		var lastCategory = null;

		this.props.products.forEach(function(product) {
			if (product.category !== lastCategory) {
				rows.push(React.createElement(ProductCategoryRow, {category: product.category}));
			}
			rows.push(React.createElement(ProductRow, {product: product}));
			lastCategory = product.category;
		});
		return (
			React.createElement("table", null, 
				React.createElement("tr", null, 
					React.createElement("th", null, "Name"), 
					React.createElement("th", null, "Price")
				), 
				rows
			)
		)
	}
});

var FilterableProduct = React.createClass({displayName: "FilterableProduct",
	render: function() {
		return (
			React.createElement("div", null, 
				React.createElement(SearchBar, null), 
				React.createElement(ProductTable, null)
			)
		);
	}
});

React.render(React.createElement(FilterableProduct, null) ,document.getElementById("filterable"));
