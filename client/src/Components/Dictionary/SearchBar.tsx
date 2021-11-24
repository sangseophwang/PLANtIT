import React, { useEffect, useState } from 'react';
import CropsList from 'Components/Dictionary/CropsList';
import 'Components/Dictionary/scss/SearchBar.scss';

const SearchBar = (props: any) => {
  const [filterData, setFilterData] = useState([]);
  const [clearWord, setClearWord] = useState('');

  const CropsListData = props.data.data;

  // 한글이 되시는 분은 16번째 줄의 english_name을 crops_id로 바꿔주세요 - 김진경 -
  const FilterOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchWord = e.target.value;
    setClearWord(searchWord);
    const newFilter = props.data.data.filter((value: any) => {
      return value.english_name.includes(searchWord);
    });
    setFilterData(newFilter);
  };

  const clearInput = () => {
    setFilterData([]);
    setClearWord('');
  };

  useEffect(() => {}, [props]);

  return (
    <>
      <section className="Search__Container">
        <div className="Search__Input">
          <svg className="Search__Icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>

          <input type="text" value={clearWord} placeholder="작물의 이름을 검색해주세요" onChange={FilterOnChangeHandler} />
          {filterData.length !== 0 && (
            <svg xmlns="http://www.w3.org/2000/svg" className="Close__Icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={clearInput}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </div>
      </section>
      <section className="CropsList__Container">
        {filterData.length !== 0 ? (
          <CropsList data={filterData} />
        ) : (
          <>
            <CropsList data={CropsListData} />
          </>
        )}
      </section>
    </>
  );
};

export default SearchBar;
