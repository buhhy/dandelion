import * as React from 'react';
import * as ReactDOM from 'react-dom';

var styles = require('./test1.scss');

import { Hello } from './infra/hello';

class FilterableProductTable extends React.Component<any, {}> {
  render() {
    return (<section>
      <SearchBar />
      <ProductTableComponent categories={data} />
    </section>);
  }
}

interface ProductTableProps {
  categories: Array<Category>;
}

class ProductTableComponent extends React.Component<ProductTableProps, {}> {
  render() {
    let rows: Array<any> = [];

    for (let datum of this.props.categories) {
      rows.push(
        <ProductCategoryHeaderRowComponent
            key={'header-' + datum.name}
            categoryName={datum.name} />
      );

      for (let row of datum.products) {
        rows.push(<ProductRowComponent key={'item-' + row.name} product={row} />)
      }
    }
    
    return (
        <table>
          <thead>f
            <tr>
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
    );
  }
}

class SearchBar extends React.Component<any, {}> {
  render() {
    return (
      <form className={styles.testClass}>
        <input type="text" placeholder="Search..." />
        <p>
          <input type="checkbox" /><br/>
          Only show products in stock.
        </p>
      </form>
    );
  }
}

interface ProductCategoryHeaderRowProps {
  categoryName: String;
}

class ProductCategoryHeaderRowComponent
    extends React.Component<ProductCategoryHeaderRowProps, {}> {
  render() {
    return <tr><th colSpan="2">{this.props.categoryName}</th></tr>;
  }
}

interface ProductRowProps {
  product: Product;
}

class ProductRowComponent extends React.Component<ProductRowProps, {}> {
  render() {
    let color: string = this.props.product.stocked ? 'black' : 'red';

    return (
      <tr>
        <td style={{"color": color}}>{this.props.product.name}</td>
        <td>{this.props.product.price}</td>
      </tr>
    );
  }
}

interface Product {
  price: string;
  stocked: boolean;
  name: string;
}

interface Category {
  name: string;
  products: Array<Product>;
}

const data: Array<Category> = [
  {
    name: 'Sporting Goods',
    products: [
      {price: '$49.99', stocked: true, name: 'Football'},
      {price: '$9.99', stocked: true, name: 'Baseball'},
      {price: '$29.99', stocked: false, name: 'Basketball'},
    ]
  }, {
    name: 'Electronics',
    products: [
      {price: '$99.99', stocked: true, name: 'iPod Touch'},
      {price: '$399.99', stocked: false, name: 'iPhone 5'},
      {price: '$199.99', stocked: true, name: 'Nexus 7'},
    ]
  },
];

ReactDOM.render(
    <FilterableProductTable />,
    document.getElementById('example'));
