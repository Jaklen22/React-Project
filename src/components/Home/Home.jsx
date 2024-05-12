import Product from "../Product/Product";
import HomeSlider from "../Slider/Slider";
import Category from './../Category/Category';

export default function Home() {
  return (

    
    <div>
    <HomeSlider/>
    <h2>Category</h2>
    <Category/>
      <h2>Products</h2>
      <Product/>
    </div>
  )
}
