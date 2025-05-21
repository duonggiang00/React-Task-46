    import React, { useEffect, useState } from 'react'
    import api from './api';

    const useFetchListWithParams = (path,params) => {
        const [list,setList] = useState([]);
        const [total,setTotal] = useState(0)
        const [loading,setLoading]= useState(false);
        const [error,setError]= useState(false);

        const fetchList = async ()=>{
            try {
                setLoading(true);
                const { data } = await api.get(`${path}/search?q=${params.search}&limit=${params.limit}&skip=${(params.page-1)*params.limit}&sortBy=${params.sortBy}&order=${params.order}`);
                setList(data[path]);
                setTotal(data.total)
                setLoading(false)
                console.log(data.total)
            } catch (error) {
                setLoading(false);
                setError(error.message||"Failed!");
                console.log(error)
                
            }
        }
        useEffect(()=>{
            fetchList();
        },[params])

    return [list, loading, error, total]
    }

    export default useFetchListWithParams