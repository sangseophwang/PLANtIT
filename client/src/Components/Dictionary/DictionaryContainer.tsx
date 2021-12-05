import React, { useEffect, useState } from 'react';
import 'Components/Dictionary/scss/DictionaryContainer.scss';
import DictionaryList from 'Components/Dictionary/DictionaryList';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';

library.add(faSearch, faTimes);

export default function DictionaryContainer(props: any): JSX.Element {
  const [filterData, setFilterData] = useState([]);
  const [clearWord, setClearWord] = useState('');

  const CropsListData = props.data.data;

  const FilterOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchWord = e.target.value;
    setClearWord(searchWord);
    const newFilter = props.data.data.filter((value: any) => {
      return value.crops_id.includes(searchWord);
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
          <FontAwesomeIcon icon={faSearch} />
          <input
            type="text"
            value={clearWord}
            placeholder="작물의 이름을 검색해주세요"
            onChange={FilterOnChangeHandler}
          />
          {clearWord.length !== 0 && (
            <FontAwesomeIcon icon={faTimes} onClick={clearInput} />
          )}
        </div>
      </section>
      <section className="CropsList__Container">
        {filterData.length !== 0 ? (
          <DictionaryList data={filterData} />
        ) : (
          <DictionaryList data={CropsListData} />
        )}
      </section>
    </>
  );
}
