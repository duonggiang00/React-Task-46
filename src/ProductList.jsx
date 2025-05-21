import React, { useEffect } from 'react'
import useQueryParams from './hooks/useQueryParams'
import useFetchListWithParams from './hooks/useFetchListWithParams'

function ProductList() {
  const [params, updateParams, resetParams]=useQueryParams({
    search: "",
		page: 1,
		limit: 6,
		sortBy: "price",
		order: "asc",
  })
  const [products,loading,error,total]=useFetchListWithParams("products",params);

  const handlePage=(newPage)=>{
    updateParams({ ...params, page: newPage})
  }
  const handleSearch=(e)=>{
        updateParams({ ...params, search: e.target.value.toLowerCase()})
  }
  const handleSort=(e)=>{
    console.log(e.target.value)
    updateParams({ ...params, order: e.target.value})
  }
  const handleLimit=(e)=>{
    console.log(e.target.value)
    updateParams({ ...params, limit: e.target.value})
  }
  // if(loading) return <div>Loading...</div>;
  if(error) return <div>{error}</div>
  return (
    <div>
        <div className='productsPage'>
           <div className="filter">
                <input type="input" id='search' name='search' onInput={handleSearch}/>
                <select name="sort" id="sort" onChange={handleSort}>
                    <option value="">default</option>
                    <option value="asc">asc</option>
                    <option value="desc">desc</option>
                </select>
                <select name="limit" id="limit" onChange={handleLimit}>
                    <option value="6">6</option>
                    <option value="12">12</option>
                    <option value="20">20</option>
                </select>
            </div>
        <h1>Danh sach san pham</h1>
          <table>
            <tbody>
              {products.map((item)=>(
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.price}</td>
                <td>{item.description}</td>
                <td><img src={item.images} alt="" width={100}/></td>
              </tr>
              ))}
            </tbody>
            
          </table>
        </div>
        <button onClick={() =>{
          if(params.page>1)
          handlePage(params.page - 1)}
        }
           >preview</button>
        <span>{params.page}</span>
        <button onClick={() =>
          {
            if(params.page<Math.ceil(total/params.limit)){
              handlePage( params.page + 1)}
            }
            
          } >next</button>
    </div>
  )
}

export default ProductList