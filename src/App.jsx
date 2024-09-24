import { useEffect, useState } from 'react';

import { Pagination } from 'antd';
import { jsonAxios } from './api';

function App() {
  const [content, setContent] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(0);

  const handleChangePage = (page) => {
    console.log(page);
    setPage(page - 1);
  };

  useEffect(() => {
    jsonAxios
      .get(`/users?page=${page}&size=${size}`)
      .then((resp) => {
        console.log(resp);
        const data = resp.data;
        setContent(data.content);
        setTotalElements(data.totalElements);
        setPage(data.number);
        setSize(data.size);
      })
      .catch((err) => console.log(err));
  }, [page]);

  return (
    <>
      {/* table */}
      <table border={1} cellPadding={10} cellSpacing={10}>
        <thead>
          <tr>
            <th>STT</th>
            <th>NAME</th>
            <th>DOB</th>
            <th>EMAIL</th>
            <th>GENDER</th>
            <th>ADDRESS</th>
            <th colSpan={2}>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {content.map((item, index) => (
            <tr key={item.id}>
              <td>{size * page + index + 1}</td>{' '}
              {/* trang đầu tiên thì page * size = 0 vì page = 0 khi
               sang trang 2 thì page = 1  => page * size = size + index + 1 */}
              <td>{item.name}</td>
              <td>{item.dateOfBirth}</td>
              <td>{item.email}</td>
              <td>{item.gender ? 'Nam' : 'Nữ'}</td>
              <td>{item.address}</td>
              <td>
                <button>EDIT</button>
              </td>
              <td>
                <button>DELETE</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* pagination */}
      <Pagination
        current={page + 1}
        total={totalElements}
        pageSize={size}
        onChange={handleChangePage}
      />
    </>
  );
}

export default App;
